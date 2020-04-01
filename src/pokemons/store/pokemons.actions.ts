import {
  PokemonResponse,
  PokemonDetail,
  PokemonMove
} from "../../services/pokemon.service";

export const PERFORM_GET_POKEMONS = "[Pokemons] Perform Get Pokemons";
export const PERFORM_GET_POKEMONS_SUCCESS =
  "[Pokemons] Perform Get Pokemons Success";
export const PERFORM_GET_POKEMONS_ERROR =
  "[Pokemons] Perform Get Pokemons Error";
export const PERFORM_GET_MORE_POKEMONS = "[Pokemons] Perform Get More Pokemons";
export const PERFORM_GET_MORE_POKEMONS_SUCCESS =
  "[Pokemons] Perform Get More Pokemons Success";

export const PERFORM_GET_POKEMON_DETAIL =
  "[Pokemons] Perform Get Pokemon Detail";
export const PERFORM_GET_POKEMON_DETAIL_SUCCESS =
  "[Pokemons] Perform Get Pokemon Detail Success";
export const PERFORM_GET_POKEMON_DETAIL_ERROR =
  "[Pokemons] Perform Get Pokemon Detail Error";
const SELECT_POKEMON_BY_ID = "[Pokemons] Select Pokemon By Id";

export const PERFORM_GET_POKEMON_MOVE = "[Pokemons] Perform Get Pokemon Move";
export const PERFORM_GET_POKEMON_MOVE_SUCCESS =
  "[Pokemons] Perform Get Pokemon Move Success";
export const PERFORM_GET_POKEMON_MOVE_ERROR =
  "[Pokemons] Perform Get Pokemon Move Error";
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

export type SelectPokemonByIdAction = {
  type: "[Pokemons] Select Pokemon By Id";
  payload: string;
};

export type GetPokemonDetailAction = {
  type: "[Pokemons] Perform Get Pokemon Detail";
  payload: string;
};

export type GetPokemonDetailSuccessAction = {
  type: "[Pokemons] Perform Get Pokemon Detail Success";
  payload: PokemonDetail;
};

export type GetPokemonDetailErrorAction = {
  type: "[Pokemons] Perform Get Pokemon Detail Error";
  payload: string;
};

export const performGetPokemonsAction = (
  payload?: string
): GetPokemonsAction => ({
  type: PERFORM_GET_POKEMONS,
  payload
});

export const performGetPokemonsSuccessAction = (
  payload: PokemonResponse
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

export const selectPokemonByIdAction = (
  payload: string
): SelectPokemonByIdAction => ({
  type: SELECT_POKEMON_BY_ID,
  payload
});

export const performGetPokemonDetailAction = (
  payload: string
): GetPokemonDetailAction => ({
  type: PERFORM_GET_POKEMON_DETAIL,
  payload
});

export const performGetPokemonDetailSuccessAction = (
  payload: PokemonDetail
): GetPokemonDetailSuccessAction => ({
  type: PERFORM_GET_POKEMON_DETAIL_SUCCESS,
  payload
});

export const performGetPokemonErrorAction = (
  payload: string
): GetPokemonDetailErrorAction => ({
  type: PERFORM_GET_POKEMON_DETAIL_ERROR,
  payload
});

export type GetPokemonMoveAction = {
  type: "[Pokemons] Perform Get Pokemon Move";
  payload: string;
};

export const performGetPokemonMoveAction = (
  payload: string
): GetPokemonMoveAction => ({
  type: PERFORM_GET_POKEMON_MOVE,
  payload
});

export type GetPokemonMoveSuccessAction = {
  type: "[Pokemons] Perform Get Pokemon Move Success";
  payload: PokemonMove;
};

export const performGetPokemonMoveSuccessAction = (
  payload: PokemonMove
): GetPokemonMoveSuccessAction => ({
  type: PERFORM_GET_POKEMON_MOVE_SUCCESS,
  payload
});

export type GetPokemonMoveErrorAction = {
  type: "[Pokemons] Perform Get Pokemon Move Error";
  payload: string;
};

export const performGetPokemonMoveErrorAction = (
  payload: string
): GetPokemonMoveErrorAction => ({
  type: PERFORM_GET_POKEMON_MOVE_ERROR,
  payload
});

export type PokemonsActions =
  | GetPokemonsAction
  | GetPokemonsSuccessAction
  | GetPokemonsErrorAction
  | GetMorePokemonsAction
  | GetMorePokemonsSuccessAction
  | SelectPokemonByIdAction
  | GetPokemonDetailAction
  | GetPokemonDetailSuccessAction
  | GetPokemonDetailErrorAction
  | GetPokemonMoveAction
  | GetPokemonMoveSuccessAction
  | GetPokemonMoveErrorAction;
