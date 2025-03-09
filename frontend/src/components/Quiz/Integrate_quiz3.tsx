import React, { useState } from "react";
import { X } from "lucide-react";

const QuizQuestionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const togglePopup = () => setIsOpen(!isOpen);

  const options = [
    {
      text: "To create static web pages",
      bgColor:
        "bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600",
    },
    {
      text: "To manage backend databases",
      bgColor:
        "bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600",
    },
    {
      text: "To build dynamic and interactive user interfaces",
      bgColor:
        "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600",
    },
    {
      text: "To replace JavaScript entirely",
      bgColor:
        "bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600",
    },
  ];

  return (
    <div className="p-4">
      <button
        onClick={togglePopup}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
      >
        Open Quiz
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl animate-fade-in">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <span className="text-blue-600 font-semibold">Q1</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Quiz 1</h2>
                </div>
                <button
                  onClick={togglePopup}
                  className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-200"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Question 1:
                  </h3>
                  <p className="text-xl text-gray-600">
                    What is the primary purpose of React?
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAnswer(option.text)}
                      className={`${
                        option.bgColor
                      } text-white p-4 rounded-xl text-center transition-all transform hover:-translate-y-0.5 hover:shadow-lg ${
                        selectedAnswer === option.text
                          ? "ring-4 ring-blue-200 shadow-lg scale-[1.02]"
                          : ""
                      }`}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button className="px-6 py-3 text-gray-600 rounded-xl border border-gray-300 hover:bg-gray-50 font-medium">
                    Previous Question
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 text-blue-500 rounded-xl border-2 border-blue-500 hover:bg-blue-50 font-medium">
                    Next Question
                    <span className="text-xl">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizQuestionPopup;
