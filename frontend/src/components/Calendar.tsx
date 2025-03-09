// import React, { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import listPlugin from "@fullcalendar/list";
// import "./ComponentStyle/CalendarStyles.css";

// const CustomCalendar = () => {
//   const [view, setView] = useState("dayGridMonth");
//   const [currentMonth, setCurrentMonth] = useState("January 2025");

//   // Sample events data
//   const events = [
//     {
//       id: "1",
//       title: "Event Name",
//       start: "2022-01-02T08:00:00",
//       color: "#4CAF50",
//     },
//     {
//       id: "2",
//       title: "Event Name",
//       start: "2022-01-02T08:00:00",
//       color: "#4CAF50",
//     },
//     {
//       id: "3",
//       title: "Event Name",
//       start: "2022-01-03T08:00:00",
//       color: "#4CAF50",
//     },
//     {
//       id: "4",
//       title: "Event Name",
//       start: "2022-01-03T08:00:00",
//       color: "#7B68EE",
//     },
//     {
//       id: "5",
//       title: "Event Name",
//       start: "2022-01-04T08:00:00",
//       color: "#FF5252",
//     },
//     {
//       id: "6",
//       title: "Event Name",
//       start: "2022-01-04T08:00:00",
//       color: "#4CAF50",
//     },
//     {
//       id: "7",
//       title: "Event Name",
//       start: "2022-01-05T08:00:00",
//       color: "#4CAF50",
//     },
//     {
//       id: "8",
//       title: "Event Name",
//       start: "2022-01-05T08:00:00",
//       color: "#FF5252",
//     },
//   ];

//   // Function to handle date change
//   interface DateInfo {
//     view: {
//       currentStart: Date;
//     };
//   }

//   const handleDatesSet = (dateInfo: DateInfo) => {
//     const date = dateInfo.view.currentStart;
//     const monthNames = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     const month = monthNames[date.getMonth()];
//     const year = date.getFullYear();
//     setCurrentMonth(`${month} ${year}`);
//   };

//   // Render custom header with buttons
//   const renderEventContent = (eventInfo: {
//     event: {
//       backgroundColor: any;
//       title:
//         | string
//         | number
//         | boolean
//         | React.ReactElement<any, string | React.JSXElementConstructor<any>>
//         | Iterable<React.ReactNode>
//         | React.ReactPortal
//         | null
//         | undefined;
//     };
//   }) => {
//     return (
//       <div className="custom-event">
//         <div
//           className="event-dot"
//           style={{ backgroundColor: eventInfo.event.backgroundColor }}
//         ></div>
//         <span className="event-title">{eventInfo.event.title}</span>
//         <span className="event-time">08:00</span>
//       </div>
//     );
//   };

//   // Custom view toggle
//   const toggleView = () => {
//     setView((prev) => (prev === "dayGridMonth" ? "listMonth" : "dayGridMonth"));
//   };

//   return (
//     <div className="calendar-container">
//       <div className="calendar-header">
//         <div className="calendar-title-container">
//           <h1 className="calendar-title">{currentMonth}</h1>
//           <div className="dropdown">
//             <button className="dropdown-button">Month</button>
//           </div>
//         </div>
//         <div className="calendar-actions">
//           <button className="action-button procrastinate">
//             Procrastinate Course
//           </button>
//           <button className="action-button leave">Leave Course</button>
//         </div>
//       </div>

//       <div className="view-toggle-container">
//         <span className="view-label">List View</span>
//         <label className="switch">
//           <input
//             type="checkbox"
//             checked={view === "dayGridMonth"}
//             onChange={toggleView}
//           />
//           <span className="slider round"></span>
//         </label>
//         <span className="view-label">Calendar</span>
//       </div>

//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
//         initialView={view}
//         headerToolbar={false} // Hide default header
//         events={events}
//         eventContent={renderEventContent}
//         datesSet={handleDatesSet}
//         dayMaxEventRows={4}
//         moreLinkContent={({ num }) => `+${num} More`}
//         height="auto"
//         contentHeight="auto"
//         aspectRatio={3}
//         fixedWeekCount={false}
//         showNonCurrentDates={false}
//         dayHeaderFormat={{ weekday: "short" }}
//       />
//     </div>
//   );
// };

import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import "./ComponentStyle/CalendarStyles.css";

const CustomCalendar = () => {
  const [view, setView] = useState("dayGridMonth");
  const [currentMonth, setCurrentMonth] = useState("January 2025");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showTodoList, setShowTodoList] = useState(false);
  const [popupEvent, setPopupEvent] = useState<{
    event: { id: string; title: string; start: string; description?: string };
    position: { top: number; left: number };
  } | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const dropdownRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<FullCalendar>(null);

  // Month names array
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

  // Sample events data
  const events = [
    {
      id: "1",
      title: "Reading a Book",
      start: "2025-03-02T08:00:00",
      color: "#4CAF50",
      extendedProps: {
        description:
          "Lecture fd;lkfj l;k df sdlkfjasl;kdj fl;kdjflk;sjfdljf als;f",
      },
    },
    {
      id: "2",
      title: "Meeting with Team",
      start: "2025-03-03T10:00:00",
      color: "#2196F3",
      extendedProps: {
        description: "Lecture",
      },
    },
    {
      id: "3",
      title: "Gym Session",
      start: "2025-03-04T18:00:00",
      color: "#FF5252",
      extendedProps: {
        description:
          "Lecture fd;lkfj l;k df sdlkfjasl;kdj fl;kdjflk;sjfdljf als;f",
      },
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const popup = document.querySelector(".event-popup");
      if (popup && !popup.contains(event.target as Node)) {
        setPopupEvent(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Change the calendar view when the `view` state changes
  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(view);
    }
  }, [view]);

  // Map view types to display text
  const getViewText = (viewType: string) => {
    switch (viewType) {
      case "dayGridMonth":
        return "Month";
      case "timeGridWeek":
        return "Week";
      case "timeGridDay":
        return "Day";
      default:
        return "Month";
    }
  };

  // Function to handle date change
  interface DateInfo {
    view: {
      currentStart: Date;
    };
  }

  const handleDatesSet = (dateInfo: DateInfo) => {
    const date = dateInfo.view.currentStart;
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    setCurrentMonth(`${month} ${year}`);
    setSelectedMonth(date.getMonth());
  };

  // Handle month selection
  const handleMonthChange = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(
        new Date(calendarApi.getDate().getFullYear(), monthIndex, 1)
      );
    }
  };

  // Handle previous month
  const handlePrevMonth = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
      setSelectedMonth(calendarApi.getDate().getMonth());
    }
  };

  // Handle next month
  const handleNextMonth = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
      setSelectedMonth(calendarApi.getDate().getMonth());
    }
  };

  // Render custom header with buttons
  const renderEventContent = (eventInfo: {
    event: {
      backgroundColor: any;
      title: React.ReactNode;
    };
  }) => {
    return (
      <div className="custom-event">
        <div
          className="event-dot"
          style={{ backgroundColor: eventInfo.event.backgroundColor }}
        ></div>
        <span className="event-title">{eventInfo.event.title}</span>
      </div>
    );
  };

  // Handle event click
  const handleEventClick = (info: {
    event: {
      id: string;
      title: string;
      start: Date | null;
      extendedProps: { description?: string };
    };
    jsEvent: MouseEvent;
  }) => {
    const { event, jsEvent } = info;
    setPopupEvent({
      event: {
        id: event.id,
        title: event.title,
        start: event.start ? event.start.toISOString() : "", // Convert Date to string
        description: event.extendedProps.description || "No description", // Safely access description
      },
      position: { top: jsEvent.clientY, left: jsEvent.clientX },
    });
  };

  // Toggle between calendar and to-do list
  const toggleTodoList = () => {
    setShowTodoList((prev) => !prev);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-title-container">
          <h1 className="calendar-title">{currentMonth}</h1>
          <div className="dropdown" ref={dropdownRef}>
            <button
              className="dropdown-button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              {getViewText(view)}
            </button>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <button
                  onClick={() => {
                    setView("dayGridMonth");
                    setIsDropdownOpen(false);
                  }}
                >
                  Month
                </button>
                <button
                  onClick={() => {
                    setView("timeGridWeek");
                    setIsDropdownOpen(false);
                  }}
                >
                  Week
                </button>
                <button
                  onClick={() => {
                    setView("timeGridDay");
                    setIsDropdownOpen(false);
                  }}
                >
                  Day
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Month Selector and Navigation Buttons */}
        <div className="calendar-navigation">
          <button onClick={handlePrevMonth}>Previous</button>
          <div className="month-selector ">
            <select
              value={selectedMonth}
              onChange={(e) => handleMonthChange(Number(e.target.value))}
            >
              {monthNames.map((month, index) => (
                <option  key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleNextMonth}>Next</button>
        </div>

        <div className="calendar-actions">
          <button className="action-button procrastinate">
            Procrastinate Course
          </button>
          <button className="action-button leave">Leave Course</button>
        </div>
      </div>

      {/* Toggle Button for Calendar and To-Do List */}
      <div className="view-toggle-container">
        <span className="view-label">To-Do List</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={!showTodoList}
            onChange={toggleTodoList}
          />
          <span className="slider round"></span>
        </label>
        <span className="view-label">Calendar</span>
      </div>

      {/* Conditionally Render Calendar or To-Do List */}
      {showTodoList ? (
        <div className="todo-list">
          <h2>To-Do List</h2>
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <span>{event.title}</span>
                <span className="event-time">
                  {new Date(event.start).toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView={view}
          headerToolbar={false}
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
          eventClick={handleEventClick} // Add this line
        />
      )}

      {/* Event Popup */}
      {popupEvent && (
        <div
          className="event-popup"
          style={{
            position: "fixed",
            top: popupEvent.position.top,
            left: popupEvent.position.left,
          }}
        >
          <div className="popup-content">
            <button className="close-icon" onClick={() => setPopupEvent(null)}>
              ×
            </button>
            <h3>{popupEvent.event.title}</h3>
            <p>{new Date(popupEvent.event.start).toLocaleString()}</p>
            <p>{popupEvent.event.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
