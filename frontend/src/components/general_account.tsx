import React, { useState, ChangeEvent, useRef } from "react";

interface UserProfile {
  fullName: string;
  gender: string;
  email: string;
  timezone: string;
  profilePhoto: string | null;
}

type TabType = "account" | "password" | "session";

const UserProfileSettings: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<TabType>("account");
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "",
    gender: "",
    email: "",
    timezone: "",
    profilePhoto: null,
  });
  const [confirmEmail, setConfirmEmail] = useState("");
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];

    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File is too large. Maximum size is 5MB.");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Only image files are allowed.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({
        ...prev,
        profilePhoto: reader.result as string,
      }));
    };
    reader.onerror = () => {
      setUploadError("Error reading file. Please try again.");
    };
    reader.readAsDataURL(file);

    // Reset file input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmEmail(e.target.value);
  };

  const handleUpdateProfile = () => {
    // Implement API call to update profile
    console.log("Updating profile:", profile);
    alert("Profile updated successfully!");
  };

  const handleDeletePhoto = () => {
    setProfile((prev) => ({
      ...prev,
      profilePhoto: null,
    }));
  };

  const handleDeleteAccount = () => {
    // Implement account deletion logic
    if (confirmEmail !== profile.email) {
      alert("Email confirmation does not match your account email");
      return;
    }
    console.log("Deleting account. Confirmation email:", confirmEmail);
    alert("Account deletion request submitted");
  };

  return (
    <div className="w-full min-h-screen bg-green-900 p-6">
      <div className="w-full h-full bg-orange-700 rounded-lg shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">General</h1>

          <div className="flex gap-4 mb-6">
            {["account", "password", "session"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as TabType)}
                className={`py-2 px-4 rounded-full font-medium transition-colors
                  ${
                    activeTab === tab
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "account" && (
            <div className="space-y-6">
              {/* Profile Photo Section */}
              <div>
                <p className="font-medium mb-2">Profile Photo</p>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                    {profile.profilePhoto ? (
                      <img
                        src={profile.profilePhoto}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-gray-400"
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
                  <div className="flex space-x-2">
                    <label className="cursor-pointer">
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileUpload}
                      />
                      <span className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Upload Image
                      </span>
                    </label>
                    {profile.profilePhoto && (
                      <button
                        onClick={handleDeletePhoto}
                        className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 flex items-center"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Delete
                      </button>
                    )}
                  </div>
                </div>
                {uploadError && (
                  <p className="text-red-500 text-sm mt-2">{uploadError}</p>
                )}
              </div>

              <div className="space-y-6">
                {/* Form Fields */}
                <div className="flex gap-6">
                  <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-[442px] h-12 px-3 border rounded-md"
                  />
                  <select
                    name="gender"
                    value={profile.gender}
                    onChange={handleInputChange}
                    className="w-[208px] h-12 px-3 border rounded-md bg-white"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                <div className="flex gap-6">
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    placeholder="Input your email"
                    className="w-[442px] h-12 px-3 border rounded-md"
                  />
                  <select
                    name="timezone"
                    value={profile.timezone}
                    onChange={handleInputChange}
                    className="w-[442px] h-12 px-3 border rounded-md bg-white"
                  >
                    <option value="">Select timezone</option>
                    <option value="Asia/Phnom_Penh">Phnom Penh (+07:00)</option>
                    <option value="Asia/Singapore">Singapore (+08:00)</option>
                    <option value="America/New_York">New York (-05:00)</option>
                    <option value="Europe/London">London (+00:00)</option>
                    <option value="Europe/Paris">Paris (+01:00)</option>
                    <option value="Australia/Sydney">Sydney (+10:00)</option>
                  </select>
                </div>
              </div>
              {/* booom */}
              <div className="pt-4">
                <button
                  onClick={handleUpdateProfile}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
              </div>

              {/* Delete Account Section */}
              <div className="mt-12 pt-6">
                <h2 className="text-xl font-bold text-red-600 mb-2">
                  Delete Account
                </h2>
                <p className="text-gray-600 mb-4">
                  Once you delete your account and account data, there is no
                  going back.
                  <br />
                  <span className="font-medium">
                    Delete your account and account data
                  </span>
                </p>
                <div className="mb-4">
                  <input
                    type="email"
                    value={confirmEmail}
                    onChange={handleConfirmEmailChange}
                    placeholder="Confirm Email"
                    className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="px-6 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileSettings;
