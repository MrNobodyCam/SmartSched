import React from "react";
import calendarIcon from "../assets/icons/calendar.svg";
import history from "../assets/icons/history.svg";
import service from "../assets/icons/service.svg";
import privacy from "../assets/icons/privacy.svg";
import contact from "../assets/icons/contact.svg";
import setting from "../assets/icons/setting.svg";
import logout from "../assets/icons/logout.svg";

interface SideBarProps {
  isOpen: boolean;
  onScreenChange: (screen: string) => void;
  toggleSidebar: () => void;
}

const MenuItem: React.FC<{
  icon: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
  isOpen: boolean;
}> = ({ icon, label, isSelected, onClick, isOpen }) => (
  <li
    className={`flex items-center p-2 mb-2 rounded-lg   ${
      isSelected
        ? "bg-[rgb(45,156,219)] text-white"
        : "hover:bg-[#D26310] hover:invert "
    }`}
    onClick={onClick}
  >
    <img
      src={icon}
      alt={label.toLowerCase()}
      className={`w-6 h-6 hover:icon-white ${
        isSelected ? "filter invert" : ""
      }  `}
    />
    <span
      className={`ml-2 text-sm  ${
        isOpen ? "inline" : "hidden"
      } md:group-hover:inline`}
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
  const [selectedItem, setSelectedItem] = React.useState("calendar");

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onScreenChange(item);
    toggleSidebar(); // Close the sidebar after selecting an item
  };

  return (
    <div
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] ${
        isOpen ? "w-68" : "w-16"
      } md:hover:w-64 bg-[#D5F0FF] overflow-hidden group z-50`}
    >
      <nav className="p-3 h-full flex flex-col justify-between">
        {/* Main Menu */}
        <div>
          <p className="font-bold uppercase text-gray-500 text-xs mb-4">MENU</p>
          <ul>
            <MenuItem
              icon={calendarIcon}
              label="Calendar"
              isSelected={selectedItem === "calendar"}
              onClick={() => handleItemClick("calendar")}
              isOpen={isOpen}
            />
            <MenuItem
              icon={history}
              label="History Schedule"
              isSelected={selectedItem === "history"}
              onClick={() => handleItemClick("history")}
              isOpen={isOpen}
            />
          </ul>
        </div>

        {/* Secondary Menu */}
        <div>
          <ul>
            <MenuItem
              icon={service}
              label="Terms of Service"
              isSelected={selectedItem === "service"}
              onClick={() => handleItemClick("service")}
              isOpen={isOpen}
            />
            <MenuItem
              icon={privacy}
              label="Privacy Policy"
              isSelected={selectedItem === "privacy"}
              onClick={() => handleItemClick("privacy")}
              isOpen={isOpen}
            />
            <MenuItem
              icon={contact}
              label="Contact Us"
              isSelected={selectedItem === "contact"}
              onClick={() => handleItemClick("contact")}
              isOpen={isOpen}
            />
            <MenuItem
              icon={setting}
              label="Settings"
              isSelected={selectedItem === "setting"}
              onClick={() => handleItemClick("setting")}
              isOpen={isOpen}
            />
          </ul>

          {/* Logout Button */}
          <div>
            <li
              className="flex items-center p-2 mt-5 rounded-lg bg-[#2D9CDB] w-full h-12 text-white cursor-pointer transition-colors"
              onClick={() => handleItemClick("logout")}
            >
              <img src={logout} alt="logout" className="w-6 h-6" />
              <span
                className={`ml-2 text-sm ${
                  isOpen ? "inline" : "hidden"
                } md:group-hover:inline`}
              >
                Log out
              </span>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
