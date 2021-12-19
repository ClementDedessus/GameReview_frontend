import { setSessionObject } from "../utils/session";
import { Redirect } from "../Router/Router";

const registerpage = `
    <div class="text-center">
      <h3>Register</h3>

    
    <form class="px-5">
    <div class="mb-3">
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
    <button type="submit" class="btn btn-primary" id="btn1">Register</button>
    </form>
    <div id="r"></div>
    
    </div>`;
function RegisterPage() {
  const erreur = document.createElement("h4");
  const erreur2 =document.createElement("h4");
  const main = document.querySelector("#main");
  main.innerHTML = registerpage;
  const Form = document.querySelector("form");
  var username = document.querySelector("#username");
  const password = document.querySelector("#password");
  var utilisateur ;
  Form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/users/username/${username.value}`);
      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const boolean = await response.json();
       utilisateur = boolean
      
    } catch (error) {
      console.error("RegisterPage::error: ", error);
    }
if(!utilisateur){
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

      const response = await fetch("/api/auths/register", options);

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      Redirect("/login");
    } catch (error) {
      main.appendChild(erreur);
      console.error("RegisterPage::error: ", error);
    }
  }else{
    main.appendChild(erreur2);
    erreur2.innerHTML = "Error,username deja utilise";
  }
  });
  erreur.innerHTML = "Error, password and username can't be empty";
}

export default RegisterPage;
