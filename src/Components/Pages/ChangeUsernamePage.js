import { getSessionObject } from "../utils/session";
import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { removeSessionObject } from "../utils/session";
const usernamepage = `
    <div class="text-center">
      <h3>Change username</h3>

    
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
    <button type="submit" class="btn btn-primary" id="btn1">Save</button>
    </form>
    
    </div`;

const usernamePage = () => {
  let user = getSessionObject("user");
  const main = document.querySelector("#main");
  main.innerHTML = usernamepage;
  const Form = document.querySelector("form");
  const username = document.querySelector("#username");
  Form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const options = {
        method: "PUT",
        body: JSON.stringify({
          username: username.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(`/api/users/${user.username}`, options);

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
export default usernamePage;
