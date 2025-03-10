import React, { useState } from "react";

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
    const hasHash = /#/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasMinLength) return "Password must be at least 6 characters long";
    if (!hasUpperCase)
      return "Password must contain at least one uppercase letter";
    if (!hasNumber) return "Password must contain at least one number";
    if (!hasHash) return "Password must contain a # symbol";
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
    <div className="bg-green-600 min-h-screen">
      <div className=" bg-pink-600 relative ">
        <div className="space-y-6 -mt-1">
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-1 text-white">
              Change Password
            </h2>
            <p className="text-gray-300 text-sm mb-6">
              Password must contain: uppercase letter, number, and # symbol
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-white">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className={`w-[442px] h-12 px-3 py-2 border ${
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
              <label className="block text-sm font-medium mb-2 text-white">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={`w-[442px] h-12 px-3 py-2 border ${
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
              <label className="block text-sm font-medium mb-2 text-white">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-[442px] h-12 px-3 py-2 border ${
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

            <button
              type="submit"
              className=" bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md w-[125px] h-12 "
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeForm;
