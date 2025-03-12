import React, { useState, useEffect, useRef, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import "./ComponentStyle/CalendarStyles.css";
import CustomDatePicker from "./CustomDatePicker";
import CloseIcon from "../assets/icons/close.png";
import LeftArrowIcon from "../assets/icons/left_arrow.png";
import RightArrowIcon from "../assets/icons/right_arrow.png";

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

  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Reading a Book",
      date: "2025-03-02",
      start_time: "10:00:00",
      description: "Lecture session on literature.",
    },
    {
      id: "2",
      title: "Meeting with Team",
      date: "2025-03-03",
      start_time: "14:00:00",
      description: "Weekly sprint meeting.",
    },
    {
      id: "3",
      title: "Gym Session",
      date: "2025-03-04",
      start_time: "20:00:00",
      description: "Fitness routine and cardio session.",
    },
    {
      id: "4",
      title: "Jivava Pingiling",
      date: "2025-03-12",
      start_time: "18:00:00",
      description: "Fitness routine and cardio session.",
    },
    {
      id: "5",
      title: "Ping chiling",
      date: "2025-03-12",
      start_time: "19:00:00",
      description: "Fitness routine and cardio session.",
    },
    {
      id: "6",
      title: "Hello kon papa",
      date: "2025-03-12",
      start_time: "20:00:00",
      description: "Fitness routine and cardio session.",
    },
    {
      id: "7",
      title: "Hello kon papa",
      date: "2025-03-12",
      start_time: "20:00:00",
      description: "Fitness routine and cardio session.",
    },
    {
      id: "8",
      title: "Hello kon papa",
      date: "2025-03-12",
      start_time: "20:00:00",
      description: "Fitness routine and cardio session.",
    },
    {
      id: "9",
      title: "Hello kon papa",
      date: "2025-03-12",
      start_time: "20:00:00",
      description: "Fitness routine and cardio session.",
    },
    {
      id: "10",
      title: "Hello kon papa",
      date: "2025-03-12",
      start_time: "20:00:00",
      description: "Fitness routine and cardio session.",
    },
    {
      id: "11",
      title: "Hello kon papa",
      date: "2025-03-12",
      start_time: "20:00:00",
      description: "Fitness routine and cardio session.",
    },
    {
      id: "12",
      title: "Hello kon papa",
      date: "2025-03-12",
      start_time: "20:00:00",
      description: "Fitness routine and cardio session.",
    },
    {
      id: "13",
      title: "Hello kon papa",
      date: "2025-03-12",
      start_time: "20:00:00",
      description: "Fitness routine and cardio session.",
    },
  ]);

  const addEvent = () => {
    const newEvent = {
      id: String(events.length + 1),
      title: "Go to Kikilu",
      date: "2025-03-10",
      start_time: "21:00:00",
      description: "Dinner at Kikilu restaurant.",
    };

    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, newEvent];

      if (calendarRef.current) {
        calendarRef.current.getApi().refetchEvents();
      }

      return updatedEvents;
    });
  };

  const handleDatesSet = useCallback(
    ({ view }: { view: { currentStart: Date } }) => {
      const date = view.currentStart;
      setCurrentMonth(
        `${date.toLocaleString("default", {
          month: "long",
        })} ${date.getFullYear()}`
      );

      if (
        !selectedDate ||
        selectedDate.getMonth() !== date.getMonth() ||
        selectedDate.getFullYear() !== date.getFullYear()
      ) {
        setSelectedDate(new Date(date));
      }
    },
    [selectedDate]
  );

  const handleDateChange = (date: Date | null) => {
    if (date && calendarRef.current) {
      // setSelectedDate(date);
      calendarRef.current.getApi().gotoDate(date); // Navigate to the selected date
      calendarRef.current.getApi().select(date); // Highlight the selected date
      setSelectedDate(date);
    }
  };

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

  const handleViewChange = (newView: string) => {
    setView(newView);
    setIsDropdownOpen(false);
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(newView);
    }
  };

  const toggleTodoList = () => {
    setShowTodoList((prev) => !prev);
  };
  const formattedEvents = events.map((event) => ({
    ...event,
    start: event.date ? `${event.date}T${event.start_time}` : event.date,
  }));
  const handleEventClick = useCallback(
    ({ event, jsEvent }: { event: any; jsEvent: MouseEvent }) => {
      let left = jsEvent.pageX + 10;
      let top = jsEvent.pageY - 20;

      if (window.innerWidth - jsEvent.pageX < 250) {
        left = jsEvent.pageX - 220;
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

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().updateSize();
    }
  }, [selectedDate]);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        {!showTodoList ? (
          <>
            <div className="calendar-title-container">
              <h1 className="calendar-title">{currentMonth}</h1>

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

            <div className="calendar-navigation">
              <button
                className="calendar-navigation-btn"
                onClick={handlePrevMonth}
              >
                <img src={LeftArrowIcon} alt="back button" />
              </button>
              <CustomDatePicker
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
              />
              <button
                className="calendar-navigation-btn"
                onClick={handleNextMonth}
              >
                <img src={RightArrowIcon} alt="next button" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex">
            <div className="calendar-navigation">
              <button className="calendar-navigation-btn">
                <div className="text-[22px] text-white">none</div>
              </button>
            </div>
          </div>
        )}

        <div className="calendar-actions">
          <button className="action-button bg-amber-500" onClick={addEvent}>
            Add Event
          </button>
        </div>
      </div>

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

      <div className="scrollable-content overflow-auto">
        {showTodoList ? (
          <div className="todo-list">
            <h2>To-Do List</h2>
            <ul>
              {events.map((event) => (
                <li key={event.id}>
                  <span>{event.title}</span>
                  <span className="event-time">
                    {event.start_time
                      ? new Date(event.start_time).toLocaleTimeString()
                      : "No time specified"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <FullCalendar
            key={formattedEvents.length}
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView={view}
            headerToolbar={false}
            events={formattedEvents}
            eventClick={handleEventClick}
            datesSet={handleDatesSet}
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
      </div>

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
            <img src={CloseIcon} alt="close button" />
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
