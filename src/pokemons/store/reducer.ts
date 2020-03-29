import { Pokemon } from "../../services/pokemon.service";
import { PokemonsActions } from "./pokemons.actions";

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
        isLoading: false
      };
    case "[Pokemons] Perform Get Pokemons Error":
      return {
        ...state,
        error: true,
        isLoading: false
      };
    case "[Pokemons] Perform Get More Pokemons":
      return {
        ...state,
        isLoading: true
      };
    case "[Pokemons] Perform Get More Pokemons Success":
      return {
        ...state,
        isLoading: false
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
