import { Pokemon } from "../../services/pokemon.service";
import { PokemonsActions } from "./pokemons.actions";
import { createSelector } from "reselect";
import { AppState } from "../../store";
export interface PokemonState {
  loading: boolean;
  error: boolean;
  pokemons: Pokemon[];
}

export const initialPokemonState: PokemonState = {
  loading: true,
  error: false,
  pokemons: []
};

export default function pokemonsReducer(
  state: PokemonState = initialPokemonState,
  action: PokemonsActions
) {
  switch (action.type) {
    case "[Pokemons] Perform Get Pokemons":
      return {
        ...state,
        loading: true
      };
    case "[Pokemons] Perform Get Pokemons Success":
      const { results } = action.payload;

      return {
        ...state,
        pokemons: addPokemons(results),
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

const pokemonsState = (state: AppState): PokemonState => state.pokemonsState;

export const getPokemons = createSelector(
  pokemonsState,
  pokemonsState => pokemonsState.pokemons
);
export const getPokemonsError = createSelector(
  pokemonsState,
  pokemonsState => pokemonsState.error
);
export const getPokemonsLoading = createSelector(
  pokemonsState,
  pokemonsState => pokemonsState.loading
);
