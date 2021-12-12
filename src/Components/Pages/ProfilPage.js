import { getSessionObject } from "../utils/session";

const profilpage = `
    <div class="text-center">
      <h3>Profil</h3>
    </div>
    <div class="text-left">
        <ul>
            <li><a href="http://localhost:8080/changeusername">Change username</a></li>
            <li><a href="http://localhost:8080/changepassword">Change password</a></li>
        </ul>
    </div>`;

const ProfilPage = () => {
  let user = getSessionObject("user");
  const main = document.querySelector("#main");
  main.innerHTML = profilpage;
};
export default ProfilPage;
