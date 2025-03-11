import "../../index.css"; // Ensure this file imports the global styles including fonts

const CourseScheduleViewer = () => {
  const rawLessons = [
    {
      id: 1,
      title: "React JS",
      lesson: "Introduction to React JS",
      description:
        "Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications",
      date: "2025-03-10",
      start_time: "10:00:00",
      end_time: "12:00:00",
      result: null,
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      lesson: "Introduction React Hooks Deep Dive",
      description:
        "Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications",
      date: "2025-03-10",
      start_time: "13:00:00",
      end_time: "15:00:00",
      result: 10,
    },
    {
      id: 3,
      title: "React Performance Optimization",
      lesson: "Introduction React Performance Optimization",
      description:
        "Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications",
      date: "2025-03-10",
      start_time: "16:00:00",
      end_time: "18:00:00",
      result: null,
    },
    {
      id: 4,
      title: "Testing React Applications",
      lesson: "Introduction Testing React Applications",
      description:
        "Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications",
      date: "2025-03-13",
      start_time: "14:00:00",
      end_time: "16:00:00",
      result: 10,
    },
    {
      id: 5,
      title: "Building a Full-Stack Application",
      lesson: "Introduction Building a Full-Stack Application",
      description:
        "Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications",
      date: "2025-05-14",
      start_time: "10:30:00",
      end_time: "12:30:00",
      result: null,
    },
    {
      id: 6,
      title: "Building a Full-Stack ",
      lesson: "Introduction Building a Full-Stack",
      description:
        "Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications",
      date: "2025-06-14",
      start_time: "10:30:00",
      end_time: "12:30:00",
      result: 1,
    },
    {
      id: 7,
      title: "Css & Html",
      lesson: "Introduction Css & Html",
      description:
        "Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications",
      date: "2025-06-14",
      start_time: "10:30:00",
      end_time: "12:30:00",
      result: null,
    },
    {
      id: 8,
      title: "Tailwind",
      lesson: "Introduction Tailwind",
      description:
        "Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications Learn React's component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications",
      date: "2025-07-14",
      start_time: "10:30:00",
      end_time: "12:30:00",
      result: 10,
    },
  ];

  // Group lessons by date
  type Lesson = {
    id: number;
    title: string; // Add title to type
    lesson: string;
    description: string;
    date: string;
    start_time: string;
    end_time: string;
    result: number | null;
  };

  type ScheduleData = {
    date: string;
    lessons: Lesson[];
  }[];

  const scheduleData: ScheduleData = rawLessons.reduce<ScheduleData>(
    (acc, lesson) => {
      const existingDate = acc.find((entry) => entry.date === lesson.date);
      if (existingDate) {
        existingDate.lessons.push(lesson);
      } else {
        acc.push({ date: lesson.date, lessons: [lesson] });
      }
      return acc;
    },
    []
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div
      className="bg-white font-sans w-full h-screen max-w-full mx-auto flex flex-col overflow-hidden"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div className="bg-[#FFFFFF] p-4 flex-1 overflow-hidden rounded-xl">
        <div className="overflow-y-auto h-full">
          {scheduleData.map((day, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-xl mb-8">
              <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold py-2 border-b border-gray-300 mb-4">
                {formatDate(day.date)}
              </h2>
              <div className="space-y-4 pt-5 pb-5">
                {day.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden relative hover:bg-gray-200 cursor-pointer"
                    onClick={() => alert(`Clicked on ${lesson.lesson}`)}
                  >
                    <div className="flex">
                      <div
                        className={`w-2.5 ${
                          lesson.result !== null
                            ? "bg-[#27AE60]"
                            : "bg-[#EB5757]"
                        }`}
                      ></div>
                      <div className="p-4 w-full">
                        <h3 className="font-semibold text-[20px] md:text-[22px] lg:text-[24px]">
                          {lesson.title}
                        </h3>
                        <p className="text-gray-500 text-[14px] md:text-[16px] lg:text-[18px] mb-2">
                          {`Time: ${lesson.start_time} - ${lesson.end_time}`}
                        </p>
                        <p className="text-gray-700 text-[14px] md:text-[16px] lg:text-[18px]">
                          <span className="font-bold">{lesson.lesson}: </span>
                          {truncateText(lesson.description, 200)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseScheduleViewer;
