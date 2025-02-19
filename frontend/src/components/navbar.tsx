import notificationIcon from "../assets/icons/notification.svg";
import profilePic from "../assets/images/profile.svg";
import "./Components-styles/navbar.css";

function NavBar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
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
