// assets
import { IconCar } from "@tabler/icons";

// constant
const icons = { IconCar };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const traffic = {
  id: "traffic",
  // title: "Dashboard",
  type: "group",
  children: [
    {
      id: "default",
      title: "Phương tiện",
      type: "item",
      url: "/traffic",
      icon: icons.IconCar,
      breadcrumbs: false,
    },
  ],
};

export default traffic;
