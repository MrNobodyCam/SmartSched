import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import "../../Style/global.css";

const CustomCalendar = () => {
  const [view, setView] = useState("dayGridMonth");
  const [currentMonth, setCurrentMonth] = useState("January 2022");

  // Sample events data
  const events = [
    {
      id: "1",
      title: "Event Name",
      start: "2022-01-02T08:00:00",
      color: "#4CAF50",
    },
    {
      id: "2",
      title: "Event Name",
      start: "2022-01-02T08:00:00",
      color: "#4CAF50",
    },
    {
      id: "3",
      title: "Event Name",
      start: "2022-01-03T08:00:00",
      color: "#4CAF50",
    },
    {
      id: "4",
      title: "Event Name",
      start: "2022-01-03T08:00:00",
      color: "#7B68EE",
    },
    {
      id: "5",
      title: "Event Name",
      start: "2022-01-04T08:00:00",
      color: "#FF5252",
    },
    {
      id: "6",
      title: "Event Name",
      start: "2022-01-04T08:00:00",
      color: "#4CAF50",
    },
    {
      id: "7",
      title: "Event Name",
      start: "2022-01-05T08:00:00",
      color: "#4CAF50",
    },
    {
      id: "8",
      title: "Event Name",
      start: "2022-01-05T08:00:00",
      color: "#FF5252",
    },
  ];

  // Function to handle date change
  interface DateInfo {
    view: {
      currentStart: Date;
    };
  }

  const handleDatesSet = (dateInfo: DateInfo) => {
    const date = dateInfo.view.currentStart;
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    setCurrentMonth(`${month} ${year}`);
  };

  // Render custom header with buttons
  const renderEventContent = (eventInfo: {
    event: { backgroundColor: any; title: React.ReactNode };
  }) => {
    return (
      <div className="flex items-center p-1 text-sm rounded bg-gray-100">
        <div
          className="w-2 h-2 rounded-full mr-2"
          style={{ backgroundColor: eventInfo.event.backgroundColor }}
        ></div>
        <span className="flex-grow truncate text-gray-800">
          {eventInfo.event.title}
        </span>
        <span className="ml-auto text-xs text-gray-500">08:00</span>
      </div>
    );
  };

  // Custom view toggle
  const toggleView = () => {
    setView((prev) => (prev === "dayGridMonth" ? "listMonth" : "dayGridMonth"));
  };

  return (
    <div className="max-w-full mx-auto p-4 font-sans h-screen">
      {/* Calendar Header */}
      <div className="flex justify-between items-center pb-2 border-b border-gray-200 mb-2">
        <div className="flex items-center">
          <h1 className="text-2xl font-medium text-gray-800">{currentMonth}</h1>
          <div className="ml-4">
            <button className="border border-gray-300 px-3 py-1 rounded-md text-sm text-gray-600 flex items-center">
              Month
              <span className="ml-2 border-transparent border-t-4 border-r-4 border-l-4"></span>
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-md text-white font-medium bg-yellow-500">
            Procrastinate Course
          </button>
          <button className="px-4 py-2 rounded-md text-white font-medium bg-red-500">
            Leave Course
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex justify-end items-center my-4">
        <span className="text-sm text-gray-600 mr-2">List View</span>
        <label className="relative inline-block w-12 h-6">
          <input
            type="checkbox"
            checked={view === "dayGridMonth"}
            onChange={toggleView}
            className="hidden"
          />
          <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition duration-300"></span>
          <span className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition duration-300 transform translate-x-0 peer-checked:translate-x-6 peer-checked:bg-blue-500"></span>
        </label>
        <span className="text-sm text-gray-600 ml-2">Calendar</span>
      </div>

      {/* FullCalendar */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView={view}
        headerToolbar={false} // Hide default header
        events={events}
        eventContent={renderEventContent}
        datesSet={handleDatesSet}
        dayMaxEventRows={4}
        moreLinkContent={({ num }) => `+${num} More`}
        height="auto"
        contentHeight="auto"
        aspectRatio={3}
        fixedWeekCount={false}
        showNonCurrentDates={false}
        dayHeaderFormat={{ weekday: "short" }}
      />
    </div>
  );
};

export default CustomCalendar;
