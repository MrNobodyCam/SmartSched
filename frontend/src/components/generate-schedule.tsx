import { useState } from "react";
import BoxIcon from "../assets/images/box 1.svg";
import PlusIcon from "../assets/icons/Icon (2).svg";
import { ChevronDown } from "react-feather";
import PrimaryBtn from "./PrimaryBtn";

const EmptySchedule = () => {
  const [viewType, setViewType] = useState("calendar");

  return (
    <div className="w-full h-screen flex flex-col bg-white font-inter mx-auto shadow-md">
      <div className="border-b w-full border-gray-300 fixed bg-white z-10 mt-[5x] sm:mt-[5px] md:mt-[-10px] lg:mt-[-10px] xl:mt-[-10px] 2xl:mt-[-10px]">
        <div className="flex sm:flex-row flex-col p-4 sm:p-6">
          <div className="flex flex-row items-center space-x-2 sm:mb-0 mb-4 justify-center">
            <h1 className="text-2xl font-semibold">January 2022</h1>
            <button className="flex items-center text-blue-500 border border-blue-500 rounded px-2 py-1 text-sm">
              Month <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
          <div className="flex justify-end sm:justify-end sm:ml-auto mt-5 sm:mt-0 pr-4 sm:pr-15 pl-4 sm:pl-40">
            <PrimaryBtn
              py="py-2 sm:py-3 px-4 sm:px-6"
              extraContent={
                <img
                  src={PlusIcon}
                  alt="Generate Schedule"
                  className="w-5 h-5 sm:w-5 sm:h-5"
                />
              }
            >
              Generate Schedule
            </PrimaryBtn>
          </div>
        </div>
      </div>

      <div className="flex justify-end p-6 mr-[10px] mt-31 sm:mt-[105px] md:mt-[75px] lg:mt-[75px] xl:mt-[80px] 2xl:mt-[80px]">
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
            <div className="relative w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D9CDB]"></div>
          </label>
          <span className="text-sm">Calendar</span>
        </div>
      </div>

      <div className="w-full flex-grow flex items-center justify-center text-white overflow-y-auto mt-31 sm:mt-[90px] md:mt-[65px] lg:mt-[70px] xl:mt-[100px] 2xl:mt-[100px]">
        <div className="flex flex-col items-center justify-center max-w-lg mx-auto px-4 text-center">
          <div className="w-25 h-12 mb-4">
            <img src={BoxIcon} alt="Empty box" className="max-w-full h-auto" />
          </div>
          <p className="text-gray-500 font-inter text-base">
            No study schedule generated yet. Click 'Generate Schedule' to create
            your personalized study plan!
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptySchedule;
