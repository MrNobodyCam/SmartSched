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
    // More sessions can be added here
  ];

  return (
    <div className="bg-green-600 min-h-screen">
      <div className="bg-pink-600 relative">
        <div className="space-y-6 -mt-1">
          <h2 className="text-xl font-semibold mb-1">Sessions</h2>
          <p className="text-gray-500 text-sm mb-6">
            Below are your recent sessions, revoke access to log out of the
            device
          </p>

          {/* Sessions Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium pb-2">Platform</th>
                  <th className="text-left font-medium pb-2">Device</th>
                  <th className="text-left font-medium pb-2">Last Used</th>
                  <th className="text-left font-medium pb-2">Access</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session) => (
                  <tr key={session.id} className="border-b hover:bg-gray-50">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionManagement;
