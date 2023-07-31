import dashboard from "./dashboard";
import parking from "./parking";
import booking from "./booking";
import staff from "./staff";
// import traffic from "./traffic";
import notification from "./notification";
import profile from "./profile";
import vnpay from "./vnpay";
// import utilities from "./utilities";
// import other from "./other";

// ==============================|| MENU ITEMS ||============================== //

const user = localStorage.getItem("user"); // Set the authentication status here
console.log("user", user);

const menuItems = {
  items: user ? [dashboard, profile, booking, parking, staff, vnpay] : [],
};

export default menuItems;
