// const selectLimit = document.getElementById("selectLimit");
// selectLimit.addEventListener("change", (event) => (limit = event.target.value));
const pokeContainer = document.getElementById("poke-container");
const errorText = document.getElementById("error");
const singlePokemonSearch = document.getElementById("pokemonName");
const searchSingleButton = document.getElementById("searchSingle");
searchSingleButton.addEventListener("click", getSinglePokemon);
singlePokemonSearch.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    getSinglePokemon();
  }
});

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
    errorText.style.color = "#FD1B17";
    errorText.style.fontWeight = "bold";
  } else {
    errorText.innerText = "";
  }
  let data = await response.json();
  const poke = document.createElement("poke-card");
  const pokeShadow = poke.shadowRoot.querySelector("div");
  poke.setAttribute("name", capitaliseFirstLetter(data.name));
  poke.setAttribute("type", data.types[0].type.name);
  poke.setAttribute("src", data.sprites.front_default);
  poke.setAttribute("stat-1", data.stats[0].base_stat);
  poke.setAttribute("stat-2", data.stats[1].base_stat);
  poke.setAttribute("stat-3", data.stats[2].base_stat);
  poke.setAttribute("stat-4", data.stats[3].base_stat);
  pokeContainer.appendChild(poke);

  errorText.innerText = "Pokémon added!";
  errorText.style.color = "#27CB4F";

  pokeShadow.style.background =
    backgroundColorFromType[
      pokeShadow.querySelector("span").innerText
    ].backgroundColor;
  pokeShadow.style.color =
    backgroundColorFromType[pokeShadow.querySelector("span").innerText]
      .fontColor || defaultFontColor;

  singlePokemonSearch.value = "";
  pokeContainer.scrollTo(0, pokeContainer.scrollHeight);
  return data;
}
// <link rel="stylesheet" href="poke-card.css" />

const template = document.createElement("template");
template.innerHTML = `
  <style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .poke-card {
    border-radius: 10px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    flex-direction: column;
    padding: 8px;
    max-width: 400px;
    animation: append-animate 0.5s linear;
  }

  #type {
    margin-bottom: 5px;
  }

  .stats {
    display: flex;
    justify-content: center;
  }

  .stats p {
    margin-right: 5px;
  }

  @keyframes append-animate {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  </style>

  <div class="poke-card">
    <h3 id="name"></h3>
    <img id="sprite" alt="Pokémon sprite" />
    <p>Type: <span id="type"></span></p>
    <div class="stats">
      <p>HP: <span id="stat-1"></span></p>
      <p>Attack: <span id="stat-2"></span></p>
      <p>Defense: <span id="stat-3"></span></p>
      <p>Special Attack: <span id="stat-4"></span></p>
    </div>
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
    this.shadowRoot.getElementById("stat-1").innerText =
      this.getAttribute("stat-1");
    this.shadowRoot.getElementById("stat-2").innerText =
      this.getAttribute("stat-2");
    this.shadowRoot.getElementById("stat-3").innerText =
      this.getAttribute("stat-3");
    this.shadowRoot.getElementById("stat-4").innerText =
      this.getAttribute("stat-4");
  }
}

window.customElements.define("poke-card", PokeCard);
