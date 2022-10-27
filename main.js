// The comments you see here are for me, documenting my learning experience.

const movieContainer = document.getElementById("movie-container");

// GET API
async function getData() {
  let response = await fetch("api.json");
  let data = await response.json();
  return data;
}

async function renderData() {
  let apiData = await getData();
  apiData.map((movie) => {
    // Go through each movie
    // Create <movie-card></movie-card> for each one
    // Apply the data for that movie to each tag.
    // e.g; Title to H3, Poster to img, etc etc
    // Problem - can't render a component like you can in React. How do you render HTML components like React components?
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
        <img src="" alt="movie poster" />
        <p></p>
    </div>

`;

// Now we need to start applying data.
class MovieCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("h3").innerText = this.getAttribute("name");
    this.shadowRoot.querySelector("img").src = this.getAttribute("poster");
    this.shadowRoot.querySelector("p").innerText = this.getAttribute("year");
  }
}

window.customElements.define("movie-card", MovieCard);
