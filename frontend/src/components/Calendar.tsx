import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import './CalendarStyles.css'; // Custom CSS for additional styling

const CustomCalendar = () => {
  const [view, setView] = useState('dayGridMonth');
  const [currentMonth, setCurrentMonth] = useState('January 2022');

  // Sample events data
  const events = [
    { id: '1', title: 'Event Name', start: '2022-01-02T08:00:00', color: '#4CAF50' },
    { id: '2', title: 'Event Name', start: '2022-01-02T08:00:00', color: '#4CAF50' },
    { id: '3', title: 'Event Name', start: '2022-01-03T08:00:00', color: '#4CAF50' },
    { id: '4', title: 'Event Name', start: '2022-01-03T08:00:00', color: '#7B68EE' },
    { id: '5', title: 'Event Name', start: '2022-01-04T08:00:00', color: '#FF5252' },
    { id: '6', title: 'Event Name', start: '2022-01-04T08:00:00', color: '#4CAF50' },
    { id: '7', title: 'Event Name', start: '2022-01-05T08:00:00', color: '#4CAF50' },
    { id: '8', title: 'Event Name', start: '2022-01-05T08:00:00', color: '#FF5252' },
    // Add more events as needed
  ];

  // Function to handle date change
  interface DateInfo {
    view: {
      currentStart: Date;
    };
  }

  const handleDatesSet = (dateInfo: DateInfo) => {
    const date = dateInfo.view.currentStart;
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    setCurrentMonth(`${month} ${year}`);
  };

  // Render custom header with buttons
  const renderEventContent = (eventInfo: { event: { backgroundColor: any; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }; }) => {
    return (
      <div className="custom-event">
        <div 
          className="event-dot" 
          style={{ backgroundColor: eventInfo.event.backgroundColor }}
        ></div>
        <span className="event-title">{eventInfo.event.title}</span>
        <span className="event-time">08:00</span>
      </div>
    );
  };

  // Custom view toggle
  const toggleView = () => {
    setView(prev => prev === 'dayGridMonth' ? 'listMonth' : 'dayGridMonth');
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-title-container">
          <h1 className="calendar-title">{currentMonth}</h1>
          <div className="dropdown">
            <button className="dropdown-button">Month</button>
          </div>
        </div>
        <div className="calendar-actions">
          <button className="action-button procrastinate">
            Procrastinate Course
          </button>
          <button className="action-button leave">
            Leave Course
          </button>
        </div>
      </div>
      
      <div className="view-toggle-container">
        <span className="view-label">List View</span>
        <label className="switch">
          <input 
            type="checkbox" 
            checked={view === 'dayGridMonth'}
            onChange={toggleView}
          />
          <span className="slider round"></span>
        </label>
        <span className="view-label">Calendar</span>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView={view}
        headerToolbar={false} // Hide default header
        events={events}
        eventContent={renderEventContent}
        datesSet={handleDatesSet}
        dayMaxEventRows={4}
        moreLinkContent={({num}) => `+${num} More`}
        height="auto"
        contentHeight="auto"
        aspectRatio={3}
        fixedWeekCount={false}
        showNonCurrentDates={false}
        dayHeaderFormat={{ weekday: 'short' }}
      />
    </div>
  );
};

export default CustomCalendar;