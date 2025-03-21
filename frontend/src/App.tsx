import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./utils/Routes";
import { MusicProvider } from "./context/MusicContext";
import PersistentPlayer from "./components/PersistentPlayer";

function App() {
  return (
    <MusicProvider>
      <BrowserRouter>
        <PersistentPlayer />
        <AppRoutes />
      </BrowserRouter>
    </MusicProvider>
  );
}

export default App;
