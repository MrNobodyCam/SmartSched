import { useState } from "react";
import Login from "./components/Auth/SignIn";
import PrimaryBtn from "./components/PrimaryBtn";
import Signup from "./components/Auth/Signup";
import VerifyEmail from "./components/Auth/Verify_email";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);

  const openSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
    setIsVerifyOpen(false);
  };

  const openLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
    setIsVerifyOpen(false);
  };
  const openVerifyEmail = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(false);
    setIsVerifyOpen(true);
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
        <Signup
          onClose={() => setIsSignupOpen(false)}
          openSignIn={openLogin}
          openVerifyEmail={openVerifyEmail}
        />
      )}
      {isVerifyOpen && <VerifyEmail onClose={() => setIsVerifyOpen(false)} />}
    </>
  );
}

export default App;
