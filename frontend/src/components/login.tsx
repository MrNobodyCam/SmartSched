import { X } from "lucide-react";
import SecondaryBtn from "./SecondaryBtn";

const Login = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="flex bg-white h-[80%] w-[90%] md:w-[80%] lg:w-[70%] rounded-l-[12px] overflow-hidden rounded-[12px]">
        <div className="w-[45%] bg-[#2D9CDB] hidden sm:flex flex-col items-center justify-center text-center p-6 rounded-r-[130px]">
          <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>
          <p className="text-sm md:text-base lg:text-lg text-white w-[70%] mt-3 mb-5">
            To keep connected with us, please log in with your personal info.
          </p>
          <SecondaryBtn
            border="white"
            color="white"
            px="px-10 md:px-20 sm-200"
            py="py-1"
          >
            SIGN IN
          </SecondaryBtn>
        </div>
      </div>
    </div>
  );
};

export default Login;
