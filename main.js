// The comments you see here are for me, documenting my learning experience.

// GET API
async function getData() {
  let response = await fetch("api.json");
  let data = await response.json();
  return data;
}

async function renderData() {
  let apiData = await getData();
  apiData.forEach((movie) => {
    console.log(movie.Title);
  });
}

renderData();

//   Building a Card to display the movie

// First, create a template to handle any content and styles.

// The h3 below is empty, we populate it with text in the same way
// React uses props.
const template = document.createElement("template");
template.innerHTML = `
    <style>
        h3 {
            color: coral;
        }
    </style>

    <div class="user-card">
        <h3></h3>
    </div>

`;

// Now we need to start applying data.
class MovieCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("h3").innerText = this.getAttribute("name");
  }
}

window.customElements.define("movie-card", MovieCard);
