import React, { useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import profileImage from "../assets/images/cat.jpg"; // Adjust path as needed

const UserProfileSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="w-screen h-screen flex items-start justify-start bg-green-700 p-10">
      <div className="w-full max-w-4xl h-auto p-6 bg-orange-500 rounded shadow">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6">General</h1>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link
            to="/account"
            className={`py-2 px-4 rounded-full font-bold transition ${
              activeTab === "account" ? "bg-[#2D9CDB] text-white" : "bg-white text-black hover:bg-[#2D9CDB]"
            }`}
            onClick={() => setActiveTab("account")}
          >
            Account
          </Link>

          <Link
            to="/password"
            className={`py-2 px-4 rounded-full font-bold transition ${
              activeTab === "password" ? "bg-[#2D9CDB] text-white" : "bg-white text-black hover:bg-[#2D9CDB]"
            }`}
            onClick={() => setActiveTab("password")}
          >
            Password
          </Link>

          <Link
            to="/session"
            className={`py-2 px-4 rounded-full font-bold transition ${
              activeTab === "session" ? "bg-[#2D9CDB] text-white" : "bg-white text-black hover:bg-[#2D9CDB]"
            }`}
            onClick={() => setActiveTab("session")}
          >
            Session
          </Link>
        </div>

        {/* Profile Picture  */}
        <div className="w-full mb-6 flex flex-col items-start bg-white mt-4">
          <span className="text-gray-700 font-medium mb-2">Profile Photo</span>
          <div className="relative group">
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full transition transform"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <UserProfileSettings />
  </Router>
);

export default App;
