import { useState } from "react";
import Lesson_Detail from "./Lesson_Detail";
import QuizPopup from "./Quiz";
import Result from "./Result";
import WarningAlert from "../Alert/WarningAlert";
import { toast, ToastContainer } from "react-toastify";
function CallDetail({ RoadmapID }: { RoadmapID: number }) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [RoadMapID, setRoadMapID] = useState(1);
  const [openQuiz, setopenQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [LeftQuiz, setLeftQuiz] = useState(false);

  // const onShowResult = () => {
  //   setopenQuiz(false);
  //   setShowResult(true);
  // };
  const togglePopup = () => {
    setRoadMapID(RoadmapID);
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
      <button
        onClick={() => {
          togglePopup();
        }}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors cursor-pointer"
      >
        Open Popup
      </button>{" "}
      <br />
      <br />
      {/* <Result quizResult={}></Result> */}
      {/* <button
        onClick={onLoading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors cursor-pointer"
      >
        Loading
      </button> */}
      {isDetailOpen && (
        <Lesson_Detail
          openQuiz={() => {
            onOpenQuiz();
          }}
          onClose={() => {
            setIsDetailOpen(false);
          }}
          RoadMapID={RoadMapID}
        />
      )}
      {openQuiz && (
        <QuizPopup
          RoadMapID={RoadMapID}
          onPopupResult={() => {
            onPopupResult();
          }}
          onSubmit={(result) => {
            onSubmit(result);
          }}
          // Question={() => {
          //   return "What is the capital of India?";
          // }}
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
}

export default CallDetail;
