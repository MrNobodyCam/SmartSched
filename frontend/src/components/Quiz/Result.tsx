import { X } from "react-feather";
const Result = ({
  onClose,
  quizResult,
}: {
  onClose(): void;
  quizResult: { quizData: any; score: number };
}) => {
  return (
    <div className="p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        {/* Popup Content */}
        <div className="bg-white rounded-lg shadow-lg h-[80%] w-[80%] md:w-[70%] lg:w-[60%] relative p-7">
          {/* Close Button */}
          <button className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
            <X
              size={24}
              color="black"
              className="cursor-pointer"
              onClick={onClose}
            />
          </button>

          {/* Content */}
          <h1 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold text-center">
            Result
          </h1>
          <h2 className="text-[16px] md:text-[18px] lg:text-[20px] text-center text-[#27AE60]">
            You have scored {quizResult?.score} out of 10 questions.
          </h2>
          <div id="scroll" className="overflow-y-auto h-[80%] mt-4">
            {quizResult.quizData.map((quiz: any, index: number) => (
              <div key={index} className="mt-4">
                <p className="text-[14px] md:text-[16px] lg:text-[18px]">
                  <span className="font-bold text-[#2D9CDB]">
                    Question {index + 1}
                  </span>
                  : {quiz.question}
                </p>
                <p className="text-[14px] md:text-[16px] lg:text-[18px]">
                  <span className="font-bold">Answer</span>:{" "}
                  {quiz["multi-answer"].find(
                    (answer: any) => answer.is_correct === true
                  )?.answer || "No correct answer found"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
