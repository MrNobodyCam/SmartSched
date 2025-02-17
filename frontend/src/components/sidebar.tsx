import React, { useState } from "react";
import calendarIcon from "../assets/icons/calendar.svg";
import history from "../assets/icons/history.svg";
import service from "../assets/icons/service.svg";
import privacy from "../assets/icons/privacy.svg";
import contact from "../assets/icons/contact.svg";
import setting from "../assets/icons/setting.svg";
import logout from "../assets/icons/logout.svg";
import "./Components-styles/sidebar.css";
import NavBar from "./navbar";
import "tailwindcss";

function SideBar() {
  const [selectedItem, setSelectedItem] = useState("calendar");

  const handleItemClick = (item: React.SetStateAction<string>) => {
    setSelectedItem(item);
  };

  return (
    <>
      <NavBar />
      <div className="bar">
        <nav>
          <p className="menu-label">MENU</p>
          <ul>
            <li
              className={`menu-item ${
                selectedItem === "calendar" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("calendar")}
            >
              <img src={calendarIcon} alt="calendar" />
              <span>Calendar</span>
            </li>
            <br />
            <li
              className={`menu-item ${
                selectedItem === "history" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("history")}
            >
              <img src={history} alt="history" />
              <span>History Schedule</span>
            </li>
          </ul>
        </nav>
        <div className="footer">
          <ul>
            <li
              className={`footer-item ${
                selectedItem === "service" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("service")}
            >
              <img src={service} alt="service" />
              <span>Terms of Service</span>
            </li>
            <br />
            <li
              className={`footer-item ${
                selectedItem === "privacy" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("privacy")}
            >
              <img src={privacy} alt="privacy" />
              <span>Privacy Policy</span>
            </li>
            <br />
            <li
              className={`footer-item ${
                selectedItem === "contact" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("contact")}
            >
              <img src={contact} alt="contact" />
              <span>Contact Us</span>
            </li>
            <br />
            <li
              className={`footer-item ${
                selectedItem === "setting" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("setting")}
            >
              <img src={setting} alt="setting" />
              <span>Settings</span>
            </li>
            <br />
            <li
              className={`log ${selectedItem === "logout" ? "selected" : ""}`}
              onClick={() => handleItemClick("logout")}
            >
              <img src={logout} alt="logout" />
              <span className="text">Log out</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideBar;
