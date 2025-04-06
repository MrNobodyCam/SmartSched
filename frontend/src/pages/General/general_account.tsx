import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa"; // or the correct path to the FaTimes component
import PrimaryBtn from "../../components/PrimaryBtn";
import SecondaryBtn from "../../components/SecondaryBtn";
import { useNavigate } from "react-router-dom";
import {
  fetchGetRequestData,
  fetchUpdateData,
  fetchDeleteData,
} from "../../service/api";
import { X } from "react-feather";
interface UserProfile {
  fullName: string;
  gender: string;
  email: string;
  timezone: string;
  profilePhoto: string | null;
}

const UserProfileSettings: React.FC = () => {
  const navigator = useNavigate();
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
          fullName: data.data.full_name,
          gender: data.data.gender,
          email: data.data.email,
          timezone: data.data.time_zone,
          profilePhoto: data.data.profilePhoto,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetch();
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "",
    gender: "",
    email: "",
    timezone: "",
    profilePhoto: null,
  });
  const [confirmEmail, setConfirmEmail] = useState("");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const onEditProfile = async () => {
    try {
      const response = await fetchUpdateData(`editUser`, {
        id: localStorage.getItem("id"),
        full_name: profile.fullName,
        gender: profile.gender,
        email: profile.email,
        time_zone: profile.timezone,
        profilePhoto: profile.profilePhoto,
      });

      console.log("Profile Image", profile.profilePhoto);

      console.log("Profile updated successfully:", response);

      // Optionally update the profile state with the response data
      setProfile((prev) => ({
        ...prev,
        fullName: response.user.full_name,
        gender: response.user.gender,
        email: response.user.email,
        timezone: response.user.time_zone,
      }));

      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error("Error updating profile:", error);
      setAlertMessage({
        type: "error",
        message: "Failed to update profile. Please try again.",
      });
    }
  };
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];

    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setAlertMessage({
        type: "error",
        message: "File is too large. Maximum size is 5MB.",
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      setAlertMessage({
        type: "error",
        message: "Only image files are allowed.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({
        ...prev,
        profilePhoto: reader.result as string,
      }));
      setAlertMessage({
        type: "success",
        message: "Image uploaded successfully!",
      });
    };
    reader.onerror = () => {
      setAlertMessage({
        type: "error",
        message: "Error reading file. Please try again.",
      });
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
    // Log all profile data being updated
    console.log("=== Profile Update Operation ===");
    console.log("Full Name:", profile.fullName);
    console.log("Gender:", profile.gender);
    console.log("Email:", profile.email);
    console.log("Timezone:", profile.timezone);
    console.log("Has Profile Photo:", !!profile.profilePhoto);
    console.log("================================");
  };

  const handleDeletePhoto = () => {
    console.log("=== Deleting Profile Photo ===");
    setProfile((prev) => {
      console.log("Removing photo from profile");
      return {
        ...prev,
        profilePhoto: null,
      };
    });
    console.log("Profile photo deleted successfully");
  };

  const handleDeleteAccount = async () => {
    if (confirmEmail !== profile.email) {
      console.log("Delete account failed: Email confirmation mismatch");
      console.log("Provided email:", confirmEmail);
      console.log("Account email:", profile.email);
      setAlertMessage({
        type: "error",
        message: "Email confirmation does not match your account email",
      });
      return;
    }

    console.log("=== Account Deletion Request ===");
    console.log("Account email:", confirmEmail);
    console.log("Account data to be deleted:", profile);
    console.log("==============================");
    try {
      await fetchDeleteData(`deleteUser/${localStorage.getItem("id")}`);

      setAlertMessage({
        type: "success",
        message: "Profile delete successfully!",
      });

      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error("Error delete profile:", error);
      setAlertMessage({
        type: "error",
        message: "Failed to delete profile. Please try again.",
      });
    }

    setAlertMessage({
      type: "success",
      message: "Account deletion request submitted",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUpdateProfile();
  };

  const handleDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleDeleteAccount();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-[800px]">
      {alertMessage && (
        <div
          className={`fixed top-16 right-4 p-4 rounded-md z-400 ${
            alertMessage.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {alertMessage.message}
          <button
            onClick={() => setAlertMessage(null)}
            className="ml-4 text-sm font-bold"
          >
            <X className="cursor-pointer"></X>
          </button>
        </div>
      )}
      <div className="relative">
        <div className="p-6">
          <div className="space-y-6 -mt-5">
            {/* Profile Photo Section */}
            <div>
              <p className="text-[20px] md:text-[22px] lg:text-[24px] font-bold mb-2 text-center lg:text-left">
                Profile Photo
              </p>
              <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-4">
                <div className="w-15 h-15 md:w-20 md:h-20 lg:w-25 lg:h-25  rounded-full bg-gray-300 overflow-hidden mb-4 md:mb-0">
                  {profile.profilePhoto ? (
                    <img
                      src={profile.profilePhoto}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-12 h-12 md:w-10 md:h-10 text-gray-400"
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
                <div className="flex justify-center md:justify-start space-x-2 lg:mt-8">
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                  <div className="">
                    <PrimaryBtn onClick={triggerFileInput} py="py-1">
                      Upload Image
                    </PrimaryBtn>
                  </div>
                  {profile.profilePhoto && (
                    <SecondaryBtn
                      py="py-1"
                      borderColor="#EB5757"
                      color="#EB5757"
                      extraContent={
                        <FaTimes className="w-[16px] md:w-[18px] lg:w-[20px]" />
                      }
                      onClick={handleDeletePhoto}
                    >
                      Delete
                    </SecondaryBtn>
                  )}
                </div>
              </div>
              {uploadError && (
                <p className="text-red-500 text-sm mt-2">{uploadError}</p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 ">
              {/* Form Fields */}
              <div className="flex flex-col sm:flex-row gap-6 ">
                <div className="flex flex-col gap-6 w-full sm:flex-row ">
                  <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full sm:w-[442px] h-12 px-3 border rounded-md text-[18px] font-medium "
                    required
                  />
                  <div className="hidden sm:block">
                    <select
                      name="gender"
                      value={profile.gender}
                      onChange={handleInputChange}
                      className="w-full sm:w-[208px] h-12 px-3 border rounded-md text-[18px] font-medium cursor-pointer"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="sm:hidden">
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  placeholder="Input your email"
                  className="w-full h-12 px-3 border rounded-md text-[18px] font-medium"
                  required
                />
              </div>

              <div className="sm:hidden">
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleInputChange}
                  className="w-full h-12 px-3 border rounded-md text-[18px] font-medium cursor-pointer"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              <div className="sm:hidden">
                <select
                  name="timezone"
                  value={profile.timezone}
                  onChange={handleInputChange}
                  className="w-full h-12 px-3 border rounded-md text-[18px] font-medium cursor-pointer"
                  required
                >
                  <option value="">Select Timezone</option>
                  <option value="Asia/Bangkok">Bangkok (+07:00)</option>
                  <option value="Asia/Singapore">Singapore (+08:00)</option>
                  <option value="America/New_York">New York (-05:00)</option>
                  <option value="Europe/London">London (+00:00)</option>
                  <option value="Europe/Paris">Paris (+01:00)</option>
                  <option value="Australia/Sydney">Sydney (+10:00)</option>
                </select>
              </div>

              <div className="hidden sm:flex gap-6">
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  placeholder="Input your email"
                  className="w-[442px] h-12 px-3 border rounded-md text-[18px] font-medium"
                  required
                />
                <select
                  name="timezone"
                  value={profile.timezone}
                  onChange={handleInputChange}
                  className="w-[442px] h-12 px-3 border rounded-md text-[18px] font-medium cursor-pointer"
                  required
                >
                  <option value="">Select Timezone</option>
                  <option value="Asia/Bangkok">Bangkok (+07:00)</option>
                  <option value="Asia/Singapore">Singapore (+08:00)</option>
                  <option value="America/New_York">New York (-05:00)</option>
                  <option value="Europe/London">London (+00:00)</option>
                  <option value="Europe/Paris">Paris (+01:00)</option>
                  <option value="Australia/Sydney">Sydney (+10:00)</option>
                </select>
              </div>

              <div className="pt-4">
                <PrimaryBtn
                  onClick={() => {
                    onEditProfile();
                  }}
                  py="py-1"
                  type="submit"
                >
                  Update
                </PrimaryBtn>
              </div>
            </form>

            {/* Delete Account Section */}
            <div className="mt-12 pt-6">
              <h2 className="text-[24px] font-bold text-black-900 mb-2">
                Delete Account
              </h2>
              <p className="text-gray-400 mb-4 text-[18px]">
                Once you delete your account and account data, there is no going
                back.
                <br />
                <span className="text-gray-400 font-bold">
                  Delete your account and account data
                </span>
              </p>
              <form onSubmit={handleDeleteSubmit}>
                <div className="mb-4">
                  <input
                    type="email"
                    value={confirmEmail}
                    onChange={handleConfirmEmailChange}
                    placeholder="Confirm Email"
                    className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-[18px]"
                    required
                  />
                </div>
                <PrimaryBtn
                  onClick={() => {
                    handleDeleteAccount();
                  }}
                  type="submit"
                  py="py-1"
                  background={confirmEmail ? "#EB5757" : "#FFAFAF"}
                >
                  Delete Account
                </PrimaryBtn>
              </form>
            </div>
            <div className="pt-4 ">
              <PrimaryBtn py="py-1" onClick={() => navigator("/setting")}>
                Back
              </PrimaryBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSettings;
