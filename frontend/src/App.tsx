import { useState } from "react";
import Login from "./components/login";
import PrimaryBtn from "./components/PrimaryBtn";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <PrimaryBtn
        px="px-10 md:px-12 lg:px-4"
        py="py-1"
        onClick={() => setIsLoginOpen(true)}
      >
        Login
      </PrimaryBtn>

      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
    </>
  );
}

export default App;
