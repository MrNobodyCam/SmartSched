import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";

const MainGeneral: React.FC = () => {
  const location = useLocation();
  // Fix: Extract the last part of the path
  const currentTab = location.pathname.split("/").pop() || "account";

  return (
    <div className="min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl lg:text-[36px] font-bold mb-6">General</h1>
        <div className="flex gap-4 mb-6">
          {["account", "password", "session"].map((tab) => (
            <Link
              key={tab}
              to={`/setting/${tab}`}
              className={`py-2 px-4 rounded-full font-medium transition-colors
                ${
                  currentTab === tab
                    ? "bg-[#2D9CDB] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainGeneral;
