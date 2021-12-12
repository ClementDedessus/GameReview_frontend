import Navbar from "../Navbar/Navbar";
import { Redirect } from "../Router/Router";
import { removeSessionObject } from "../utils/session";
const LogoutPage = () => {
  removeSessionObject("user");
  Navbar();
  Redirect("/login");
};

export default LogoutPage;
