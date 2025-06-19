import React, { useState } from "react";

const createFaceObject = (facePath, index, status) => {
  return {
    id: index + 1,
    name: facePath.split("/").pop(), // filename from path
    confidence: (Math.random() * (1 - 0.5) + 0.5).toFixed(2), // random between 0.5 and 1
    time: new Date().toLocaleString(),
    status,
    location: "Unknown Location",
  };
};

const FaceListSection = ({ title, faces }) => (
  <div className="mb-6">
    <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>
    <div className="overflow-x-auto">
      {faces.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No faces found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              {["ID", "Name", "Confidence", "Timestamp", "Status", "Location"].map(
                (col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {faces.map((face) => (
              <tr key={face.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{face.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{face.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{face.confidence}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{face.time}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      face.status === "Verified"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {face.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{face.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);

const FRReview = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [allowedFaces, setAllowedFaces] = useState([]);
  const [nonAllowedFaces, setNonAllowedFaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file));
      // Reset faces and error when new video uploaded
      setAllowedFaces([]);
      setNonAllowedFaces([]);
      setError(null);
    }
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoURL("");
    setAllowedFaces([]);
    setNonAllowedFaces([]);
    setError(null);
  };

  const clearFaces = () => {
    setAllowedFaces([]);
    setNonAllowedFaces([]);
  };

  const fetchFaceMatches = () => {
    if (!videoFile) {
      setError("Please upload a video first.");
      return;
    }

    setLoading(true);
    setError(null);
    clearFaces();

    fetch("http://localhost:8000/match_faces/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch face data");
        return res.json();
      })
      .then((data) => {
        const allowed = data.allowed_faces.map((facePath, i) =>
          createFaceObject(facePath, i, "Verified")
        );
        const nonallowed = data.nonallowed_faces.map((facePath, i) =>
          createFaceObject(facePath, i, "Non-Verified")
        );
        setAllowedFaces(allowed);
        setNonAllowedFaces(nonallowed);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Face Recognition Review</h1>

      <div className="mb-4">
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {videoURL && (
        <div className="mb-4">
          <video
            src={videoURL}
            controls
            className="w-full max-h-[400px] rounded-lg border"
          />
          <button
            onClick={removeVideo}
            className="text-red-600 text-sm mt-2 hover:underline"
          >
            Remove Video
          </button>
        </div>
      )}

      <button
        onClick={fetchFaceMatches}
        disabled={loading || !videoFile}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? "Loading..." : "Fetch Face Matches"}
      </button>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <FaceListSection title="✅ Allowed Faces" faces={allowedFaces} />
      <FaceListSection title="🚫 Non-Allowed Faces" faces={nonAllowedFaces} />
    </div>
  );
};

export default FRReview;
