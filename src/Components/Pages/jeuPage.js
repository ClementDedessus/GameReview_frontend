const page = `<nav class="navbar navbar-light bg-light">
<div class="right">
  
</div>
</nav>`;
const jeuPage = async () => {
  const main = document.querySelector("#main");
  var nomJeu = sessionStorage.getItem("jeuSelectionne");
  try {
    const response = await fetch(`/api/jeu?age=${nomJeu}`);
    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const jeux = await response.json();
    const div = document.createElement("strong");
    const img = document.createElement("img");
    div.appendChild(img);
    main.appendChild(div);
    div.className = "container";
    div.className = "p-3";
    img.src = jeux.cover;
    img.width = 300;
    img.height = 200;
    const div2 = document.createElement("strong");
    main.appendChild(div2);
    div2.innerHTML = `${jeux.name},
      ${jeux.age_ratings},
      ${jeux.category},
      ${jeux.first_release_date},
      ${jeux.involved_companies},
      ${jeux.keywords},
      ${jeux.multiplayer_modes},
      ${jeux.platforms},
      ${jeux.rating},
      ${jeux.summary},
      ${jeux.url},
      ${jeux.opinion}`;
    div2.className = "text-center";
  } catch (error) {
    console.error("battlefielpage::error: ", error);
  }

 
   
    
    
  
};

export default jeuPage;