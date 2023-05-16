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
          id: "parking-all",
          title: "Tất cả bãi xe",
          type: "item",
          url: "/parking-all",
          // target: true,
        },
        {
          id: "parking-price",
          title: "Bảng giá",
          type: "item",
          url: "/parking-price",
          // target: true,
        },
      ],
    },
  ],
};

export default parking;
