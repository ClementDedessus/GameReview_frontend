import { Redirect } from "../Router/Router";
import { getSessionObject } from "../utils/session";

/***
*    Title:stackoverflow
*    Author: Jarmo Sarantila
*    Date: mercredi 16 2021
*    Code version: 
*    Availability: https://stackoverflow.com/questions/31706569/javascript-function-to-execute-only-once
***/

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
function cookie(name, cvalue) {
  var x = getCookie(name);

  if (x == "" || x == null) {
    console.log("Welcome to Steampunk Inc!");
    setCookie(name, "iwashere", 365);
    return false;
  } else {
    console.log("You came back!");
    return true;
  }
}

const choix = `<select class="form-select ">
<option selected>Attribuer une note pour ce jeu </option>
<option value="0">0</option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">4</option>
<option value="5">5</option>
<option value="6">6</option>
<option value="7">7</option>
<option value="8">8</option>
<option value="9">9</option>
<option value="10">10</option>
</select>`;
const com = ` <div class="message">
<form class="px-5">
<div class="mb-3">
<label for="message" class="form-label"></label>
<textarea class="form-control"  id="message" rows="10" cols="100"></textarea>
</div>

<button type="submit" class="btn btn-primary" id="btn1">Envoyer</button>
</form>

</div`;

const jeupage = async () => {
  let nomjeu = sessionStorage.getItem("clé");
  const envoyer = document.createElement("button");
  envoyer.className = "voter";
  const evaluation = document.createElement("div");
  let user = getSessionObject("user");
  const commentaire = document.createElement("div");
  const main = document.querySelector("#main");

  try {
    const response = await fetch(`/api/jeu?name=${nomjeu}`);
    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const jeux = await response.json();

    const img = document.createElement("img");
    img.className = "image";
    img.src = jeux.cover;
    img.width = 300;
    img.height = 400;
    $(document).ready(function () {
      $("img").mouseover(function () {
        $(this).animate({
          height: "500px",
          width: "500px",
          left: "+11px",
        });
      });

      $("img").mouseout(function () {
        $(this).animate({
          height: "400",
          width: "300",
          left: "0px",
        });
      });
    });
    main.innerHTML = `<table class="table table-striped">
    <thead>
      <tr>
        <th scope="col"> <h2 class="text-center"> ${jeux.name} </h2> </th>
        
      </tr>
    </thead>
    <tbody>
      <tr>
      <td class="text-center"><p> Age minimal joueur : ${jeux.age_ratings} </p></td>
       </tr>
      <tr>
      <td class="text-center"><p> Category : ${jeux.category} </p></td> 
      </tr>
      <tr>
      <td class="text-center"><p> Date de sortie : ${jeux.first_release_date} </p></td> 
      </tr>
      <tr>
      <td class="text-center"><p> Studio de developpment : ${jeux.involved_companies} </p></td> 
      </tr>
      <tr>
      <td class="text-center"><p> Multijoueurs: ${jeux.multiplayer_modes} </p></td> 
      </tr>
      <tr>
      <td class="text-center"><p> Plateformes : ${jeux.platforms} </p></td> 
      </tr>
      <tr>
      <td class="text-center"><p> Resume : ${jeux.summary}  </p></td> 
      </tr>
      <tr>
      <td class="text-center"><p> Url : <a href="${jeux.url} ">${jeux.url} </a> </p></td> 
      </tr>
      <tr>
      <td class="text-center"><p>${choix} </p></td> 
      </tr>
    </tbody>
  </table>`;

    main.appendChild(evaluation);
    main.appendChild(envoyer);

    main.appendChild(img);
  } catch (error) {
    console.error("jeupage::error: ", error);
  }
  envoyer.innerHTML = "Voter";
  envoyer.addEventListener("click", async (event) => {
    const result = document.querySelector(".form-select");
    if (cookie(`${user.username},${nomjeu}`, result.value) === false) {
      try {
        const options = {
          method: "POST",
          body: JSON.stringify({
            jeu: `${nomjeu}`,
            expediteur: user.username,
            evaluation: result.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await fetch("/api/liked", options);

        if (!response.ok) {
          throw new Error(
            "fetch error : " + response.status + " : " + response.statusText
          );
        }
      } catch (error) {
        console.error("jeupage::error: ", error);
      }
    } else {
      alert("Vous avez déja voter");
    }
    Redirect("/")
  });

  try {
    const response = await fetch(`/api/commentaires/${nomjeu}`);
    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const commentaires = await response.json();
    const titles = document.createElement("h3");
    titles.className = "text-center";
    titles.innerHTML = "Commentaires";
    main.appendChild(titles);
    main.appendChild(commentaire);
    commentaire.innerHTML = com;
    commentaires.forEach((comment) => {
      const table = document.createElement("table");
      const header = document.createElement("tr");
      const colone = document.createElement("td");
      const like = document.createElement("button");
      const afficherLike = document.createElement("p");
      table.appendChild(header);
      table.appendChild(colone);

      table.appendChild(like);
      main.appendChild(afficherLike);
      like.innerHTML = "like";
      like.type = "submit";
      like.data = comment.id;
      table.appendChild(afficherLike);
      afficherLike.innerHTML = comment.like;
      like.addEventListener("click", async (event) => {
        if (cookie(`${user.username},${comment.id}`, comment.id) === false) {
          try {
            const options = {
              method: "PUT",
            };
            const response = await fetch(
              `/api/commentaires/${comment.id}`,
              options
            );

            if (!response.ok) {
              throw new Error(
                "fetch error : " + response.status + " : " + response.statusText
              );
            }
            const nblike = await response.json();

            afficherLike.innerHTML = nblike.like;
          } catch (error) {
            console.error("jeupage::error: ", error);
          }
        } else {
          alert("Vous avez déja voter");
        }
      });
      main.appendChild(table);

      header.innerHTML = `${comment.expediteur}       
              ${comment.date}`;
      colone.innerHTML = `${comment.message}`;
    });
  } catch (error) {
    console.error("jeupage::error: ", error);
  }

  const Form = document.querySelector("form");
  const messageCom = document.querySelector("#message");

  Form.addEventListener("submit", async (event) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          game: `${nomjeu}`,
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
      console.error("jeupage::error: ", error);
    }
  });
};
export default jeupage;
