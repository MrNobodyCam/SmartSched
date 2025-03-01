import SecondaryBtn from "./SecondaryBtn";

const Signup = ({
  onClose,
  openLogin,
}: {
  onClose: () => void;
  openLogin: () => void;
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="flex bg-white h-[80%] w-[80%] md:w-[80%] lg:w-[70%] rounded-l-[12px] overflow-hidden rounded-[12px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[100%] flex justify-end">
          <div className="slideInFromRight w-[45%] bg-[#2D9CDB] hidden sm:flex flex-col items-center justify-center text-center p-6 rounded-l-[130px]">
            <h1 className="text-3xl font-bold text-white">Hello Friend!</h1>
            <p className="text-sm md:text-base lg:text-lg text-white w-[70%] mt-3 mb-5">
              Register with your personal detail to use all of site features
            </p>
            <SecondaryBtn
              border="white"
              color="white"
              px="px-10 md:px-20 sm-200"
              py="py-1"
              onClick={() => {
                onClose();
                openLogin();
              }}
            >
              SIGN UP
            </SecondaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
