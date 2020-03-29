import { Pokemon } from "../../services/pokemon.service";
import { PokemonsActions } from "./pokemons.actions";
import { createSelector } from "reselect";
export interface PokemonState {
  loading: boolean;
  error: boolean;
  pokemons: Pokemon[];
}

const initialState: PokemonState = {
  loading: true,
  error: false,
  pokemons: []
};

export default function pokemonsReducer(
  state: PokemonState = initialState,
  action: PokemonsActions
) {
  switch (action.type) {
    case "[Pokemons] Perform Get Pokemons":
      return {
        ...state,
        loading: true
      };
    case "[Pokemons] Perform Get Pokemons Success":
      const { results } = action.payload.data;

      return {
        ...state,
        pokemonList: addPokemons(results),
        loading: false
      };
    case "[Pokemons] Perform Get Pokemons Error":
      return {
        ...state,
        error: true,
        loading: false
      };
    case "[Pokemons] Perform Get More Pokemons":
      return {
        ...state,
        loading: true
      };
    case "[Pokemons] Perform Get More Pokemons Success":
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

const addPokemons = (pokemons: Pokemon[]) => {
  const pokemonsList = pokemons.map((pokemon: Pokemon) => {
    const id = getPokemonIdFromPokemonUrl(pokemon.url);
    return { id, ...pokemon };
  });
  return pokemonsList;
};
const getPokemonIdFromPokemonUrl = (url: string) => {
  return url
    .split("/")
    .filter(el => !!el)
    .pop();
};

const pokemonState = (state: PokemonState): PokemonState => state;

export const getPokemons = createSelector(
  pokemonState,
  pokemonState => pokemonState.pokemons
);
export const getPokemonsError = createSelector(
  pokemonState,
  pokemonState => pokemonState.error
);
export const getPokemonsLoading = createSelector(
  pokemonState,
  pokemonState => pokemonState.loading
);
