import { Redirect } from "../Router/Router";
import { getSessionObject } from "../utils/session";

const page = `<nav class="navbar navbar-light bg-light">
<div class="right">
  <form id ="form" class="d-flex">
    <input id="search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
    <button class="btn btn-outline-success" type="submit">Search</button>
  </form>
</div>
</nav>`;
const HomePage = async () => {
  let user = getSessionObject("user");

  const main = document.querySelector("#main");
  main.innerHTML = page;
  const searchBare = document.querySelector("#search");
  const table = document.createElement("table");
table.className = "test"
  try {
    const response = await fetch(`/api/liked/${user.username}`);
    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const jeux = await response.json();

    try {
      let hasar = Math.floor(Math.random() * jeux.length);

      const response = await fetch(`/api/jeu?age=${jeux[hasar].jeu}`);
      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const jeux2 = await response.json();
      var categor = jeux2.category;
    } catch (error) {
      console.error("battlefielpage::error: ", error);
    }
  } catch (error) {
    console.error("battlefielpage::error: ", error);
  }
if(user != null){
  try {
    const response = await fetch(`/api/jeu/recommandations/${categor}`);
    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const jeux = await response.json();
    const titre = document.createElement("h4");
    titre.innerHTML = "Recommandations";
    main.appendChild(titre);
    jeux.forEach((jeu) => {
      const ligne = document.createElement("td");
      const img = document.createElement("img");
      ligne.appendChild(img);
      table.appendChild(ligne);
      main.appendChild(table);

      ligne.className = "rcommandation";
      img.src = jeu.cover;
      img.width = 300;
      img.height = 200;
      img.addEventListener("click", (event) => {
        sessionStorage.setItem("clé", jeu.name);
        Redirect("/jeu");
      });
    });
  } catch (error) {
    console.error("Homepage::error: ", error);
  }
}
  try {
    const titre2 = document.createElement("h4");
    titre2.innerHTML = "All games";
    main.appendChild(titre2);
    const response = await fetch(`/api/jeu?age=${searchBare.value}`);
    // search barre a faire !!!!!!!!!
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
    console.error("Homepage::error: ", error);
  }
};

export default HomePage;
