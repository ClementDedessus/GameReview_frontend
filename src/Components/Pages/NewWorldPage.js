const newworldpage = async() =>{

    const main = document.querySelector("#main");
    main.innerHTML = "ftghbjn";
    try {
        const response = await fetch("/api/jeu?age=New World"); 
        if (!response.ok) {
          throw new Error(
            "fetch error : " + response.status + " : " + response.statusText
          );
          
        }
        const jeux = await response.json();
        
          alert(jeux.name)
        
      } catch (error) {
        console.error("newwordlpage::error: ", error);
      }
    
}
export default newworldpage