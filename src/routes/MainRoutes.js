import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
// import CreateModalStaff from "ui-component/modal/staff-modal/create-modal/CreateModalStaff";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("views/dashboard/Default"))
);

const Booking = Loadable(lazy(() => import("views/booking/Index")));

const Profile = Loadable(lazy(() => import("views/profile/Profile")));
const Staff = Loadable(lazy(() => import("views/staff/Staff")));
const ParkingAll = Loadable(
  lazy(() => import("views/parking/parking-all/Index"))
);
const ParkingPrice = Loadable(
  lazy(() => import("views/parking/parking-price/Index"))
);
const ButtonDrag = Loadable(
  lazy(() => import("ui-component/buttons/qr-button-drag/FloatingButton"))
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "dashboard",
      element: <DashboardDefault />,
    },
    {
      path: "booking",
      element: <Booking />,
    },
    {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "staff",
      element: <Staff />,
    },
    {
      path: "button",
      element: <ButtonDrag />,
    },
    {
      path: "parking-all",
      element: <ParkingAll />,
    },
    {
      path: "parking-price",
      element: <ParkingPrice />,
    },
  ],
};

export default MainRoutes;
