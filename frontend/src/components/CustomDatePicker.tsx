import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

// Define Props Interface for CustomDatePicker
interface CustomDatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void; // Fix: Ensure it allows null
}

// Custom Input Component
const CustomInput = React.forwardRef<
  HTMLDivElement,
  { value?: string; onClick?: () => void }
>(({ value = "Select Date", onClick }, ref) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "8px 12px",
        cursor: "pointer",
        width: "200px",
        backgroundColor: "#f9f9f9",
      }}
      onClick={onClick}
      ref={ref}
    >
      <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: "8px" }} />
      <span>{value}</span>
    </div>
  );
});
CustomInput.displayName = "CustomInput"; // Fix React warning for forwardRef

// CustomDatePicker Component
const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      dateFormat="yyyy-MM-dd"
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
