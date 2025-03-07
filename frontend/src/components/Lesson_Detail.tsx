import React, { useState } from "react";
import { X, Clock, Menu, FileText } from "lucide-react";
import Pen from "../assets/icons/pen.svg";

const PopupComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => setIsOpen(!isOpen);

  return (
    <div className="p-4">
      {/* Trigger Button */}
      <button
        onClick={togglePopup}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
      >
        Open Popup
      </button>

      {/* Popup Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          {/* Popup Content */}
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
            {/* Close Button */}
            <button
              onClick={togglePopup}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            {/* Content */}
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-red-400 rounded-lg" />
                <h2 className="text-2xl font-bold">React Js</h2>
              </div>

              {/* Time */}
              <div className="flex items-center gap-3 text-gray-600 mb-4">
                <Clock size={20} />
                <span>Saturday, February 8</span>
                <span className="text-sm">6:30am</span>
              </div>

              {/* Title */}
              <div className="flex items-center gap-3 text-gray-600 mb-4">
                <Menu size={20} />
                <span className="text-lg">Introduction to React JS</span>
              </div>

              {/* Description */}
              <div className="flex gap-3 text-gray-600 mb-6">
                <FileText size={20} className="flex-shrink-0" />
                <p className="text-sm">
                  React is a JavaScript library for building interactive user
                  interfaces. Start by setting up your environment using Vite or
                  Create React App. Learn JSX, components, and props. Understand
                  how React renders elements dynamically and how it differs from
                  traditional HTML and JavaScript in web development.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-end">
                <button className="flex items-center gap-2 px-4 py-2 text-orange-500 rounded-md hover:bg-orange-50">
                  <img src={Pen} alt="" />
                  Edit
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Make Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupComponent;
