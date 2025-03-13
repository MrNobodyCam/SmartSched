import React, { useState, useEffect, useRef, useCallback } from "react";
import { fetchGetData } from "../../service/api";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import "../Components-styles/CalendarStyles.css";
import CustomDatePicker from "./CustomDatePicker";
import LeftArrowIcon from "../../assets/icons/left_arrow.png";
import RightArrowIcon from "../../assets/icons/right_arrow.png";
import ScheduleListview from "./schedule_create";
import WarningAlert from "../Alert/WarningAlert";
import { toast, ToastContainer } from "react-toastify";
import Result from "../Quiz/Result";
import QuizPopup from "../Quiz/Quiz";
import Lesson_Detail from "../Quiz/Lesson_Detail";
import PrimaryBtn from "../PrimaryBtn";
import Pause from "../../assets/icons/play-pause-o.svg";
import End from "../../assets/icons/play-stop-o.svg";
import { useNavigate, useLocation } from "react-router-dom";
import Input_form from "../Input_form";

const CustomCalendar: React.FC = () => {
  const [view, setView] = useState("dayGridMonth");
  const [currentMonth, setCurrentMonth] = useState("January 2025");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showTodoList, setShowTodoList] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [RoadMapID, setRoadMapID] = useState<number>(1);
  const [openQuiz, setopenQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [LeftQuiz, setLeftQuiz] = useState(false);
  const calendarRef = useRef<FullCalendar | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchGetData(`generate-schedule/roadmaps`);
        setEvents(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    if (location.pathname === "/generate-schedule/calendar") {
      setShowTodoList(false);
    } else if (location.pathname === "/generate-schedule/listview") {
      setShowTodoList(true);
    }
  }, [location.pathname]);

  const checkSchedule = events.length > 0 ? false : true;

  const onOpenQuiz = () => {
    setIsDetailOpen(false);
    setopenQuiz(true);
  };

  const onSubmit = (result: any) => {
    setQuizResult(result);
  };

  const onPopupResult = () => {
    setopenQuiz(false);
    setShowResult(true);
  };

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
    navigate(
      showTodoList
        ? "/generate-schedule/calendar"
        : "/generate-schedule/listview"
    );
  };

  const formattedEvents = events.map((event) => ({
    ...event,
    start: event.date ? `${event.date}T${event.start_time}` : event.date,
  }));

  const handleEventClick = useCallback(
    ({ event }: { event: any; jsEvent: MouseEvent }) => {
      setIsDetailOpen(true);
      setRoadMapID(event.id);
    },
    []
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsDetailOpen(false);
      }
    };

    if (isDetailOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDetailOpen]);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().updateSize();
    }
  }, [selectedDate]);

  const renderEventContent = (eventInfo: any) => {
    const backgroundColor =
      eventInfo.event.extendedProps.result !== null ? "#27AE60" : "#EB5757";
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            backgroundColor,
            borderRadius: "50%",
            width: "10px",
            height: "10px",
            marginRight: "5px",
          }}
        ></span>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <div
        className={`calendar-header ${
          showTodoList ? " justify-end" : "justify-between"
        }`}
      >
        {!showTodoList ? (
          <>
            <div className="calendar-title-container">
              <h1 className="calendar-title text-[30px] md:text-[32px] lg:text-[36px]">
                {currentMonth}
              </h1>

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
          <div className="flex justify-center">
            <div className="calendar-navigation">
              <button className="calendar-navigation-btn">
                <div className="text-[21.5px] text-white">none</div>
              </button>
            </div>
          </div>
        )}

        {checkSchedule ? (
          // <PrimaryBtn
          //   onClick={addEvent}
          //   py="py-1"
          //   extraContent={
          //     <img
          //       src={PlusCircle}
          //       className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
          //     />
          //   }
          // >
          //   Generate Schedule
          // </PrimaryBtn>
          <Input_form />
        ) : (
          <div className="flex justify-between">
            <PrimaryBtn
              background="#F2994A"
              onClick={addEvent}
              py="py-1"
              extraContent={
                <img
                  src={Pause}
                  className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                />
              }
            >
              Progress
            </PrimaryBtn>
            <div className="p-2 md:p-3 lg:p-4"></div>
            <PrimaryBtn
              background="#EB5757"
              onClick={addEvent}
              py="py-1"
              extraContent={
                <img
                  src={End}
                  className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                />
              }
            >
              Generate Schedule
            </PrimaryBtn>
          </div>
        )}
        {/* <div className="calendar-actions">
          <button className="action-button bg-amber-500" onClick={addEvent}>
            Add Event
          </button>
        </div> */}
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

      <div className=" overflow-auto">
        {showTodoList ? (
          <div className="todo-list todolist-container">
            <ScheduleListview />
          </div>
        ) : (
          <div className="scrollable-content">
            <FullCalendar
              key={formattedEvents.length}
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
              initialView={view}
              headerToolbar={false}
              events={formattedEvents}
              eventClick={handleEventClick}
              datesSet={handleDatesSet}
              eventContent={renderEventContent}
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
          </div>
        )}
      </div>
      {isDetailOpen && (
        <Lesson_Detail
          openQuiz={() => {
            onOpenQuiz();
          }}
          onClose={() => {
            setIsDetailOpen(false);
            // window.location.reload();
          }}
          RoadMapID={RoadMapID}
        />
      )}
      {openQuiz && (
        <QuizPopup
          RoadMapID={RoadMapID}
          onPopupResult={onPopupResult}
          onSubmit={onSubmit}
          onClose={() => {
            setopenQuiz(true);
            setLeftQuiz(true);
          }}
        />
      )}
      {showResult && (
        <Result
          quizResult={quizResult}
          onClose={() => {
            setShowResult(false);
            setIsDetailOpen(true);
          }}
        />
      )}
      {LeftQuiz && (
        <WarningAlert
          title="You left the quiz"
          message="You left the quiz without submitting your answers. Do you want to leave the quiz?"
          toastNotify={() =>
            toast.warning("You have left the quiz. Your progress may be lost!")
          }
          onClose={() => {
            setLeftQuiz(false);
            setopenQuiz(true);
          }}
          onConfirm={() => {
            setLeftQuiz(false);
            setopenQuiz(false);
            setIsDetailOpen(true);
          }}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default CustomCalendar;
