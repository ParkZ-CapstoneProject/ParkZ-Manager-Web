// assets
import { IconParking } from "@tabler/icons";

// constant
const icons = {
  IconParking,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const parking = {
  id: "parking",
  // title: "Pages",
  // caption: "Pages Caption",
  type: "group",
  children: [
    {
      id: "parking",
      title: "Bãi xe",
      type: "collapse",
      icon: icons.IconParking,

      children: [
        {
          id: "parkings",
          title: "Tất cả bãi xe",
          type: "item",
          url: "/parkings",
          // target: true,
        },
        {
          id: "prices",
          title: "Bảng giá",
          type: "item",
          url: "/prices",
          // target: true,
        },
      ],
    },
  ],
};

export default parking;
