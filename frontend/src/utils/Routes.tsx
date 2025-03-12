import { Routes, Route } from "react-router-dom";
import ScheduleListview from "../components/Schedule_create/schedule_create";
import CustomCalendar from "../components/Calendar";
import Landingpage from "../pages/Landing-page";
import "../index.css";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/generate-schedule" element={<ScheduleListview />} />
      <Route path="/calendar" element={<CustomCalendar />} />
      <Route path="/" element={<Landingpage />} />
    </Routes>
  );
};

export default AppRoutes;
