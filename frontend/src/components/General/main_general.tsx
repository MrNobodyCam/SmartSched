import React, { useState } from "react";
import TabButtons, { TabType } from "./3button";
import UserProfileSettings from "./general_account";
import PasswordChangeForm from "./general_password";
import SessionManagement from "./general_sessions";

const MainGeneral: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("account");

  return (
    <div className=" w-full fixed ">
      <div className="p-6">
        <TabButtons activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "account" && <UserProfileSettings />}
        {activeTab === "password" && <PasswordChangeForm />}
        {activeTab === "session" && <SessionManagement />}
      </div>
    </div>
  );
};

export default MainGeneral;
