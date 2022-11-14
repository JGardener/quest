// const selectLimit = document.getElementById("selectLimit");
// selectLimit.addEventListener("change", (event) => (limit = event.target.value));
const pokeContainer = document.getElementById("poke-container");
const errorText = document.getElementById("error");

const singlePokemonSearch = document.getElementById("pokemonName");

let page = 1;
let limit = 10;

let defaultFontColor = "#FFF";

// Colour Pokémon cards based on Pokémon types
// Bright Pokémon cards have black text for accessibility
const backgroundColorFromType = {
  "Bug": {
    backgroundColor: "#3B9950",
  },
  "Dark": {
    backgroundColor: "#5A5A77",
  },
  "Dragon": {
    backgroundColor: "#448B95",
  },
  "Electric": {
    backgroundColor: "#E3E429",
    fontColor: "#000",
  },
  "Fairy": {
    backgroundColor: "#981844",
  },
  "Fighting": {
    backgroundColor: "#994025",
  },
  "Fire": {
    backgroundColor: "#AB1F23",
  },
  "Flying": {
    backgroundColor: "#4A677D",
  },
  "Ghost": {
    backgroundColor: "#8E688E",
  },
  "Grass": {
    backgroundColor: "#27CB4F",
  },
  "Ground": {
    backgroundColor: "#A9702C",
  },
  "Ice": {
    backgroundColor: "#84D2F7",
    fontColor: "#000",
  },
  "Normal": {
    backgroundColor: "#CA98A7",
  },
  "Poison": {
    backgroundColor: "#9B69D9",
  },
  "Psychic": {
    backgroundColor: "#F81D8F",
  },
  "Rock": {
    backgroundColor: "#8B3E21",
  },
  "Steel": {
    backgroundColor: "#D1D1E0",
    fontColor: "#000",
  },
  "Water": {
    backgroundColor: "#86A8FC",
    fontColor: "#000",
  },
};

// The API returns lower-case words, this helps.
const capitaliseFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

// Get a single Pokémon
async function getSinglePokemon() {
  let pokemonName = singlePokemonSearch.value.toLowerCase();

  // Check for duplicates
  for (i = 0; i < pokeContainer.children.length; i++) {
    if (
      pokeContainer.children.namedItem(capitaliseFirstLetter(pokemonName)) !=
      null
    ) {
      errorText.innerText = "That Pokémon is already in the list!";
      errorText.style.color = "red";
      return;
    }
  }

  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  if (!response.ok) {
    errorText.innerText =
      "No Pokémon found, please check your spelling and try again.";
  } else {
    errorText.innerText = "";
  }
  let data = await response.json();
  const poke = document.createElement("poke-card");
  const pokeShadow = poke.shadowRoot.querySelector("div");
  poke.setAttribute("name", capitaliseFirstLetter(data.name));
  poke.setAttribute("type", data.types[0].type.name);
  poke.setAttribute("src", data.sprites.front_default);
  pokeContainer.appendChild(poke);

  errorText.innerText = "Pokémon added!";
  errorText.style.color = "green";

  pokeShadow.style.background =
    backgroundColorFromType[
      pokeShadow.querySelector("p").innerText
    ].backgroundColor;
  pokeShadow.style.color =
    backgroundColorFromType[pokeShadow.querySelector("p").innerText]
      .fontColor || defaultFontColor;
  return data;
}

// Get a list of Pokémon, beginning from #1
// async function getData() {
//   let response = await fetch(
//     `https://pokeapi.co/api/v2/pokemon/?offset=${
//       (page - 1) * limit
//     }&limit=${limit}`
//   );
//   let data = await response.json();
//   return data;
// }
// async function updateData() {
//   let data = await getData();
//   data.results.map((item) => {
//     const poke = document.createElement("poke-card");
//     poke.setAttribute("name", capitaliseFirstLetter(item.name));
//     pokeContainer.appendChild(poke);
//   });
//   return page++;
// }

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
