from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import shutil
from ultralytics import YOLO
import cv2
import uuid
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# CORS Configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize YOLO model
try:
    model = YOLO('weights/best.pt')
except Exception as e:
    print(f"Error loading model: {e}")
    raise

# Setup directories
BASE_DIR = "processed_data"
os.makedirs(BASE_DIR, exist_ok=True)

@app.post("/process-image/")
async def process_image(file: UploadFile = File(...)):
    try:
        processing_id = str(uuid.uuid4())
        vehicle_dir = os.path.join(BASE_DIR, "vehicle_images", processing_id)
        plates_dir = os.path.join(BASE_DIR, "license_plates", processing_id)
        
        os.makedirs(vehicle_dir, exist_ok=True)
        os.makedirs(plates_dir, exist_ok=True)

        # Save vehicle image
        vehicle_path = os.path.join(vehicle_dir, file.filename)
        with open(vehicle_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Process image
        img = cv2.imread(vehicle_path)
        results = model(img)
        
        plate_urls = []
        
        for i, r in enumerate(results):
            for j, box in enumerate(r.boxes):
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                plate_img = img[y1:y2, x1:x2]
                plate_name = f"plate_{i}_{j}.jpg"
                plate_path = os.path.join(plates_dir, plate_name)
                cv2.imwrite(plate_path, plate_img)
                plate_urls.append(f"/static/license_plates/{processing_id}/{plate_name}")

        vehicle_url = f"/static/vehicle_images/{processing_id}/{file.filename}"

        return JSONResponse({
            "vehicle_image": vehicle_url,
            "license_plates": plate_urls,
            "processing_id": processing_id
        })

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Serve static files
app.mount("/static", StaticFiles(directory=BASE_DIR), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)