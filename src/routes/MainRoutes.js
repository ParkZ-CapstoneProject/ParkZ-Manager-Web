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
const CreateNewParking = Loadable(
  lazy(() => import("ui-component/parking/parking-all/step1/CreateNewParking"))
);

const CreateNewImage = Loadable(
  lazy(() => import("ui-component/parking/parking-images/NewImageCustom"))
);

const CreateNewPrice = Loadable(
  lazy(() => import("ui-component/parking/parking-price/CreateNewPrice"))
);

const ImageParking = Loadable(
  lazy(() => import("views/parking/single-parking/parking-images/Index"))
);

const ParkingDetail = Loadable(
  lazy(() => import("views/parking/single-parking/Index"))
);

const ParkingPriceDetail = Loadable(
  lazy(() => import("views/parking/parking-price/parkinng-price-detail/Index"))
);

const ParkingPriceDetailParking = Loadable(
  lazy(() =>
    import(
      "views/parking/parking-price/parkinng-price-detail/ParkingPriceOfParking"
    )
  )
);

const VNPay = Loadable(lazy(() => import("views/vnpay/Index")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
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
      path: "parkings",
      element: <ParkingAll />,
    },
    {
      path: "prices",
      element: <ParkingPrice />,
    },
    {
      path: "new-parking",
      element: <CreateNewParking />,
    },
    {
      path: "/parking-image",
      element: <ImageParking />,
    },
    {
      path: `/parking-detail/:id`,
      element: <ParkingDetail />,
    },
    {
      path: "/create-image",
      element: <CreateNewImage />,
    },
    {
      path: "create-new-price",
      element: <CreateNewPrice />,
    },
    {
      path: `/price-detail/:priceId`,
      element: <ParkingPriceDetail />,
    },
    {
      path: `/price-detail-parking/:priceId`,
      element: <ParkingPriceDetailParking />,
    },
    {
      path: `/vnpay`,
      element: <VNPay />,
    },
  ],
};

export default MainRoutes;
