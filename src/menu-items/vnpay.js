// assets
import { GrPaypal } from "react-icons/gr";

// constant
const icons = { GrPaypal };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const vnpay = {
  id: "vnpay",
  // title: "Dashboard",
  type: "group",
  children: [
    {
      id: "vnpay",
      title: "Liên kết",
      type: "item",
      url: "/vnpay",
      icon: icons.GrPaypal,
      breadcrumbs: false,
    },
  ],
};

export default vnpay;
