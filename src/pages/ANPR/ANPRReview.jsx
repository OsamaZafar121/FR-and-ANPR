import React, { useState } from 'react';
const ANPRReview = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState('');

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideoFile(file);
      setVideoURL(videoUrl);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Recording</h1>

      {/* Upload Button */}
      <div className="mb-4">
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="block text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
      </div>

      {/* Camera and Stats Container */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Camera Recording - 2/3 width */}
        <div className="lg:w-2/3 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
          <div className="relative pt-[56.25%]">
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              {videoURL ? (
                <video
                  src={videoURL}
                  controls
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-white text-center">
                  <div className="animate-pulse mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-lg">Live Recording</p>
                  <p className="text-sm text-gray-400">Main Camera Feed</p>
                </div>
              )}
            </div>
          </div>
          <div className="p-3 bg-gray-800 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-sm">RECORDING</span>
            </div>
            <div className="text-sm">
              <span className="mr-4">1920×1080</span>
              <span>30 FPS</span>
            </div>
          </div>
        </div>
        
        {/* System Statistics - 1/3 width */}
        <div className="lg:w-1/3 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">System Statistics</h2>
          <div className="space-y-3">
            <div>
              <p className="text-gray-600">Total Detections</p>
              <p className="text-2xl font-bold text-gray-800">7</p>
            </div>
            <div>
              <p className="text-gray-600">Recognition Accuracy</p>
              <p className="text-2xl font-bold text-gray-800">97.5%</p>
            </div>
            <div>
              <p className="text-gray-600">Unknown Vehicles</p>
              <p className="text-2xl font-bold text-gray-800">0</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Detected Faces Table */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Detected Vehicles</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TimeStamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">6</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">john</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">92.6%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">19:24:12</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Verified
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">5</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">clark</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">90.2%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">19:24:10</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Verified
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">4</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">jenny</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">88.5%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">19:24:09</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Verified
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">harry</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">97%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">19:24:08</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Spoof Attempt
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">chris</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">93.9%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">19:24:06</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Verified
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">beth</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">94.5%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">19:24:03</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Spoof Attempt
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ANPRReview
