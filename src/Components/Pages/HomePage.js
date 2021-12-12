<<<<<<< HEAD


const HomePage = () => { 
    const pageEntiere = document.querySelector("#page");
    let home = `  <div class="container">
  <header class="blog-header py-3">
   
  </header>

  <div class="nav-scroller py-1 mb-2">
    <nav class="nav d-flex justify-content-between">
      <a class="p-2 link-secondary" href="#">World</a>
      <a class="p-2 link-secondary" href="#">U.S.</a>
      <a class="p-2 link-secondary" href="#">Technology</a>
      <a class="p-2 link-secondary" href="#">Design</a>
      <a class="p-2 link-secondary" href="#">Culture</a>
      <a class="p-2 link-secondary" href="#">Business</a>
      <a class="p-2 link-secondary" href="#">Politics</a>
      <a class="p-2 link-secondary" href="#">Opinion</a>
      <a class="p-2 link-secondary" href="#">Science</a>
      <a class="p-2 link-secondary" href="#">Health</a>
      <a class="p-2 link-secondary" href="#">Style</a>
      <a class="p-2 link-secondary" href="#">Travel</a>
    </nav>
  </div>
=======
import newworldpage from "./NewWorldPage";
const page = `<nav class="navbar navbar-light bg-light">
<div class="right">
  <form id ="form" class="d-flex">
    <input id="search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
    <button class="btn btn-outline-success" type="submit">Search</button>
  </form>
>>>>>>> eb7764370e2b9919f08c0fae1400c70d113af4c5
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
      });
    });
  } catch (error) {
    console.error("Homepage::error: ", error);
  }
};

export default HomePage;
