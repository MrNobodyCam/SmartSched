import { Routes, Route } from "react-router-dom";
import ScheduleListview from "../components/Schedule_create/schedule_create";
import Landingpage from "../pages/Landing-page";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/generate-schedule" element={<ScheduleListview />} />
      <Route path="/" element={<Landingpage />} />
    </Routes>
  );
};

export default AppRoutes;
