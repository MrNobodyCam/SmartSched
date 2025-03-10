import React, { useState, useEffect, useRef, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import "./ComponentStyle/CalendarStyles.css";
import CustomDatePicker from "./CustomDatePicker";

const CustomCalendar: React.FC = () => {
  const [view, setView] = useState("dayGridMonth");
  const [currentMonth, setCurrentMonth] = useState("January 2025");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showTodoList, setShowTodoList] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [popupEvent, setPopupEvent] = useState<{
    event: { id: string; title: string; start: string; description?: string };
    position: { top: number; left: number };
  } | null>(null);

  const calendarRef = useRef<FullCalendar | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // ✅ Store events in state
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Reading a Book",
      start: "2025-03-02T08:00:00",
      color: "#4CAF50",
      allDay: false,
      extendedProps: { description: "Lecture session on literature." },
    },
    {
      id: "2",
      title: "Meeting with Team",
      start: "2025-03-03T10:30:00",
      color: "#2196F3",
      allDay: false,
      extendedProps: { description: "Weekly sprint meeting." },
    },
    {
      id: "3",
      title: "Gym Session",
      start: "2025-03-04T18:00:00",
      color: "#FF5252",
      allDay: false,
      extendedProps: { description: "Fitness routine and cardio session." },
    },
    {
      id: "4",
      title: "Jivava Pingiling",
      start: "2025-03-10T18:00:00",
      color: "#FF5252",
      allDay: false,
      extendedProps: { description: "Fitness routine and cardio session." },
    },
  ]);

  // ✅ Function to add a new event dynamically
  const addEvent = () => {
    const newEvent = {
      id: String(events.length + 1),
      title: "Go to Kikilu",
      start: "2025-03-10T21:00:00",
      color: "#FF5252",
      allDay: false,
      extendedProps: { description: "Dinner at Kikilu restaurant." },
    };

    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, newEvent];

      // ✅ Ensure FullCalendar updates by refetching events
      if (calendarRef.current) {
        calendarRef.current.getApi().refetchEvents();
      }

      return updatedEvents;
    });
  };

  // ✅ Sync DatePicker label with FullCalendar when the view changes
  const handleDatesSet = useCallback(
    ({ view }: { view: { currentStart: Date } }) => {
      const date = view.currentStart;
      setCurrentMonth(
        `${date.toLocaleString("default", {
          month: "long",
        })} ${date.getFullYear()}`
      );
      setSelectedDate(new Date(date));
    },
    []
  );

  // ✅ Handle Previous & Next buttons properly
  const handlePrevMonth = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().prev();
    }
  };

  const handleNextMonth = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().next();
    }
  };

  // ✅ Handle switching calendar view
  const handleViewChange = (newView: string) => {
    setView(newView);
    setIsDropdownOpen(false);
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(newView);
    }
  };

  // ✅ Toggle Between Calendar & To-Do List
  const toggleTodoList = () => {
    setShowTodoList((prev) => !prev);
  };

  // ✅ Handle event clicks
  const handleEventClick = useCallback(
    ({ event, jsEvent }: { event: any; jsEvent: MouseEvent }) => {
      let left = jsEvent.pageX + 10; // Default to the right of the event
      let top = jsEvent.pageY - 20; // Adjust for better positioning

      // Ensure the modal stays within the screen bounds
      if (window.innerWidth - jsEvent.pageX < 250) {
        left = jsEvent.pageX - 220; // Move left if no space on the right
      }

      setPopupEvent({
        event: {
          id: event.id,
          title: event.title,
          start: event.start?.toISOString() || "",
          description:
            event.extendedProps?.description || "No description available",
        },
        position: { top, left },
      });
    },
    []
  );

  //✅ Close modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setPopupEvent(null);
      }
    };

    if (popupEvent) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupEvent]);

  return (
    <div className="calendar-container">
      {/* Calendar Header */}
      <div className="calendar-header">
        <div className="calendar-title-container">
          <h1 className="calendar-title">{currentMonth}</h1>

          {/* Dropdown for Switching Views */}
          <div className="dropdown" ref={dropdownRef}>
            <button
              className="dropdown-button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              {view === "dayGridMonth"
                ? "Month"
                : view === "timeGridWeek"
                ? "Week"
                : "Day"}
            </button>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <button onClick={() => handleViewChange("dayGridMonth")}>
                  Month
                </button>
                <button onClick={() => handleViewChange("timeGridWeek")}>
                  Week
                </button>
                <button onClick={() => handleViewChange("timeGridDay")}>
                  Day
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons & Date Picker */}
        <div className="calendar-navigation">
          <button onClick={handlePrevMonth}>Previous</button>
          <CustomDatePicker
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
          <button onClick={handleNextMonth}>Next</button>
        </div>

        {/* ✅ Add Event Button */}
        <div className="calendar-actions">
          <button className="action-button bg-amber-500" onClick={addEvent}>
            Add Event
          </button>
        </div>
      </div>

      {/* ✅ Toggle Button to Switch Between Calendar & To-Do List */}
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

      {/* ✅ Show Calendar or To-Do List Based on Toggle */}
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
          key={events.length} // ✅ Forces re-render when events change
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView={view}
          headerToolbar={false}
          events={events}
          eventClick={handleEventClick}
          datesSet={handleDatesSet} // ✅ DatePicker now updates automatically
          dayMaxEventRows={2}
          moreLinkContent={({ num }) => `+${num} More`}
          height="auto"
          contentHeight="auto"
          aspectRatio={3}
          fixedWeekCount={false}
          showNonCurrentDates={false}
          dayHeaderFormat={{ weekday: "short" }}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: "short",
          }}
        />
      )}

      {/* ✅ Event Modal */}
      {popupEvent && (
        <div
          ref={modalRef}
          className="event-modal"
          style={{
            position: "absolute",
            top: popupEvent.position.top,
            left: popupEvent.position.left,
            backgroundColor: "white",
            padding: "15px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
            zIndex: 1000,
            minWidth: "200px",
          }}
        >
          {/* Close Icon */}
          <button
            onClick={() => setPopupEvent(null)}
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              background: "none",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            ❌
          </button>

          <h3>
            <strong>Title:</strong> {popupEvent.event.title}
          </h3>
          <p>
            <strong>Time:</strong>{" "}
            {new Date(popupEvent.event.start).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <p>
            <strong>Description:</strong> {popupEvent.event.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
