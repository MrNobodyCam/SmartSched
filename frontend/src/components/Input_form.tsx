import React, { useState } from "react";
import { X } from "lucide-react";
import TimePicker from "./TimePicker";
import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";
import PlusCircle from "../assets/icons/plus-circle.svg";
import { fetchPostData } from "../service/api";
import Loading from "./Alert/Loading";

interface FormData {
  title: string;
  subjects: string;
  freeDays: string[];
  startTime: string;
  endTime: string;
  duration: string;
}

const ValidationMessage = ({ message }: { message: string }) => (
  <p className="text-red-500 text-sm mt-1">{message}</p>
);

const InputForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    subjects: "",
    freeDays: [],
    startTime: "",
    endTime: "",
    duration: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const weekDays: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const parseTime = (time: string) => {
    const [hoursMinutes, period] = time.split(" ");
    let [hours, minutes] = hoursMinutes.split(":").map(Number);
    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }
    return hours + minutes / 60;
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.subjects.trim()) {
      newErrors.subjects = "Subjects are required";
    }
    if (formData.freeDays.length === 0) {
      newErrors.freeDays = "Please select at least one free day";
    }
    if (!formData.startTime) {
      newErrors.startTime = "Start time is required";
    }
    if (!formData.endTime) {
      newErrors.endTime = "End time is required";
    } else {
      const startTime = parseTime(formData.startTime);
      const endTime = parseTime(formData.endTime);
      if (endTime - startTime < 1.5) {
        newErrors.endTime = "The time difference should be at least 1.5 hours";
      }
    }
    if (!formData.duration) {
      newErrors.duration = "Duration is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const fetch = async () => {
        setLoading(true);
        setError(null);

        try {
          await fetchPostData(`schedule`, {
            schedule_title: formData.title,
            subject: formData.subjects.split(",").map((s) => s.trim()),
            free_day: formData.freeDays,
            start_time: formData.startTime,
            end_time: formData.endTime,
            duration: `${formData.duration} Weeks`,
          });
          window.location.reload();
          // console.log(data.quiz); // Log the correct data
        } catch (error) {
          setError((error as any).message);
        } finally {
          setLoading(false);
        }
      };
      fetch();

      // Reset form data to initial state
      setFormData({
        title: "",
        subjects: "",
        freeDays: [],
        startTime: "",
        endTime: "",
        duration: "",
      });

      // Clear any existing errors
      setErrors({});

      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to initial state
    setFormData({
      title: "",
      subjects: "",
      freeDays: [],
      startTime: "",
      endTime: "",
      duration: "",
    });
    // Clear any existing errors
    setErrors({});
    // Close the form
    setIsOpen(false);
  };

  const handleDayToggle = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      freeDays: prev.freeDays.includes(day)
        ? prev.freeDays.filter((d) => d !== day)
        : [...prev.freeDays, day],
    }));
  };

  if (loading) {
    return <Loading text="Generating your quiz... Please wait ⏳" />;
  }
  if (error) {
    console.log(error);
  }
  return (
    <div className="relative">
      <PrimaryBtn
        onClick={() => setIsOpen(true)}
        py="py-1"
        extraContent={
          <img
            src={PlusCircle}
            className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
          />
        }
      >
        Generate Schedule
      </PrimaryBtn>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl mx-4">
            <div className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <h2 className=" text-[20px] md:text-[22px] lg:text-[24px] font-bold text-black">
                  Input your data to generate a smart schedule
                </h2>
              </div>
              {/* form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-4">
                  <label className="block font-bold mb-2 text-black text-[14px] md:text-[16px] lg:text-[18px]">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your schedule title..."
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      setErrors({ ...errors, title: "" });
                    }}
                    required
                    className={`w-full h-[48px] px-4 py-2 bg-gray-100 border ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    } rounded-lg outline-none transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black text-[14px] md:text-[16px] lg:text-[18px]`}
                  />
                  {errors.title && <ValidationMessage message={errors.title} />}
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-2 text-black text-[14px] md:text-[16px] lg:text-[18px]">
                    Subjects
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., React, Laravel, Java, Python, or more..."
                    value={formData.subjects}
                    onChange={(e) => {
                      setFormData({ ...formData, subjects: e.target.value });
                      setErrors({ ...errors, subjects: "" });
                    }}
                    required
                    className={`w-full h-[48px] px-4 py-2 bg-gray-100 border ${
                      errors.subjects ? "border-red-500" : "border-gray-300"
                    } rounded-lg outline-none transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black text-[14px] md:text-[16px] lg:text-[18px]`}
                  />
                  {errors.subjects && (
                    <ValidationMessage message={errors.subjects} />
                  )}
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-2 text-black text-[14px] md:text-[16px] lg:text-[18px]">
                    Free Days
                  </label>

                  {/* Desktop View: Checkbox Grid */}
                  <div className="hidden md:block">
                    <div className="grid grid-cols-4 gap-2">
                      {weekDays.map((day) => (
                        <label
                          key={day}
                          className="flex items-center gap-2 text-black text-[14px] md:text-[16px] lg:text-[18px]"
                        >
                          <input
                            type="checkbox"
                            checked={formData.freeDays.includes(day)}
                            onChange={() => handleDayToggle(day)}
                            className="w-4 h-4 rounded border-black bg-white"
                          />
                          <span>{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Mobile View: Custom Dropdown */}
                  <div className="block md:hidden">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-[14px] md:text-[16px] lg:text-[18px]"
                      >
                        {formData.freeDays.length > 0
                          ? formData.freeDays.join(", ")
                          : "Select Free Days"}
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                          {weekDays.map((day) => (
                            <label
                              key={day}
                              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-black text-[14px] md:text-[16px] lg:text-[18px]"
                            >
                              <input
                                type="checkbox"
                                checked={formData.freeDays.includes(day)}
                                onChange={() => handleDayToggle(day)}
                                className="w-4 h-4 rounded border-black bg-white"
                              />
                              <span>{day}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {errors.freeDays && (
                    <ValidationMessage message={errors.freeDays} />
                  )}
                </div>

                <div className="mb-4">
                  <label className="block font-bold mb-2 text-[14px] md:text-[16px] lg:text-[18px]">
                    Free Time
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <TimePicker
                      value={formData.startTime}
                      onChange={(time) => {
                        setFormData({ ...formData, startTime: time });
                        setErrors({ ...errors, startTime: "" });
                      }}
                      className={`w-full h-[48px] px-4 py-2 bg-gray-100 border ${
                        errors.startTime ? "border-red-500" : "border-gray-300"
                      } rounded-lg outline-none transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black cursor-pointer`}
                      isStartTime={true}
                    />
                    <TimePicker
                      value={formData.endTime}
                      onChange={(time) => {
                        setFormData({ ...formData, endTime: time });
                        setErrors({ ...errors, endTime: "" });
                      }}
                      className={`w-full h-[48px] px-4 py-2 bg-gray-100 border ${
                        errors.endTime ? "border-red-500" : "border-gray-300"
                      } rounded-lg outline-none transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black cursor-pointer`}
                      isStartTime={false}
                    />
                  </div>
                  {errors.startTime && (
                    <ValidationMessage message={errors.startTime} />
                  )}
                  {errors.endTime && (
                    <ValidationMessage message={errors.endTime} />
                  )}
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-2 text-black text-[14px] md:text-[16px] lg:text-[18px]">
                    Duration (Weeks)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="52"
                    placeholder="e.g., 12, 14, 16, or more..."
                    value={formData.duration}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (
                        value === "" ||
                        (/^\d+$/.test(value) && parseInt(value) > 0)
                      ) {
                        setFormData({ ...formData, duration: value });
                        setErrors({ ...errors, duration: "" });
                      }
                    }}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    required
                    className={`w-full lg:w-[266px] h-[48px] px-4 py-2 bg-gray-100 border ${
                      errors.duration ? "border-red-500" : "border-gray-300"
                    } rounded-lg outline-none transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black text-[14px] md:text-[16px] lg:text-[18px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  />
                  {errors.duration && (
                    <ValidationMessage message={errors.duration} />
                  )}
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <SecondaryBtn
                    py="py-1"
                    borderColor="#A5A5A5"
                    color="#A5A5A5"
                    extraContent={
                      <X className="w-[16px] md:w-[18px] lg:w-[20px]" />
                    }
                    onClick={() => {
                      handleCancel();
                    }}
                  >
                    Cancel
                  </SecondaryBtn>
                  <PrimaryBtn type="submit" py="py-1">
                    Generate
                  </PrimaryBtn>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputForm;
