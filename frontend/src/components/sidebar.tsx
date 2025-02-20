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
}

function SideBar({ isOpen }: SideBarProps) {
  const [selectedItem, setSelectedItem] = React.useState("calendar");

  const handleItemClick = (item: React.SetStateAction<string>) => {
    setSelectedItem(item);
  };

  return (
    <div
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] ${
        isOpen ? "w-64" : "w-16"
      } md:hover:w-64 bg-[#D5F0FF] duration-20 group z-50`}
    >
      <nav className="p-3 h-full flex flex-col justify-between">
        {/* Main Menu */}
        <div>
          <p className="font-bold uppercase text-gray-500 text-xs mb-4">MENU</p>
          <ul>
            <li
              className={`flex items-center p-2 mb-2 rounded-lg ${
                selectedItem === "calendar"
                  ? "bg-[#2D9CDB] text-white"
                  : "hover:bg-[#2D9CDB] text-black"
              }`}
              onClick={() => handleItemClick("calendar")}
            >
              <img
                src={calendarIcon}
                alt="calendar"
                className={`w-6 h-6  ${
                  selectedItem === "calendar" ? "filter invert" : ""
                }`}
              />
              <span
                className={`ml-2 text-sm ${
                  isOpen ? "inline" : "hidden"
                } md:group-hover:inline`}
              >
                Calendar
              </span>
            </li>
            <li
              className={`flex items-center p-2 mb-2 rounded-lg ${
                selectedItem === "history"
                  ? "bg-[#2D9CDB] text-white"
                  : "hover:bg-[#2D9CDB] text-black"
              }`}
              onClick={() => handleItemClick("history")}
            >
              <img
                src={history}
                alt="history"
                className={`w-6 h-6  ${
                  selectedItem === "history" ? "filter invert" : ""
                }`}
              />
              <span
                className={`ml-2 text-sm ${
                  isOpen ? "inline" : "hidden"
                } md:group-hover:inline`}
              >
                History Schedule
              </span>
            </li>
          </ul>
        </div>

        {/* Secondary Menu */}
        <div>
          <ul>
            <li
              className={`flex items-center p-2 mb-2 rounded-lg ${
                selectedItem === "service"
                  ? "bg-[#2D9CDB] text-white"
                  : "hover:bg-[#2D9CDB] text-black"
              }`}
              onClick={() => handleItemClick("service")}
            >
              <img
                src={service}
                alt="service"
                className={`w-6 h-6  ${
                  selectedItem === "service" ? "filter invert" : ""
                }`}
              />
              <span
                className={`ml-2 text-sm ${
                  isOpen ? "inline" : "hidden"
                } md:group-hover:inline`}
              >
                Terms of Service
              </span>
            </li>
            <li
              className={`flex items-center p-2 mb-2 rounded-lg ${
                selectedItem === "privacy"
                  ? "bg-[#2D9CDB] text-white"
                  : "hover:bg-[#2D9CDB] text-black"
              }`}
              onClick={() => handleItemClick("privacy")}
            >
              <img
                src={privacy}
                alt="privacy"
                className={`w-6 h-6  ${
                  selectedItem === "privacy" ? "filter invert" : ""
                }`}
              />
              <span
                className={`ml-2 text-sm ${
                  isOpen ? "inline" : "hidden"
                } md:group-hover:inline`}
              >
                Privacy Policy
              </span>
            </li>
            <li
              className={`flex items-center p-2 mb-2 rounded-lg ${
                selectedItem === "contact"
                  ? "bg-[#2D9CDB] text-white"
                  : "hover:bg-[#2D9CDB] text-black"
              }`}
              onClick={() => handleItemClick("contact")}
            >
              <img
                src={contact}
                alt="contact"
                className={`w-6 h-6  ${
                  selectedItem === "contact" ? "filter invert" : ""
                }`}
              />
              <span
                className={`ml-2 text-sm ${
                  isOpen ? "inline" : "hidden"
                } md:group-hover:inline`}
              >
                Contact Us
              </span>
            </li>
            <li
              className={`flex items-center p-2 mb-2 rounded-lg ${
                selectedItem === "setting"
                  ? "bg-[#2D9CDB] text-white"
                  : "hover:bg-[#2D9CDB] text-black"
              }`}
              onClick={() => handleItemClick("setting")}
            >
              <img
                src={setting}
                alt="setting"
                className={`w-6 h-6  ${
                  selectedItem === "setting" ? "filter invert" : ""
                }`}
              />
              <span
                className={`ml-2 text-sm ${
                  isOpen ? "inline" : "hidden"
                } md:group-hover:inline`}
              >
                Settings
              </span>
            </li>
          </ul>

          {/* Logout Button */}
          <div>
            <li
              className="flex items-center p-2 mt-5 rounded-lg bg-[#2D9CDB] w-full h-12 text-white cursor-pointer transition-colors duration-300"
              onClick={() => handleItemClick("logout")}
            >
              <img src={logout} alt="logout" className="w-6 h-6 " />
              <span
                className={`ml-2 text-sm pl-30 ${
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
}

export default SideBar;
