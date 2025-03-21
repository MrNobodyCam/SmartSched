import "../Components-styles/login_signup_animation.css";
import { X } from "react-feather";
import PrimaryBtn from "../PrimaryBtn";
import Email from "../../assets/icons/email.svg";
import { useState, useRef } from "react";
import { verifyEmail, resendOtp } from "../../service/api";

const VerifyEmail = ({
  onClose,
  openResetPasswordOpen,
  openSignIn,
  fromResetPassword,
}: {
  onClose: () => void;
  openResetPasswordOpen: () => void;
  openSignIn: () => void;
  fromResetPassword?: boolean;
}) => {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [codeError, setCodeError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/[0-9]/.test(value) && value !== "") return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to the next input if the current one is filled
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let valid = true;

    if (code.includes("")) {
      setCodeError("All fields are required");
      valid = false;
    } else {
      setCodeError("");
    }

    if (valid) {
      console.log("Verification Code:", code.join(""));

      const email = localStorage.getItem("email");

      if (email) {
        const response = verifyEmail({
          email: email,
          otp: code.join(""),
        });
        console.log("Verification response:", response);
        response
          .then((res) => {
            console.log("Verification response:", res);
            if (res.success) {
              console.log("Verification successful");
              localStorage.clear();
              onClose();
              openSignIn();
            } else {
              setCodeError(res.message || "Verification failed");
            }
          })
          .catch((error) => {
            console.error("Verification error:", error);
            setCodeError(
              "An error occurred during verification. Please try again."
            );
          });
      } else {
        setCodeError("Email not found. Please try again.");
      }

      if (fromResetPassword) {
        openResetPasswordOpen();
      }
      //  else {
      //   openSignIn();
      // }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="relative flex bg-white w-[90%] sm:w-[80%] md:w-[60%] lg:w-[45%] rounded-l-[12px] overflow-hidden rounded-[12px] py-5"
        onClick={(e) => e.stopPropagation()}
      >
        <X
          className="absolute top-0 right-0 m-3 z-[100] cursor-pointer text-black md:text-black lg:text-black"
          size={28}
          strokeWidth={3}
          onClick={() => {
            localStorage.clear();
            onClose();
          }}
        />
        <div className="w-[100%] flex justify-center items-center">
          <div className="w-[90%] md:w-[80%] lg:w-[80%] flex flex-col justify-center items-center">
            <img
              src={Email}
              alt="email"
              className="w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
            />
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <div className="flex space-x-2 mt-[20px] lg:mt-[30px]">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="otpInput rounded-[12px] border-2 border-gray-400 w-10 h-10 md:w-12 md:h-12 text-center text-[18px] md:text-[20px] lg:text-[22px] font-bold"
                  />
                ))}
              </div>
              {codeError && (
                <p className="text-red-500 text-[12px] md:text-[14px] lg:text-[16px] mt-[10px]">
                  {codeError}
                </p>
              )}
              <h1 className="text-[24px] md:text-[30px] lg:text-[32px] font-bold text-center mt-[10px]">
                Verification Code
              </h1>
              <p className="text-[14px] md:text-[16px] lg:text-[18px] text-center mt-[10px] lg:mt-[15px] mb-[20px]">
                For your security, we’ve sent a one-time verification code to
                your email. It will expire in 90 second, so enter it now to
                continue.{" "}
                <a
                  href="#"
                  className="text-[blue] underline font-bold"
                  onClick={(e) => {
                    e.preventDefault();
                    const email = localStorage.getItem("email");
                    if (email) {
                      const response = resendOtp(email);
                      console.log("Resend OTP response:", response);
                    } else {
                      console.error("Email not found. Cannot resend OTP.");
                    }
                  }}
                >
                  Resend Code
                </a>
              </p>
              <PrimaryBtn py="py-1" px="px-8" type="submit">
                Confirm Code
              </PrimaryBtn>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
