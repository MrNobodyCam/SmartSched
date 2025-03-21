import SecondaryBtn from "../SecondaryBtn";
import "../Components-styles/login_signup_animation.css";
// import Google from "../../assets/icons/Google.svg";
// import Facebook from "../../assets/icons/Facebook.svg";
import PrimaryBtn from "../PrimaryBtn";
import { X } from "react-feather";
import { useState } from "react";
import { signup } from "../../service/api";
import Loading from "../Alert/Loading";

// const Card: React.FC<{
//   icon?: string;
//   label?: string;
//   onClick?: () => void;
//   background?: string;
//   img_width?: string;
//   py?: string;
//   pl?: string;
//   pr?: string;
// }> = ({
//   icon,
//   label,
//   onClick,
//   py = "py-[16px]",
//   pr = "pr-[16px]",
//   pl = "pl-[16px]",
//   img_width = "w-[28px]",
//   background = "bg-white",
// }) => (
//   <div
//     onClick={onClick}
//     className={`border-[3px] border-[#A5A5A5] ${pr} ${pl} ${py} rounded-[12px] ${background} cursor-pointer`}
//   >
//     <img src={icon} alt="icon" className={`${img_width}`} />
//     {label}
//   </div>
// );

const Signup = ({
  onClose,
  openSignIn,
  openVerifyEmail,
}: {
  onClose: () => void;
  openSignIn: () => void;
  openVerifyEmail: () => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
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
      setPasswordError("Password must be at least 8 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (valid) {
      try {
        setLoading(true);
        const response = await signup({
          full_name: name,
          email: email,
          hash_password: password,
        });

        console.log("status", response.status);
        console.log("Signup response:", response);
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Password:", password);

        if (response.success) {
          console.log("Verification successful");
          localStorage.setItem("email", email);
          onClose();
          openVerifyEmail();
        } else if (response.email) {
          setEmailError("The email has already been taken.");
        }
      } catch (error) {
        console.error("Signup Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  if (loading) {
    return <Loading text="Creating your account... Just a moment! 🚀⏳" />;
  }
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative flex bg-white py-[40px] sm:py-0 w-[80%] md:w-[80%] lg:w-[80%] rounded-l-[12px] overflow-hidden rounded-[12px]">
        <X
          className="absolute top-0 right-0 m-3 z-[100] cursor-pointer text-black md:text-black lg:text-black"
          size={28}
          strokeWidth={3}
          onClick={onClose}
        />
        <div className="slideInFromLeft z-10 py-[189px] w-[100%] md:w-[45%] lg:w-[45%] bg-[#2D9CDB] hidden sm:flex flex-col items-center justify-center text-center rounded-r-[130px]">
          <h1 className="text-[30px] md:text-[34px] lg:text-[32px] font-bold text-white text-center">
            Welcome Back!
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-white w-[70%] mt-3 mb-5">
            To keep connected with us, please log in with your personal info.
          </p>
          <SecondaryBtn
            borderColor="white"
            color="white"
            px="px-15 md:px-15"
            py="py-1"
            onClick={() => {
              onClose();
              openSignIn();
            }}
          >
            SIGN IN
          </SecondaryBtn>
        </div>
        <div className="slideInFromRight w-[100%] md:w-[55%] lg:w-[55%] flex flex-col justify-center items-center">
          <h1 className="text-[30px] md:text-[34px] lg:text-[32px] font-bold">
            Create Account
          </h1>
          {/* <div className="flex my-[20px]">
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
          </div> */}
          <p className="text-[14px] md:text-[16px] lg:text-[18px] text-[#A5A5A5]">
            or use your email for registration
          </p>
          <form
            onSubmit={handleSubmit}
            className="w-[75%] md:w-[55%] flex flex-col items-center"
          >
            <input
              required
              type="text"
              placeholder="Full Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-[14px] md:text-[16px] lg:text-[18px] w-[100%] px-3 h-[35px] md:h-[40px] bg-[#e3e3e3] font-[600] rounded-[12px] mt-[10px]"
            />
            <input
              required
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-[14px] md:text-[16px] lg:text-[18px] w-[100%] px-3 h-[35px] md:h-[40px] bg-[#e3e3e3] font-[600] rounded-[12px] mt-[10px]"
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
              className="text-[14px] md:text-[16px] lg:text-[18px] w-[100%] px-3 h-[35px] md:h-[40px] bg-[#e3e3e3] font-[600] rounded-[12px] mt-[10px]"
            />
            {passwordError && (
              <p className="text-red-500 text-[12px] md:text-[14px] lg:text-[16px]">
                {passwordError}
              </p>
            )}
            <input
              required
              type="password"
              name="cf_password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="text-[14px] md:text-[16px] lg:text-[18px] w-[100%] px-3 h-[35px] md:h-[40px] bg-[#e3e3e3] font-[600] rounded-[12px] mt-[10px]"
            />
            {confirmPasswordError && (
              <p className="text-red-500 text-[12px] md:text-[14px] lg:text-[16px]">
                {confirmPasswordError}
              </p>
            )}
            <PrimaryBtn px="px-15 md:px-15 mt-[10px]" py="py-1" type="submit">
              SIGN UP
            </PrimaryBtn>
          </form>
          <p className="my-2 flex sm:hidden text-[14px] md:text-[16px] lg:text-[18px]">
            Already have account?
            <a
              className="cursor-pointer text-[blue] underline font-semibold ml-2"
              onClick={() => {
                onClose();
                openSignIn();
              }}
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
