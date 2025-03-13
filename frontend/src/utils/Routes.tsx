import { Routes, Route } from "react-router-dom";
import CustomCalendar from "../components/Schedule_create/Calendar";
import Landingpage from "../pages/Landing-page";
import "../index.css";

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/generate-schedule" element={<ScheduleListview />} /> */}
      <Route path="/generate-schedule/calendar" element={<CustomCalendar />} />
      <Route path="/generate-schedule/listview" element={<CustomCalendar />} />
      <Route path="/" element={<Landingpage />} />
    </Routes>
  );
};

export default AppRoutes;
