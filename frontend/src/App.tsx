import { useState } from "react";
import Login from "./components/login";
import PrimaryBtn from "./components/PrimaryBtn";
import Signup from "./components/signup";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  const openLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <>
      <PrimaryBtn
        px="px-10 md:px-12 lg:px-4"
        py="py-1"
        onClick={() => setIsLoginOpen(true)}
      >
        Login
      </PrimaryBtn>
      <br />
      <PrimaryBtn
        px="px-10 md:px-12 lg:px-4"
        py="py-1"
        onClick={() => setIsSignupOpen(true)}
      >
        Sign Up
      </PrimaryBtn>

      {isLoginOpen && (
        <Login onClose={() => setIsLoginOpen(false)} openSignup={openSignup} />
      )}
      {isSignupOpen && (
        <Signup onClose={() => setIsSignupOpen(false)} openLogin={openLogin} />
      )}
    </>
  );
}

export default App;
