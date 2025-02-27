import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import PlayStopIcon from "../assets/icons/play-stop-o.svg";
import PlayPauseIcon from "../assets/icons/play-pause-o.svg";
import "../index.css"; // Ensure this file imports the global styles including fonts

const CourseScheduleViewer = () => {
  const [viewMode, setViewMode] = useState("list");
  const scheduleData = [
    {
      date: "15 Feb 2025",
      events: [
        {
          type: "React Js",
          color: "red",
          time: "Saturday, February 8, 6:00AM",
          description:
            "Introduction to React JS : React is a JavaScript library for building interactive user interfaces. Start by setting up your environment ...",
        },
        {
          type: "Vue Js",
          color: "green",
          time: "Saturday, February 8, 6:00AM",
          description: (
            <>
              <span className="font-bold">Introduction to Vue Js</span>
              <span>
                : Vue Js is a JavaScript library for building interactive user
                interfaces. Start by setting up your environment ...
              </span>
            </>
          ),
        },
      ],
    },
    {
      date: "15 Feb 2025",
      events: [
        {
          type: "React Js",
          color: "red",
          time: "Saturday, February 8, 6:00AM",
          description: (
            <>
              <span className="font-bold">Introduction to Vue Js</span>
              <span>
                : Vue Js is a JavaScript library for building interactive user
                interfaces. Start by setting up your environment ...
              </span>
            </>
          ),
        },
        {
          type: "Vue Js",
          color: "green",
          time: "Saturday, February 8, 6:00AM",
          description: (
            <>
              <span className="font-bold">Introduction to Vue Js</span>
              <span>
                : Vue Js is a JavaScript library for building interactive user
                interfaces. Start by setting up your environment ...
              </span>
            </>
          ),
        },
      ],
    },
    {
      date: "15 Feb 2025",
      events: [
        {
          type: "React Js",
          color: "red",
          time: "Saturday, February 8, 6:00AM",
          description: (
            <>
              <span className="font-bold">Introduction to Vue Js</span>
              <span>
                : Vue Js is a JavaScript library for building interactive user
                interfaces. Start by setting up your environment ...
              </span>
            </>
          ),
        },
        {
          type: "Vue Js",
          color: "green",
          time: "Saturday, February 8, 6:00AM",
          description: (
            <>
              <span className="font-bold">Introduction to Vue Js</span>
              <span>
                : Vue Js is a JavaScript library for building interactive user
                interfaces. Start by setting up your environment ...
              </span>
            </>
          ),
        },
      ],
    },
  ];

  return (
    <div
      className="bg-white font-sans w-full h-screen max-w-full mx-auto flex flex-col overflow-hidden"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {/* Header - Original desktop layout with mobile responsiveness */}
      <div className="flex sm:flex-row flex-col p-4 border-b">
        <div className="flex items-center space-x-2 sm:mb-0 mb-4 sm:justify-start justify-center">
          <h1 className="text-2xl font-semibold">January 2022</h1>
          <button className="flex items-center text-blue-500 border border-blue-500 rounded px-2 py-1 text-sm">
            Month <ChevronDown size={16} className="ml-1" />
          </button>
        </div>
        <div className="flex sm:ml-auto space-x-2 sm:justify-start justify-center">
          <button className="flex items-center justify-center bg-[#F2994A] text-white rounded-xl px-4 py-2 text-sm w-[200px] h-[45px] gap-2">
            <span className="leading-none">Procrastinate Course</span>
            <img src={PlayPauseIcon} alt="Procrastinate" className="w-5 h-5" />
          </button>
          <button className="flex items-center justify-center bg-[#EB5757] text-white rounded-xl px-4 py-2 text-sm w-[160px] h-[45px] gap-2">
            <span className="leading-none">Leave Course</span>
            <img src={PlayStopIcon} alt="Leave Course" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex justify-end p-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm">List View</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={viewMode === "calendar"}
              onChange={() =>
                setViewMode(viewMode === "list" ? "calendar" : "list")
              }
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          <span className="text-sm">Calendar</span>
        </div>
      </div>

      {/* Schedule Content */}
      <div className="bg-[#FFFFFF] p-4 flex-1 overflow-hidden rounded-xl">
        <div className="overflow-y-auto h-full">
          {scheduleData.map((daySchedule, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-xl mb-8">
              <h2 className="text-lg font-semibold py-2 border-b border-gray-300 mb-4">
                {daySchedule.date}
              </h2>
              <div className="space-y-4 pt-5 pb-5">
                {daySchedule.events.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="bg-white rounded-lg shadow-md overflow-hidden relative hover:bg-gray-200 cursor-pointer"
                    onClick={() => alert(`Clicked on ${event.type}`)}
                  >
                    <div className="flex">
                      <div
                        className={`w-2.5 ${
                          event.color === "red" ? "bg-red-500" : "bg-green-500"
                        }`}
                      ></div>
                      <div className="p-4 w-full">
                        <h3 className="font-semibold text-2xl">{event.type}</h3>
                        <p className="text-gray-500 text-sm mb-2">
                          {event.time}
                        </p>
                        <p className="text-gray-700">
                          {typeof event.description === "string"
                            ? event.description
                            : event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseScheduleViewer;
