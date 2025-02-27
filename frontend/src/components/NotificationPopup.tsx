import { useState, useRef, useEffect } from "react";
import ErrorIcon from "../assets/icons/error-icon.svg";
import InfoIcon from "../assets/icons/info-icon.svg";
import SuccessIcon from "../assets/icons/success-icon.svg";
import BellIcon from "../assets/icons/bell-icon.svg";
import "./Components-styles/scrollbar.css";

const NotificationPopup = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Notification data
  const notifications = [
    {
      id: 1,
      type: "error",
      title: "This is error message",
      message:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      timestamp: "12 Feb 2025 at 9:25 pm",
    },
    {
      id: 2,
      type: "error",
      title: "This is error message",
      message:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      timestamp: "12 Feb 2025 at 9:25 pm",
    },
    {
      id: 3,
      type: "info",
      title: "This is error message",
      message:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      timestamp: "12 Feb 2025 at 9:25 pm",
    },
    {
      id: 4,
      type: "success",
      title: "This is error message",
      message:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      timestamp: "12 Feb 2025 at 9:25 pm",
    },
    {
      id: 5,
      type: "success",
      title: "This is error message",
      message:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      timestamp: "12 Feb 2025 at 9:25 pm",
    },
    {
      id: 6,
      type: "info",
      title: "This is error message",
      message:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      timestamp: "12 Feb 2025 at 9:25 pm",
    },
    {
      id: 7,
      type: "error",
      title: "This is error message",
      message:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      timestamp: "12 Feb 2025 at 9:25 pm",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "error":
        return (
          <img src={ErrorIcon} alt="Error Icon" className="w-5 h-6 mb-[2px]" />
        );
      case "info":
        return <img src={InfoIcon} alt="Info Icon" className="w-6 h-6" />;
      case "success":
        return <img src={SuccessIcon} alt="Success Icon" className="w-6 h-6" />;
      default:
        return null;
    }
  };

  // Close the popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative inline-block w-[70vh]"
      style={{ maxWidth: "100%" }}
    >
      {/* Notification Button */}
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="absolute right-0 p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none"
      >
        <img
          src={BellIcon}
          className="h-4 w-4 md:h-6 md:w-6 text-gray-700"
          alt="Notifications"
        />
      </button>

      {/* Notification Popup */}
      {open && (
        <div
          ref={popupRef}
          className="absolute right-0 mt-10 sm:mt-10 md:mt-12 sm w-full sm:max-w-[100vh] md:max-w-[100vh] lg:max-w-[100vh] bg-white border border-gray-200 rounded-[12px] shadow-lg z-50 h-[80vh] max-h-[80vh] overflow-y-auto scrollbar-thin"
        >
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg sm:text-xl font-semibold">
                Notifications
              </h4>
              <button className="font-medium text-sm sm:text-base text-gray-500 hover:text-gray-700 hover:font-semibold">
                Mark All As Read
              </button>
            </div>
            <ul className="mt-2 space-y-2">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="p-2 bg-gray-50 hover:bg-gray-100 rounded-[12px]"
                >
                  <div className="flex space-x-2">
                    <div className="w-[33px] h-[33px] sm:w-[40px] sm:h-[40px] rounded-full bg-white p-[4px] border-2 border-[#E2E2E2] shadow-[0_1px_4px_0_rgba(0,0,0,0.1)] flex items-center justify-center">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm sm:text-base text-gray-500 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400 mt-2">
                        {notification.timestamp}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;
