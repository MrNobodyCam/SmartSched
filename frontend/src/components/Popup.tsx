import React, { useState } from "react";
import { ImportIcon, X } from "lucide-react";
import "./Component-style/Popup.css"; // Import external CSS
import icon1 from "../assets/icons/tabler_clock.svg";
import icon2 from "../assets/icons/tabler_file-description-filled.svg";
import icon3 from "../assets/icons/uil_subject.svg";


function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  function openPopup() {
    setIsOpen(true);
  }

  function closePopup() {
    setIsOpen(false);
  }

  return (
    <div className="container">
      {/* Open Popup Button */}
      {!isOpen && (
        <button className="open-popup-button" onClick={openPopup}>
          Click to Open
        </button>
      )}

      {/* Popup */}
      {isOpen && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-container" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="popup-header">
              <div className="popup-title">
                <div className="popup-icon"></div>
                <h2>React Js</h2>
              </div>
              <button className="popup-close" onClick={closePopup}>
                <X size={20} />
              </button>
            </div>

            {/* Date and Time */}
            <div className="popup-section">
              <span className="popup-icon-text">
                <img src={icon1} alt="icon" />
              </span>
              <span>Saturday, February 8</span>
            </div>

            {/* Title */}
            <div className="popup-section">
              <span className="popup-icon-text">
                <img src={icon2} alt="icon" />
              </span>
              <span>Introduction to React JS</span>
            </div>

            {/* Description */}
            <div className="popup-description">
              <span className="popup-icon-text">
                <img src={icon3} alt="icon" />
              </span>
              <p>
                React is a JavaScript library for building interactive user interfaces. Start by setting up your environment using Vite or Create React App. Learn JSX, components, and props. Understand how React renders elements dynamically and how it differs from traditional HTML and JavaScript in web development.
              </p>
            </div>

            {/* Buttons (Aligned Next to Each Other) */}
            <div className="popup-buttons">
              <button className="popup-edit">Edit</button>
              <button className="popup-make-quiz" onClick={() => alert("Quiz Make!")}>
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
