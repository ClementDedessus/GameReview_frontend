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
  const file = document.querySelector("#btn1");

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
      const vid = document.createElement("img");
      div.appendChild(vid);
      main.appendChild(div);
      var input = document.getElementById("#btn1");
      alert(input)
      var fReader = new FileReader();
      fReader.readAsDataURL(input.files[0]);
      fReader.onloadend = function (event) {
        vid.src = event.target.result;
      };
    });
  } catch (error) {
    console.error("battlefielpage::error: ", error);
  }

  Form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          video: file.value,
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
};
export default videopage;
