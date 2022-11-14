Good day,

Welcome to a very simple application.

When you load this application, you will be presented with a search bar and a "Search" button. Type in the name of a Pokémon and click "Search", if that Pokémon exists it will be fetched directly from the PokéAPI, which can be found here; https://pokeapi.co/
You can then continue to add more Pokémon to the list.

Each Pokémon card contains:

- The name of the Pokémon; e.g. Pikachu, Charmander, etc.
- The default sprite of the Pokémon, as seen in Pokémon battles.
- The type of Pokémon; e.g. Fire, Water, etc.
- The base stats of the Pokémon.
- The background color of each Pokémon card corresponds to the Pokémon's type.

Build your favourite Pokémon team!

# The purpose:

This application was initially a project given to me for the code-test stage of the interview process for a Javascript Developer role.
The initial requirements were to render data fetched from a public API to the screen upon initial load, with the ability to add more items from the API using a button.
Upon completing the requirements of the assignment, I began to expand on the project, due to my interest in web components as well as the visions I had for additional functionality. I ran with it to have fun!
In the code-review stage of the interview - I was tasked with adding the ability for users to search for a single Pokémon. The API has a VERY different response when searching for a single Pokémon, rather than retrieving a list of them. Due to this, the original "render a list" functionality has been removed, as it simply does not match the depth of the single search.
This functionality remains in the code, but has been commented out for posterity.

This project is my first look at Web Components.

The head of engineering, in charge of the recruitment for this role, stated that they wanted to offer me the role, but the company unfortunately put a hiring freeze in place before the end of the interview process. Blast.

-- OLD FUNCTIONALITY -> removed due to API limitations, but this information will remain here for posterity --

-- At the bottom, you will find a dropdown box and a "Load More" button. Select the amount of additional Pokémon you wish to see (the default is 10) and then click the "Load More" button to see them added to the list. These will begin from the start of the Pokédex. --
