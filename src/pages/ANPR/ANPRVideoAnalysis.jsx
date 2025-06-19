import React, { useState } from 'react';
import { FiFilter, FiX, FiCheck } from 'react-icons/fi';

const ANPRVideoAnalysis = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    frId: '',
    name: '',
    time: '',
    status: '',
    confidence: '',
    action: ''
  });

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    // Filter logic here
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setFilters({
      frId: '',
      name: '',
      time: '',
      status: '',
      confidence: '',
      action: ''
    });
    setIsFilterOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Live Feed</h1>
      
      {/* Camera and Stats Container - Side by Side */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Live Feed - 70% width */}
        <div className="lg:w-[70%] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative">
          {/* Filter Dropdown Button */}
          <div className="absolute top-3 left-3 z-10">
            <button 
              onClick={toggleFilter}
              className="flex items-center bg-white p-2 rounded-md shadow-sm hover:bg-gray-50"
            >
              <FiFilter className="text-gray-600 mr-1" />
              <span className="text-sm text-gray-700">Filter</span>
            </button>
            
            {/* Filter Dropdown */}
            {isFilterOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-20">
                <div className="p-4 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">ANPR ID</label>
                    <input
                      type="text"
                      name="frId"
                      value={filters.frId}
                      onChange={handleFilterChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={filters.name}
                      onChange={handleFilterChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Time</label>
                    <input
                      type="text"
                      name="time"
                      value={filters.time}
                      onChange={handleFilterChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                    <input
                      type="text"
                      name="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Confidence</label>
                    <input
                      type="text"
                      name="confidence"
                      value={filters.confidence}
                      onChange={handleFilterChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Action</label>
                    <input
                      type="text"
                      name="action"
                      value={filters.action}
                      onChange={handleFilterChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 p-2 border-t border-gray-200">
                  <button
                    onClick={resetFilters}
                    className="flex items-center px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  >
                    <FiX className="mr-1" /> Cancel
                  </button>
                  <button
                    onClick={applyFilters}
                    className="flex items-center px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
                  >
                    <FiCheck className="mr-1" /> Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Live Camera Box */}
          <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="text-white text-center">
                <div className="animate-pulse mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-lg">Live Camera Feed</p>
                <p className="text-sm text-gray-400">Camera #1 - Main Entrance</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-800 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></span>
              <span>REC</span>
            </div>
            <div className="text-sm">
              <span className="mr-4">1920×1080</span>
              <span>30 FPS</span>
            </div>
          </div>
        </div>
        
        {/* System Statistics - 30% width */}
        <div className="lg:w-[30%]">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">System Statistics</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Total Detections</p>
                <p className="text-2xl font-bold text-gray-800">7</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Recognition Accuracy</p>
                <p className="text-2xl font-bold text-gray-800">97.5%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '97.5%' }}></div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Unknown Vehicles</p>
                <p className="text-2xl font-bold text-gray-800">0</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">System Status</p>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Operational
                </span>
              </div>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Table rows remain the same as previous example */}
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
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ANPRVideoAnalysis;