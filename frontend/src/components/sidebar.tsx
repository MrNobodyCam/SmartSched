import calendarIcon from "../assets/icons/calendar.svg";
import history from "../assets/icons/history.svg";
import service from "../assets/icons/service.svg";
import privacy from "../assets/icons/privacy.svg";
import contact from "../assets/icons/contact.svg";
import setting from "../assets/icons/setting.svg";
import logout from "../assets/icons/logout.svg";
import "./Components-styles/sidebar.css";
import NavBar from "./navbar";

function SideBar() {
  return (
    <>
      <NavBar />
      <div className="bar">
        <nav>
          <p className="menu-label">MENU</p>
          <ul>
            <li className="menu-item active">
              <img src={calendarIcon} alt="calendar" />
              <span>Calendar</span>
            </li>
            <li className="menu-item">
              <img src={history} alt="history" />
              <span>History Schedule</span>
            </li>
          </ul>
        </nav>
        <div className="footer">
          <ul>
            <li className="footer-item">
              <img src={service} alt="service" />
              <span>Terms of Service</span>
            </li>
            <li className="footer-item">
              <img src={privacy} alt="privacy" />
              <span>Privacy Policy</span>
            </li>
            <li className="footer-item">
              <img src={contact} alt="contact" />
              <span>Contact Us</span>
            </li>
            <li className="footer-item">
              <img src={setting} alt="setting" />
              <span>Settings</span>
            </li>
            <li className="log">
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
