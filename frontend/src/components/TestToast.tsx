import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import CheckIcon from "../assets/icons/check-icon.svg";
import CrossIcon from "../assets/icons/cross-icon.svg";
import WarningIcon from "../assets/icons/warning-icon.svg";
import ErrorIcon from "../assets/icons/error-icon.svg";

type ToastMessageType = "success" | "error" | "warning";

type Props = {
  duration?: number;
};

// ForwardRef allows us to expose methods to the parent
const ToastNotification = forwardRef((props: Props, ref) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<ToastMessageType>("success");
  const [icon, setIcon] = useState(CheckIcon);
  const [color, setColor] = useState("#27AE60");

  const toastMessages = {
    success: "Your message has been sent successfully...",
    error: "Your message was not sent. Please try again.",
    warning: "This is a warning message",
  };

  // Expose a method to show the toast
  useImperativeHandle(ref, () => ({
    showToast: (msgType: ToastMessageType) => {
      setMessage(msgType);
      setOpen(true);
    },
  }));

  useEffect(() => {
    switch (message) {
      case "warning":
        setIcon(WarningIcon);
        setColor("#F2994A");
        break;
      case "error":
        setIcon(ErrorIcon);
        setColor("#EB5757");
        break;
      default:
        setIcon(CheckIcon);
        setColor("#27AE60");
    }
  }, [message]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, props.duration || 3000);
      return () => clearTimeout(timer);
    }
  }, [open, props.duration]);

  return (
    <div
      className={`fixed top-0 right-0 m-4 transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`
          flex items-center gap-4 p-4 max-w-[450px] max-h-[85px] bg-white rounded-[12px] shadow-md border-2
          transition-all duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }
          overflow-hidden
        `}
        style={{ borderColor: color }}
      >
        {/* Icon */}
        <div className="flex-shrink-0">
          <img
            src={icon}
            alt="icon"
            className="w-12 h-12 p-2 rounded-full bg-opacity-10"
          />
        </div>
        {/* Message */}
        <div className="flex-1">
          <span className="block font-bold text-lg text-gray-800">
            {message.charAt(0).toUpperCase() + message.slice(1)}
          </span>
          <span className="block text-sm text-gray-500 mb-1">
            {toastMessages[message]}
          </span>
        </div>
        {/* Close Button */}
        <div
          onClick={() => setOpen(false)}
          className="flex-shrink-0 w-8 h-8 p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <img src={CrossIcon} alt="close icon" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
});

export default ToastNotification;
