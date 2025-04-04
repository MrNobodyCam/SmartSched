import React, { useState, useEffect, useRef, useCallback } from "react";
import { fetchGetRequestData } from "../../service/api";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import "../Components-styles/CalendarStyles.css";
import CustomDatePicker from "./CustomDatePicker";
import LeftArrowIcon from "../../assets/icons/left_arrow.svg";
import RightArrowIcon from "../../assets/icons/right_arrow.svg";
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
import SecondaryBtn from "../SecondaryBtn";
import Play from "../../assets/icons/play.svg";

const CustomCalendar: React.FC = () => {
  const view = "dayGridMonth";
  const [currentMonth, setCurrentMonth] = useState("January 2025");
  const [showTodoList, setShowTodoList] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [RoadMapNumber, setRoadMapNumber] = useState<number>(1);
  const [ScheduleID, setScheduleID] = useState<number>(1);
  const [openQuiz, setopenQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [checkWarning, setCheckWarining] = useState(false);
  const calendarRef = useRef<FullCalendar | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [sessionRemaining, setSessionRemaining] = useState(0);
  const [events, setEvents] = useState<any[]>([]);
  const [checkSessionLimit, setCheckSessionLimit] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [procrastinate, setProcrastinate] = useState("end");
  const [procrastinateWarning, setProcrastinateWarning] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchGetRequestData(`check-schedule`, {
          id: localStorage.getItem("id"),
        });
        setProcrastinate(data?.status);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRoadmaps = async () => {
      try {
        const data = await fetchGetRequestData(`generate-schedule/roadmaps`, {
          id: localStorage.getItem("id"),
        });
        setEvents(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchcheckSessionLimit = async () => {
      try {
        const data = await fetchGetRequestData(`checkSessionLimit`, {
          id: localStorage.getItem("id"),
        });
        setCheckSessionLimit(data.session_limit);
        console.log(data.session_limit);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSessionRemaining = async () => {
      try {
        const data = await fetchGetRequestData(`checkSessionRemaining`, {
          id: localStorage.getItem("id"),
        });
        setSessionRemaining(data?.session_remaining);
        console.log(data.session_limit);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSessionRemaining();
    fetchcheckSessionLimit();
    fetchRoadmaps();
    fetch();
  }, []);

  useEffect(() => {
    if (location.pathname === "/generate-schedule/calendar") {
      setShowTodoList(false);
    } else if (location.pathname === "/generate-schedule/listview") {
      setShowTodoList(true);
    }
  }, [location.pathname]);

  // const checkSchedule = events.length > 0 ? false : true;

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

  const endCourse = () => {
    const fetch = async () => {
      try {
        const data = await fetchGetRequestData(`generate-schedule/end`, {
          id: localStorage.getItem("id"),
        });
        setEvents(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
    window.location.reload();
  };
  const procrastinateCourse = () => {
    const fetch = async () => {
      try {
        await fetchGetRequestData(`generate-schedule/procrastinate`, {
          id: localStorage.getItem("id"),
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
    window.location.reload();
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
      showTodoList
        ? "/generate-schedule/calendar"
        : "/generate-schedule/listview"
    );
  };
  const continueCourse = () => {
    const fetch = async () => {
      try {
        await fetchGetRequestData(`generate-schedule/continue`, {
          id: localStorage.getItem("id"),
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
    window.location.reload();
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
      localStorage.setItem("roadmap_number", roadmapNumber);
      setScheduleID(scheduleID);
      localStorage.setItem("schedule_id", scheduleID);
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
                className="calendar-title text-[20px] sm:text-[28px] md:text-[30px] w-60 md:w-70 lg:w-65"
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
        ) : null}

        {procrastinate == "end" ? (
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
                <div>
                  <CustomDatePicker
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                  />
                </div>
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
            <div className="flex justify-center pt-1">
              <Input_form />
            </div>
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
            <div className="flex justify-between pt-1">
              {procrastinate == "procrastinate" ? (
                <>
                  <h1 className="flex items-center mr-5 text-[14px] md:text-[16px] lg:text-[18px] font-bold">
                    {sessionRemaining}​ Study Session Remaining
                  </h1>
                  <PrimaryBtn
                    onClick={continueCourse}
                    background="#27AE60"
                    py="py-1"
                    extraContent={
                      <img
                        src={Play}
                        className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                      />
                    }
                  >
                    Continue Course
                  </PrimaryBtn>
                  {/* <PrimaryBtn
                    onClick={procrastinateCourse}
                    background="#F2994A"
                    py="py-1"
                    extraContent={
                      <img
                        src={Pause}
                        className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                      />
                    }
                  >
                    Procrastinate Course
                  </PrimaryBtn> */}
                </>
              ) : (
                <>
                  {/* <PrimaryBtn
                    onClick={procrastinateCourse}
                    background="#27AE60"
                    py="py-1"
                    extraContent={
                      <img
                        src={Play}
                        className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                      />
                    }
                  >
                    Continue Course
                  </PrimaryBtn> */}
                  <PrimaryBtn
                    onClick={() => {
                      setCheckWarining(true);
                      setProcrastinateWarning(true);
                    }}
                    background="#F2994A"
                    py="py-1"
                    extraContent={
                      <img
                        src={Pause}
                        className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                      />
                    }
                  >
                    Procrastinate Course
                  </PrimaryBtn>
                </>
              )}

              <div className="p-1 md:p-2 lg:p-3"></div>
              <PrimaryBtn
                background="#EB5757"
                onClick={endCourse}
                py="py-1"
                extraContent={
                  <img
                    src={End}
                    className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                  />
                }
              >
                End Course
              </PrimaryBtn>
            </div>
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
            // window.location.reload();
          }}
          RoadMapNumber={RoadMapNumber}
          ScheduleID={ScheduleID}
        />
      )}
      {openQuiz && (
        <QuizPopup
          ScheduleID={Number(localStorage.getItem("schedule_id"))}
          RoadMapNumber={Number(localStorage.getItem("roadmap_number"))}
          onPopupResult={onPopupResult}
          onSubmit={onSubmit}
          onClose={() => {
            setProcrastinateWarning(false);
            setopenQuiz(true);
            setCheckWarining(true);
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
      {checkWarning && (
        <WarningAlert
          title={
            procrastinateWarning
              ? "Procrastination Warning!"
              : "You left the quiz"
          }
          message={
            procrastinateWarning
              ? ` You have ${checkSessionLimit} study sessions available for procrastination. If you exceed this limit, your schedule will automatically end. Stay on track to complete your lessons successfully!`
              : "You left the quiz without submitting your answers. Do you want to leave the quiz?"
          }
          toastNotify={() =>
            toast.warning("You have left the quiz. Your progress may be lost!")
          }
          onClose={() => {
            if (procrastinateWarning) {
              setCheckWarining(false);
            } else {
              setCheckWarining(false);
              setopenQuiz(true);
            }
          }}
          onConfirm={() => {
            if (procrastinateWarning) {
              procrastinateCourse();
            } else {
              setCheckWarining(false);
              setopenQuiz(false);
              setIsDetailOpen(true);
            }
          }}
        />
      )}
      {procrastinateWarning == false && <ToastContainer />}
    </div>
  );
};

export default CustomCalendar;
