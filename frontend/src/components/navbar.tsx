import notificationIcon from "../assets/icons/notification.svg";
import profilePic from "../assets/images/profile.svg";

interface NavBarProps {
  toggleSidebar: () => void;
}

function NavBar({ toggleSidebar }: NavBarProps) {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-[#D5F0FF] z-50 flex items-center justify-between px-4 md:px-8">
      {/* Navbar Left Section */}
      <div className="flex items-center space-x-4">
        {/* Hamburger Menu Button */}
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
        <h1 className="text-lg font-bold text-gray-800">SmartSched</h1>
      </div>

      {/* Navbar Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <img
            src={notificationIcon}
            alt="Notifications"
            className="w-6 h-6 cursor-pointer"
          />
          {/* Notification Badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            10+
          </span>
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
