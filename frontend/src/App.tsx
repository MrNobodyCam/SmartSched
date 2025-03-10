import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/navbar";
import SideBar from "./components/sidebar";
import AppRoutes from "./utils/Routes";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <SideBar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          onScreenChange={function (): void {
            throw new Error("Function not implemented.");
          }}
        />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Navbar */}
          <NavBar toggleSidebar={toggleSidebar} />

          {/* Main Content */}
          <main
            className={`flex-1 overflow-auto pt-16 ${
              isSidebarOpen
                ? "pt-[50px] sm:pt-[50px] md:pt-[50px] lg:pt-[50px] xl:pt-[50px] 2xl:pt-[50px] md:ml-[58px] lg:ml-[58px] xl:ml-[58px] 2xl:ml-[58px]"
                : "pt-[50px] sm:pt-[50px] md:pt-[78px] lg:pt-[78px] xl:pt-[50px] 2xl:pt-[50px] ml-[-5px] md:ml-[78px] lg:ml-[78px] xl:ml-[65px] 2xl:ml-[65px]"
            }`}
          >
            <AppRoutes />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
