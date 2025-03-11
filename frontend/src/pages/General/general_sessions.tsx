import React from "react";

const SessionManagement = () => {
  // Sample session data - this would come from your backend in a real app
  const sessions = [
    {
      id: 1,
      platform: "Browser",
      device: "Windows Chrome",
      lastUsed: "an hour ago",
      access: "Current Sessions",
    },
    {
      id: 2,
      platform: "Mobile",
      device: "iPhone Safari",
      lastUsed: "2 days ago",
      access: "Active",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="relative">
        <div className="space-y-6 mt-5 mx-4 md:ml-5">
          <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold mb-1">
            Sessions
          </h2>
          <p className="text-gray-400 text-[14px] md:text-[16px] lg:text-[18px] mb-6">
            Below are your recent sessions, revoke access to log out of the
            device
          </p>

          {/* Sessions Table/Cards */}
          <div className="overflow-x-auto">
            {/* Desktop Table - Hidden on Mobile */}
            <table className="w-full hidden sm:table">
              <thead>
                <tr className="border-b text-gray-400 text-[14px] md:text-[16px] lg:text-[18px]">
                  <th className="text-left font-medium pb-2">Platform</th>
                  <th className="text-left font-medium pb-2">Device</th>
                  <th className="text-left font-medium pb-2">Last Used</th>
                  <th className="text-left font-medium pb-2">Access</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session) => (
                  <tr
                    key={session.id}
                    className="border-b text-[14px] md:text-[16px] lg:text-[18px]"
                  >
                    <td className="py-4">{session.platform}</td>
                    <td className="py-4">{session.device}</td>
                    <td className="py-4">{session.lastUsed}</td>
                    <td className="py-4 flex items-center justify-between">
                      <span>{session.access}</span>
                      {session.access !== "Current Sessions" && (
                        <button className="text-red-500 hover:text-red-700">
                          Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Cards */}
            <div className="sm:hidden space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-lg shadow p-4 border"
                >
                  <div className="divide-y divide-gray-200">
                    <div className="flex justify-between items-center py-3">
                      <span className="font-medium text-gray-600">
                        Platform
                      </span>
                      <span>{session.platform}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="font-medium text-gray-600">Device</span>
                      <span>{session.device}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="font-medium text-gray-600">
                        Last Used
                      </span>
                      <span>{session.lastUsed}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="font-medium text-gray-600">Access</span>
                      <div className="flex items-center gap-2">
                        <span>{session.access}</span>
                        {session.access !== "Current Sessions" && (
                          <button className="text-red-500 hover:text-red-700 text-sm px-2 py-1">
                            Revoke
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionManagement;
