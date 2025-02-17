import notificationIcon from "../assets/icons/notification.svg";
import profilePic from "../assets/images/profile.svg";
import "./Components-styles/navbar.css";

function NavBar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1 className="brand-name">SmartSched</h1>
      </div>
      <div className="navbar-right">
        <div className="notification">
          <img
            src={notificationIcon}
            alt="Notifications"
            className="notification-icon"
          />
          <span className="notification-badge">10+</span>
        </div>
        <div className="profile">
          <img src={profilePic} alt="Profile" className="profile-pic" />
        </div>
      </div>
    </header>
  );
}

export default NavBar;
