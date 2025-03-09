import { useEffect, useState } from "react";
import { X } from "lucide-react";
import SecondaryBtn from "../SecondaryBtn";
import { fetchPostData, fetchUpdateData } from "../../service/api";
import PrimaryBtn from "../PrimaryBtn";
import Loading from "../Alert/Loading";

const QuizPopup = ({
  onClose,
  onPopupResult,
  onSubmit,
  RoadMapID,
}: // Question,
{
  RoadMapID: number;
  onClose(): void;
  onPopupResult(): void;
  onSubmit(result: any): void;
  // Question(): String;
}) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizData, setQuizData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [QuizzID, setQuizzID] = useState(1);
  const [score, setScore] = useState(0);
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPostData(`generatequizz`, {
          roadmap_id: RoadMapID,
        });
        setQuizData(data.quiz);
        // console.log(data.quiz); // Log the correct data
      } catch (error) {
        setError((error as any).message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);
  const currentQuiz = quizData ? quizData[QuizzID - 1] : null;
  const option = currentQuiz?.["multi-answer"] || [];
  const correctAnswer = () => {
    for (let i = 0; i < option.length; i++) {
      if (option[i].is_correct === true) {
        return option[i]?.answer;
      }
    }
    return "No correct answer found";
  };
  const onClickNext = () => {
    if (selectedAnswer === correctAnswer()) {
      setScore((prev) => {
        const newScore = prev + 1;
        console.log(newScore);
        return newScore;
      });
    }
    setQuizzID((prev) => Math.min(prev + 1, 10));
    setSelectedAnswer(null);
  };
  const updateScore = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchUpdateData(`roadmap/score/${RoadMapID}`, {
        score: score,
      });
      console.log(data);
    } catch (error) {
      setError((error as any).message);
    } finally {
      setLoading(false);
    }
  };
  const onShowResult = () => {
    onSubmit({ quizData, score });
  };

  // const onClickPrevious = () => {
  //   setQuizzID((prev) => Math.max(prev - 1, 1));
  // };
  const options = [
    {
      text: option[0]?.answer || "Fail Load Data",
      bgColor:
        "bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600",
    },
    {
      text: option[1]?.answer || "Fail Load Data",
      bgColor:
        "bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600",
    },
    {
      text: option[2]?.answer || "Fail Load Data",
      bgColor:
        "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600",
    },
    {
      text: option[3]?.answer || "Fail Load Data",
      bgColor:
        "bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600",
    },
  ];
  if (loading) {
    return <Loading text="Generating your quiz... Please wait ⏳" />;
  }
  {
    error && alert(error);
  }
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl animate-fade-in">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <span className="text-blue-600 font-semibold text-[14px] md:text-[16px] lg:text-[18px]">
                  Q{QuizzID}
                </span>
              </div>
            </div>
            <X
              size={24}
              className="cursor-pointer"
              onClick={() => {
                onClose();
              }}
            />
          </div>
          <div className="space-y-8">
            <div className="text-center">
              <h3 className=" font-bold text-gray-800 mb-2 text-[20px] md:text-[22px] lg:text-[24px]">
                Question {QuizzID}:
              </h3>
              <p className=" text-gray-600 text-[16px] md:text-[18px] lg:text-[20px]">
                {currentQuiz?.question}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(option.text)}
                  className={`${
                    option.bgColor
                  } cursor-pointer text-white p-4 rounded-xl text-center transition-all transform hover:-translate-y-0.5 hover:shadow-lg text-[14px] md:text-[16px] lg:text-[18px] ${
                    selectedAnswer === option.text
                      ? "ring-4 ring-blue-200 shadow-lg scale-[1.02]"
                      : ""
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-10">
              {/* <PrimaryBtn py="py-1">Submit Quiz</PrimaryBtn> */}
              {/* {QuizzID > 1 && (
                <SecondaryBtn
                  onClick={onClickPrevious}
                  py="py-1 mr-2"
                  borderColor="#A5A5A5"
                  color="#A5A5A5"
                  extraContent={
                    <svg
                      className="w-[18px] md:w-[20px] lg:w-[22px] h-[18px] md:h-[20px] lg:h-[22px]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  }
                >
                  Previous Question
                </SecondaryBtn>
              )} */}
              {QuizzID >= 10 && (
                <PrimaryBtn
                  py="py-1"
                  onClick={() => {
                    onClickNext();
                    updateScore();
                    onShowResult();
                    onPopupResult();
                  }}
                >
                  Submit Quiz
                </PrimaryBtn>
              )}
              {QuizzID < 10 && (
                <SecondaryBtn
                  onClick={onClickNext}
                  py="py-1"
                  extraContent_Right={
                    <svg
                      className="w-[18px] md:w-[20px] lg:w-[22px] h-[18px] md:h-[20px] lg:h-[22px]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  }
                >
                  Next Question
                </SecondaryBtn>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPopup;
