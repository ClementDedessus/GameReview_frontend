import { getSessionObject } from "../utils/session";
import { Redirect } from "../Router/Router";
const passwordpage = `



    <div class="text-center">
      <h3>Change password</h3>

    
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

    <button type="submit" class="btn btn-primary" id="btn1">Save</button>
    </form>
    
    </div`;
const passpage = ()=>{
    let user = getSessionObject("user");
    const main = document.querySelector("#main");
   main.innerHTML = passwordpage;
   const Form = document.querySelector("form");
   const username = document.querySelector("#username");
   const password = document.querySelector("#password")
}
export default passpage