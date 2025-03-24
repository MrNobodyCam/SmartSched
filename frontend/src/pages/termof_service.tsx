import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PrimaryBtn from "../components/PrimaryBtn";

function TermOfService() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      {/* Container */}
      <div className="relative w-full min-h-screen p-4 sm:p-6">
        {/* Title */}
        <h1 className="text-[30px] md:text-[32px] lg:text-[36px] font-bold text-black">
          {t("TermsOfServiceTitle")}
        </h1>

        {/* Terms Content */}
        <div className="space-y-4 pt-3">
          {/* Acceptance of Terms Section */}
          <div className=" ">
            <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold text-black">
              {t("AcceptanceOfTermsTitle")}
            </h2>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-black mt-1 opacity-50">
              {t("AcceptanceOfTermsContent")}
            </p>
          </div>

          {/* Description of Services Section */}
          <div className=" ">
            <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold text-black">
              {t("DescriptionOfServicesTitle")}
            </h2>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-black mt-1 opacity-50">
              {t("DescriptionOfServicesContent")}
            </p>
          </div>

          {/* User Conduct Section */}
          <div className=" ">
            <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold text-black">
              {t("UserConductTitle")}
            </h2>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-black mt-1 opacity-50">
              {t("UserConductContent")}
            </p>
          </div>
        </div>

        <div className="pt-10">
          <PrimaryBtn py="py-1" onClick={() => navigate("/setting")}>
            {t("Back")}
          </PrimaryBtn>
        </div>
      </div>
    </>
  );
}

export default TermOfService;
