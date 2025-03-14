function TermOfService() {
  return (
    <>
      {/* Container */}
      <div className="relative w-full min-h-screen p-4 sm:p-6">
        {/* Title */}
        <h1 className="text-[30px] md:text-[32px] lg:text-[36px] font-bold text-black">
          Terms of Service
        </h1>

        {/* Terms Content */}
        <div className="space-y-4">
          {/* Acceptance of Terms Section */}
          <div className="rounded-lg shadow-lg p-3 sm:p-4">
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
          <div className="rounded-lg shadow-lg p-3 sm:p-4">
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
          <div className="rounded-lg shadow-lg p-3 sm:p-4">
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
      </div>
    </>
  );
}

export default TermOfService;
