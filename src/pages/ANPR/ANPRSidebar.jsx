import React from "react";
import { Link, useLocation } from "react-router-dom";

const ANPRSidebar = () => {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `block py-2 px-4 rounded hover:bg-blue-300 ${
      pathname === path ? "bg-blue-500 text-white" : ""
    }`;

  return (
    <div className=" w-64 h-auto  text-white p-4">
      <h2 className="text-lg font-bold mb-4">ANPR Menu</h2>
      <nav className="space-y-2">
        <Link to="/anpr" className={linkClass("/anpr")}>
          ANPR Results
        </Link>
        <Link to="/anpr/review" className={linkClass("/anpr/review")}>
          Review & Verification
        </Link>
         <Link to="/anpr/video-analysis" className={linkClass("/anpr/video-analysis")}>
          Video Analysis
        </Link>
       <Link to="/anpr/reporting" className={linkClass("/anpr/reporting")}>
          Reporting
        </Link>
        <Link to="/anpr/database" className={linkClass("/anpr/database")}>
          DataBase Management
        </Link>
        
      </nav>
    </div>
  );
};

export default ANPRSidebar;
