import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const events = [
  {
    title: "Meeting",
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
  },
];

const MyCalendar = () => {
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = event.title === "Meeting" ? "#3174ad" : "#f0f0f0";
    const style = {
      backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "black",
      border: "0px",
      display: "block",
    };
    return {
      style,
    };
  };

  return (
    <div className="p-4 w-full h-full">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setDate(new Date())}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Today
        </button>
        <div>
          <button
            onClick={() => setDate(new Date(date.setDate(date.getDate() - 1)))}
            className="px-4 py-2 bg-gray-300 rounded-lg shadow mr-2 hover:bg-gray-400"
          >
            ← Prev
          </button>
          <button
            onClick={() => setDate(new Date(date.setDate(date.getDate() + 1)))}
            className="px-4 py-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400"
          >
            Next →
          </button>
        </div>
        <select
          className="px-4 py-2 border rounded-lg"
          value={view}
          onChange={(e) => setView(e.target.value)}
        >
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
        </select>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={date}
        onNavigate={setDate}
        view={view}
        onView={setView}
        style={{ height: "calc(100vh - 150px)" }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default MyCalendar;
