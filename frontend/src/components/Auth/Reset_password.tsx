import "../Components-styles/login_signup_animation.css";
import { X } from "react-feather";
import PrimaryBtn from "../PrimaryBtn";
import Password from "../../assets/icons/reset-password.svg";
import { useState } from "react";
import { fetchPostData } from "../../service/api";
import Loading from "../Alert/Loading";

const ResetPassword = ({
  onClose,
  openSignIn,
}: {
  onClose: () => void;
  openSignIn: () => void;
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()]/.test(password);
    const hasMinLength = password.length >= 8;

    if (!hasMinLength) return "Password must be at least 8 characters long";
    if (!hasUpperCase)
      return "Password must contain at least one uppercase letter";
    if (!hasNumber) return "Password must contain at least one number";
    if (!hasSpecialChar)
      return "Password must contain at least one special character (!@#$%^&*())";
    return "";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let valid = true;

    // Validate password
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      valid = false;
    } else {
      setPasswordError("");
    }

    // Validate confirm password
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (valid) {
      try {
        setLoading(true);
        const response = await fetchPostData(`update-password`, {
          id: localStorage.getItem("id"),
          new_password: password,
          new_password_confirmation: confirmPassword,
        });
        console.log("Password reset response:", response);
      } catch (error) {
        console.error("Error resetting password:", error);
      } finally {
        setLoading(false);
        setPassword("");
        setConfirmPassword("");
        setPasswordError("");
        setConfirmPasswordError("");
      }
      onClose();
      openSignIn();
    }
  };
  if (loading) {
    return <Loading text="Resetting your password... Just a moment! 🚀⏳" />;
  }
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="relative flex bg-white w-[90%] sm:w-[80%] md:w-[60%] lg:w-[42%] rounded-l-[12px] overflow-hidden rounded-[12px] py-10"
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
              alt="password"
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
              onSubmit={handleSubmit}
              className="flex flex-col items-center w-[80%] sm:w-[70%] md:w-[60%] lg:w-[60%]"
            >
              <input
                required
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-[14px] md:text-[16px] lg:text-[18px] w-[100%] px-3 h-[35px] md:h-[40px] bg-[#e3e3e3] font-[600] rounded-[12px]"
              />
              {passwordError && (
                <p className="text-red-500 text-[12px] md:text-[14px] lg:text-[16px]">
                  {passwordError}
                </p>
              )}
              <input
                required
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="text-[14px] mt-[10px]  md:text-[16px] lg:text-[18px] w-[100%] px-3 h-[35px] md:h-[40px] bg-[#e3e3e3] font-[600] rounded-[12px]"
              />
              {confirmPasswordError && (
                <p className="text-red-500 text-[12px] md:text-[14px] lg:text-[16px] mb-[10px]">
                  {confirmPasswordError}
                </p>
              )}
              <PrimaryBtn py="py-1" px="px-8 mt-[10px]" type="submit">
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
