import React from "react";
import { Outlet } from "react-router-dom";
import FRSidebar from "./FRSidebar";

const FRLayout = () => {
  return (
     <div className="flex">
      {/* Fixed Sidebar */}
      <div className="fixed h-screen bg-gradient-to-b from-purple-700 to-black shadow-lg">
        <FRSidebar />
      </div>
      
      {/* Scrollable Main Content */}
      <div className="ml-64 flex-1 p-4 min-h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default FRLayout;
