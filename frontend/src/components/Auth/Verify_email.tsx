import "../Components-styles/login_signup_animation.css";
import { X } from "react-feather";
import PrimaryBtn from "../PrimaryBtn";
import Email from "../../assets/icons/email.svg";
import { useState } from "react";

const VerifyEmail = ({ onClose }: { onClose: () => void }) => {
  const [code, setCode] = useState(["", "", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="relative flex bg-white h-[70%] w-[80%] md:w-[60%] lg:w-[50%] md:h-[70%] lg:h-[80%] rounded-l-[12px] overflow-hidden rounded-[12px]"
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
            <img src={Email} alt="email" className="w-[100px] h-[100px]" />
            <form action="" className="flex flex-col items-center">
              <div className="flex space-x-2 mt-[20px] lg:mt-[30px]">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyPress={handleKeyPress}
                    className="otpInput rounded-[12px] border-2 border-gray-400 w-12 h-12 text-center text-[20px] md:text-[20px] lg:text-[22px] font-bold"
                  />
                ))}
              </div>
              <h1 className="text-[30px] md:text-[30px] lg:text-[32px] font-bold text-center mt-[20px] lg:mt-[30px]">
                Verification Code
              </h1>
              <p className="text-[16px] md:text-[16px] lg:text-[16px] text-center mt-[10px] lg:mt-[15px] mb-[20px]">
                For your security, we’ve sent a one-time verification code to
                your email. It will expire in 10 minutes, so enter it now to
                continue.{" "}
                <a href="" className="text-[blue] underline font-bold">
                  Resend Code
                </a>
              </p>
              <PrimaryBtn py="py-1" onClick={() => console.log(code)}>
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
