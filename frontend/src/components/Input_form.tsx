// Input_form.tsx
import React, { useState } from 'react';
import { Clock, X } from 'lucide-react';

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
    endTime: ''
  });

  const weekDays: string[] = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
    'Friday', 'Saturday', 'Sunday'
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsOpen(false);
  };

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      freeDays: prev.freeDays.includes(day)
        ? prev.freeDays.filter(d => d !== day)
        : [...prev.freeDays, day]
    }));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
      >
        Generate Schedule
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">👋</span>
                <h2 className="text-xl font-semibold">Schedule</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="inline-flex items-center">
                    <span className="text-sm font-medium bg-blue-500 text-white px-2 py-1 rounded">Title *</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="inline-flex items-center">
                    <span className="text-sm font-medium">Subjects</span>
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., React, Laravel, Java, Python, or more..."
                    value={formData.subjects}
                    onChange={(e) => setFormData({...formData, subjects: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Free Day <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {weekDays.map((day) => (
                      <label key={day} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          className="w-4 h-4 border-gray-300 rounded"
                          checked={formData.freeDays.includes(day)}
                          onChange={() => handleDayToggle(day)}
                        />
                        <span>{day}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Free Time <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="time"
                        className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-lg"
                        value={formData.startTime}
                        onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                        required
                      />
                      <Clock className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                    <div className="relative">
                      <input
                        type="time"
                        className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-lg"
                        value={formData.endTime}
                        onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                        required
                      />
                      <Clock className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors inline-flex items-center"
                  >
                    <X size={16} className="mr-1" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
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