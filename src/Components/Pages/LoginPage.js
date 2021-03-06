import { setSessionObject } from "../utils/session";
import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
const loginpage = `
    <div class="text-center">
      <h3>Login</h3>

    
    <form class="px-5">
    <div class=" mb-3">
      <label for="<username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        class="form-control"
        placeholder="Enter username"
        
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        class="form-control"
        placeholder="Enter password"
        
      />
    </div>
    <button type="submit" class="btn btn-primary" id="btn1">Connect</button>
    </form>
    <div id="r"></div>
    
    </div`;
function LoginPage() {
  const erreur = document.createElement("h4");
  const main = document.querySelector("#main");
  main.innerHTML = loginpage;
  const Form = document.querySelector("form");
  const username = document.querySelector("#username");
  const password = document.querySelector("#password");
  Form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/auths/login", options);

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const user = await response.json();
      setSessionObject("user", user);
      Navbar({ isAuthenticated: false });
      Redirect("/");
    } catch (error) {
      console.error("LoginPage::error: ", error);
      main.appendChild(erreur);
    }
  });
  erreur.innerHTML = "Error, the given password and username doesn't match";
}

export default LoginPage;
