import { Routes, Route, Navigate } from "react-router-dom";
import MainGeneral from "../pages/General/main_general";
import AccountSettings from "../pages/General/general_account";
import PasswordSettings from "../pages/General/general_password";
import SessionSettings from "../pages/General/general_sessions";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/setting" element={<MainGeneral />}>
        <Route index element={<Navigate to="/setting/account" replace />} />
        <Route path="account" element={<AccountSettings />} />
        <Route path="password" element={<PasswordSettings />} />
        <Route path="session" element={<SessionSettings />} />
      </Route>
      <Route path="*" element={<Navigate to="/setting/account" replace />} />
    </Routes>
  );
};

export default AppRoutes;
