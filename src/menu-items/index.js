import dashboard from "./dashboard";
import parking from "./parking";
import booking from "./booking";
import staff from "./staff";
// import traffic from "./traffic";
import notification from "./notification";
import profile from "./profile";
// import utilities from "./utilities";
// import other from "./other";

// ==============================|| MENU ITEMS ||============================== //

const user = localStorage.getItem("user"); // Set the authentication status here
const userData = JSON.parse(user);

const menuItems = {
  items:
    userData.role === "Manager"
      ? [dashboard, profile, booking, parking, staff, notification]
      : [profile, booking],
};

export default menuItems;
