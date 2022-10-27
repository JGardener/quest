const pokeContainer = document.getElementById("poke-container");

let page = 1;
let limit = 10;

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
    poke.setAttribute("name", item.name);
    poke.setAttribute("url", item.url);
    pokeContainer.appendChild(poke);
  });
  return page++;
}

updateData();

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
