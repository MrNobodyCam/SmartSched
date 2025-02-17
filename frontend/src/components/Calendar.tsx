import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "@fullcalendar/common/main.css";

import "./components-styles/Calendar.css";

function Calendar() {
  return (
    <div className="full-calendar-container">
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="100%"
        events={[
          // ✅ Use "events" prop instead of "eventAdd"
          {
            id: "a",
            title: "My Event",
            start: "2025-02-18 10:00",
            end: "2025-02-18 12:00",
          },
        ]}
      />
    </div>
  );
}

export default Calendar;
