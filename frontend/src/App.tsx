import { useState } from "react";
import NavBar from "./components/navbar";
import SideBar from "./components/sidebar";
import CalendarScreen from "./pages/calendar";
import HistoryScreen from "./pages/history";
// import ServiceScreen from "./screens/ServiceScreen";
// import PrivacyScreen from "./screens/PrivacyScreen";
// import ContactScreen from "./screens/ContactScreen";
// import SettingsScreen from "./screens/SettingsScreen";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState("calendar");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to handle screen change
  const handleScreenChange = (screen: string) => {
    setActiveScreen(screen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar
        isOpen={isSidebarOpen}
        onScreenChange={handleScreenChange} // Pass screen change handler
        toggleSidebar={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      {/* Navbar */}
      <NavBar toggleSidebar={toggleSidebar} />
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden ml-13">
        {/* Main Area */}
        <main
          className={`flex-1 overflow-auto  ${
            activeScreen === "calendar"
              ? "pt-[78px] ml-[28px]"
              : "pt-[109px] ml-[43px]"
          }`}
        >
          {activeScreen === "calendar" && <CalendarScreen />}
          {activeScreen === "history" && <HistoryScreen />}
          {/* {activeScreen === "service" && <ServiceScreen />}
          {activeScreen === "privacy" && <PrivacyScreen />}
          {activeScreen === "contact" && <ContactScreen />}
          {activeScreen === "setting" && <SettingsScreen />} */}
        </main>
      </div>
    </div>
  );
}

export default App;
