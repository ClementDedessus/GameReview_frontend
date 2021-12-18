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
    setCookie(name, cvalue, 365);
    return false;
  } else {
    console.log("You came back!");
    setCookie(name, cvalue, 365);
    return true;
  }
}

const classement = async () => {
  var enterEventCount = true;
  var enterEventCount2 = true;
  var enterEventCount3 = true;
  let tab = [];
  let map = new Map();
  const main = document.querySelector("#main");
  main.innerHTML = "Classement";

  try {
    const response = await fetch(`/api/jeu`);
    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const jeux2 = await response.json();
    for (var index = 0; index < jeux2.length; index++) {
      var allGame = jeux2[index].name;
      try {
        const response = await fetch(`/api/liked/game/${allGame}`);
        if (!response.ok) {
          throw new Error(
            "fetch error : " + response.status + " : " + response.statusText
          );
        }
        const jeux2 = await response.json();
        tab.push(jeux2);
        cookie(`${allGame}test`, jeux2);
      } catch (error) {
        console.error("classementpage::error: ", error);
      }
    }
  } catch (error) {
    console.error("classementpage::error: ", error);
  }

  try {
    const response = await fetch(`/api/jeu`);
    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const jeux2 = await response.json();
    jeux2.forEach((element) => {
      map.set(`${element.name}test`, getCookie(`${element.name}test`));
    });
  } catch (error) {
    console.error("classementpage::error: ", error);
  }

  tab = tab.sort((a, b) => b - a);
  for (let index = 0; index < 3; index++) {
    var jeu1 = tab[0];
    var jeu2 = tab[1];
    var jeu3 = tab[2];
  }

  var jeuClassement1;
  var jeuClassement2;
  var jeuClassement3;

  try {
    const titre2 = document.createElement("h4");
    main.appendChild(titre2);
    titre2.innerHTML = "Classement";
    const response = await fetch(`/api/jeu`);

    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const jeux = await response.json();
    for (let index = 0; index < jeux.length; index++) {
      if (map.get(`${jeux[index].name}test`) == jeu1) {
        jeuClassement1 = jeux[index].name;
      }
      if (map.get(`${jeux[index].name}test`) == jeu2) {
        jeuClassement2 = jeux[index].name;
      }
      if (map.get(`${jeux[index].name}test`) == jeu3) {
        jeuClassement3 = jeux[index].name;
      }
    }
  } catch (error) {
    console.error("classementpage::error: ", error);
  }
  var nbVotant1;
  var nbVotant2;
  var nbVotant3;

  try {
    const response = await fetch(`/api/liked/votant/${jeuClassement1}`);

    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const jeux = await response.json();
    nbVotant1 = jeux;
  } catch (error) {
    console.error("classementpage::error: ", error);
  }
  try {
    const response = await fetch(`/api/liked/votant/${jeuClassement2}`);
    // search barre a faire !!!!!!!!!
    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const jeux = await response.json();
    nbVotant2 = jeux;
  } catch (error) {
    console.error("classementpage::error: ", error);
  }
  try {
    const response = await fetch(`/api/liked/votant/${jeuClassement3}`);
    // search barre a faire !!!!!!!!!
    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const jeux = await response.json();
    nbVotant3 = jeux;
  } catch (error) {
    console.error("classementpage::error: ", error);
  }

  try {
    const response = await fetch(`/api/jeu`);
    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const jeux2 = await response.json();

    jeux2.forEach((element) => {
      if (element.name == jeuClassement1) {
        const div1 = document.createElement("strong");
        const img = document.createElement("img");
        div1.appendChild(img);
        main.appendChild(div1);
        div1.className = "class";

        img.src = element.cover;
        img.width = 300;
        img.height = 200;
        img.addEventListener("mouseover", (event) => {
          if (enterEventCount2) {
            enterEventCount2 = false;
            event.preventDefault();

            $(this).animate({
              height: "500px",
              width: "500px",
              left: "+11px",
            });

            const desc = document.createElement("p");
            desc.className = "class1";
            div1.appendChild(desc);
            desc.innerHTML = ` Position : 1 <br> Vote : ${jeu1} <br> Moyenne : ${
              jeu1 / nbVotant1
            } `;
          }
        });
      }
      if (element.name == jeuClassement3) {
        const div3 = document.createElement("strong");
        const img3 = document.createElement("img");
        div3.appendChild(img3);
        main.appendChild(div3);
        div3.className = "class";
        img3.src = element.cover;
        img3.width = 300;
        img3.height = 200;
        img3.addEventListener("mouseover", (event) => {
          if (enterEventCount3) {
            enterEventCount3 = false;
            event.preventDefault();
            const descrip = document.createElement("p");
            descrip.className = "class1";
            div3.appendChild(descrip);
            descrip.innerHTML = ` Position : 3 <br> Vote : ${jeu3} <br> Moyenne : ${
              jeu3 / nbVotant3
            }  `;
          }
        });
      }
      if (element.name == jeuClassement2) {
        const div2 = document.createElement("strong");
        const img2 = document.createElement("img");
        div2.appendChild(img2);
        main.appendChild(div2);
        div2.className = "class";
        img2.src = element.cover;
        img2.width = 300;
        img2.height = 200;
        img2.addEventListener("mouseover", (event) => {
          if (enterEventCount) {
            enterEventCount = false;
            event.preventDefault();

            $(this).animate({
              height: "500px",
              width: "500px",
              left: "+11px",
            });

            const descr = document.createElement("p");
            descr.className = "class1";
            div2.appendChild(descr);
            descr.innerHTML = ` Position : 2 <br> Vote : ${jeu2} <br> Moyenne : ${
              jeu2 / nbVotant2
            }  `;
          }
        });
      }
    });
  } catch (error) {
    console.error("classementpage::error: ", error);
  }
};

export default classement;
