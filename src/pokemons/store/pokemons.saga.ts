import {
  PERFORM_GET_POKEMONS,
  GetPokemonsAction,
  performGetPokemonsSuccessAction,
  performGetPokemonsErrorAction,
  PERFORM_GET_MORE_POKEMONS,
  performGetPokemonsAction,
  performGetMorePokemonsSuccessAction,
  PERFORM_GET_POKEMON_DETAIL,
  GetPokemonDetailAction,
  performGetPokemonErrorAction,
  performGetPokemonDetailSuccessAction
} from "./pokemons.actions";
import { takeLatest, call, put, select, all } from "redux-saga/effects";
import pokemonService from "../../services/pokemon.service";
import { getPokemonsCount } from "./reducer";

export function* pokemonsSaga() {
  yield all([
    takeLatest(PERFORM_GET_POKEMONS, performGetPokemonsSaga),
    takeLatest(PERFORM_GET_MORE_POKEMONS, performGetMorePokemonsSaga),
    takeLatest(PERFORM_GET_POKEMON_DETAIL, performGetPokemonDetailsSaga)
  ]);
}

export function* performGetPokemonsSaga(action: GetPokemonsAction) {
  try {
    const response = yield call(pokemonService.getPokemons, action.payload);
    yield put(performGetPokemonsSuccessAction(response));
  } catch (error) {
    yield put(performGetPokemonsErrorAction(error.message));
  }
}

export function* performGetMorePokemonsSaga() {
  const pokemonsCount = yield select(getPokemonsCount);
  //get the number of pokemons so we have an offset
  const offsetParam = `offset=${pokemonsCount}`;
  //request the pokemons with an offset
  yield put(performGetPokemonsAction(offsetParam));
  yield put(performGetMorePokemonsSuccessAction());
}

export function* performGetPokemonDetailsSaga(action: GetPokemonDetailAction) {
  try {
    const pokemonDetail = yield call(pokemonService.getPokemon, action.payload);
    yield put(performGetPokemonDetailSuccessAction(pokemonDetail));
  } catch (error) {
    yield put(performGetPokemonErrorAction(error));
  }
}
