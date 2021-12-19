import { getSessionObject } from "../utils/session";
import { Redirect } from "../Router/Router";

const profilpage = `
    <div class="text-center">
      <h3>Profil</h3>
    </div>
    <div class="text-left">
        
            <button type="submit" class="btn btn-outline-primary" id="btn1">Change username</button>
            
           
        
    </div>
    <div class="text-left">
        
  
    
    <button type="submit" class="btn btn-outline-primary" id="btn2">Change password</button>

</div>`;

const ProfilPage = () => {
  let user = getSessionObject("user");
  const main = document.querySelector("#main");
  main.innerHTML = profilpage;
  const username = document.getElementById("btn1");
  const password = document.getElementById("btn2");
  username.addEventListener("click", (event) => {
    Redirect("/changeusername");
  });
  password.addEventListener("click", (event) => {
    Redirect("/changepassword");
  });
};
export default ProfilPage;
