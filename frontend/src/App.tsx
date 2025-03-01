import NotificationPopup from "./components/NotificationPopup";
import HistoryScreen from "./pages/history_data";
import GenerateSchedule from "./components/generate-schedule";
function App() {
  return (
    <>
      <div className="flex flex-row justify-center min-h-screen space-x-4">
        <NotificationPopup />
      </div>
    </>
  );
}

export default App;
