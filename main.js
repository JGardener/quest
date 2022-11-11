const pokeContainer = document.getElementById("poke-container");
const selectLimit = document.getElementById("selectLimit");
const errorText = document.getElementById("error");
selectLimit.addEventListener("change", (event) => (limit = event.target.value));

const singlePokemonSearch = document.getElementById("pokemonName");

let page = 1;
let limit = 10;

const capitaliseFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

// Get a single Pokémon
async function getSinglePokemon() {
  let pokemonName = singlePokemonSearch.value.toLowerCase();

  // Check for duplicates
  for (i = 0; i < pokeContainer.children.length; i++) {
    if (
      pokeContainer.children.length >= 1 &&
      pokeContainer.children.namedItem(capitaliseFirstLetter(pokemonName)) !=
        null
    ) {
      errorText.innerText = "That Pokémon is already in the list.";
      return;
    }
  }

  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  let data = await response.json();
  const poke = document.createElement("poke-card");
  poke.setAttribute("name", capitaliseFirstLetter(data.name));
  poke.setAttribute("type", data.types[0].type.name);
  poke.setAttribute("src", data.sprites.front_default);
  // console.log(data);
  pokeContainer.appendChild(poke);
  return data;
}

// Get a list of Pokémon, beginning from #1
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
    poke.setAttribute("type", item.types[0].type.name);
    poke.setAttribute("src", data.sprites.front_default);
    pokeContainer.appendChild(poke);
  });
  return page++;
}

// updateData();

const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="poke-card.css" />

    <div class="poke-card">
        <h3 id="name"></h3>
        <img id="sprite" alt="Pokémon sprite" />
        <p id="type"></p>
    </div>

`;

class PokeCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    this.shadowRoot.getElementById("name").innerText =
      this.getAttribute("name");
    this.shadowRoot.getElementById("type").innerText = capitaliseFirstLetter(
      this.getAttribute("type")
    );
    this.shadowRoot.getElementById("sprite").src = this.getAttribute("src");
  }
}

window.customElements.define("poke-card", PokeCard);
