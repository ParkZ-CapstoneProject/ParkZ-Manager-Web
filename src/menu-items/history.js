// assets
import { FaHistory } from "react-icons/fa";

// constant
const icons = { FaHistory };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const history = {
  id: "history",
  // title: "Dashboard",
  type: "group",
  children: [
    {
      id: "history",
      title: "Lịch sử giao dịch",
      type: "item",
      url: "/history",
      icon: icons.FaHistory,
      breadcrumbs: false,
    },
  ],
};

export default history;
