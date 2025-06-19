import { useState } from 'react';
import axios from 'axios';

const LicensePlateDetector = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:8080/process-image/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (err) {
      let errorMessage = 'An error occurred';
      if (err.code === 'ERR_NETWORK') {
        errorMessage = 'Could not connect to the server. Make sure the backend is running.';
      } else if (err.response) {
        errorMessage = err.response.data.detail || err.message;
      } else {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6 text-center">License Plate Detection</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col items-center mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Upload Vehicle Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {previewUrl && (
          <div className="mb-4 flex justify-center">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-64 rounded-md shadow-md"
            />
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!selectedFile || isLoading}
            className={`px-4 py-2 rounded-md text-white font-medium
              ${!selectedFile || isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isLoading ? 'Processing...' : 'Detect License Plate'}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          Error: {error}
        </div>
      )}

      {result && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Detection Results</h2>
          <p className="mb-2 text-sm text-gray-600">Processing ID: {result.processing_id}</p>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Original Vehicle Image</h3>
            <img
              src={`http://localhost:8080${result.vehicle_image}`}
              alt="Vehicle"
              className="max-h-64 rounded-md border border-gray-300"
            />
          </div>

          {result.license_plates.length > 0 ? (
            <div>
              <h3 className="font-medium mb-2">
                Detected License Plates ({result.license_plates.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.license_plates.map((plate, index) => (
                  <div key={index} className="border rounded-md p-3 bg-white">
                    <img
                      src={`http://localhost:8080${plate}`}
                      alt={`License Plate ${index + 1}`}
                      className="max-h-32 mx-auto mb-2"
                    />
                    <div className="text-center">
                      <a
                        href={`http://localhost:8080${plate}`}
                        download
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Download Plate {index + 1}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-yellow-700 bg-yellow-100 p-4 rounded-md">
              No license plates detected in the image.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LicensePlateDetector;