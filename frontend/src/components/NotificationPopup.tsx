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
      title: "This is an error message",
      message:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      timestamp: "12 Feb 2025 at 9:25 pm",
    },
    {
      id: 2,
      type: "error",
      title: "This is an error message",
      message:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      timestamp: "12 Feb 2025 at 9:25 pm",
    },
    {
      id: 3,
      type: "info",
      title: "This is an info message",
      message:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      timestamp: "12 Feb 2025 at 9:25 pm",
    },
    {
      id: 4,
      type: "success",
      title: "This is a success message",
      message:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      timestamp: "12 Feb 2025 at 9:25 pm",
    },
    {
      id: 5,
      type: "success",
      title: "This is a success message",
      message:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      timestamp: "12 Feb 2025 at 9:25 pm",
    },
    {
      id: 6,
      type: "success",
      title: "This is a success message",
      message:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      timestamp: "12 Feb 2025 at 9:25 pm",
    },
    {
      id: 7,
      type: "success",
      title: "This is a success message",
      message:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      timestamp: "12 Feb 2025 at 9:25 pm",
    },
  ];

  // Calculate the total number of unread notifications
  const notificationCount = notifications.length;

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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
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
    <div className="relative">
      {/* Notification Button with Badge */}
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-200 focus:outline-none"
      >
        <img
          src={BellIcon}
          className="h-6 w-6 text-gray-700 cursor-pointer"
          alt="Notifications"
        />
        {/* Notification Count Badge */}
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {notificationCount > 9 ? "9+" : notificationCount}
          </span>
        )}
      </button>

      {/* Notification Popup */}
      {open && (
        <div
          ref={popupRef}
          className="absolute right-0 mt-2 w-[80vw] sm:w-[70vh] max-h-[85vh] bg-white border border-gray-200 rounded-[12px] shadow-lg z-50 overflow-y-auto scrollbar-thin"
        >
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h4 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold">
                Notifications
              </h4>
              <button className="font-medium text-[14px] md:text-[16px] lg:text-[18px] text-gray-500 hover:text-gray-700 hover:font-semibold">
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
                    <div className="w-[36px] h-[36px] sm:w-[36px] sm:h-[36px] rounded-full bg-white p-[4px] border-2 border-[#E2E2E2] shadow-[0_1px_4px_0_rgba(0,0,0,0.1)] flex items-center justify-center">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] md:text-[16px] lg:text-[18px] font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-500 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-[12px] md:text-[14px] lg:text-[16px] text-gray-400 mt-2">
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
