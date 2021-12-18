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
  var closedbutton;
  const main = document.querySelector("#main");
  main.innerHTML = page;
  //const searchBare = document.querySelector("#search");
  const table = document.createElement("table");
  table.className = "tableReco";
  if (user) {
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

      const response = await fetch(`/api/jeu?name=${jeux[hasar].jeu}`);
      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const jeux2 = await response.json();
      var categor = jeux2.category;
    } catch (error) {
      console.error("Homepage::error: ", error);
    }
  } catch (error) {
    console.error("Homepage::error: ", error);
  }
  
    try {
      const response = await fetch(`/api/jeu/recommandations/${categor}`);
      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const jeux = await response.json();
      const titre = document.createElement("h4");
      main.appendChild(titre);
      titre.innerHTML = "Recommandations";
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
    main.appendChild(titre2);
    titre2.innerHTML = "All games";
    titre2.className = "title";
    const response = await fetch(`/api/jeu`);
    // search barre a faire !!!!!!!!!
    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const jeux = await response.json();
    for (let index = 0; index < jeux.length; index++) {
      const div = document.createElement("strong");
      const img = document.createElement("img");
      closedbutton = document.createElement("button");
      closedbutton.className = "btn-close";
      closedbutton.ariaLabel = "Close";
      main.appendChild(closedbutton);
      div.appendChild(img);
      main.appendChild(div);
      div.className = "p-3";
      img.src = jeux[index].cover;
      img.width = 300;
      img.height = 200;
      img.addEventListener("click", (event) => {
        sessionStorage.setItem("clé", jeux[index].name);
        Redirect("/jeu");
      });
      closedbutton.addEventListener("click", async (event) => {
        event.preventDefault();
        try {
          const options = {
            method: "Delete",
          };

          const response = await fetch(
            `/api/jeu/delete/${jeux[index].name}`,
            options
          );
          if (!response.ok) {
            throw new Error(
              "fetch error : " + response.status + " : " + response.statusText
            );
          }
          const jeux2 = await response.json();
        } catch (error) {
          console.error("Homepage::error: ", error);
        }
        Redirect("/");
      });
    }
  } catch (error) {
    console.error("Homepage::error: ", error);
  }
};

export default HomePage;
