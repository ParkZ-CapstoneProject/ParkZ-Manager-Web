import dashboard from "./dashboard";
import parking from "./parking";
import booking from "./booking";
import staff from "./staff";
// import traffic from "./traffic";
import profile from "./profile";
import vnpay from "./vnpay";
import wallet from "./wallet";
import { useSelector } from "react-redux";
// import utilities from "./utilities";
// import other from "./other";

// ==============================|| MENU ITEMS ||============================== //

const Menu = () => {
  const token = useSelector((state) => state.token.token);
  const menuItems = {
    items: token
      ? [dashboard, profile, booking, parking, staff, vnpay, wallet]
      : [],
  };

  return menuItems;
};

export default Menu;
