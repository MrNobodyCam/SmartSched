import React, { useState } from "react";
import BoxIcon from "../assets/images/box 1.svg";
import PlusIcon from "../assets/icons/Icon (2).svg";

const EmptySchedule = () => {
  const [viewType, setViewType] = useState("calendar");

  return (
    <div className="w-full max-w-[1356px] min-h-[934px] bg-white font-inter mx-auto shadow-md relative lg:absolute lg:left-1/2 lg:top-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2">
      <div className="border-b border-gray-300 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between max-w-6xl mx-auto space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0">
            <h1 className="font-open-sans text-2xl font-medium sm:mr-4">
              January 2022
            </h1>
            <button className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full font-inter border-none cursor-pointer hover:bg-blue-200 w-fit">
              Month ▾
            </button>
          </div>
          <div className="flex sm:ml-auto sm:justify-start justify-start">
            <button className="flex items-center justify-center bg-[#2D9CDB] text-white rounded-xl px-4 py-2 text-sm w-full sm:w-[200px] h-[45px] gap-2">
              <span className="leading-none">Generate Schedule</span>
              <img src={PlusIcon} alt="Generate Schedule" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end p-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm">List View</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={viewType === "calendar"}
              onChange={() =>
                setViewType(viewType === "list" ? "calendar" : "list")
              }
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          <span className="text-sm">Calendar</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center max-w-lg mx-auto mt-[200px] sm:mt-[300px] px-4 text-center">
        <div className="w-25 h-12 mb-4">
          <img src={BoxIcon} alt="Empty box" className="max-w-full h-auto" />
        </div>
        <p className="text-gray-500 font-inter text-base">
          No study schedule generated yet. Click 'Generate Schedule' to create
          your personalized study plan!
        </p>
      </div>
    </div>
  );
};

export default EmptySchedule;
