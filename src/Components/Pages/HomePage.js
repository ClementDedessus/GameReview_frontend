import newworldpage from "./NewWorldPage";
const page = `<nav class="navbar navbar-light bg-light">
<div class="right">
  <form id ="form" class="d-flex">
    <input id="search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
    <button class="btn btn-outline-success" type="submit">Search</button>
  </form>
</div>
</nav>`;
const HomePage = async () => {
  const main = document.querySelector("#main");
  main.innerHTML = page;
  const searchBare = document.querySelector("#search");
  try {
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
      div.className = "container";
      div.className = "p-3";
      img.src = jeu.cover;
      img.width = 300;
      img.height = 200;
      img.addEventListener("click", (event) => {
        if (jeu.name === "Battlefield 2042") {
          window.location = "/pageBattlefield";
        }
        if (jeu.name === "New World") {
          window.location = "/pageNewWorld";
        }
        if(jeu.name === "Forza Horizon 5"){
          window;location = "/forza"
        }
        if(jeu.name === "It Takes Two"){
          window.location = "/ItTakesTwo"
        }
        if(jeu.name === "NieR Replicant"){
          window.location = "/NieRReplicant"
        }
        if(jeu.name === "Gta"){
          window.location = "gta"
        }
      });
    });
  } catch (error) {
    console.error("Homepage::error: ", error);
  }
};

export default HomePage;
