// The comments you see here are for me, documenting my learning experience.

const pokeContainer = document.getElementById("poke-container");
let onLoadUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10";

// GET API
async function getData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

async function renderData(url) {
  let apiData = await getData(url);
  apiData.results.map((item) => {
    // Go through each poke
    // Create <poke-card></poke-card> for each one
    // Apply the data for that poke to each tag.
    // e.g; Title to H3, Poster to img, etc etc
    // Problem - can't render a component like you can in React. How do you render HTML components like React components?

    // Solution - createElement for each loop, then set the attributes from the data.
    // Note: This initially didn't work due to logic being run in the constructor, rather than when the element was added to the DOM.
    // Used the connectedCallback() lifecycle method to correct this.

    const poke = document.createElement("poke-card");
    poke.setAttribute("name", item.name);
    poke.setAttribute("url", item.url);

    pokeContainer.appendChild(poke);
  });
}

renderData(onLoadUrl);

// Load More functionality
let page = 2;
// Just because Rhys was cheeky, I'll add the ability to manually set the number of Pokémon rendered with each click!
let limit = 10;
async function loadMore() {
  let moreData = await getData(
    `https://pokeapi.co/api/v2/pokemon?offset=${
      (page - 1) * limit
    }&limit=${limit}`
  );
  moreData.results.map((item) => {
    const poke = document.createElement("poke-card");
    poke.setAttribute("name", item.name);
    poke.setAttribute("url", item.url);

    pokeContainer.appendChild(poke);
  });
  page++;
}

//   Building a Card to display the Pokémon

// First, create a template to handle any content and styles.

// The h3 below is empty, we populate it with text in the same way
// React uses props.
const template = document.createElement("template");
template.innerHTML = `
    <style>
        .poke-card {
            border: 1px solid red;
            border-radius: 10px;
            width: 50%;
            margin: 20px auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        h3 {
            color: coral;
        }
    </style>

    <div class="poke-card">
        <h3></h3>
        <p></p>
    </div>

`;

// Now we need to start applying data.
class PokeCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    this.shadowRoot.querySelector("h3").innerText = this.getAttribute("name");
    this.shadowRoot.querySelector("p").innerText =
      "URL: " + this.getAttribute("url");
  }
}

window.customElements.define("poke-card", PokeCard);
