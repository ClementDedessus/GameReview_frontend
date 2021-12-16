import { getSessionObject } from "../utils/session";

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
function cookie(name,cvalue){
  var x = getCookie(name);

  if (x == "" || x == null) {
    alert("Welcome to Steampunk Inc!");
    setCookie(name, "iwashere", 365);
    return false;
  } else{
    console.log("You came back!");
    return true;
  }
}

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
const jeupage = async () =>{
    let user = getSessionObject("user");
    const commentaire = document.createElement("div");
    const main = document.querySelector("#main");
    let nomjeu = sessionStorage.getItem("clé")
    try {
      const response = await fetch(`/api/jeu?age=${nomjeu}`);
      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const jeux = await response.json();
    
      const img = document.createElement("img");
      img.className = "container";
      img.className = "p-3";
      img.src = jeux.cover;
      img.height = 300;
      img.width = 300;
      
      //animation image 
      $(document).ready(function(){

        $("img").mouseover(function(){
           $(this).animate({
              height:'500px',
               width:'500px',
               left : '+11px'
           })
         });
        
        $("img").mouseout(function(){
           $(this).animate({
             height:'200px',
             width:'200px',
             left : '0px'
           })
        });
        // clear le main 2  pcq l image se rajoute partout apres 
        $("img").click(function(){
           $(this).stop();
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
        <td class="text-center"><p> Note : ${jeux.rating} </p></td> 
        </tr>
        <tr>
        <td class="text-center"><p> Resume : ${jeux.summary}  </p></td> 
        </tr>
      </tbody>
    </table>`
      main.appendChild(img);
      main.setAttribute("style", "text-align:center");

              
             

    } catch (error) {
      console.error("battlefielpage::error: ", error);
    }
    
        
        try {
            const response = await fetch(`/api/commentaires/${nomjeu}`);
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
              main.appendChild(afficherLike)
              like.innerHTML = "like";
              like.type = "submit";
              like.data = comment.id;
              table.appendChild(afficherLike)
              afficherLike.innerHTML=comment.like
              like.addEventListener("click", async (event) => {

                if(cookie(`${user.username},${comment.id}`,comment.id)===false){
                  try {
                    const options = {
                      method: "PUT",
                    };
                    const response = await fetch(`/api/commentaires/${comment.id}`,options);
                
                    if (!response.ok) {
                      throw new Error(
                        "fetch error : " + response.status + " : " + response.statusText
                      );
                    }
                    const nblike = await response.json()
                  
                    
                    afficherLike.innerHTML=nblike.like
             
                  } catch (error) {
                    console.error("changeusername::error: ", error);
                  }
                }else{
                  alert("deja vote")
                }
            })
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
          console.error("changeusername::error: ", error);
        }
      });
}
export default jeupage