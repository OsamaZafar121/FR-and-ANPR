import os
import shutil
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import cv2
import numpy as np
from ultralytics import YOLO
from deepface import DeepFace
from tqdm import tqdm
from typing import List
import uuid
from pathlib import Path
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Face Recognition API",
    description="API for extracting faces from videos and matching them against authorized faces",
    version="1.0.0"
)

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/SOURCEA", StaticFiles(directory="SOURCEA"), name="sourcea")
app.mount("/FRAMES", StaticFiles(directory="FRAMES"), name="frames")
# Configuration
SAVED_FACES_DIR = 'SOURCEA'
Path(SAVED_FACES_DIR).mkdir(exist_ok=True)


SAVED_FRAME_DIR = 'FRAMES'
Path(SAVED_FRAME_DIR).mkdir(exist_ok=True)

AUTHORIZED_FOLDER = "AUTHORIZED"
ALLOWED_FOLDER = "allowed"
NONALLOWED_FOLDER = "nonallowed"
BEST_FACES_FOLDER = "best_faces"

# Create directories if they don't exist
os.makedirs(AUTHORIZED_FOLDER, exist_ok=True)
os.makedirs(ALLOWED_FOLDER, exist_ok=True)
os.makedirs(NONALLOWED_FOLDER, exist_ok=True)
os.makedirs(BEST_FACES_FOLDER, exist_ok=True)

# Load YOLO face model (load once at startup)
model = YOLO("yolov8n-face.pt")

# Utility functions
def calculate_sharpness(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    return cv2.Laplacian(gray, cv2.CV_64F).var()

def calculate_brightness(image):
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    return np.mean(hsv[:, :, 2])

def calculate_contrast(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    return gray.std()

def calculate_face_quality(image):
    sharpness = calculate_sharpness(image)
    brightness = calculate_brightness(image)
    contrast = calculate_contrast(image)
    return sharpness * 0.5 + brightness * 0.3 + contrast * 0.2

def cosine_distance(vector1, vector2):
    dot_product = np.dot(vector1, vector2)
    norm1 = np.linalg.norm(vector1)
    norm2 = np.linalg.norm(vector2)
    return 1 - (dot_product / (norm1 * norm2))

# API Endpoints
@app.post("/process_video/")
async def process_video(video: UploadFile = File(...)):
    if not video.filename.lower().endswith(('.mp4', '.avi', '.mov')):
        raise HTTPException(400, "Invalid file format. Please upload a video file.")

    temp_dir = "temp_videos"
    Path(temp_dir).mkdir(exist_ok=True)
    temp_path = os.path.join(temp_dir, video.filename)
    
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(video.file, buffer)

    try:
        results = model.track(
            source=temp_path,
            persist=True,
            tracker="bytetrack.yaml",
            verbose=False
        )

        max_faces = {}  # Stores the largest face image for each ID
        max_frames = {}
        for frame_result in results:
            if frame_result.boxes is not None and frame_result.boxes.id is not None:
                boxes = frame_result.boxes.xyxy.cpu().numpy()
                ids = frame_result.boxes.id.cpu().numpy().astype(int)
                
                for box, face_id in zip(boxes, ids):
                    x1, y1, x2, y2 = map(int, box)
                    frame = frame_result.orig_img
                    face_img = frame_result.orig_img[y1:y2, x1:x2]
                    
                    if face_img.size == 0:
                        continue
                    
                    current_area = (x2 - x1) * (y2 - y1)
                    
                    # Update if this is the largest face we've seen for this ID
                    if face_id not in max_faces or current_area > max_faces[face_id]['area']:
                        max_faces[face_id] = {
                            'image': face_img,
                            'area': current_area
                        }
                        max_frames[face_id] = {
                            'image':frame_result
                        }
        # Save the largest faces after processing all frames
        saved_paths = []
        saved_frames = []
        for face_id, data in max_faces.items():
            filename = f"{SAVED_FACES_DIR}/face_{face_id}.jpg"
            cv2.imwrite(filename, data['image'])
            saved_paths.append(filename)
        for face_id, data in max_frames.items():
            filename = f"{SAVED_FRAME_DIR}/frame_{face_id}.jpg"
            data['image'].save(filename=filename)  
            saved_frames.append(filename)
        # saved_frame = os.listdir(SAVED_FRAME_DIR)
        # saved_frame = ['FRAMES/'+i for i in saved_frame]
        # return {"detected_faces": saved_paths}
        return JSONResponse(content={
            "status": "success",
            "message":"Detected Faces cropped successfully.",
            "detected_faces": saved_paths,
            "detected_frames": saved_frames
        })

    except Exception as e:
        raise HTTPException(500, f"Error processing video: {str(e)}")
    
    finally:
        video.file.close()
        if os.path.exists(temp_path):
            os.remove(temp_path)

@app.post("/upload_authorized/")
async def upload_authorized(files: List[UploadFile] = File(...)):
    """Upload authorized faces"""
    try:
        # Clear previous authorized faces
        for filename in os.listdir(AUTHORIZED_FOLDER):
            file_path = os.path.join(AUTHORIZED_FOLDER, filename)
            try:
                if os.path.isfile(file_path):
                    os.unlink(file_path)
            except Exception as e:
                print(f"Error deleting {file_path}: {e}")
        
        # Save new authorized faces
        for file in files:
            if file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                file_path = os.path.join(AUTHORIZED_FOLDER, file.filename)
                with open(file_path, "wb") as buffer:
                    shutil.copyfileobj(file.file, buffer)
        
        return JSONResponse(content={
            "status": "success",
            "message": f"{len(files)} authorized faces uploaded successfully."
        })
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading authorized faces: {str(e)}")

@app.get("/match_faces/")
async def match_faces():
    """Match extracted faces against authorized faces"""
    try:
        # Clear previous results
        for folder in [ALLOWED_FOLDER, NONALLOWED_FOLDER]:
            for filename in os.listdir(folder):
                file_path = os.path.join(folder, filename)
                try:
                    if os.path.isfile(file_path):
                        os.unlink(file_path)
                except Exception as e:
                    print(f"Error deleting {file_path}: {e}")
        
        # Load authorized faces
        authorized_encodings = []
        authorized_names = []
        
        for filename in os.listdir(AUTHORIZED_FOLDER):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                image_path = os.path.join(AUTHORIZED_FOLDER, filename)
                try:
                    embedding_obj = DeepFace.represent(
                        img_path=image_path,
                        model_name='VGG-Face',
                        enforce_detection=False,
                        detector_backend='retinaface',
                        align=True,
                        normalization='base'
                    )
                    if embedding_obj:
                        authorized_encodings.append(embedding_obj[0]["embedding"])
                        authorized_names.append(os.path.splitext(filename)[0])
                except Exception as e:
                    print(f"Error processing authorized face {filename}: {str(e)}")
                    continue
        
        if not authorized_encodings:
            return JSONResponse(content={
                "status": "error",
                "message": "No valid authorized faces found."
            }, status_code=400)
        
        # Process source faces
        matched_count = 0
        total_count = 0
        
        for filename in os.listdir(SAVED_FACES_DIR):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                total_count += 1
                image_path = os.path.join(SAVED_FACES_DIR, filename)
                try:
                    embedding_obj = DeepFace.represent(
                        img_path=image_path,
                        model_name='VGG-Face',
                        enforce_detection=False,
                        detector_backend='retinaface',
                        align=True,
                        normalization='base'
                    )
                    
                    if not embedding_obj:
                        shutil.copy(image_path, os.path.join(NONALLOWED_FOLDER, filename))
                        continue
                    
                    current_embedding = embedding_obj[0]["embedding"]
                    best_match = None
                    best_distance = float('inf')
                    
                    for i, auth_embedding in enumerate(authorized_encodings):
                        distance = cosine_distance(
                            np.array(current_embedding),
                            np.array(auth_embedding)
                        )
                        if distance < best_distance:
                            best_distance = distance
                            best_match = authorized_names[i]
                    
                    if best_distance <= 0.30:
                        matched_count += 1
                        output_filename = f"{best_distance:.4f}_{best_match}_{filename}"
                        shutil.copy(image_path, os.path.join(ALLOWED_FOLDER, output_filename))
                    else:
                        shutil.copy(image_path, os.path.join(NONALLOWED_FOLDER, filename))
                
                except Exception as e:
                    print(f"Error processing {filename}: {str(e)}")
                    shutil.copy(image_path, os.path.join(NONALLOWED_FOLDER, filename))
                    continue
        list_allowed = []
        list_notallowed = []
        allowed = os.listdir(ALLOWED_FOLDER)
        for i in allowed:
            list_allowed.append('allowed/'+i)
        notallowed = os.listdir(NONALLOWED_FOLDER)
        for i in notallowed:
            list_notallowed.append('nonallowed/'+i)
        return JSONResponse(content={
            "status": "success",
            "message": "Face matching completed",
            "total_faces": total_count,
            "matched_faces": matched_count,
            "unmatched_faces": total_count - matched_count,
            "allowed_faces": list_allowed,
            "nonallowed_faces": list_notallowed,
            "match_percentage": (matched_count / total_count * 100) if total_count > 0 else 0
        })
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error matching faces: {str(e)}")

@app.get("/status/")
async def get_status():
    """Get current status of the system"""
    try:
        return JSONResponse(content={
            "source_faces": len(os.listdir(SAVED_FACES_DIR)),
            "authorized_faces": len(os.listdir(AUTHORIZED_FOLDER)),
            "allowed_faces": len(os.listdir(ALLOWED_FOLDER)),
            "nonallowed_faces": len(os.listdir(NONALLOWED_FOLDER))
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting status: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)