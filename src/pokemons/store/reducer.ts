import { Pokemon } from "../../services/pokemon.service";
import { PokemonsActions } from "./pokemons.actions";
import { createSelector } from "reselect";
import { AppState } from "../../store";
export interface PokemonState {
  loading: boolean;
  error: string;
  pokemons: Pokemon[];
  pokemonsCount: number;
}

export const initialPokemonState: PokemonState = {
  loading: true,
  error: "",
  pokemons: [],
  pokemonsCount: 0
};

export default function pokemonsReducer(
  state: PokemonState = initialPokemonState,
  action: PokemonsActions
) {
  switch (action.type) {
    case "[Pokemons] Perform Get More Pokemons":
    case "[Pokemons] Perform Get Pokemons":
      return {
        ...state,
        loading: true
      };
    case "[Pokemons] Perform Get Pokemons Success":
      const { results } = action.payload;

      return {
        ...state,
        loading: false,
        ...addPokemons(state.pokemons, results)
      };
    case "[Pokemons] Perform Get Pokemons Error":
      return {
        ...state,
        error: action.payload,
        loading: false
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

const addPokemons = (
  storedPokemons: Pokemon[],
  pokemons: Pokemon[]
): Partial<PokemonState> => {
  const pokemonsList = storedPokemons.concat(
    pokemons.map((pokemon: Pokemon) => {
      const id = getPokemonIdFromPokemonUrl(pokemon.url);
      return { id, ...pokemon };
    })
  );
  return { pokemons: pokemonsList, pokemonsCount: pokemonsList.length };
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

export const getPokemonsCount = createSelector(
  pokemonsState,
  pokemonsState => pokemonsState.pokemonsCount
);
