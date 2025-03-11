import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
import Lesson_Detail from "./Lesson_Detail";
import QuizPopup from "./Quiz";
import Result from "./Result";
import WarningAlert from "../Alert/WarningAlert";
import { toast, ToastContainer } from "react-toastify";

function CallDetail() {
  const { RoadMapID } = useParams<{ RoadMapID: string }>();
  const roadMapID = RoadMapID ? parseInt(RoadMapID) : null;
  const navigate = useNavigate();

  const [isDetailOpen, setIsDetailOpen] = useState(true);
  const [openQuiz, setopenQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [LeftQuiz, setLeftQuiz] = useState(false);

  useEffect(() => {
    if (roadMapID) {
      setIsDetailOpen(true);
    }
  }, [roadMapID]);

  // const togglePopup = () => {
  //   setIsDetailOpen(!isDetailOpen);
  // };

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

  const initialData = [
    {
      id: 1,
      title: "Introduction to Logic",
      freeTime: "11:20AM - 03:20PM",
    },
    {
      id: 2,
      title: "Introduction to React Js",
      freeTime: "11:20AM - 03:20PM",
    },
    {
      id: 3,
      title: "Introduction to Laravel",
      freeTime: "10:00AM - 12:00PM",
    },
    {
      id: 4,
      title: "Introduction to Vue JS",
      freeTime: "01:00PM - 03:00PM",
    },
    {
      id: 5,
      title: "Introduction to Angular",
      freeTime: "09:00AM - 11:00AM",
    },
    {
      id: 6,
      title: "Introduction to Node JS",
      freeTime: "02:00PM - 04:00PM",
    },
    {
      id: 7,
      title: "Introduction to Python",
      freeTime: "10:00AM - 12:00PM",
    },
    {
      id: 8,
      title: "Introduction to Java",
      freeTime: "01:00PM - 03:00PM",
    },
    {
      id: 9,
      title: "Introduction to C#",
      freeTime: "09:00AM - 11:00AM",
    },
    {
      id: 10,
      title: "Introduction to PHP",
      freeTime: "02:00PM - 04:00PM",
    },
  ];

  if (roadMapID) {
    return (
      <>
        {isDetailOpen && (
          <Lesson_Detail
            openQuiz={onOpenQuiz}
            onClose={() => {
              setIsDetailOpen(false);
              navigate("/generate-schedule");
            }}
            RoadMapID={roadMapID}
          />
        )}
        {openQuiz && (
          <QuizPopup
            RoadMapID={roadMapID}
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
              toast.warning(
                "You have left the quiz. Your progress may be lost!"
              )
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
  }

  return (
    <>
      {initialData.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center justify-center gap-2 mb-3"
        >
          <div className="bg-red-300 w-[20%] h-[20%] rounded-lg p-3">
            <h1 className="text-2xl font-bold text-black">{item.title}</h1>
            <p className="text-lg text-black">{item.freeTime}</p>
            <button
              onClick={() => navigate(`/generate-schedule/roadmap/${item.id}`)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
            >
              See more
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default CallDetail;
