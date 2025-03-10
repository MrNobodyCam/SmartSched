function Policy() {
  return (
    <>
      {/* Container */}
      <div className="relative w-full min-h-screen p-4 sm:p-6">
        {/* Title */}
        <h1 className="text-[30px] md:text-[32px] lg:text-[36px] font-bold text-black">
          Privacy Policy
        </h1>

        {/* Privacy Policy Content */}
        <div className=" space-y-4">
          {/* Information We Collect Section */}
          <div className="rounded-lg shadow-lg p-3 sm:p-4">
            <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold text-black">
              Information We Collect
            </h2>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-black mt-1 opacity-50">
              We collect and store user information to enhance the scheduling
              experience and improve the functionality of our calendar
              application. This includes personal details such as name and
              email, calendar events, device information, and usage data. If
              location access is enabled, we may use it for time zone
              adjustments and location-based reminders. All collected data is
              handled securely and in accordance with our privacy policy. Users
              have control over their data and can manage permissions at any
              time.
            </p>
          </div>

          {/* Privacy and Data Security Section */}
          <div className="rounded-lg shadow-lg p-3 sm:p-4">
            <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold text-black">
              Privacy and Data Security
            </h2>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-black mt-1 opacity-50">
              We value your privacy and are committed to protecting your
              personal data. The calendar application collects and stores user
              information solely for enhancing the scheduling experience. All
              data is encrypted and handled in accordance with our privacy
              policy. Users are responsible for maintaining the confidentiality
              of their login credentials. Unauthorized access or data breaches
              should be reported immediately.
            </p>
          </div>

          {/* How We Use Your Information Section */}
          <div className="rounded-lg shadow-lg p-3 sm:p-4">
            <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold text-black">
              How We Use Your Information
            </h2>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-black mt-1 opacity-50">
              We use the information collected to provide, improve, and
              personalize your scheduling experience. This includes managing
              your calendar events, sending reminders, optimizing performance,
              and enhancing security. Location data (if enabled) helps with time
              zone adjustments and location-based notifications. We do not sell
              your personal data, and all information is handled in accordance
              with our privacy policy to ensure a secure and reliable service.
            </p>
          </div>

          {/* Information Sharing Section */}
          <div className="rounded-lg shadow-lg p-3 sm:p-4">
            <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold text-black">
              Information Sharing
            </h2>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-black mt-1 opacity-50">
              We do not sell, rent, or share your personal information with
              third parties for marketing purposes. Your data is only shared in
              limited cases, such as when integrating with third-party services
              (e.g., syncing with external calendars) with your permission. We
              may also share information when required by law, to protect our
              users, or to ensure the security of our services. All data sharing
              follows strict privacy and security measures to safeguard your
              information.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Policy;
