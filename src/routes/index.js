import { useRoutes } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const user = localStorage.getItem("user"); // Set the authentication status here
  const isAuthenticated = JSON.parse(user);

  return useRoutes([AuthenticationRoutes, isAuthenticated ? MainRoutes : []]);
}
