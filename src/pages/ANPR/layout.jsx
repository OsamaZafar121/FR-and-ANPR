import React from "react";
import { Outlet } from "react-router-dom";
import ANPRSidebar from "./ANPRSidebar";

const ANPRLayout = () => {
  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <div className="fixed h-screen bg-gradient-to-b from-blue-700 to-black shadow-lg">
        <ANPRSidebar />
      </div>
      
      {/* Scrollable Main Content */}
      <div className="ml-64 flex-1 p-4 min-h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default ANPRLayout;