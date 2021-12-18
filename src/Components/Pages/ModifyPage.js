import { Redirect } from "../Router/Router";
import { getSessionObject } from "../utils/session";
const formaddpage = `<div class="text-center">

<h3>Add Game</h3>
<form class="px-5">
<div class="mb-3">
<label for="<name">name</label>
<input
  type="text"
  name="name"
  id="name"
  class="form-control"
  placeholder="Enter name"
  
/>
</div>
<div class="mb-3">
<label for="age_ratings" class="form-label">age_ratings</label>
<input
  type="number"
  name="age_ratings"
  id="age_ratings"
  class="form-control"
  placeholder="Enter age_ratings"
  
/>
</div>

<div class="mb-3">
<label for="category" class="form-label">category</label>
<input
  type="text"
  name="category"
  id="category"
  class="form-control"
  placeholder="Enter category"
  
/>
</div>

<div class="mb-3">
<label for="cover" class="form-label">cover</label>
<input
  type="text"
  name="cover"
  id="cover"
  class="form-control"
  placeholder="Enter cover"
  
/>
</div>
<div class="mb-3">
<label for="first_release_date" class="form-label">first_release_date</label>
<input
  type="text"
  name="first_release_date"
  id="first_release_date"
  class="form-control"
  placeholder="Enter first_release_date"
  
/>
</div>
<div class="mb-3">
<label for="involved_companies" class="form-label">involved_companies</label>
<input
  type="text"
  name="involved_companies"
  id="involved_companies"
  class="form-control"
  placeholder="Enter involved_companies"
  
/>
</div>

<div class="mb-3">
<label for="multiplayer_modes" class="form-label"> multiplayer_modes</label>
<input
  type="text"
  name="multiplayer_modes"
  id="multiplayer_modes"
  class="form-control"
  placeholder="Enter multiplayer_modes"
  
/>
</div>
<div class="mb-3">
<label for="platforms" class="form-label">platforms</label>
<input
  type="text"
  name="platforms"
  id="platforms"
  class="form-control"
  placeholder="Enter platforms"
  
/>
</div>

<div class="mb-3">
<label for="summary" class="form-label">summary</label>
<input
  type="text"
  name="summary"
  id="summary"
  class="form-control"
  placeholder="Enter summary"
  
/>
</div>
<div class="mb-3">
<label for="url" class="form-label">url</label>
<input
  type="text"
  name="url"
  id="url"
  class="form-control"
  placeholder="Enter url"
  
/>
</div>


<button type="submit" class="btn btn-primary" id="btn1">Save</button>
</form>
<div id="r"></div>

</div`;
const modify = async () => {
  var nomjeu = sessionStorage.getItem("clé");
  let user = getSessionObject("user");
  const main = document.querySelector("#main");
  main.innerHTML = formaddpage;
  const Form = document.querySelector("form");
  const name = document.querySelector("#name");
  const age_ratings = document.querySelector("#age_ratings");
  const category = document.querySelector("#category");
  const cover = document.querySelector("#cover");
  const first_release_date = document.querySelector("#first_release_date");
  const involved_companies = document.querySelector("#involved_companies");
  const multiplayer_modes = document.querySelector("#multiplayer_modes");
  const platforms = document.querySelector("#platforms");
  const summary = document.querySelector("#summary");
  const url = document.querySelector("#url");

  try {
    const response = await fetch(`/api/jeu?name=${nomjeu}`);
    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const jeux = await response.json();
    name.value = jeux.name;
    age_ratings.value = jeux.age_ratings;
    category.value = jeux.category;
    cover.value = jeux.cover;
    first_release_date.value = jeux.first_release_date;
    involved_companies.value = jeux.involved_companies;
    multiplayer_modes.value = jeux.multiplayer_modes;
    platforms.value = jeux.platforms;
    summary.value = jeux.summary;
    url.value = jeux.url;
    Form.addEventListener("submit", async (event) => {
      event.preventDefault();

      try {
        const options = {
          method: "PUT",
          body: JSON.stringify({
            name: name.value,
            age_ratings: age_ratings.value,
            category: category.value,
            cover: cover.value,
            first_release_date: first_release_date.value,
            involved_companies: involved_companies.value,
            multiplayer_modes: multiplayer_modes.value,
            platforms: platforms.value,
            summary: summary.value,
            url: url.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(`/api/jeu/update/${nomjeu}`, options);
        if (!response.ok) {
          throw new Error(
            "fetch error : " + response.status + " : " + response.statusText
          );
        }
      } catch (error) {
        console.error("modifypage::error: ", error);
      }
      Redirect("/jeu");
    });
  } catch (error) {
    console.error("modifypage::error: ", error);
  }
};
export default modify;
