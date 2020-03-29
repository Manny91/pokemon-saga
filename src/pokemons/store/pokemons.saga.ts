import {
  PERFORM_GET_POKEMONS,
  GetPokemonsAction,
  performGetPokemonsSuccessAction,
  performGetPokemonsErrorAction
} from "./pokemons.actions";
import { takeLatest, call, put } from "redux-saga/effects";
import pokemonService from "../../services/pokemon.service";

export function* pokemonsSaga() {
  yield takeLatest(PERFORM_GET_POKEMONS, performGetPokemonsSaga);
}

function* performGetPokemonsSaga(action: GetPokemonsAction) {
  try {
    const response = yield call(pokemonService.getPokemons, action.payload);
    console.log("response", response);
    yield put(performGetPokemonsSuccessAction(response));
  } catch (error) {
    yield put(performGetPokemonsErrorAction(error.message));
  }
}
