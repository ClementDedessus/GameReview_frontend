import { getSessionObject } from "../utils/session";
import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { removeSessionObject } from "../utils/session";
const passwordpage = `

    <div class="text-center">
      <h3>Change password</h3>

  
    <form class="px-5">
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

    <button type="submit" class="btn btn-primary" id="btn1">Save</button>
    </form>
    
    </div`;
const passpage = () => {
  let user = getSessionObject("user");
  const main = document.querySelector("#main");
  main.innerHTML = passwordpage;
  const Form = document.querySelector("form");
  const password = document.querySelector("#password");
  Form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const options = {
        method: "PUT",
        body: JSON.stringify({
          password: password.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(`/api/users/${user.username}/test`, options);

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
    } catch (error) {
      console.error("changeusername::error: ", error);
    }
    removeSessionObject("user");
    Navbar();
    Redirect("/login");
  });
};
export default passpage;
