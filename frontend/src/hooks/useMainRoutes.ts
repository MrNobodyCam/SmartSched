import { useLocation } from "react-router-dom";

export const useMainRoutes = () => {
  const location = useLocation();
  const path = location.pathname;

  const mainRoutes = [
    "/generate-schedule",
    "/music",
    "/history",
    "/service",
    "/policy",
    "/contactus",
    "/setting",
    "/general",
  ];

  return mainRoutes.some((route) => path.startsWith(route));
};
