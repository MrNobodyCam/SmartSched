import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./utils/Routes";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
