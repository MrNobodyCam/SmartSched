import React from "react";

export type TabType = "account" | "password" | "session";

interface TabButtonsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabButtons: React.FC<TabButtonsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div>
      <h1 className="text-2xl text-[36px] font-bold mb-6">General</h1>
      <div className="flex gap-4 mb-6 text-[18px]">
        {["account", "password", "session"].map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab as TabType)}
            className={`py-2 px-4 rounded-full font-medium transition-colors text-center cursor-pointer
              ${
                activeTab === tab
                  ? "bg-[#2D9CDB] text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabButtons;
