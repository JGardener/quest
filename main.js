const pokeContainer = document.getElementById("poke-container");
const selectLimit = document.getElementById("selectLimit");
selectLimit.addEventListener("change", () => {
  limit = selectLimit.value;
});

let page = 1;
let limit = 10;

const capitaliseFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

async function getData() {
  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${
      (page - 1) * limit
    }&limit=${limit}`
  );
  let data = await response.json();
  return data;
}
async function updateData() {
  let data = await getData();
  data.results.map((item) => {
    const poke = document.createElement("poke-card");
    poke.setAttribute("name", capitaliseFirstLetter(item.name));
    pokeContainer.appendChild(poke);
  });
  return page++;
}

updateData();

const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="poke-card.css" />

    <div class="poke-card">
        <h3></h3>
    </div>

`;

class PokeCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    this.shadowRoot.querySelector("h3").innerText = this.getAttribute("name");
  }
}

window.customElements.define("poke-card", PokeCard);
