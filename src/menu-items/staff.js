// assets
import { IconUsers } from "@tabler/icons";

// constant
const icons = { IconUsers };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const staff = {
  id: "staff",
  // title: "Dashboard",
  type: "group",
  children: [
    {
      id: "staff",
      title: "Nhân viên",
      type: "item",
      url: "/staff",
      icon: icons.IconUsers,
      breadcrumbs: false,
    },
  ],
};

export default staff;
