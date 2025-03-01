import { useState } from "react";
import NavBar from "./components/navbar";
import SideBar from "./components/sidebar";
import HistoryScreen from "./pages/history_data";
import CalendarScreen from "./components/generate-schedule";

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
          className={`flex-1 overflow-auto ${
            activeScreen === "calendar"
              ? "pt-[72px] ml-[78px]"
              : "pt-[109px] ml-[123px]"
          }`}
        >
          {/* Dynamically Render Screens Based on Active Screen */}
          {activeScreen === "calendar" && <CalendarScreen />}
          {activeScreen === "history" && <HistoryScreen />}
          {activeScreen === "service" && <h1>Service Screen</h1>}
          {activeScreen === "privacy" && <h1>Privacy Screen</h1>}
          {activeScreen === "contact" && <h1>Contact Screen</h1>}
          {activeScreen === "setting" && <h1>Settings Screen</h1>}
        </main>
      </div>
    </div>
  );
}

export default App;
