import { lazy } from "react";

// project imports
import Loadable from "ui-component/Loadable";
import MinimalLayout from "layout/MinimalLayout";
// import { Layout } from "ui-component/auth/layout";

// login option 3 routing
const AuthLogin = Loadable(
  lazy(() => import("views/pages/authentication/authentication/Login"))
);
const AuthLogin2 = Loadable(
  lazy(() => import("views/pages/authentication/authentication/Login2"))
);
const AuthRegister = Loadable(
  lazy(() => import("views/pages/authentication/authentication/Register"))
);

const StepRegister = Loadable(
  lazy(() => import("views/register/RegisterForBus"))
);

// const Layout = Loadable(lazy(() => import("ui-component/auth/layout")));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/login",
      element: <AuthLogin />,
    },
    {
      path: "login2",
      element: <AuthLogin2 />,
    },
    {
      path: "register",
      element: <StepRegister />,
    },
  ],
};

export default AuthenticationRoutes;
