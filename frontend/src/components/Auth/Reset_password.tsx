import "../Components-styles/login_signup_animation.css";
import { X } from "react-feather";
import PrimaryBtn from "../PrimaryBtn";
import Password from "../../assets/icons/reset-password.svg";

const ResetPassword = ({
  onClose,
  openSignIn,
}: {
  onClose: () => void;
  openSignIn: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="relative flex bg-white h-[70%] w-[90%] sm:w-[80%] md:w-[60%] lg:w-[42%] lg:h-[70%] rounded-l-[12px] overflow-hidden rounded-[12px]"
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
              src={Password}
              alt="email"
              className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] mb-3"
            />
            <h1 className="text-[24px] md:text-[30px] lg:text-[32px] font-bold text-center">
              Reset Password
            </h1>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-center mt-[10px] lg:mt-[15px] mb-[20px]">
              Set a new password for your account. Use at least 8 characters,
              including uppercase, lowercase, and numbers for better security.
            </p>
            <form
              action=""
              className="flex flex-col items-center w-[80%] sm:w-[70%] md:w-[60%] lg:w-[60%]"
            >
              <input
                type="password"
                name="password"
                placeholder="Confirm Password"
                className="text-[14px] mb-[20px] md:text-[16px] lg:text-[18px] w-[100%] px-3 h-[35px] md:h-[40px] bg-[#e3e3e3] font-[600] rounded-[12px]"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="text-[14px] mb-[20px] md:text-[16px] lg:text-[18px] w-[100%] px-3 h-[35px] md:h-[40px] bg-[#e3e3e3] font-[600] rounded-[12px]"
              />
              <PrimaryBtn
                py="py-1"
                px="px-8"
                onClick={() => {
                  onClose();
                  openSignIn();
                }}
              >
                Reset Password
              </PrimaryBtn>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
