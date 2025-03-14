import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <label className="custom-datepicker-label" ref={ref} onClick={onClick}>
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
    />
  );
};

export default CustomDatePicker;
