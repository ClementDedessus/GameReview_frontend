import { getSessionObject } from "../utils/session";
const video = ` <div class="text-center">
<form class="px-5">

<input type="file" class="btn btn-primary" id="btn1"></input>
<button type="submit" class="btn btn-primary">Save</button>
</form>

</div`;

const videopage = async () => {
  let user = getSessionObject("user");
  const main = document.querySelector("#main");
  main.innerHTML = video;
  const Form = document.querySelector("form");
  const files = document.querySelector("#btn1");

  /*files.onchange = function(event) {
    alert(event.target.files[0])
    let file = event.target.files[0];
    let blobURL = URL.createObjectURL(file);
    //document.querySelector("video").src = blobURL;
    Form.addEventListener("submit", async (event) => {
      event.preventDefault();
      try {
        const options = {
          method: "POST",
          body: JSON.stringify({
            video: files.value,
            expediteur: user.username,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        };
  
        const response = await fetch("/api/videos", options);
  
        if (!response.ok) {
          throw new Error(
            "fetch error : " + response.status + " : " + response.statusText
          );
        }
        const video = await response.json();
      } catch (error) {
        console.error("RegisterPage::error: ", error);
      }
    });
    
  }
  
  
  try {
    const response = await fetch("/api/videos");
    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const videos = await response.json();
    videos.forEach((video) => {
      const div = document.createElement("div");
      const vid = document.createElement("video");
      vid.width="320";
      vid.height="240";
      div.appendChild(vid);
      main.appendChild(div);
      let file = video.video;
      let blobURL = URL.createObjectURL(file);
      vid.src=blobURL
    });
  } catch (error) {
    console.error("battlefielpage::error: ", error);
  }

  */
};
export default videopage;
