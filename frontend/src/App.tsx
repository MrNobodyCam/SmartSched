import { useState } from "react";
import Lesson_Detail from "./components/Quiz/Lesson_Detail";
import QuizPopup from "./components/Quiz/Quiz";
import Result from "./components/Quiz/Result";
function App() {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [RoadMapID, setRoadMapID] = useState(1);
  const [openQuiz, setopenQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);

  // const onShowResult = () => {
  //   setopenQuiz(false);
  //   setShowResult(true);
  // };
  const togglePopup = () => {
    setRoadMapID(1);
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
            setopenQuiz(false);
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
    </>
  );
}

export default App;
