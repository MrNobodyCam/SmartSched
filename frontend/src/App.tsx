import { useState } from "react";
import NavBar from "./components/navbar";
import SideBar from "./components/sidebar";
import HistoryScreen from "./pages/history_data";
import CalendarScreen from "./components/generate-schedule";
import TermOfService from "./pages/termof_service";
import PolicyScreen from "./pages/policy";
// Uncomment these imports when the screens are ready
// import CalendarScreen from "./pages/calendar";
// import HistoryScreen from "./pages/history";
// import ServiceScreen from "./screens/ServiceScreen";
// import PrivacyScreen from "./screens/PrivacyScreen";
// import ContactScreen from "./screens/ContactScreen";
// import SettingsScreen from "./screens/SettingsScreen";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState("calendar"); // Default to "calendar"

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to handle screen change
  const handleScreenChange = (screen: string) => {
    setActiveScreen(screen);
    setIsSidebarOpen(false); // Close the sidebar after selecting a screen
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar
        isOpen={isSidebarOpen}
        onScreenChange={handleScreenChange} // Pass screen change handler
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <NavBar toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <main
          className={`flex-1 overflow-auto pt-16 ${
            activeScreen === "calendar"
              ? "pt-[50px] sm:pt-[50px] md:pt-[50px] lg:pt-[50px] xl:pt-[50px] 2xl:pt-[50px] md:ml-[58px] lg:ml-[58px] xl:ml-[58px] 2xl:ml-[58px]"
              : "pt-[50px] sm:pt-[50px] md:pt-[78px] lg:pt-[78px] xl:pt-[50px] 2xl:pt-[50px] ml-[-5px] md:ml-[78px] lg:ml-[78px] xl:ml-[78px] 2xl:ml-[78px]"
          }`}
        >
          {/* Dynamically Render Screens Based on Active Screen */}
          {activeScreen === "calendar" && <CalendarScreen />}
          {activeScreen === "history" && <HistoryScreen />}
          {activeScreen === "service" && <TermOfService />}
          {activeScreen === "privacy" && <PolicyScreen />}
          {activeScreen === "contact" && <h1>Contact Screen</h1>}
          {activeScreen === "setting" && <h1>Settings Screen</h1>}
        </main>
      </div>
    </div>
  );
}

export default App;
