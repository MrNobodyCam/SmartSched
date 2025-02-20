// import React from "react";
import ErrorIcon from "../assets/icons/error-icon.svg";
import InfoIcon from "../assets/icons/info-icon.svg";
import SuccessIcon from "../assets/icons/success-icon.svg";

const NotificationPopup = () => {
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
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "error":
        return <img src={ErrorIcon} alt="Error Icon" className="w-5 h-6 mb-[2px]" />;
      case "info":
        return <img src={InfoIcon} alt="Info Icon" className="w-6 h-6" />;
      case "success":
        return <img src={SuccessIcon} alt="Success Icon" className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-sm rounded-[12px] bg-[#E1EBF1] shadow-sm p-3 h-[600px] overflow-y-auto scrollbar-thin">
      <div className="p-2 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          <button className="text-sm text-gray-600 hover:text-gray-900">
            Mark All As Read
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200 space-y-2">
        <div className="px-3 py-1 border-b border-black border-opacity-20 mb-[18px]">
          <h3 className="text-sm font-medium text-gray-900">New</h3>
        </div>

        {notifications.slice(0, 2).map((notification) => (
          <div
            key={notification.id}
            className="p-2 bg-white hover:bg-gray-50 rounded-[12px]"
          >
            <div className="flex space-x-2">
              <div className="w-[33px] h-[33px] rounded-full bg-white p-[4px] border-2 border-[#E2E2E2] shadow-[0_1px_4px_0_rgba(0,0,0,0.1)] flex items-center justify-center">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {notification.title}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {notification.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="px-3 py-1 border-b border-black border-opacity-20 mb-[18px]">
          <h3 className="text-sm font-medium text-gray-900">Earlier</h3>
        </div>

        {notifications.slice(2).map((notification) => (
          <div
            key={notification.id}
            className="p-2 bg-white hover:bg-gray-50 rounded-[12px]"
          >
            <div className="flex space-x-2">
              <div className="w-[33px] h-[33px] rounded-full bg-white p-[4px] border-2 border-[#E2E2E2] shadow-[0_1px_4px_0_rgba(0,0,0,0.1)] flex items-center justify-center">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {notification.title}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {notification.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPopup;
