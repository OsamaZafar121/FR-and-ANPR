import React from 'react';
import DashboardBoxes from '../../components/DashboardBoxes';
import { MdOutlineWavingHand } from "react-icons/md";
import ANPRGraph from '../../components/ANPRGraph';

const Dashboard = () => {
  return (
    <div className="px-4 md:px-8 py-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Hero Section */}
      <div
        className="w-full p-6 md:p-8 border border-[rgba(0,0,0,0.1)] rounded-lg bg-cover bg-center bg-no-repeat relative overflow-hidden"
        style={{
          backgroundImage:
            'url(https://img.freepik.com/free-photo/retinal-biometrics-technology-with-man-s-eye-digital-remix_53876-108518.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between text-center md:text-left text-white relative z-10 gap-4">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 font-sans flex items-center justify-center md:justify-start">
              Welcome to Dashboard
              <MdOutlineWavingHand className="ml-2 text-yellow-500 text-4xl" />
            </h2>
            <p className="text-lg font-sans">
              Organize your work and improve your performance with us
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard Boxes */}
      <div>
        <DashboardBoxes />
      </div>

      {/* ANPR Graph */}
      <div className="border border-[rgba(0,0,0,0.1)] rounded-lg bg-white p-4">
        <ANPRGraph />
      </div>
    </div>
  );
};

export default Dashboard;
