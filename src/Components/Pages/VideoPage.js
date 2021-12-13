const video = ` <div class="text-center">
<form class="px-5">

<input type="file" class="btn btn-primary" id="btn1"></input>
<button type="submit" class="btn btn-primary">Save</button>
</form>

</div`;

const videopage = async() =>{
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
        videos.forEach((video)=>{
            const div = document.createElement("div");
            const vid = document.createElement("video");
            div.appendChild(vid);
            main.appendChild(div);
            vid.src=video.video;
        })
      } catch (error) {
        console.error("battlefielpage::error: ", error);
      }


    Form.addEventListener("submit",async(event)=>{
        event.preventDefault()
        try {
            const options = {
              method: "POST",
              body: JSON.stringify({
                video: file.value,
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
    })
}
export default videopage 