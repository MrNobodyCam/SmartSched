import React, { useState } from "react";
import { X } from "lucide-react";
import TimePicker from "./TimePicker";

interface FormData {
  title: string;
  subjects: string;
  freeDays: string[];
  startTime: string;
  endTime: string;
}

const InputForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    subjects: "",
    freeDays: [],
    startTime: "",
    endTime: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const weekDays: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-600 text-[18px]"
      >
        Generate Schedule
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl mx-4">
            <div className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <h2
                  className="text-2xl font-bold text-black"
                  style={{ fontSize: "20px" }}
                >
                  Input your data to generate a smart schedule
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-4">
                  <label className="block font-medium mb-2 text-black text-[18px]">
                    <span>Title</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your schedule title..."
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black text-[14px]"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-2 text-black text-[18px]">
                    <span>Subjects</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., React, Laravel, Java, Python, or more..."
                    value={formData.subjects}
                    onChange={(e) =>
                      setFormData({ ...formData, subjects: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black text-[14px]"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-2 text-black text-[18px]">
                    <span>Free Days</span>
                    <span className="text-red-500">*</span>
                  </label>

                  {/* Desktop View: Checkbox Grid */}
                  <div className="hidden md:block">
                    <div className="grid grid-cols-4 gap-2">
                      {weekDays.map((day) => (
                        <label
                          key={day}
                          className="flex items-center gap-2 text-black text-[14px]"
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
                        className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black text-[14px]"
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
                              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-black text-[14px]"
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
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-2 text-black text-[18px]">
                    <span>Free Time</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <TimePicker
                      value={formData.startTime}
                      onChange={(time) =>
                        setFormData({ ...formData, startTime: time })
                      }
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black"
                      isStartTime={true}
                    />
                    <TimePicker
                      value={formData.endTime}
                      onChange={(time) =>
                        setFormData({ ...formData, endTime: time })
                      }
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black"
                      isStartTime={false}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-1 px-4 py-2 text-[#A5A5A5] transition-colors duration-300 ease-in-out bg-[#FDFDFD] border border-[#A5A5A5] rounded-xl hover:text-black"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#2D9CDB] text-white rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-600 rounded-xl"
                  >
                    Generate
                  </button>
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
