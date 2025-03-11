import { useEffect, useState } from "react";
import { fetchGetData } from "../../service/api";
import Lesson_Detail from "../Quiz/Lesson_Detail";
import QuizPopup from "../Quiz/Quiz";
import Result from "../Quiz/Result";
import WarningAlert from "../Alert/WarningAlert";
import { toast, ToastContainer } from "react-toastify";
import "../../index.css"; // Ensure this file imports the global styles including fonts
import Box from "../../assets/icons/box.svg";

const CourseScheduleViewer = () => {
  const [roadmapData, setRoadmapData] = useState<any[]>([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [RoadMapID, setRoadMapID] = useState<number>(1);
  const [openQuiz, setopenQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [LeftQuiz, setLeftQuiz] = useState(false);
  useEffect(() => {
    if (isDetailOpen || openQuiz) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDetailOpen, openQuiz]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchGetData(`generate-schedule/roadmaps`);
        setRoadmapData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  type Lesson = {
    id: number;
    title: string;
    lesson: string;
    description: string;
    date: string;
    start_time: string;
    end_time: string;
    result: number | null;
  };

  type ScheduleData = {
    date: string;
    lessons: Lesson[];
  }[];

  const scheduleData: ScheduleData = roadmapData.reduce<ScheduleData>(
    (acc, lesson) => {
      const existingDate = acc.find((entry) => entry.date === lesson.date);
      if (existingDate) {
        existingDate.lessons.push(lesson);
      } else {
        acc.push({ date: lesson.date, lessons: [lesson] });
      }
      return acc;
    },
    []
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const togglePopup = () => {
    setIsDetailOpen(!isDetailOpen);
  };

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
  return (
    <>
      <div
        className="bg-white font-sans w-full h-screen max-w-full mx-auto flex flex-col overflow-hidden"
        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <div className="bg-[#FFFFFF] flex-1 overflow-hidden rounded-xl">
          <div className="overflow-y-auto h-full">
            {roadmapData.length > 0 ? (
              scheduleData.map((day, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-xl mb-8">
                  <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold py-2 border-b border-gray-300 mb-4">
                    {formatDate(day.date)}
                  </h2>
                  <div className="space-y-4 pt-5 pb-5">
                    {day.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden relative hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          togglePopup();
                          setRoadMapID(lesson.id);
                        }}
                      >
                        <div className="flex">
                          <div
                            className={`w-2.5 ${
                              lesson.result !== null
                                ? "bg-[#27AE60]"
                                : "bg-[#EB5757]"
                            }`}
                          ></div>
                          <div className="p-4 w-full">
                            <h3 className="font-semibold text-[20px] md:text-[22px] lg:text-[24px]">
                              {lesson.title}
                            </h3>
                            <p className="text-gray-500 text-[14px] md:text-[16px] lg:text-[18px] mb-2">
                              {`Time: ${formatTime(
                                lesson.start_time
                              )} - ${formatTime(lesson.end_time)}`}
                            </p>
                            <p className="text-gray-700 text-[14px] md:text-[16px] lg:text-[18px]">
                              <span className="font-bold">
                                {lesson.lesson}:{" "}
                              </span>
                              {truncateText(lesson.description, 120)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <img
                  src={Box}
                  alt="icon"
                  className="w-[50px] md:w-[60px] lg:w-[70px] mb-2 md:mb-3 lg:mb-4"
                />
                <p className="text-center w-[60%] text-[14px] md:text-[16px] lg:text-[18px] font-semibold text-[#A5A5A5]">
                  No study schedule generated yet. Click 'Generate Schedule' to
                  create your personalized study plan!
                </p>
              </div>
            )}
          </div>
        </div>
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
    </>
  );
};

export default CourseScheduleViewer;
