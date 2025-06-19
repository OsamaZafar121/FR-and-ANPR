import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";


// Upload video function
async function uploadVideo(file) {
  if (!file) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("video", file);

  const response = await fetch("http://localhost:8000/process_video/", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || errorData.message || "Upload failed");
  }

  return await response.json();
}

const FaceDetector = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFace, setSelectedFace] = useState(null);
  const [detailFace, setDetailFace] = useState(null);
  const itemsPerPage = 6;

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
    setVideoURL(URL.createObjectURL(file));
    setDetectedFaces([]);
    setCurrentPage(1);
    setError("");
    setSelectedFace(null);
  };

  const handleUpload = async () => {
    if (!videoFile) {
      setError("Please select a video file.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await uploadVideo(videoFile);
      const baseUrl = "http://localhost:8000";  // Your API base URL

      // Map returned paths to full URLs served by FastAPI static mounts
      const facesWithMetadata = response.detected_faces.map((facePath, idx) => ({
        url: `${baseUrl}/${facePath.replace(/^\/+/, "")}`,     // e.g. http://localhost:8000/SOURCEA/face_1.jpg
        frameUrl: response.detected_frames[idx]
          ? `${baseUrl}/${response.detected_frames[idx].replace(/^\/+/, "")}`
          : null,
        criminal: 0,
        wl: 0,
        blacklist: 0,
        date: "20-02-2025",
        time: "02:25:46 pm",
        location: "Main Wahdat Road",
      }));

      setDetectedFaces(facesWithMetadata);
      setCurrentPage(1);
      setSelectedFace(facesWithMetadata[0] || null);
    } catch (err) {
      setError("Failed to process video. " + err.message);
      setSelectedFace(null);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(detectedFaces.length / itemsPerPage);
  const paginatedFaces = detectedFaces.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Face Detection from Video</h1>

      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          disabled={loading}
        >
          {loading ? "Processing..." : "Upload & Detect"}
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-xl font-semibold">Face Recognition</h2>
            <p className="text-gray-600">Total Count: {detectedFaces.length}</p>
          </div>

          {paginatedFaces.map((face, index) => (
            <div
              key={index}
              onClick={() => setSelectedFace(face)}
              className={`bg-white p-4 rounded shadow flex gap-4 items-center cursor-pointer ${
                selectedFace?.url === face.url ? "border-2 border-purple-600" : ""
              }`}
            >
              <img
                src={face.url}
                alt={`Face ${index + 1}`}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1 space-y-1 text-sm text-gray-700">
                <p>
                  Criminal: {face.criminal} &nbsp; WL: {face.wl} &nbsp; Blacklist:{" "}
                  {face.blacklist}
                </p>
                <p className="flex items-center gap-2">
                  <FaCalendarAlt /> {face.date} <FaClock /> {face.time}
                </p>
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt /> {face.location}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDetailFace(face);
                }}
                className="ml-auto bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition text-sm"
              >
                Details
              </button>
            </div>
          ))}

          {/* Pagination */}
          {detectedFaces.length > itemsPerPage && (
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow text-center">
            <h2 className="font-bold">Face Detected</h2>
            <img
              src={selectedFace?.url || "https://via.placeholder.com/100"}
              alt="Detected"
              className="w-24 h-24 mx-auto object-cover my-2 rounded"
            />
            <p className="text-sm text-purple-600 cursor-pointer">Recognition Logs</p>
            <p className="text-sm text-purple-600 cursor-pointer">Accuracy & Performance</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">Frame Captured</h3>
            <img
              src={selectedFace?.frameUrl || "https://via.placeholder.com/800x800"}
              alt="Frame"
              className="w-full h-full object-cover rounded"
            />
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">Geo-Location</h3>
            <img
              src="https://maps.googleapis.com/maps/api/staticmap?center=Main+Wahdat+Road&zoom=15&size=400x200&key=YOUR_API_KEY"
              alt="Geo Location"
              className="w-full h-32 object-cover rounded"
            />
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {detailFace && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setDetailFace(null)}
        >
          <div
            className="bg-white rounded p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDetailFace(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-lg font-bold"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">Face Details</h2>

            <div className="mb-4 text-center">
              <img
                src={detailFace.url}
                alt="Detected Face"
                className="w-40 h-40 object-cover rounded mx-auto mb-2"
              />
              <p className="text-sm text-gray-600">Face Detected Image</p>
            </div>

            <div className="mb-4 text-center">
              <img
                src={detailFace.frameUrl}
                alt="Frame Captured"
                className="w-full h-32 object-cover rounded"
              />
              <p className="text-sm text-gray-600">Captured Frame</p>
            </div>

            <p className="mb-2">
              <strong>Criminal:</strong> {detailFace.criminal}
            </p>
            <p className="mb-2">
              <strong>Watchlist:</strong> {detailFace.wl}
            </p>
            <p className="mb-2">
              <strong>Blacklist:</strong> {detailFace.blacklist}
            </p>
            <p className="mb-2">
              <strong>Date:</strong> {detailFace.date}
            </p>
            <p className="mb-2">
              <strong>Time:</strong> {detailFace.time}
            </p>
            <p>
              <strong>Location:</strong> {detailFace.location}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaceDetector;
