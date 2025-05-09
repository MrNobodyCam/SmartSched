import { useNavigate } from "react-router-dom";
import PrimaryBtn from "../components/PrimaryBtn";

function TermOfService() {
  const navigate = useNavigate();

  return (
    <>
      {/* Container */}
      <div className="relative w-full min-h-screen p-4 sm:p-6">
        {/* Title */}
        <h1 className="text-[30px] md:text-[32px] lg:text-[36px] font-bold text-black">
          Terms of Service
        </h1>

        {/* Terms Content */}
        <div className="space-y-4 pt-3">
          {/* Acceptance of Terms Section */}
          <div className=" ">
            <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold text-black">
              Acceptance of Terms
            </h2>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-black mt-1 opacity-50">
              By accessing or using this calendar application, you acknowledge
              and agree to the terms and conditions set forth by the provider.
              These terms include the proper use of scheduling features, data
              privacy policies, and any updates made to improve functionality.
              Continued use of the calendar signifies your acceptance of these
              terms.
            </p>
          </div>

          {/* Description of Services Section */}
          <div className=" ">
            <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold text-black">
              Description of Services
            </h2>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-black mt-1 opacity-50">
              Our calendar application provides users with an intuitive platform
              to schedule, manage, and track events efficiently. With features
              such as event reminders, recurring event scheduling, and
              synchronization across devices, users can stay organized
              effortlessly. The service also includes customizable notifications
              and sharing options, allowing seamless collaboration for personal
              and professional planning.
            </p>
          </div>

          {/* User Conduct Section */}
          <div className=" ">
            <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold text-black">
              User Conduct
            </h2>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-black mt-1 opacity-50">
              Users are expected to use the calendar application responsibly and
              ethically. Any misuse, including but not limited to spamming
              events, sharing false information, or unauthorized access to
              others' schedules, is strictly prohibited. Users must respect
              privacy settings and refrain from any activities that may disrupt
              the functionality of the service. Violation of these guidelines
              may result in account suspension or termination.
            </p>
          </div>
        </div>

        <div className="pt-10">
          <PrimaryBtn py="py-1" onClick={() => navigate("/setting")}>
            Back
          </PrimaryBtn>
        </div>
      </div>
    </>
  );
}

export default TermOfService;
