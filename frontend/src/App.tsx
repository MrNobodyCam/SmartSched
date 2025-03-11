import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./utils/Routes";

function App() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [activeScreen, setActiveScreen] = useState("calendar"); // Default to "calendar"

  // // Function to toggle the sidebar
  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  // // Function to handle screen change
  // const handleScreenChange = (screen: string) => {
  //   setActiveScreen(screen);
  //   setIsSidebarOpen(false); // Close the sidebar after selecting a screen
  // };

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
