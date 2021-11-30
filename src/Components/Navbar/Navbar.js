import { Navbar as BootstrapNavbar } from "bootstrap";
import HomePage from "../Pages/HomePage";


const Navbar = () => {
  const navItems = document.querySelectorAll(".nav-link");

  navItems.forEach((items) => {
    items.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(`click on ${e.target.innerHTML} navbar item`);

      if (e.target.innerHTML === "Home") {
        HomePage();
      }
      
    })
  });

  

};

export default Navbar;