import { useLocation } from "react-router-dom";

export const useMainRoutes = () => {
  const location = useLocation();
  const mainRoutes = [
    "/generate-schedule/listview",
    "/generate-schedule/calendar",
    "/music",
    "/history",
    "/history/calendar",
    "/history/listview",
    "/service",
    "/policy",
    "/contactus",
    "/setting",
    "/general",
  ];

  return mainRoutes.some((route) => location.pathname.startsWith(route));
};
