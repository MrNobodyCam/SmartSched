import { useState, useRef, useEffect } from "react";
import ErrorIcon from "../assets/icons/error-icon.svg";
import InfoIcon from "../assets/icons/info-icon.svg";
import SuccessIcon from "../assets/icons/success-icon.svg";
import BellIcon from "../assets/icons/bell-icon.svg";
import "./Components-styles/scrollbar.css";
import { fetchUpdateData, fetchGetData } from "../service/api";
const NotificationPopup = ({
  NotificationData,
  UnreadCount,
}: {
  NotificationData: any[];
  UnreadCount: number;
}) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedOpenState = localStorage.getItem("notificationPopupOpen");
    if (savedOpenState === "true") {
      setOpen(true);
    }
  }, []);

  const onMarkAsRead = async (notificationID: number) => {
    try {
      await fetchUpdateData("notification/markAsRead", {
        notification_id: notificationID,
      });
      console.log(`Notification ${notificationID} marked as read.`);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };
  const onMarkAllAsRead = async () => {
    try {
      await fetchGetData("notification/markAllAsRead");
      console.log(`All notification are marked as read.`);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        localStorage.setItem("notificationPopupOpen", "false"); // Save state to localStorage
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => {
          setOpen(!open);
          localStorage.setItem("notificationPopupOpen", (!open).toString()); // Save state to localStorage
        }}
        className="relative p-2 rounded-full hover:bg-gray-200 focus:outline-none cursor-pointer"
      >
        <img
          src={BellIcon}
          className="h-6 w-6 text-gray-700 cursor-pointer"
          alt="Notifications"
        />
        {UnreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {UnreadCount > 9 ? "9+" : UnreadCount}
          </span>
        )}
      </button>

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
              <button
                onClick={() => {
                  onMarkAllAsRead();
                  localStorage.setItem("notificationPopupOpen", "true"); // Save state to localStorage
                  setTimeout(() => {
                    window.location.reload();
                  }, 100);
                }}
                className="cursor-pointer font-medium text-[14px] md:text-[16px] lg:text-[18px] text-gray-500 hover:text-gray-700 hover:font-semibold"
              >
                Mark All As Read
              </button>
            </div>
            <ul className="mt-2 space-y-2">
              {NotificationData.map((notification) => (
                <li
                  onClick={() => {
                    onMarkAsRead(notification.id);
                    console.log("Notification ID:", notification.id);
                    localStorage.setItem("notificationPopupOpen", "true"); // Save state to localStorage
                    setTimeout(() => {
                      window.location.reload();
                    }, 100);
                  }}
                  key={notification.id}
                  className="p-2 bg-gray-50 hover:bg-gray-100 rounded-[12px] cursor-pointer"
                >
                  <div className="flex space-x-2">
                    <div className="w-[36px] h-[36px] sm:w-[36px] sm:h-[36px] rounded-full bg-white p-[4px] border-2 border-[#E2E2E2] shadow-[0_1px_4px_0_rgba(0,0,0,0.1)] flex items-center justify-center">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-[14px] md:text-[16px] lg:text-[18px] font-medium text-gray-900">
                          {notification.title}
                        </p>
                        {!notification.is_read && (
                          <div className="w-2 h-2 rounded-[50%] bg-red-500 mr-2"></div>
                        )}
                      </div>
                      <p
                        id={`notification-message-${notification.id}`}
                        className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-500 mt-1"
                      >
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
