import React from "react";
import { lazy } from "react";

// project imports
import Loadable from "ui-component/Loadable";
import MinimalLayout from "layout/MinimalLayout";
import { useSelector } from "react-redux";
// import { Layout } from "ui-component/auth/layout";

// login option 3 routing
// const AuthLogin = Loadable(
//   lazy(() => import("views/pages/authentication/authentication/Login"))
// );
const AuthLogin = Loadable(
  lazy(() => import("views/pages/authentication/authentication/Login2"))
);
// const AuthRegister = Loadable(
//   lazy(() => import("views/pages/authentication/authentication/Register"))
// );

const InputEmail = Loadable(
  lazy(() =>
    import("views/pages/authentication/forgot-password/Email/EmailInput")
  )
);

const OTP = Loadable(
  lazy(() => import("views/pages/authentication/forgot-password/OTP/Index"))
);

const NewPassword = Loadable(
  lazy(() =>
    import("views/pages/authentication/forgot-password/NewPassword/NewPassword")
  )
);

const StepRegister = Loadable(
  lazy(() => import("views/register/RegisterForBus"))
);

const FailRecharge = Loadable(
  lazy(() => import("ui-component/wallet/FailRecharge"))
);

const Maps = Loadable(
  lazy(() => import("ui-component/parking/parking-all/step2/Index"))
);

const Modal = Loadable(
  lazy(() => import("ui-component/parking/parking-all/step3/Index"))
);

const PhysicalModal = Loadable(
  lazy(() => import("ui-component/parking/parking-modal/Index"))
);

const NotFound = Loadable(
  lazy(() => import("ui-component/not-found/NotFound"))
);
// const Layout = Loadable(lazy(() => import("ui-component/auth/layout")));

// ==============================|| AUTHENTICATION ROUTING ||============================== // Set the authentication status here

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "login",
      element: <AuthLogin />,
    },
    {
      path: "",
      element: <AuthLogin />,
    },
    {
      path: "register",
      element: <StepRegister />,
    },
    {
      path: "input-email",
      element: <InputEmail />,
    },
    {
      path: "otp",
      element: <OTP />,
    },
    {
      path: "new-password",
      element: <NewPassword />,
    },
    {
      path: "maps",
      element: <Maps />,
    },
    {
      path: "modal",
      element: <Modal />,
    },
    {
      path: "modal-2",
      element: <PhysicalModal />,
    },
    {
      path: "failed",
      element: <FailRecharge />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};

export default AuthenticationRoutes;
