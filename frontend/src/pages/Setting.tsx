import { SetStateAction, useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SettingsPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [desktopNotifications, setDesktopNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [ThemeMode, setThemeMode] = useState(true);
  const [language, setLanguage] = useState(
    i18n.language === "en" ? "English" : "Khmer"
  );
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const languages = ["English", "Khmer"];

  const handleLanguageSelect = (language: SetStateAction<string>) => {
    setLanguage(language);
    setIsLanguageDropdownOpen(false);
    i18n.changeLanguage(language === "English" ? "en" : "km");
  };

  const handleDesktopToggle = () => {
    const newState = !desktopNotifications;
    setDesktopNotifications(newState);
    alert(`Desktop Notifications turned ${newState ? "On" : "Off"}`);
  };

  const handleEmailToggle = () => {
    const newState = !emailNotifications;
    setEmailNotifications(newState);
    alert(`Email Notifications turned ${newState ? "On" : "Off"}`);
  };

  return (
    <div
      className={`flex h-screen ${
        ThemeMode ? "bg-white" : "bg-gray-900 text-white"
      }`}
    >
      <div className="flex-1 flex flex-col">
        <main className="p-4 md:p-6">
          {/* Header */}
          <h1 className="text-[30px] md:text-[32px] lg:text-[36px] font-bold mb-4 md:mb-6">
            {t("Setting")}
          </h1>
          {/* Account */}

          <div>
            <div
              className="p-3 md:p-4 border border-[#A5A5A5] rounded-[12px] flex justify-between items-center cursor-pointer mb-4"
              onClick={() => navigate("/setting/account")}
            >
              <div>
                <p className="text-[20px] md:text-[22px] lg:text-[24px]">
                  {t("Account")}
                </p>
                <p className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-500">
                  {t("EditProfile")}
                </p>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
          </div>

          {/* Desktop */}
          <div className="p-3 md:p-4 border border-[#A5A5A5] rounded-[12px] flex justify-between items-center cursor-pointer mb-4">
            <div>
              <p className="text-[20px] md:text-[22px] lg:text-[24px]">
                {t("DesktopNotification")}
              </p>
              <p className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-500">
                {t("CustomizeDesktop")}
              </p>
            </div>
            <div
              onClick={handleDesktopToggle}
              className={`w-11 h-5 md:w-12 md:h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                desktopNotifications ? "bg-[#2D9CDB]" : "bg-gray-400"
              }`}
            >
              <div
                className={`bg-white w-3 h-3 md:w-4 md:h-4 rounded-full shadow-md transform transition-transform ${
                  desktopNotifications ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </div>
          </div>
          {/* Email */}
          <div className="p-3 md:p-4 border border-[#A5A5A5] rounded-[12px] flex justify-between items-center cursor-pointer mb-4">
            <div>
              <p className="text-[20px] md:text-[22px] lg:text-[24px]">
                {t("EmailNotification")}
              </p>
              <p className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-500">
                {t("CustomizeEmail")}
              </p>
            </div>
            <div
              onClick={handleEmailToggle}
              className={`w-11 h-5 md:w-12 md:h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                emailNotifications ? "bg-[#2D9CDB]" : "bg-gray-400"
              }`}
            >
              <div
                className={`bg-white w-3 h-3 md:w-4 md:h-4 rounded-full shadow-md transform transition-transform ${
                  emailNotifications ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </div>
          </div>
          {/* Theme */}
          <div className="p-3 md:p-4 border border-[#A5A5A5] rounded-[12px] flex justify-between items-center cursor-pointer mb-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[20px] md:text-[22px] lg:text-[24px]">
                  {t("Appearance")}
                </p>
                <p className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-500">
                  ({ThemeMode ? "White" : "Dark"})
                </p>
              </div>
              <p className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-500">
                {t("CustomizeAppearance")}
              </p>
            </div>
            <div
              onClick={() => setThemeMode(!ThemeMode)}
              className={`w-11 h-5 md:w-12 md:h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                ThemeMode ? "bg-[#2D9CDB]" : "bg-gray-400"
              }`}
            >
              <div
                className={`bg-white w-3 h-3 md:w-4 md:h-4 rounded-full shadow-md transform transition-transform ${
                  ThemeMode ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </div>
          </div>
          {/* Language*/}
          <div className="p-3 md:p-4 border border-[#A5A5A5] rounded-[12px] flex justify-between items-center cursor-pointer mb-4">
            <div>
              <p className="text-[20px] md:text-[22px] lg:text-[24px]">
                {t("Language")}
              </p>
              <p className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-500">
                {t("CustomizeAppearance")}
              </p>
            </div>
            <div className="relative">
              <div
                className={`p-2  ${
                  ThemeMode ? "border-[#A5A5A5]" : "border-gray-600"
                } rounded-[12px] ${
                  ThemeMode ? "bg-white" : "bg-gray-800"
                } cursor-pointer flex items-center justify-between`}
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
              >
                <span
                  className={`text-[14px] md:text-[16px] lg:text-[18px] ${
                    ThemeMode ? "text-black" : "text-white"
                  }`}
                >
                  {language}
                </span>
                <ChevronDown
                  className={`ml-2 ${
                    ThemeMode ? "text-gray-400" : "text-gray-300"
                  }`}
                />
              </div>
              {isLanguageDropdownOpen && (
                <div
                  className={`absolute top-full right-0 mt-2 w-full ${
                    ThemeMode ? "bg-white" : "bg-gray-800"
                  } border ${
                    ThemeMode ? "border-[#A5A5A5]" : "border-gray-600"
                  } rounded-[12px] shadow-lg z-10`}
                >
                  {languages.map((language) => (
                    <div
                      key={language}
                      className={`p-2 hover:bg-gray-100 cursor-pointer text-[14px] md:text-[16px] lg:text-[18px] ${
                        ThemeMode
                          ? "text-black"
                          : "text-white hover:bg-gray-700"
                      }`}
                      onClick={() => handleLanguageSelect(language)}
                    >
                      {language}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Terms of Service */}
          <div
            className="p-3 md:p-4 border border-[#A5A5A5] rounded-[12px] flex justify-between items-center cursor-pointer mb-4"
            onClick={() => navigate("/service")}
          >
            <div>
              <p className="text-[20px] md:text-[22px] lg:text-[24px]">
                {t("TermsOfService")}
              </p>
              <p className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-500">
                {t("ReadTerms")}
              </p>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>
          {/* Privacy Policy */}
          <div
            className="p-3 md:p-4 border border-[#A5A5A5] rounded-[12px] flex justify-between items-center cursor-pointer mb-4"
            onClick={() => navigate("/policy")}
          >
            <div>
              <p className="text-[20px] md:text-[22px] lg:text-[24px]">
                {t("PrivacyPolicy")}
              </p>
              <p className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-500">
                {t("ReadPrivacy")}
              </p>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>
        </main>
      </div>
    </div>
  );
}

export default SettingsPage;
