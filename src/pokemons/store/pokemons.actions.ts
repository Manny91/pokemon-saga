export const PERFORM_GET_POKEMONS = "[Pokemons] Perform Get Pokemons";
const PERFORM_GET_POKEMONS_SUCCESS = "[Pokemons] Perform Get Pokemons Success";
const PERFORM_GET_POKEMONS_ERROR = "[Pokemons] Perform Get Pokemons Error";
const PERFORM_GET_MORE_POKEMONS = "[Pokemons] Perform Get More Pokemons";
const PERFORM_GET_MORE_POKEMONS_SUCCESS =
  "[Pokemons] Perform Get More Pokemons Success";

export type GetPokemonsAction = {
  type: "[Pokemons] Perform Get Pokemons";
  payload?: string;
};

export type GetPokemonsSuccessAction = {
  type: "[Pokemons] Perform Get Pokemons Success";
  payload: any; // TODO: Type
};

export type GetPokemonsErrorAction = {
  type: "[Pokemons] Perform Get Pokemons Error";
  payload: boolean;
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
  payload: boolean
): GetPokemonsErrorAction => ({
  type: PERFORM_GET_POKEMONS_ERROR,
  payload
});

export const performMoreGetPokemonsAction = (): GetMorePokemonsAction => ({
  type: PERFORM_GET_MORE_POKEMONS
});
export const performMoreGetPokemonsSuccessAction = (): GetMorePokemonsSuccessAction => ({
  type: PERFORM_GET_MORE_POKEMONS_SUCCESS
});

export type PokemonsActions =
  | GetPokemonsAction
  | GetPokemonsSuccessAction
  | GetPokemonsErrorAction
  | GetMorePokemonsAction
  | GetMorePokemonsSuccessAction;
