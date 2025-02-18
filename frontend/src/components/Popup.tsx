import React, { useState } from "react";
import { X } from "lucide-react";
import iconClock from "../assets/icons/tabler_clock.svg";
import iconList from "../assets/icons/uil_subject.svg";
import iconFile from "../assets/icons/tabler_file-description-filled.svg";
import iconEdit from "../assets/icons/pen.svg";

function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  function openPopup() {
    setIsOpen(true);
  }

  function closePopup() {
    setIsOpen(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Open Button */}
      {!isOpen && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          onClick={openPopup}
        >
          Click to Open
        </button>
      )}

      {/* Popup Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closePopup}
        >
          {/* Popup Container */}
          <div
            className="w-[400px] bg-white rounded-xl shadow-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <h2 className="text-lg font-semibold">React Js</h2>
              </div>
              <button className="text-gray-900 hover:text-gray-700" onClick={closePopup}>
                <X size={20} />
              </button>
            </div>

            {/* Sections */}
            <div className="mt-4 space-y-3">
              {/* Date and Time */}
              <div className="flex items-start space-x-3 text-gray-900">
                <img src={iconClock} alt="Clock Icon" className="w-5 h-5 mt-0.5" />
                <div className="text-sm">
                  <span>Saturday, February 8</span>
                  <div className="text-xs text-gray-00">6:30 AM</div>
                </div>
              </div>

              {/* Title */}
              <div className="flex items-center space-x-3 text-gray-900">
                <img src={iconList} alt="List Icon" className="w-5 h-5" />
                <span className="text-sm">Introduction to React JS</span>
              </div>

              {/* Description */}
              <div className="flex items-start space-x-3 text-gray-900">
                <img src={iconFile} alt="File Icon" className="w-5 h-5 mt-1" />
                <p className="text-sm leading-relaxed">
                  React is a JavaScript library for building interactive user interfaces. Start by
                  setting up your environment using Vite or Create React App. Learn JSX, components,
                  and props. Understand how React renders elements dynamically and how it differs
                  from traditional HTML and JavaScript in web development.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex mt-5 space-x-3">
              <button className="flex items-center justify-center w-1/2 border rounded-lg py-2 text-gray-700 hover:bg-gray-100">
                <img src={iconEdit} alt="Edit Icon" className="w-4 h-4 mr-2" /> Edit
              </button>
              <button className="w-1/2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                Make Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;
