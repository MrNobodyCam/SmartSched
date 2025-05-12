import React, { useState, useEffect, useRef } from "react";
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
  isStartTime,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedPeriod, setSelectedPeriod] = useState("AM");
  const timePickerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        timePickerRef.current &&
        !timePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const periods = ["AM", "PM"];

  useEffect(() => {
    if (selectedHour === "12") {
      setSelectedPeriod("PM");
    } else if (selectedHour === "00") {
      setSelectedPeriod("AM");
    }
  }, [selectedHour]);

  const handleTimeSelection = (
    hour: string,
    minute: string,
    period: string
  ) => {
    let newPeriod = period;
    if (hour === "12") {
      newPeriod = "PM";
    } else if (hour === "00") {
      newPeriod = "AM";
    }
    const timeString = `${hour}:${minute} ${newPeriod}`;
    onChange(timeString);
    setSelectedHour(hour);
    setSelectedMinute(minute);
    setSelectedPeriod(newPeriod);
  };

  return (
    <div ref={timePickerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={className}
      >
        <div className="flex items-center justify-between">
          <span>{value || (isStartTime ? "Start Time" : "End Time")}</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="p-2 flex gap-2">
            {/* Hours */}
            <div className="flex-1">
              <div className="font-medium mb-1 text-sm text-gray-600">Hour</div>
              <div className="h-32 overflow-y-auto">
                {hours.map((hour) => (
                  <button
                    key={hour}
                    type="button"
                    className={`w-full text-left px-2 py-1 rounded ${
                      selectedHour === hour
                        ? "bg-blue-100"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() =>
                      handleTimeSelection(hour, selectedMinute, selectedPeriod)
                    }
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </div>

            {/* Minutes */}
            <div className="flex-1">
              <div className="font-medium mb-1 text-sm text-gray-600">
                Minute
              </div>
              <div className="h-32 overflow-y-auto">
                {minutes.map((minute) => (
                  <button
                    key={minute}
                    type="button"
                    className={`w-full text-left px-2 py-1 rounded ${
                      selectedMinute === minute
                        ? "bg-blue-100"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() =>
                      handleTimeSelection(selectedHour, minute, selectedPeriod)
                    }
                  >
                    {minute}
                  </button>
                ))}
              </div>
            </div>

            {/* AM/PM */}
            <div className="w-16">
              <div className="font-medium mb-1 text-sm text-gray-600">
                Period
              </div>
              <div>
                {periods.map((period) => (
                  <button
                    key={period}
                    type="button"
                    className={`w-full text-left px-2 py-1 rounded ${
                      selectedPeriod === period
                        ? "bg-blue-100"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() =>
                      handleTimeSelection(selectedHour, selectedMinute, period)
                    }
                    disabled={selectedHour === "12" || selectedHour === "00"}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
