import { useTranslation } from "react-i18next";

const SessionManagement = () => {
  const { t } = useTranslation();

  // Sample session data - this would come from your backend in a real app
  const sessions = [
    {
      id: 1,
      platform: t("Platform"),
      device: "Windows Chrome",
      lastUsed: t("an hour ago"),
      access: t("CurrentSessions"),
    },
    {
      id: 2,
      platform: t("Platform"),
      device: "iPhone Safari",
      lastUsed: t("2 days ago"),
      access: t("Active"),
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="relative">
        <div className="space-y-6 mt-5 mx-4 md:ml-5">
          <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold mb-1">
            {t("Sessions")}
          </h2>
          <p className="text-gray-400 text-[14px] md:text-[16px] lg:text-[18px] mb-6">
            {t("SessionDescription")}
          </p>

          {/* Sessions Table/Cards */}
          <div className="overflow-x-auto">
            {/* Desktop Table - Hidden on Mobile */}
            <table className="w-full hidden sm:table">
              <thead>
                <tr className="border-b text-gray-400 text-[14px] md:text-[16px] lg:text-[18px]">
                  <th className="text-left font-medium pb-2">
                    {t("Platform")}
                  </th>
                  <th className="text-left font-medium pb-2">{t("Device")}</th>
                  <th className="text-left font-medium pb-2">
                    {t("LastUsed")}
                  </th>
                  <th className="text-left font-medium pb-2">{t("Access")}</th>
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
                      {session.access !== t("CurrentSessions") && (
                        <button className="text-red-500 hover:text-red-700">
                          {t("Revoke")}
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
                        {t("Platform")}
                      </span>
                      <span>{session.platform}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="font-medium text-gray-600">
                        {t("Device")}
                      </span>
                      <span>{session.device}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="font-medium text-gray-600">
                        {t("LastUsed")}
                      </span>
                      <span>{session.lastUsed}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="font-medium text-gray-600">
                        {t("Access")}
                      </span>
                      <div className="flex items-center gap-2">
                        <span>{session.access}</span>
                        {session.access !== t("CurrentSessions") && (
                          <button className="text-red-500 hover:text-red-700 text-sm px-2 py-1">
                            {t("Revoke")}
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
