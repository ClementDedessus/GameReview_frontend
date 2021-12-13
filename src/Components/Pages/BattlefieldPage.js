import { getSessionObject } from "../utils/session";
const com = ` <div class="text-center">
<form class="px-5">
<div class="mb-3">
<label for="message" class="form-label"></label>
<input
  type="message"
  name="message"
  id="message"
  class="form-control"
  placeholder="Enter message"
  
/>
</div>

<button type="submit" class="btn btn-primary" id="btn1">Envoyer</button>
</form>

</div`;

const battlefield = async () => {
  let user = getSessionObject("user");
  const main = document.querySelector("#main");
  const commentaire = document.createElement("div");
  try {
    const response = await fetch("/api/jeu?age=Battlefield 2042");
    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
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
      ${jeux.url}`;
    div2.className = "text-center";
  } catch (error) {
    console.error("battlefielpage::error: ", error);
  }

  try {
    const response = await fetch("/api/commentaires");
    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const commentaires = await response.json();
    const title = document.createElement("h3");
    title.innerHTML = "Commentaires";
    main.appendChild(title);

    commentaires.forEach((comment) => {
      const table = document.createElement("table");
      const header = document.createElement("tr");
      const colone = document.createElement("td");
      const like = document.createElement("button");
      const afficherLike = document.createElement("p");
      table.appendChild(header);
      table.appendChild(colone);
      table.appendChild(like);
      like.innerHTML = "like";
      like.type = "submit";
      like.data = comment.id;
      like.addEventListener("click", async (event) => {
        like.innerHTML = "vous avez deja liker";

        try {
          const options = {
            method: "PUT",
          };

          const response = await fetch(
            `/api/commentaires/${like.data}`,
            options
          );

          if (!response.ok) {
            throw new Error(
              "fetch error : " + response.status + " : " + response.statusText
            );
          }
          const nblike = await response.json();
          table.appendChild(afficherLike);
          afficherLike.innerHTML = nblike;
        } catch (error) {
          console.error("changeusername::error: ", error);
        }

      });

      main.appendChild(table);
      main.appendChild(commentaire);
      header.innerHTML = `${comment.expediteur}       
      ${comment.date}`;
      colone.innerHTML = `${comment.message}`;
    });
    main.appendChild(commentaire);
    commentaire.innerHTML = com;
  } catch (error) {
    console.error("battlefielpage::error: ", error);
  }

  const Form = document.querySelector("form");
  const messageCom = document.querySelector("#message");

  Form.addEventListener("submit", async (event) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: messageCom.value,
          expediteur: user.username,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/commentaires", options);

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
    } catch (error) {
      console.error("changeusername::error: ", error);
    }
  });
};
export default battlefield;
