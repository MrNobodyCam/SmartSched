import React, { useState } from "react";
import BoxIcon from "../assets/images/box 1.svg"; // Correct path to your icon

const EmptySchedule = () => {
  const [viewType, setViewType] = useState("calendar");

  return (
    <div className="w-[1356px] h-[934px] bg-white font-inter mx-auto absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md">
      <div className="border-b border-gray-300 p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center">
            <h1 className="font-open-sans text-2xl font-medium mr-4">
              January 2022
            </h1>
            <button className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full font-inter border-none cursor-pointer hover:bg-blue-200">
              Month ▾
            </button>
          </div>
          <div className="flex items-center">
            <button className="px-4 py-2 text-xs text-blue-600 bg-blue-100 rounded-md font-inter border-none cursor-pointer mr-4 flex items-center gap-2">
              Generate Schedule
              <span className="text-lg font-bold">+</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-0 absolute top-[125px] right-[100px]">
        <label className="text-xs text-gray-700 mx-2">List View</label>
        {/* <label className="relative inline-block w-15 h-8">
          <input type="checkbox"
                 checked={viewType === 'calendar'}
                 onChange={() => setViewType(viewType === 'calendar' ? 'list' : 'calendar')}
                 className="opacity-0 w-0 h-0"
          />
          <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 transition duration-400 rounded-full"></span>
          <span className="absolute content-[''] h-6 w-6 left-1 bottom-1 bg-white transition duration-400 rounded-full"></span>
        </label> */}
        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Toggle me
            </span>
          </label>
        </div>

        <label className="text-xs text-gray-700 mx-2">Calendar</label>
      </div>

      <div className="flex flex-col items-center justify-center max-w-lg mx-auto mt-[300px] px-4 text-center">
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
