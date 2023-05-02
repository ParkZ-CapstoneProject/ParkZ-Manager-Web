// assets
import { IconParking } from "@tabler/icons";

// constant
const icons = { IconParking };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const parking = {
  id: "parking",
  // title: "Dashboard",
  type: "group",
  children: [
    {
      id: "parking",
      title: "Bãi xe",
      type: "item",
      url: "/parking",
      icon: icons.IconParking,
      breadcrumbs: false,
    },
  ],
};

export default parking;
