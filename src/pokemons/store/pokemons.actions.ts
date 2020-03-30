import { PokemonResponse } from "../../services/pokemon.service";

export const PERFORM_GET_POKEMONS = "[Pokemons] Perform Get Pokemons";
export const PERFORM_GET_POKEMONS_SUCCESS =
  "[Pokemons] Perform Get Pokemons Success";
export const PERFORM_GET_POKEMONS_ERROR =
  "[Pokemons] Perform Get Pokemons Error";
export const PERFORM_GET_MORE_POKEMONS = "[Pokemons] Perform Get More Pokemons";
export const PERFORM_GET_MORE_POKEMONS_SUCCESS =
  "[Pokemons] Perform Get More Pokemons Success";

export type GetPokemonsAction = {
  type: "[Pokemons] Perform Get Pokemons";
  payload?: string;
};

export type GetPokemonsSuccessAction = {
  type: "[Pokemons] Perform Get Pokemons Success";
  payload: PokemonResponse;
};

export type GetPokemonsErrorAction = {
  type: "[Pokemons] Perform Get Pokemons Error";
  payload: string;
};

export type GetMorePokemonsAction = {
  type: "[Pokemons] Perform Get More Pokemons";
};

export type GetMorePokemonsSuccessAction = {
  type: "[Pokemons] Perform Get More Pokemons Success";
};

export const performGetPokemonsAction = (
  payload?: string
): GetPokemonsAction => ({
  type: PERFORM_GET_POKEMONS,
  payload
});

export const performGetPokemonsSuccessAction = (
  payload: any
): GetPokemonsSuccessAction => ({
  type: PERFORM_GET_POKEMONS_SUCCESS,
  payload
});

export const performGetPokemonsErrorAction = (
  payload: string
): GetPokemonsErrorAction => ({
  type: PERFORM_GET_POKEMONS_ERROR,
  payload
});

export const performGetMorePokemonsAction = (): GetMorePokemonsAction => ({
  type: PERFORM_GET_MORE_POKEMONS
});
export const performGetMorePokemonsSuccessAction = (): GetMorePokemonsSuccessAction => ({
  type: PERFORM_GET_MORE_POKEMONS_SUCCESS
});

export type PokemonsActions =
  | GetPokemonsAction
  | GetPokemonsSuccessAction
  | GetPokemonsErrorAction
  | GetMorePokemonsAction
  | GetMorePokemonsSuccessAction;
