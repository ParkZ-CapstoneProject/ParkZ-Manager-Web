import { useRoutes } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import { useSelector } from "react-redux";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const token = useSelector((state) => state.token.token); // Set the authentication status here
  // const isAuthenticated = JSON.parse(user);

  return useRoutes([AuthenticationRoutes, token ? MainRoutes : []]);
}
