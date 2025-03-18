import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import HistoryScreen from "../pages/history_data";
import TermOfService from "../pages/termof_service";
import PolicyScreen from "../pages/policy";
import NavBar from "../components/navbar";
import SideBar from "../components/sidebar";
import Landingscreen from "../pages/Landing-page";
import NotFoundPage from "../pages/Notfound";
import SettingsScreen from "../pages/Setting";
import ContactScreen from "../pages/Contact_us";
import GeneralScreen from "../pages/General/main_general";
import AccountScreen from "../pages/General/general_account";
import PasswordScreen from "../pages/General/general_password";
import SessionScreen from "../pages/General/general_sessions";
import { useState } from "react";
import CustomCalendar from "../components/Schedule_create/Calendar";
import HistoryCustomCalendar from "../components/history-schedule/History_Calendar";

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
              : "pt-[65px] sm:pt-[65px] md:pt-[58px] lg:pt-[58px] xl:pt-[60px] 2xl:pt-[60px] ml-[10px] sm:ml-[10px] md:ml-[78px] lg:ml-[78px] xl:ml-[80px] 2xl:ml-[80px]"
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
      <Route path="/" element={<Navigate to="/generate-schedule/listview" />} />
      {/* Main screen */}
      <Route element={<MainLayout />}>
        <Route
          path="/generate-schedule/calendar"
          element={<CustomCalendar />}
        />
        <Route
          path="/generate-schedule/listview"
          element={<CustomCalendar />}
        />
        <Route
          path="/history/calendar/:id"
          element={<HistoryCustomCalendar />}
        />
        <Route
          path="/history/listview/:id"
          element={<HistoryCustomCalendar />}
        />
        <Route path="/history" element={<HistoryScreen />} />
        <Route path="/service" element={<TermOfService />} />
        <Route path="/policy" element={<PolicyScreen />} />
        <Route path="/contactus" element={<ContactScreen />} />
        <Route path="/setting" element={<SettingsScreen />} />

        <Route path="/general" element={<GeneralScreen />}>
          <Route path="account" element={<AccountScreen />} />
          <Route path="password" element={<PasswordScreen />} />
          <Route path="session" element={<SessionScreen />} />
        </Route>
      </Route>
      {/* When not yet login or signup */}
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/landing" element={<Landingscreen />} />
    </Routes>
  );
};

export default AppRoutes;
