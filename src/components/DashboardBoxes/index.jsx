import React from 'react';
import { FaCarRear, FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { IoStatsChartSharp } from "react-icons/io5"
import { LuScanFace } from "react-icons/lu";

const DashboardBoxes = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {/* ANPR Cameras Box */}
      <div className=" transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 rounded-lg overflow-hidden border border-[rgba(0,0,0,0.1)] bg-white">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">ANPR Cameras</h3>
              <p className="text-sm opacity-80">License plate recognition</p>
            </div>
            <FaCarRear className="h-6 w-6" />
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-sm text-gray-500">Total Cameras</p>
              <p className="text-xl font-bold">24</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Cameras</p>
              <div className="flex items-center gap-1">
                <p className="text-xl font-bold">21</p>
                <FaArrowDown className="text-red-500 h-4 w-4" />
              </div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Operational rate: 88%</span>
            <span>Last updated: 4/13/2025</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }}></div>
          </div>
        </div>
      </div>

      {/* FR Cameras Box */}
      <div className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 border rounded-lg overflow-hidden border border-[rgba(0,0,0,0.1)] bg-white">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">FR Cameras</h3>
              <p className="text-sm opacity-80">Facial recognition</p>
            </div>
            <LuScanFace className="h-6 w-6" />
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-sm text-gray-500">Total Cameras</p>
              <p className="text-xl font-bold">18</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Cameras</p>
              <div className="flex items-center gap-1">
                <p className="text-xl font-bold">17</p>
                <FaArrowUp className="text-green-500 h-4 w-4" />
              </div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Operational rate: 94%</span>
            <span>Last updated: 4/13/2025</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '94%' }}></div>
          </div>
        </div>
      </div>

      {/* Vehicles Captured Box */}
      <div className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 border rounded-lg overflow-hidden border border-[rgba(0,0,0,0.1)] bg-white">
        <div className="bg-gradient-to-r from-green-600 to-green-800 p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">Vehicles Captured</h3>
              <p className="text-sm opacity-80">Total recognized vehicles</p>
            </div>
            <IoStatsChartSharp className="h-6 w-6" />
          </div>
        </div>
        <div className="p-4">
          <div className="mb-2">
            <p className="text-2xl font-bold">15500</p>
            <p className="text-sm text-gray-500">Today</p>
          </div>
          <div className="flex items-center gap-1 text-green-500 mb-2">
            <FaArrowUp className="h-3 w-3" />
            <span className="text-xs">+3.5%</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Daily average</p>
              <p className="font-medium">432</p>
            </div>
            <div>
              <p className="text-gray-500">This week</p>
              <p className="font-medium">2,160</p>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Last updated: 4/13/2025
          </div>
        </div>
      </div>

      {/* Faces Captured Box */}
      <div className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 border rounded-lg overflow-hidden border border-[rgba(0,0,0,0.1)] bg-white">
        <div className="bg-gradient-to-r from-amber-600 to-amber-800 p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">Faces Captured</h3>
              <p className="text-sm opacity-80">Total recognized faces</p>
            </div>
            <IoStatsChartSharp className="h-6 w-6" />
          </div>
        </div>
        <div className="p-4">
          <div className="mb-2">
            <p className="text-2xl font-bold">14300</p>
            <p className="text-sm text-gray-500">Today</p>
          </div>
          <div className="flex items-center gap-1 text-green-500 mb-2">
            <FaArrowUp className="h-3 w-3" />
            <span className="text-xs">+2.8%</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Daily average</p>
              <p className="font-medium">284</p>
            </div>
            <div>
              <p className="text-gray-500">This week</p>
              <p className="font-medium">1,420</p>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Last updated: 4/13/2025
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBoxes;