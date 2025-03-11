import { Routes, Route } from "react-router-dom";
import CallDetail from "../components/Quiz/Call_Detail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/generate-schedule" element={<CallDetail />} />
      <Route
        path="/generate-schedule/roadmap/:RoadMapID"
        element={<CallDetail />}
      />
    </Routes>
  );
};

export default AppRoutes;
