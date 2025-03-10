import { Route, Routes } from "react-router-dom";
import HistoryScreen from "../pages/history_data";
import CalendarScreen from "../components/generate-schedule";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/calendar" element={<CalendarScreen />} />
      <Route path="/history" element={<HistoryScreen />} />
      <Route path="/contact" element={<h1>Contact Screen</h1>} />
      <Route path="/setting" element={<h1>Settings Screen</h1>} />
    </Routes>
  );
};

export default AppRoutes;
