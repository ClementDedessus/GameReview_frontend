import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import LogoutPage from "../Pages/LogoutPage";
import ProfilPage from "../Pages/ProfilPage";
const routes = {
  "//": HomePage,
  "/login": LoginPage,
  "/register": RegisterPage,
  "/logout": LogoutPage,
  "/profil": ProfilPage,

};


const Router = () => {
  let navbarWrapper = document.querySelector("#navbarWrapper");
  navbarWrapper.addEventListener("click", (e) => {
    let uri = e.target.dataset.uri;

    if (uri) {
      e.preventDefault();
     
      window.history.pushState({}, uri, window.location.origin + uri);
      
      const componentToRender = routes[uri];
      if (routes[uri]) {
        componentToRender();
      } else {
        throw Error("The " + uri + " ressource does not exist");
      }
    }
  });

  window.addEventListener("load", (e) => {
    const componentToRender = routes[window.location.pathname];
    if (!componentToRender)
      throw Error(
        "The " + window.location.pathname + " ressource does not exist."
      );

    componentToRender();
  });

  window.addEventListener("popstate", () => {
    const componentToRender = routes[window.location.pathname];
    componentToRender();
  });
};


const Redirect = (uri) => {
  window.history.pushState({}, uri, window.location.origin + uri);
  const componentToRender = routes[uri];
  if (routes[uri]) {
    componentToRender();
  } else {
    throw Error("The " + uri + " ressource does not exist");
  }
};

export { Router, Redirect };
