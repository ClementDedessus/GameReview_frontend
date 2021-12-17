
import { Redirect } from "../Router/Router";
import { getSessionObject } from "../utils/session";


const page = `<nav class="navbar navbar-light bg-light">
<div class="right">
</div>
</nav>`;


const classement = async () => {
  const main = document.querySelector("#main");
  main.innerHTML = page;
  const table = document.createElement("table");
  table.className = "table";//tableReco?

  try {
    const titre2 = document.createElement("h4");
    main.appendChild(titre2);
    titre2.innerHTML = "Classement des jeux";
    
    const response = await fetch(`/api/classement`);
    //const response = await fetch(`/api/classement?jeu=maximum-rating`);
    //const response = await fetch(`/api/classement?jeu=order`);

    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const jeux = await response.json();
    jeux.forEach((jeu) => {

      const div = document.createElement("strong");
      const img = document.createElement("img");

      div.appendChild(img);
      main.appendChild(div);
      div.className = "p-3";
      img.src = jeu.cover;
      img.width = 300;
      img.height = 200;
      img.addEventListener("click", (event) => {
        sessionStorage.setItem("clé", jeu.name);
        Redirect("/jeu");
      });

    });
  } catch (error) {
    console.error("ClassementPage::error: ", error);
  }
};


export default classement;
