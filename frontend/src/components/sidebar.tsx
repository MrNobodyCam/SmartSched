import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import calendarIcon from "../assets/icons/calendar.svg";
import history from "../assets/icons/history.svg";
import contact from "../assets/icons/contact.svg";
import setting from "../assets/icons/setting.svg";
import logout from "../assets/icons/logout.svg";
import music from "../assets/icons/music.svg";

interface SideBarProps {
  isOpen: boolean; // Controls whether the sidebar is open or closed
  onScreenChange: (screen: string) => void;
  toggleSidebar: () => void; // Toggles the sidebar's open state
}

const MenuItem: React.FC<{
  icon: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
  isOpen: boolean;
}> = ({ icon, label, isSelected, onClick, isOpen }) => (
  <li
    className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer ${
      isSelected
        ? "bg-[rgb(45,156,219)] text-white h-12 font-bold"
        : "hover:bg-[rgb(45,156,219)] hover:text-white h-12"
    } transition-all duration-300 ease-in-out`}
    onClick={onClick}
  >
    {/* Icon */}
    <img
      src={icon}
      alt={label.toLowerCase()}
      className={`w-6 h-6 flex-shrink-0 ${isSelected ? "filter invert" : ""}`}
    />
    {/* Label */}
    <span
      className={`ml-2 text-[14px] md:text-[16px] lg:text-[18px] truncate ${
        isOpen
          ? "inline opacity-100"
          : "hidden md:group-hover:inline opacity-0 md:group-hover:opacity-100"
      } transition whitespace-nowrap overflow-hidden ${
        isSelected ? "text-white" : "text-black"
      }`}
    >
      {label}
    </span>
  </li>
);

const SideBar: React.FC<SideBarProps> = ({
  isOpen,
  onScreenChange,
  toggleSidebar,
}) => {
  const [selectedItem, setSelectedItem] = React.useState(
    localStorage.getItem("selectedItem") || "calendar"
  );
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    localStorage.setItem("selectedItem", selectedItem);
  }, [selectedItem]);

  const handleItemClick = (item: string) => {
    if (item === "logout") {
      // Perform logout logic here (e.g., clearing tokens, etc.)
      navigate("/landing"); // Redirect to the landing page
    } else {
      setSelectedItem(item);
      onScreenChange(item);
      if (isOpen) setTimeout(toggleSidebar, 300); // Delay closing the sidebar to match the animation duration
    }
  };

  return (
    <div
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] ${
        isOpen ? "w-64" : "w-0 md:w-19"
      } bg-[#D5F0FF] duration-300 overflow-hidden group z-50 md:hover:w-64`}
    >
      <nav className="p-3 h-full flex flex-col justify-between">
        {/* Main Menu */}
        <div>
          <ul>
            <Link to="/generate-schedule/calendar">
              <MenuItem
                icon={calendarIcon}
                label="Calendar"
                isSelected={selectedItem === "calendar"}
                onClick={() => handleItemClick("calendar")}
                isOpen={isOpen}
              />
            </Link>
            <Link to="/history">
              <MenuItem
                icon={history}
                label="History Schedule"
                isSelected={selectedItem === "history"}
                onClick={() => handleItemClick("history")}
                isOpen={isOpen}
              />
            </Link>
            <Link to="/music">
              <MenuItem
                icon={music}
                label="Music Playlist"
                isSelected={selectedItem === "music"}
                onClick={() => handleItemClick("music")}
                isOpen={isOpen}
              />
            </Link>
          </ul>
        </div>

        {/* Secondary Menu */}
        <div>
          <ul>
            <Link to="/contactus">
              <MenuItem
                icon={contact}
                label="Contact Us"
                isSelected={selectedItem === "contact"}
                onClick={() => handleItemClick("contact")}
                isOpen={isOpen}
              />
            </Link>
            <Link to="/setting">
              <MenuItem
                icon={setting}
                label="Settings"
                isSelected={selectedItem === "setting"}
                onClick={() => handleItemClick("setting")}
                isOpen={isOpen}
              />
            </Link>
          </ul>

          {/* Custom Logout Button */}
          <button
            className="flex items-center p-2 mt-4 rounded-lg w-full bg-[rgb(45,156,219)] cursor-pointer text-white transition duration-300 ease-in-out h-12"
            onClick={() => {
              localStorage.clear();
              handleItemClick("logout");
            }}
          >
            {/* Icon */}
            <img src={logout} alt="logout" className="w-6 h-6 flex-shrink-0" />
            {/* Label */}
            <span
              className={`pl-30 ml-2 text-[14px] md:text-[16px] lg:text-[18px] truncate ${
                isOpen
                  ? "inline opacity-100"
                  : "hidden md:group-hover:inline opacity-0 md:group-hover:opacity-100"
              } transition duration-300 ease-in-out delay-100 whitespace-nowrap overflow-hidden`}
            >
              Logout
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
