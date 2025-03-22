import NotificationPopup from "./NotificationPopup";
import profilePic from "../assets/images/profile.svg";

function NavBar({
  toggleSidebar,
  notifications,
  unreadCount,
}: {
  toggleSidebar: () => void;
  notifications: any[];
  unreadCount: number;
}) {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-[#D5F0FF] z-50 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center space-x-4">
        <button
          className="btn btn-square btn-ghost p-1 md:hidden cursor-pointer"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Brand Name */}
        <h1 className="text-[22px] md:text-[24px] lg:text-[26px] font-bold text-gray-800">
          SmartSched
        </h1>
      </div>

      {/* Navbar Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <NotificationPopup
            NotificationData={notifications}
            UnreadCount={unreadCount}
          />
        </div>

        {/* Profile Picture */}
        <div className="profile">
          <img
            src={profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
}

export default NavBar;
