import SecondaryBtn from "./SecondaryBtn";
import Google from "../assets/icons/Google.svg";
import Facebook from "../assets/icons/Facebook.svg";
import PrimaryBtn from "./PrimaryBtn";

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
const Signup = ({
  onClose,
  openSignUp,
}: {
  onClose: () => void;
  openSignUp: () => void;
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="flex bg-white h-[80%] w-[80%] md:w-[80%] lg:w-[80%] lg:h-[90%] rounded-l-[12px] overflow-hidden rounded-[12px]"
        onClick={(e) => e.stopPropagation()}
      >
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
            action="#"
            className="w-[75%] my-[20px] md:w-[55%] flex flex-col items-center"
          >
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="text-[14px] md:text-[16px] lg:text-[18px] w-[100%] px-3 h-[35px] md:h-[40px] bg-[#e3e3e3] font-[600] rounded-[12px]"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="text-[14px] my-[20px] md:text-[16px] lg:text-[18px] w-[100%] px-3 h-[35px] md:h-[40px] bg-[#e3e3e3] font-[600] rounded-[12px]"
            />
            <PrimaryBtn px="px-[30%]" py="py-1">
              SIGN UP
            </PrimaryBtn>
          </form>
        </div>
        <div className="slideInFromRight w-[100%] md:w-[45%] lg:w-[45%] bg-[#2D9CDB] hidden sm:flex flex-col items-center justify-center text-center p-6 rounded-l-[130px]">
          <h1 className="text-[36px] md:text-[30px] sm:text-[28px] font-bold text-white">
            Hello Friend!
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-white w-[70%] mt-3 mb-5">
            Register with your personal detail to use all of site features
          </p>
          <SecondaryBtn
            border="white"
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

export default Signup;

// const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [isSignupOpen, setIsSignupOpen] = useState(false);

//   const openSignup = () => {
//     setIsLoginOpen(false);
//     setIsSignupOpen(true);
//   };

//   const openLogin = () => {
//     setIsSignupOpen(false);
//     setIsLoginOpen(true);
//   };

//   return (
//     <>
//       <PrimaryBtn
//         px="px-10 md:px-12 lg:px-4"
//         py="py-1"
//         onClick={() => setIsLoginOpen(true)}
//       >
//         Login
//       </PrimaryBtn>
//       <br />
//       <PrimaryBtn
//         px="px-10 md:px-12 lg:px-4"
//         py="py-1"
//         onClick={() => setIsSignupOpen(true)}
//       >
//         Sign Up
//       </PrimaryBtn>

//       {isLoginOpen && (
//         <Login onClose={() => setIsLoginOpen(false)} openSignUp={openSignup} />
//       )}
//       {isSignupOpen && (
//         <Signup onClose={() => setIsSignupOpen(false)} openSignIn={openLogin} />
//       )}
//     </>
//   );
