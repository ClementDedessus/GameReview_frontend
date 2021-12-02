import { getSessionObject } from "../utils/session";

const ProfilPage = () => {
    let user = getSessionObject("user");
    const main = document.querySelector("#main");
    main.innerHTML=user.username
    
}
export default ProfilPage