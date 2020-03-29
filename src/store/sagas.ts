import { all } from "redux-saga/effects";
import { pokemonsSaga } from "../pokemons/store/pokemons.saga";

export function* sagas() {
  yield all([pokemonsSaga()]);
}
