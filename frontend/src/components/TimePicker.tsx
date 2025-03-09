import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  className?: string;
  isStartTime?: boolean;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  className,
  isStartTime = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTimeSelect = (hour: string, minute: string) => {
    onChange(`${hour}:${minute}`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={pickerRef}>
      <div className="relative">
        <input
          type="text"
          value={value}
          onClick={() => setIsOpen(!isOpen)}
          readOnly
          className={`${className} pr-10 text-[14px]`}
          placeholder={
            isStartTime
              ? "Choose start time (e.g., 09:00 AM)..."
              : "Choose end time (e.g., 05:00 PM)..."
          }
        />
        <ChevronDown
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          size={20}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg w-48">
          <div className="max-h-48 overflow-y-auto flex">
            <div className="flex-1 border-r">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[14px]"
                  onClick={() =>
                    handleTimeSelect(hour, value.split(":")[1] || "00")
                  }
                >
                  {hour}
                </div>
              ))}
            </div>
            <div className="flex-1">
              {minutes.map((minute) => (
                <div
                  key={minute}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[14px]"
                  onClick={() =>
                    handleTimeSelect(value.split(":")[0] || "00", minute)
                  }
                >
                  {minute}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
