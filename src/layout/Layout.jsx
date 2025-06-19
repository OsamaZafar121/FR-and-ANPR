import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { SidebarContext } from "../context/SidebarContext";
import { useState } from "react";

const Layout = () => {
console.log("Layout Rendered")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <div className="flex flex-1">
          <div
            className={`fixed h-full transition-all duration-300 ease-in-out z-10 ${
              isSidebarOpen ? "w-64 translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar />
          </div>
          <div
            className={`flex-1 transition-all duration-300 ease-in-out ${
              isSidebarOpen ? "ml-64" : "ml-0"
            }`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default Layout;
