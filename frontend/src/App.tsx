import { useState } from "react";
import Login from "./components/Auth/SignIn";
import PrimaryBtn from "./components/PrimaryBtn";
import Signup from "./components/Auth/Signup";
import VerifyEmail from "./components/Auth/Verify_email";
import ForgotPassword from "./components/Auth/Forgot_password";
import ResetPassword from "./components/Auth/Reset_password";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [fromResetPassword, setFromResetPassword] = useState(false);
  const openSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
    setFromResetPassword(false);
  };

  const openLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };
  const openVerifyEmail = () => {
    setIsSignupOpen(false);
    setIsVerifyOpen(true);
  };

  const openForgotPassword = () => {
    setIsForgotPasswordOpen(true);
    setIsLoginOpen(false);
    setFromResetPassword(true);
  };
  const openResetPasswordOpen = () => {
    setIsVerifyOpen(false);
    setIsResetPasswordOpen(true);
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
        <Login
          onClose={() => setIsLoginOpen(false)}
          openSignUp={openSignup}
          openForgotPassword={openForgotPassword}
        />
      )}
      {isSignupOpen && (
        <Signup
          onClose={() => setIsSignupOpen(false)}
          openSignIn={openLogin}
          openVerifyEmail={openVerifyEmail}
        />
      )}
      {isVerifyOpen && (
        <VerifyEmail
          onClose={() => setIsVerifyOpen(false)}
          openResetPasswordOpen={openResetPasswordOpen}
          openSignIn={openLogin}
          fromResetPassword={fromResetPassword}
        />
      )}
      {isForgotPasswordOpen && (
        <ForgotPassword
          onClose={() => setIsForgotPasswordOpen(false)}
          openVerifyEmail={openVerifyEmail}
        />
      )}
      {isResetPasswordOpen && (
        <ResetPassword
          onClose={() => setIsResetPasswordOpen(false)}
          openSignIn={openLogin}
        />
      )}
    </>
  );
}

export default App;
