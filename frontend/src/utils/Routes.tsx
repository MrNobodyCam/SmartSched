import { Routes, Route } from "react-router-dom";
import ScheduleListview from "../components/Schedule_create/schedule_create";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/generate-schedule" element={<ScheduleListview />} />
    </Routes>
  );
};

export default AppRoutes;
