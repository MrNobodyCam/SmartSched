import React, { useState } from "react";
import PrimaryBtn from "../../components/PrimaryBtn";


const PasswordChangeForm = () => {
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasMinLength) return "Password must be at least 6 characters long";
    if (!hasUpperCase)
      return "Password must contain at least one uppercase letter";
    if (!hasNumber) return "Password must contain at least one number";
    if (!hasSpecialChar) return "Password must contain a spicafic symbol";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "newPassword") {
      const passwordError = validatePassword(value);
      setErrors((prev) => ({ ...prev, newPassword: passwordError }));
    }

    if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          value !== formData.newPassword ? "Passwords do not match" : "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordError = validatePassword(formData.newPassword);

    if (passwordError || formData.newPassword !== formData.confirmPassword) {
      setErrors({
        currentPassword: "",
        newPassword: passwordError,
        confirmPassword:
          formData.newPassword !== formData.confirmPassword
            ? "Passwords do not match"
            : "",
      });
      return;
    }

    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen">
      <div className=" relative ">
        <div className="space-y-6 lg:mt-5 lg:ml-5">
          <form onSubmit={handleSubmit}>
            <h2 className=" text-[20px] md:text-[22px] lg:text-[24px] font-bold mb-1">
              Change Password
            </h2>
            <p className="text-gray-400 text-[14px] md:text-[16px] lg:text-[18px] mb-4">
              Your password must include at least one special character from
              !@#$%^&*(). Please update your password to meet this requirement.{" "}
            </p>

            <div className="mb-4">
              <label className="block text-[20px] md:text-[22px] lg:text-[24px] mb-2 ">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className={`lg:w-[442px] w-full h-12 px-3 py-2 border text-[14px] md:text-[16px] lg:text-[18px] ${
                  errors.currentPassword ? "border-red-500" : "border-gray-300"
                } rounded-md bg-white`}
                placeholder="Current Password"
              />
              {errors.currentPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.currentPassword}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-[20px] md:text-[22px] lg:text-[24px] mb-2 ">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={`lg:w-[442px] w-full h-12 px-3 py-2 border text-[14px] md:text-[16px] lg:text-[18px] ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                } rounded-md bg-white`}
                placeholder="New Password"
              />
              {errors.newPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.newPassword}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-[20px] md:text-[22px] lg:text-[24px]  mb-2 ">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`lg:w-[442px] w-full h-12 px-3 py-2 border text-[14px] md:text-[16px] lg:text-[18px]  ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-md bg-white`}
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <div>
              <PrimaryBtn py="py-1"> Update </PrimaryBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeForm;
