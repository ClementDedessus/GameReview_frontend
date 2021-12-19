import { Redirect } from "../Router/Router";
import { getSessionObject } from "../utils/session";

const update = async () => {
  let user = getSessionObject();
  const main = document.querySelector("#main");
  main.innerHTML = "Update";
  try {
    const titre2 = document.createElement("h4");
    main.appendChild(titre2);
    titre2.innerHTML = "Update Games";
    titre2.className = "title";
    const response = await fetch(`/api/jeu`);
    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const jeux = await response.json();

    jeux.forEach((element) => {
      const div = document.createElement("strong");
      const img = document.createElement("img");
      div.appendChild(img);
      main.appendChild(div);
      div.className = "p-3";
      img.src = element.cover;
      img.width = 300;
      img.height = 200;
      img.addEventListener("click", async (event) => {
        sessionStorage.setItem("clé", element.name);
        Redirect("/modify");
      });
    });
  } catch (error) {
    console.error("updatepage::error: ", error);
  }
};
export default update;
