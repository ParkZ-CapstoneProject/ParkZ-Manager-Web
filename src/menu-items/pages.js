// assets
import { IconUsers } from "@tabler/icons";

// constant
const icons = {
  IconUsers,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: "pages",
  // title: "Pages",
  // caption: "Pages Caption",
  type: "group",
  children: [
    {
      id: "user",
      title: "Người dùng",
      type: "collapse",
      icon: icons.IconUsers,

      children: [
        {
          id: "manager",
          title: "Quản lý",
          type: "item",
          url: "/pages/login/login3",
          target: true,
        },
        {
          id: "Customer",
          title: "Khách hàng",
          type: "item",
          url: "/pages/register/register3",
          target: true,
        },
      ],
    },
  ],
};

export default pages;
