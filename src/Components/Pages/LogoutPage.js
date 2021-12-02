import Navbar from "../Navbar/Navbar";
import { Redirect } from "../Router/Router";
import { removeSessionObject } from "../utils/session";
const LogoutPage = () => {
  console.log("Logout");
  removeSessionObject("user");
  Navbar();
  Redirect("/");
};

export default LogoutPage;
