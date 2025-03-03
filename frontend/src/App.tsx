import { useState } from "react";
import Login from "./components/SignIn";
import PrimaryBtn from "./components/PrimaryBtn";
import Signup from "./components/Signup";

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
        <Login onClose={() => setIsLoginOpen(false)} openSignUp={openSignup} />
      )}
      {isSignupOpen && (
        <Signup onClose={() => setIsSignupOpen(false)} openSignIn={openLogin} />
      )}
    </>
  );
}

export default App;
