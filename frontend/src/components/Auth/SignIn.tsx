import SecondaryBtn from "../SecondaryBtn";
import Google from "../../assets/icons/Google.svg";
import Facebook from "../../assets/icons/Facebook.svg";
import PrimaryBtn from "../PrimaryBtn";
import { X } from "react-feather";
import { useState } from "react";
import { signin } from "../../service/api";

const Card: React.FC<{
  icon?: string;
  label?: string;
  onClick?: () => void;
  background?: string;
  img_width?: string;
  py?: string;
  pl?: string;
  pr?: string;
}> = ({
  icon,
  label,
  onClick,
  py = "py-[16px]",
  pr = "pr-[16px]",
  pl = "pl-[16px]",
  img_width = "w-[28px]",
  background = "bg-white",
}) => (
  <div
    onClick={onClick}
    className={`border-[3px] border-[#A5A5A5] ${pr} ${pl} ${py} rounded-[12px] ${background} cursor-pointer`}
  >
    <img src={icon} alt="icon" className={`${img_width}`} />
    {label}
  </div>
);

const SignIn = ({
  onClose,
  openSignUp,
  openForgotPassword,
}: {
  onClose: () => void;
  openSignUp: () => void;
  openForgotPassword: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {

      try {
        const response = await signin({
          email,
          hash_password: password,
        });
        console.log("Sign In Response:", response);

        // set Access Token
        localStorage.setItem("access_token", response.access_token);
      } catch (error) {
        console.error("Sign In Error:", error);
      }

      console.log("Email:", email);
      console.log("Password:", password);
      alert("Sign In Successful");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative flex py-[40px] sm:py-0 bg-white w-[80%] md:w-[80%] lg:w-[80%] rounded-l-[12px] overflow-hidden rounded-[12px]">
        <X
          className="absolute top-0 right-0 m-3 z-[100] cursor-pointer text-black md:text-white lg:text-white"
          size={28}
          strokeWidth={3}
          onClick={onClose}
        />
        <div className="slideInFromLeft w-[100%] md:w-[55%] lg:w-[55%] flex flex-col justify-center items-center">
          <h1 className="text-[30px] md:text-[34px] lg:text-[32px] font-bold text-center">
            Access Your Account
          </h1>
          <div className="flex my-[20px]">
            <Card
              icon={Google}
              py="py-[14px] md:py-[16px]"
              pl="pl-[14px] md:pl-[16px]"
              pr="pr-[14px] md:pr-[16px]"
              img_width="w-[20px] md:w-[28px]"
            />
            <div className="m-[20px]"></div>
            <Card
              background="bg-[#4267B2]"
              py="py-[12px] md:py-[14px]"
              pl="pl-[10px] md:pl-[14px]"
              pr="pr-[14px] md:pr-[19px]"
              img_width="w-[22px] md:w-[28px]"
              icon={Facebook}
            />
          </div>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] text-[#A5A5A5]">
            or use your email password
          </p>
          <form
            onSubmit={handleSubmit}
            className="w-[75%] my-[20px] md:w-[55%] flex flex-col items-center"
          >
            <input
              required
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
            <input
              required
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-[14px] mt-[10px] md:text-[16px] lg:text-[18px] w-[100%] px-3 h-[35px] md:h-[40px] bg-[#e3e3e3] font-[600] rounded-[12px]"
            />
            {passwordError && (
              <p className="text-red-500 text-[12px] md:text-[14px] lg:text-[16px]">
                {passwordError}
              </p>
            )}
            <a
              onClick={openForgotPassword}
              className="cursor-pointer w-[100%] text-end my-3 font-semibold text-[14px] md:text-[16px] lg:text-[18px] text-[blue]"
            >
              Forgot Password
            </a>
            <PrimaryBtn px="px-15 md:px-15" py="py-1" type="submit">
              SIGN IN
            </PrimaryBtn>
          </form>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] flex sm:hidden">
            Don't have account?
            <a
              className="cursor-pointer ml-2 text-[blue] underline font-semibold"
              onClick={() => {
                onClose();
                openSignUp();
              }}
            >
              Sign up
            </a>
          </p>
        </div>
        <div className="slideInFromRight w-[100%] md:w-[45%] lg:w-[45%] py-[190px] bg-[#2D9CDB] hidden sm:flex flex-col items-center justify-center text-center rounded-l-[130px]">
          <h1 className="text-[36px] md:text-[30px] sm:text-[28px] font-bold text-white">
            Hello Friend!
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-white w-[70%] mt-3 mb-5">
            Register with your personal detail to use all of site features
          </p>
          <SecondaryBtn
            borderColor="white"
            color="white"
            px="px-15 md:px-15"
            py="py-1"
            onClick={() => {
              onClose();
              openSignUp();
            }}
          >
            SIGN UP
          </SecondaryBtn>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
