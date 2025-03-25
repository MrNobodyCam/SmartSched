import React, { useState } from "react";
import PrimaryBtn from "../../components/PrimaryBtn";
import { useTranslation } from "react-i18next";

const PasswordChangeForm = () => {
  const { t } = useTranslation();
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
    const hasMinLength = password.length >= 8;

    if (!hasMinLength) return t("PasswordErrorLength");
    if (!hasUpperCase) return t("PasswordErrorUpperCase");
    if (!hasNumber) return t("PasswordErrorNumber");
    if (!hasSpecialChar) return t("PasswordErrorSpecialChar");
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
          value !== formData.newPassword ? t("PasswordErrorMatch") : "",
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
            ? t("PasswordErrorMatch")
            : "",
      });
      return;
    }

    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full max-w-[500px]">
      <div className="relative">
        <div className="space-y-6">
          <form onSubmit={handleSubmit}>
            <h2 className="text-[18px] md:text-[20px] lg:text-[22px] font-bold mb-1">
              {t("ChangePassword")}
            </h2>
            <p className="text-gray-400 text-[14px] md:text-[16px] lg:text-[18px] mb-4">
              {t("PasswordRequirements")}
            </p>

            <div className="mb-4">
              <label className="block text-[18px] md:text-[20px] lg:text-[22px] mb-2 font-medium">
                {t("CurrentPassword")}
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className={`lg:w-[442px] w-full h-12 px-3 py-2 border text-[14px] md:text-[16px] lg:text-[18px] ${
                  errors.currentPassword ? "border-red-500" : "border-gray-300"
                } rounded-md bg-white`}
                placeholder={t("CurrentPassword")}
              />
              {errors.currentPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.currentPassword}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-[18px] md:text-[20px] lg:text-[22px] mb-2 font-medium">
                {t("NewPassword")}
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={`lg:w-[442px] w-full h-12 px-3 py-2 border text-[14px] md:text-[16px] lg:text-[18px] ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                } rounded-md bg-white`}
                placeholder={t("NewPassword")}
              />
              {errors.newPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.newPassword}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-[18px] md:text-[20px] lg:text-[22px]  mb-2 font-medium">
                {t("ConfirmPassword")}
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`lg:w-[442px] w-full h-12 px-3 py-2 border text-[14px] md:text-[16px] lg:text-[18px]  ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-md bg-white`}
                placeholder={t("ConfirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <div>
              <PrimaryBtn py="py-1">{t("Update")}</PrimaryBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeForm;
