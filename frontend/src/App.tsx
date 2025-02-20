import { useState } from "react";
import NavBar from "./components/navbar";
import SideBar from "./components/sidebar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar isOpen={isSidebarOpen} />

      {/* Navbar */}
      <NavBar toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden ml-13">
        {/* Main Area */}
        <main className="flex-1 overflow-auto pt-20 px-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p>Welcome to SmartSched!</p>
        </main>
      </div>
    </div>
  );
}

export default App;

// NOTE: When have screen all use this code to switch screen
// import { useState } from "react";
// import NavBar from "./components/navbar";
// import SideBar from "./components/sidebar";
// import CalendarScreen from "./screens/CalendarScreen";
// import HistoryScreen from "./screens/HistoryScreen";
// import ServiceScreen from "./screens/ServiceScreen";
// import PrivacyScreen from "./screens/PrivacyScreen";
// import ContactScreen from "./screens/ContactScreen";
// import SettingsScreen from "./screens/SettingsScreen";

// function App() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeScreen, setActiveScreen] = useState("calendar");

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   // Function to handle screen change
//   const handleScreenChange = (screen: string) => {
//     setActiveScreen(screen);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <SideBar
//         isOpen={isSidebarOpen}
//         onScreenChange={handleScreenChange} // Pass screen change handler
//       />
//       {/* Navbar */}
//       <NavBar toggleSidebar={toggleSidebar} />
//       {/* Main Content */}
//       <div className="flex flex-col flex-1 overflow-hidden ml-13">
//         {/* Main Area */}
//         <main className="flex-1 overflow-auto pt-20 px-6">
//           {activeScreen === "calendar" && <CalendarScreen />}
//           {activeScreen === "history" && <HistoryScreen />}
//           {activeScreen === "service" && <ServiceScreen />}
//           {activeScreen === "privacy" && <PrivacyScreen />}
//           {activeScreen === "contact" && <ContactScreen />}
//           {activeScreen === "setting" && <SettingsScreen />}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;
