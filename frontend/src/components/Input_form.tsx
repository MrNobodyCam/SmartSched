import React, { useState } from 'react';
import { X, Clock } from 'lucide-react';
import './Components-styles/Input_form.css'; // Import the CSS file


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
    title: '',
    subjects: '',
    freeDays: [],
    startTime: '',
    endTime: '',
  });

  const weekDays: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
      {/* Removed the dark mode toggle button */}
      <button onClick={() => setIsOpen(true)} className="button">
        Generate Schedule
      </button>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="form-container">
              <div className="form-header">
                <span className="text-2xl">👋</span>
                <h2>Input your data to generate a smart schedule</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                  <label>
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
                  />
                </div>
                <div className="form-group">
                  <label>
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
                  />
                </div>
                <div className="form-group">
                  <label>
                    <span>Free Days</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="checkbox-grid">
                    {weekDays.map((day) => (
                      <label key={day}>
                        <input
                          type="checkbox"
                          checked={formData.freeDays.includes(day)}
                          onChange={() => handleDayToggle(day)}
                        />
                        <span>{day}</span>
                      </label>
                    ))}
                  </div>
                </div>
               {/* Free Time Inputs */}
<div className="form-group">
  <label>
    <span>Free Time</span>
    <span className="text-red-500">*</span>
  </label>
  <div className="grid grid-cols-2 gap-4">
    {/* Start Time */}
    <div className="time-input-container">
      <input
        type="time"
        value={formData.startTime}
        onChange={(e) =>
          setFormData({ ...formData, startTime: e.target.value })
        }
        required
      />
      <Clock className="clock-icon" size={16} style={{ color: '#000000' }} /> {/* Black color */}
    </div>

    {/* End Time */}
    <div className="time-input-container">
      <input
        type="time"
        value={formData.endTime}
        onChange={(e) =>
          setFormData({ ...formData, endTime: e.target.value })
        }
        required
      />
      <Clock className="clock-icon" size={16} style={{ color: '#000000' }} /> {/* Black color */}
    </div>
  </div>
</div>
                <div className="action-buttons">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="cancel-button"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                  <button type="submit" className="generate-button">
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