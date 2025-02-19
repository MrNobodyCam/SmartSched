import React, { useState } from 'react';
import { X } from 'lucide-react';

const QuizQuestionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const togglePopup = () => setIsOpen(!isOpen);

  const answers = [
    { id: 1, text: 'To create static web pages', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 2, text: 'To manage backend databases', color: 'bg-green-500 hover:bg-green-600' },
    { id: 3, text: 'To build dynamic and interactive user interfaces', color: 'bg-orange-400 hover:bg-orange-500', isCorrect: true },
    { id: 4, text: 'To replace JavaScript entirely', color: 'bg-red-500 hover:bg-red-600' }
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl relative">
            {/* Close Button */}
            <button
              onClick={togglePopup}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            {/* Content */}
            <div className="p-8">
              {/* Question Number */}
              <h2 className="text-3xl font-bold mb-6">Question 1:</h2>

              {/* Question Text */}
              <h3 className="text-2xl font-semibold mb-8 text-center">
                What is the primary purpose of React?
              </h3>

              {/* Answer Options */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                {answers.map((answer) => (
                  <button
                    key={answer.id}
                    onClick={() => setSelectedAnswer(answer.id)}
                    className={`${answer.color} text-white p-4 rounded-xl text-lg font-medium transition-all
                      ${selectedAnswer === answer.id ? 'ring-4 ring-blue-200' : ''}
                      ${answer.id === 3 ? 'ring-2 ring-orange-500' : ''}`}
                  >
                    {answer.text}
                  </button>
                ))}
              </div>

              {/* Next Question Button */}
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-6 py-3 text-blue-500 rounded-xl border-2 border-blue-500 hover:bg-blue-50 font-medium">
                  Next Question
                  <span className="text-xl">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizQuestionPopup;