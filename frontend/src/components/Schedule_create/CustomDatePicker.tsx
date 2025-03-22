import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import "../Components-styles/DatePicker.css";

// Define Props Interface for CustomDatePicker
interface CustomDatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

// Custom Input Component
const CustomInput = React.forwardRef<
  HTMLLabelElement,
  { value?: string; onClick?: () => void }
>(({ value = "Select Date", onClick }, ref) => {
  return (
    <label
      className="custom-datepicker-label text-[14px] md:text-[16px] lg:text-[18px] cursor-pointer"
      ref={ref}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
      <input
        type="text"
        value={value}
        readOnly
        className="custom-date-input  cursor-pointer"
      />
    </label>
  );
});
CustomInput.displayName = "CustomInput";

// CustomDatePicker Component
const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange} // Updates both DatePicker & Calendar
      dateFormat="yyyy-MM-dd"
      className="custom-datepicker"
      customInput={
        <CustomInput
          value={
            selectedDate ? selectedDate.toLocaleDateString() : "Select Date"
          }
        />
      }
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="custom-header flex justify-between items-center px-1 py-3">
          {/* Previous Button */}
          <button
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className={`prev-button cursor-pointer p-1 ${
              prevMonthButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FontAwesomeIcon icon={faArrowLeft} />{" "}
            {/* Replace with your icon */}
          </button>

          {/* Current Month and Year */}
          <span className="current-month text-lg font-semibold">
            {date.toLocaleString("default", { month: "long", year: "numeric" })}
          </span>

          {/* Next Button */}
          <button
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            className={`next-button cursor-pointer  ${
              nextMonthButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FontAwesomeIcon icon={faArrowRight} />{" "}
            {/* Replace with your icon */}
          </button>
        </div>
      )}
    />
  );
};

export default CustomDatePicker;
