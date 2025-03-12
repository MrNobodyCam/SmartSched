import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import HistoryScreen from "../pages/history_data";
import CalendarScreen from "../components/generate-schedule";
import TermOfService from "../pages/termof_service";
import PolicyScreen from "../pages/policy";
import NavBar from "../components/navbar";
import SideBar from "../components/sidebar";
import Landingscreen from "../pages/Landing-page";
import NotFoundPage from "../pages/Notfound";
import CourseScheduleViewer from "../components/Schedule_create/schedule_create";
// import ResetPassScreen from "../components/Auth/Reset_password";
// import ForgetPassScreen from "../components/Auth/Forgot_password";
// import Signinscreen from "../components/Auth/SignIn";
// import Signupscreen from "../components/Auth/Signup";
// import Verifygscreen from "../components/Auth/Verify_email";
import { useState } from "react";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <SideBar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onScreenChange={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <NavBar toggleSidebar={toggleSidebar} />
        <main
          className={`flex-1 overflow-auto ${
            isSidebarOpen
              ? "pt-[50px] sm:pt-[50px] md:pt-[20px] lg:pt-[20px] xl:pt-[20px] 2xl:pt-[50px] ml-[-5px] md:ml-[58px] lg:ml-[58px] xl:ml-[78px] 2xl:ml-[78px]"
              : "pt-[65px] sm:pt-[65px] md:pt-[58px] lg:pt-[58px] xl:pt-[60px] 2xl:pt-[60px] ml-[10px] sm:ml[10px] md:ml-[78px] lg:ml-[78px] xl:ml-[75px] 2xl:ml-[75px]"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/calendar" />} />
      // main screen
      <Route element={<MainLayout />}>
        <Route path="/calendar" element={<CalendarScreen />} />
        <Route path="/history" element={<HistoryScreen />} />
        <Route path="/service" element={<TermOfService />} />
        <Route path="/privacy" element={<PolicyScreen />} />
        <Route path="/contact" element={<h1>Contact Screen</h1>} />
        <Route path="/setting" element={<h1>Settings Screen</h1>} />
      </Route>
      // when not yet login or signup
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/landing" element={<Landingscreen />} />
      <Route path="/generate" element={<CourseScheduleViewer />} />
      {/* <Route path="/reset-password" element={<ResetPassScreen />} />
      <Route path="/forget-password" element={<ForgetPassScreen />} />
      <Route path="/signin" element={<Signinscreen />} />
      <Route path="/signup" element={<Signupscreen />} />
      <Route path="/verify-email" element={<Verifygscreen />} /> */}
    </Routes>
  );
};

export default AppRoutes;
