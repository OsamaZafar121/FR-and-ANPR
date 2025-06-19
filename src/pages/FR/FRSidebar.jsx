import React from "react";
import { Link, useLocation } from "react-router-dom";

const FRSidebar = () => {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `block py-2 px-4 rounded hover:bg-purple-300 ${
      pathname === path ? "bg-purple-500 text-white" : ""
    }`;

  return (
    <div className="w-64 h-auto text-white p-4">
      <h2 className="text-lg font-bold mb-4">FR Menu</h2>
      <nav className="space-y-2">
        <Link to="/fr" className={linkClass("/fr")}>
          FR Results
        </Link>

        <Link to="/fr/review" className={linkClass("/fr/review")}>
          Review & Verification
        </Link>
         <Link to="/fr/video-analysis" className={linkClass("/fr/video-analysis")}>
          Video Analysis
        </Link>
       <Link to="/fr/reporting" className={linkClass("/fr/reporting")}>
          Reporting
        </Link>
        <Link to="/fr/database" className={linkClass("/fr/database")}>
          DataBase Management
        </Link>
        
      </nav>
    </div>
  );
};

export default FRSidebar;
