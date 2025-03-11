import "../Components-styles/login_signup_animation.css";
import { X } from "react-feather";
import PrimaryBtn from "../PrimaryBtn";
import Email from "../../assets/icons/email-1-svgrepo-com.svg";
import { useState } from "react";

const ForgotPassword = ({
  onClose,
  openVerifyEmail,
}: {
  onClose: () => void;
  openVerifyEmail: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let valid = true;

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (valid) {
      console.log("Email:", email);
      onClose();
      openVerifyEmail();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="relative flex bg-white w-[90%] sm:w-[80%] md:w-[60%] lg:w-[42%] rounded-l-[12px] overflow-hidden rounded-[12px] py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <X
          className="absolute top-0 right-0 m-3 z-[100] cursor-pointer text-black md:text-black lg:text-black"
          size={28}
          strokeWidth={3}
          onClick={onClose}
        />
        <div className="w-[100%] flex justify-center items-center">
          <div className="w-[90%] md:w-[80%] lg:w-[80%] flex flex-col justify-center items-center">
            <img
              src={Email}
              alt="email"
              className="w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
            />
            <h1 className="text-[24px] md:text-[30px] lg:text-[32px] font-bold text-center">
              Forget password
            </h1>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-center mt-[10px] lg:mt-[15px] mb-[20px]">
              For security reasons, we need to verify your email before
              resetting your password. Enter your email address, and we’ll send
              a one-time code.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center w-[80%] sm:w-[70%] md:w-[60%] lg:w-[60%]"
            >
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-[14px] md:text-[16px] lg:text-[18px] w-[100%] px-3 h-[35px] md:h-[40px] bg-[#e3e3e3] font-[600] rounded-[12px]"
              />
              {emailError && (
                <p className="text-red-500 text-[12px] md:text-[14px] lg:text-[16px]">
                  {emailError}
                </p>
              )}
              <PrimaryBtn py="py-1 mt-[20px]" px="px-8" type="submit">
                Confirm Email
              </PrimaryBtn>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
