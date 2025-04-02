import React, { useState } from "react";
import PrimaryBtn from "../../components/PrimaryBtn";
import { fetchUpdateData } from "../../service/api"; // Assuming this is the function for API calls
import { X } from "react-feather";
import Loading from "../../components/Alert/Loading";

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

  const [alertMessage, setAlertMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const validatePassword = (password: string) => {
    // const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    // const hasSpecialChar = /[!@#$%^&*()]/.test(password);
    const hasMinLength = password.length >= 8;

    if (!hasMinLength) return "Password must be at least 8 characters long";
    // if (!hasUpperCase)
    //   return "Password must contain at least one uppercase letter";
    if (!hasNumber) return "Password must contain at least one number";
    // if (!hasSpecialChar)
    //   return "Password must contain at least one special character (!@#$%^&*())";
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

  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
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

    try {
      setLoading(true);
      const response = await fetchUpdateData("changePassword", {
        id: localStorage.getItem("id"),
        old_password: formData.currentPassword,
        new_password: formData.newPassword,
        new_password_confirmation: formData.confirmPassword,
      });

      if (response.message === "Password changed successfully") {
        setAlertMessage({
          type: "success",
          message: "Password changed successfully!",
        });

        // Reset form fields
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setAlertMessage({
          type: "error",
          message: response.error || "Failed to change password",
        });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setAlertMessage({
        type: "error",
        message:
          "An error occurred while changing the password. Please try again.",
      });
    } finally {
      setLoading(false);
    }

    // Hide alert after 3 seconds
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };
  if (loading) {
    return <Loading text="Change Your Password... Just a moment! 🚀⏳" />;
  }
  return (
    <div className="w-full max-w-[500px]">
      <div className="relative">
        <div className="space-y-6">
          {alertMessage && (
            <div
              className={`fixed top-16 right-4 p-4 rounded-md z-400 ${
                alertMessage.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {alertMessage.message}
              <button
                onClick={() => setAlertMessage(null)}
                className="ml-4 text-sm font-bold"
              >
                <X className="cursor-pointer"></X>
              </button>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <h2 className="text-[18px] md:text-[20px] lg:text-[22px] font-bold mb-1">
              Change Password
            </h2>
            <p className="text-gray-400 text-[14px] md:text-[16px] lg:text-[18px] mb-4">
              Your password must include at least one special character from
              !@#$%^&*(). Please update your password to meet this requirement.
            </p>

            <div className="mb-4">
              <label className="block text-[18px] md:text-[20px] lg:text-[22px] mb-2 font-medium">
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
              <label className="block text-[18px] md:text-[20px] lg:text-[22px] mb-2 font-medium">
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
              <label className="block text-[18px] md:text-[20px] lg:text-[22px]  mb-2 font-medium">
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
              <PrimaryBtn
                py="py-1"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Update
              </PrimaryBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeForm;
