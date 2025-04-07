import NotificationPopup from "./NotificationPopup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchGetRequestData } from "../service/api";
interface UserProfile {
  fullName: string;
  gender: string;
  email: string;
  timezone: string;
  profilePhoto: string | null;
}
function NavBar({
  toggleSidebar,
  notifications,
  unreadCount,
}: {
  toggleSidebar: () => void;
  notifications: any[];
  unreadCount: number;
}) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "",
    gender: "",
    email: "",
    timezone: "",
    profilePhoto: null,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchGetRequestData(`user`, {
          id: localStorage.getItem("id"),
        });

        // Map backend data to match the profile state structure
        setProfile({
          fullName: data.data.full_name || "",
          gender: data.data.gender || "",
          email: data.data.email || "",
          timezone: data.data.time_zone || "",
          profilePhoto: data.data.profilePhoto || null,
        });

        console.log("Mapped Profile Data:", {
          fullName: data.full_name,
          gender: data.gender,
          email: data.email,
          timezone: data.time_zone,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetch();
  }, []);
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
        <div className="w-12 h-12 lg:w-12 lg:h-12 rounded-full bg-gray-300 cursor-pointer">
          {profile.profilePhoto ? (
            <img
              onClick={() => navigate("/setting/account")}
              src={profile.profilePhoto}
              alt="Profile"
              className="w-full h-full rounded-full"
            />
          ) : (
            <div
              onClick={() => navigate("/setting/account")}
              className="w-full h-full flex items-center justify-center cursor-pointer"
            >
              <svg
                className="w-6 h-10 md:w-8 md:h-8 text-gray-400"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
