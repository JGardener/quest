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
  const pokeShadow = poke.shadowRoot.querySelector("div");
  poke.setAttribute("name", capitaliseFirstLetter(data.name));
  poke.setAttribute("type", data.types[0].type.name);
  poke.setAttribute("src", data.sprites.front_default);
  pokeContainer.appendChild(poke);
  switch (pokeShadow.querySelector("p").innerText) {
    case "Bug":
      pokeShadow.style.background = "#3B9950";
      break;
    case "Dark":
      pokeShadow.style.background = "#5A5A77";
      break;
    case "Dragon":
      pokeShadow.style.background = "#448B95";
      break;
    case "Electric":
      pokeShadow.style.background = "#E3E429";
      break;
    case "Fairy":
      pokeShadow.style.background = "#981844";
      break;
    case "Fighting":
      pokeShadow.style.background = "#994025";
      break;
    case "Fire":
      pokeShadow.style.background = "#AB1F23";
      break;
    case "Flying":
      pokeShadow.style.background = "#4A677D";
      break;
    case "Ghost":
      pokeShadow.style.background = "#8E688E";
      break;
    case "Grass":
      pokeShadow.style.background = "#27CB4F";
      break;
    case "Ground":
      pokeShadow.style.background = "#A9702C";
      break;
    case "Ice":
      pokeShadow.style.background = "#84D2F7";
      poke.style.color = "black";
      break;
    case "Normal":
      pokeShadow.style.background = "#CA98A7";
      break;
    case "Poison":
      pokeShadow.style.background = "#9B69D9";
      break;
    case "Psychic":
      pokeShadow.style.background = "#F81D8F";
      break;
    case "Rock":
      pokeShadow.style.background = "#8B3E21";
      break;
    case "Steel":
      pokeShadow.style.background = "#D1D1E0";
      poke.style.color = "black";
      break;
    case "Water":
      pokeShadow.style.background = "#86A8FC";
      break;
  }
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
    pokeContainer.appendChild(poke);
  });
  return page++;
}

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
