import React, { useState, useEffect, useRef, useCallback } from "react";
import { fetchPostData } from "../../service/api";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import "../Components-styles/CalendarStyles.css";
import CustomDatePicker from "../Schedule_create/CustomDatePicker";
import LeftArrowIcon from "../../assets/icons/left_arrow.svg";
import RightArrowIcon from "../../assets/icons/right_arrow.svg";
import WarningAlert from "../Alert/WarningAlert";
import { toast, ToastContainer } from "react-toastify";
import Result from "../Quiz/Result";
import QuizPopup from "../Quiz/Quiz";
import Lesson_Detail from "../Quiz/Lesson_Detail";
import { useNavigate, useLocation } from "react-router-dom";
import SecondaryBtn from "../SecondaryBtn";
import HistoryCourseScheduleViewer from "./History_schedule_create";
import { useParams } from "react-router-dom";

const HistoryCustomCalendar: React.FC = () => {
  const { id } = useParams();
  const view = "dayGridMonth";
  const [currentMonth, setCurrentMonth] = useState("January 2025");
  const [showTodoList, setShowTodoList] = useState(false);
  const [ScheduleID, setScheduleID] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [RoadMapNumber, setRoadMapNumber] = useState<number>(1);
  const [openQuiz, setopenQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [LeftQuiz, setLeftQuiz] = useState(false);
  const calendarRef = useRef<FullCalendar | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [startRoadmapDate, setStartRoadmapDate] = useState<Date | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchPostData(`history`, {
          schedule_number: id,
        });
        setEvents(data);
        console.log(data);

        if (data.length > 0) {
          const firstRoadmapDate = new Date(data[0].date);
          setStartRoadmapDate(firstRoadmapDate);
        }
      } catch (error) {
        navigate("notfound");
      }
    };

    fetch();
  }, [id]);

  useEffect(() => {
    if (location.pathname === "/history/calendar/" + id) {
      setShowTodoList(false);
    } else if (location.pathname === "/history/listview/" + id) {
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

  // Handle moveing the FullCalendar to the current date when clicked
  const handleToday = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().today();
      setSelectedDate(new Date());
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

  const toggleTodoList = () => {
    setShowTodoList((prev) => !prev);
    navigate(
      showTodoList ? "/history/calendar/" + id : "/history/listview/" + id
    );
  };

  const formattedEvents = events.map((event) => ({
    title: event.title,
    start: event.date ? `${event.date}T${event.start_time}` : event.date,
    end: event.date ? `${event.date}T${event.end_time}` : undefined,
    extendedProps: {
      roadmap_number: event.roadmap_number, // Include roadmap_number here
      schedule_id: event.schedule_id, // Include schedule_id here
      description: event.description,
      result: event.result,
    },
  }));

  const handleEventClick = useCallback(
    ({ event }: { event: any; jsEvent: MouseEvent }) => {
      setIsDetailOpen(true);

      const roadmapNumber = event.extendedProps.roadmap_number;
      const scheduleID = event.extendedProps.schedule_id;

      setRoadMapNumber(roadmapNumber);
      setScheduleID(scheduleID);
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
          overflow: "hidden", // Ensure the container doesn't overflow
        }}
      >
        {/* Status Indicator */}
        <span
          style={{
            backgroundColor,
            borderRadius: "50%",
            width: "10px", // Fixed width
            height: "10px", // Fixed height
            flexShrink: 0, // Prevent shrinking
            marginRight: "5px",
          }}
        ></span>

        {/* Event Time */}
        <p style={{ marginRight: "5px", whiteSpace: "nowrap" }}>
          {eventInfo.timeText}
        </p>

        {/* Event Title */}
        <b
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "150px", // Limit the width of the title
          }}
        >
          {eventInfo.event.title}
        </b>
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <div
        className={`calendar-header ${
          showTodoList ? " justify-end" : "justify-center md:justify-between"
        }`}
      >
        {!showTodoList ? (
          <>
            <div className="calendar-title-container hidden sm:flex md:flex">
              <h1
                className="calendar-title text-[20px] sm:text-[28px] md:text-[30px]  w-60 md:w-70 lg:w-65"
                style={{ marginRight: "15px" }}
              >
                {currentMonth}
              </h1>

              <SecondaryBtn
                borderColor="#2196f3"
                color="#2196f3"
                onClick={handleToday}
                children="Today"
                px="px-4"
                py="py-1"
              />

              <div className="hidden md:flex lg:flex">
                <button
                  className="calendar-navigation-btn w-[30px] mx-4 cursor-pointer"
                  onClick={handlePrevMonth}
                >
                  <img src={LeftArrowIcon} alt="back button" />
                </button>
                <button
                  className="calendar-navigation-btn w-[30px] mr-4 cursor-pointer"
                  onClick={handleNextMonth}
                >
                  <img src={RightArrowIcon} alt="next button" />
                </button>
              </div>
            </div>

            {/* <div className="hidden md:flex lg:flex">
              <button
                className="calendar-navigation-btn w-[30px] mx-4 cursor-pointer"
                onClick={handlePrevMonth}
              >
                <img src={LeftArrowIcon} alt="back button" />
              </button>
              <button
                className="calendar-navigation-btn w-[30px] mr-[15px] cursor-pointer"
                onClick={handleNextMonth}
              >
                <img src={RightArrowIcon} alt="next button" />
              </button>
            </div> */}

            <div className="calendar-navigation hidden md:flex lg:flex">
              {/* <button
                className="calendar-navigation-btn w-[30px] mr-[15px] cursor-pointer"
                onClick={handlePrevMonth}
              >
                <img src={LeftArrowIcon} alt="back button" />
              </button>
              <button
                className="calendar-navigation-btn w-[30px] mr-[15px] cursor-pointer"
                onClick={handleNextMonth}
              >
                <img src={RightArrowIcon} alt="next button" />
              </button> */}
              <CustomDatePicker
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
              />
            </div>
          </>
        ) : (
          <div className="flex justify-center">
            <div className="calendar-navigation">
              <div className=" text-white py-[5.5px] sm:py-[10.5px] cursor-default">
                none
              </div>
            </div>
          </div>
        )}

        {checkSchedule ? (
          <div className="flex flex-col justify-center">
            {showTodoList ? null : (
              <div className="calendar-navigation flex md:hidden">
                <button
                  className="calendar-navigation-btn w-[30px] mr-4 cursor-pointer"
                  onClick={handlePrevMonth}
                >
                  <img src={LeftArrowIcon} alt="back button" />
                </button>

                <button
                  className="calendar-navigation-btn w-[30px] mr-8 cursor-pointer"
                  onClick={handleNextMonth}
                >
                  <img src={RightArrowIcon} alt="next button" />
                </button>
                <CustomDatePicker
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                />
                <SecondaryBtn
                  borderColor="#2196f3"
                  color="#2196f3"
                  onClick={handleToday}
                  children="Today"
                  px="px-4"
                  py="py-1"
                  style="flex sm:hidden"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-center">
            {showTodoList ? null : (
              <div className="calendar-navigation flex md:hidden">
                <button
                  className="calendar-navigation-btn w-[30px] mr-4 cursor-pointer"
                  onClick={handlePrevMonth}
                >
                  <img src={LeftArrowIcon} alt="back button" />
                </button>

                <button
                  className="calendar-navigation-btn w-[30px] mr-8 cursor-pointer"
                  onClick={handleNextMonth}
                >
                  <img src={RightArrowIcon} alt="next button" />
                </button>

                <CustomDatePicker
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                />
                <SecondaryBtn
                  borderColor="#2196f3"
                  color="#2196f3"
                  onClick={handleToday}
                  children="Today"
                  px="px-4"
                  py="py-1"
                  style="flex sm:hidden"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="view-toggle-container">
        <span className="view-label text-[14px] md:text-[16px] lg:text-[18px]">
          To-Do List
        </span>
        <label className="switch mx-2">
          <input
            type="checkbox"
            checked={!showTodoList}
            onChange={toggleTodoList}
          />
          <span className="slider round"></span>
        </label>
        <span className="view-label text-[14px] md:text-[16px] lg:text-[18px]">
          Calendar
        </span>
      </div>

      <div className=" overflow-auto">
        {showTodoList ? (
          <div className="todo-list todolist-container">
            <HistoryCourseScheduleViewer ScheduleId={id || ""} />
          </div>
        ) : (
          <div className="scrollable-content">
            <FullCalendar
              key={formattedEvents.length}
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
              initialView={view}
              initialDate={
                startRoadmapDate
                  ? startRoadmapDate.toISOString().split("T")[0]
                  : new Date().toISOString().split("T")[0]
              }
              headerToolbar={false}
              events={formattedEvents}
              eventClick={handleEventClick}
              datesSet={handleDatesSet}
              eventContent={renderEventContent}
              dayMaxEventRows={3}
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
            window.location.reload();
          }}
          RoadMapNumber={RoadMapNumber}
          ScheduleID={ScheduleID}
        />
      )}
      {openQuiz && (
        <QuizPopup
          RoadMapNumber={RoadMapNumber}
          ScheduleID={ScheduleID}
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

export default HistoryCustomCalendar;
