import { Redirect } from "../Router/Router";
import newworldpage from "./NewWorldPage";
import battlefield from "./BattlefieldPage";
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
  main.innerHTML=page
  const form = document.querySelector("form");
  const searchBare = document.querySelector("#search");
  try {
    const response = await fetch(`/api/jeu?age=${searchBare.value}`); 
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
      img.addEventListener("click",(event)=>{
        if(jeu.name === "Battlefield 2042"){
           // Redirect( "/pageBattlefield")
           window.location="/pageBattlefield"
           
       //battlefield()
        }
        if(jeu.name === "New World"){
          newworldpage()
        }
      })
      
    })
  } catch (error) {
    console.error("Homepage::error: ", error);
  }
};

export default HomePage;
