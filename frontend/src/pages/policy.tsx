import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PrimaryBtn from "../components/PrimaryBtn";

function Policy() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      {/* Container */}
      <div className="relative w-full min-h-screen p-4 sm:p-6">
        {/* Title */}
        <h1 className="text-[30px] md:text-[32px] lg:text-[36px] font-bold text-black">
          {t("PrivacyPolicyTitle")}
        </h1>

        {/* Privacy Policy Content */}
        <div className="space-y-4 pt-3">
          {/* Information We Collect Section */}
          <div className=" ">
            <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold text-black">
              {t("InformationWeCollectTitle")}
            </h2>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-black mt-1 opacity-50">
              {t("InformationWeCollectContent")}
            </p>
          </div>

          {/* Privacy and Data Security Section */}
          <div className=" ">
            <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold text-black">
              {t("PrivacyAndDataSecurityTitle")}
            </h2>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-black mt-1 opacity-50">
              {t("PrivacyAndDataSecurityContent")}
            </p>
          </div>

          {/* How We Use Your Information Section */}
          <div className="">
            <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold text-black">
              {t("HowWeUseYourInformationTitle")}
            </h2>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-black mt-1 opacity-50">
              {t("HowWeUseYourInformationContent")}
            </p>
          </div>

          {/* Information Sharing Section */}
          <div className=" ">
            <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold text-black">
              {t("InformationSharingTitle")}
            </h2>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-black mt-1 opacity-50">
              {t("InformationSharingContent")}
            </p>
          </div>
        </div>

        {/* Back to Settings Button */}
        <div className="pt-10">
          <PrimaryBtn py="py-1" onClick={() => navigate("/setting")}>
            {t("Back")}
          </PrimaryBtn>
        </div>
      </div>
    </>
  );
}

export default Policy;
