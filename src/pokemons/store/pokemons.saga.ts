import {
  PokemonSpecieDetail,
  PokemonDetail,
  PokemonEvolutionSpecie
} from "./../../services/pokemon.service";
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
  performGetPokemonDetailSuccessAction,
  PERFORM_GET_POKEMON_MOVE,
  GetPokemonMoveAction,
  performGetPokemonMoveSuccessAction,
  performGetPokemonMoveErrorAction
} from "./pokemons.actions";
import { takeLatest, call, put, select, all } from "redux-saga/effects";
import pokemonService, { EvolutionChain } from "../../services/pokemon.service";
import { getPokemonsCount } from "./reducer";
import { getIdFromUrl } from "../../utils/getIdFromUrl";

export function* pokemonsSaga() {
  yield all([
    takeLatest(PERFORM_GET_POKEMONS, performGetPokemonsSaga),
    takeLatest(PERFORM_GET_MORE_POKEMONS, performGetMorePokemonsSaga),
    takeLatest(PERFORM_GET_POKEMON_DETAIL, performGetPokemonDetailsSaga),
    takeLatest(PERFORM_GET_POKEMON_MOVE, performGetPokemonMoveSaga)
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
    const pokemonDetail: PokemonDetail = yield call(
      pokemonService.getPokemon,
      action.payload
    );

    // we need to get the species in order to get after the evolution chain
    const specieDetail: PokemonSpecieDetail = yield call(
      pokemonService.getSpecie,
      pokemonDetail.id
    );
    const evolutionChainId = +(
      getIdFromUrl(specieDetail.evolution_chain.url) + ""
    );
    const evolutionChain: EvolutionChain = yield call(
      pokemonService.getEvolutionChain,
      evolutionChainId
    );
    const pokemonEvolutionChain = getInfoEvolutionPokemons(evolutionChain);
    specieDetail.evolutions = pokemonEvolutionChain;
    pokemonDetail.species = { ...specieDetail };
    yield put(performGetPokemonDetailSuccessAction(pokemonDetail));
  } catch (error) {
    yield put(performGetPokemonErrorAction(error));
  }
}

export function* performGetPokemonMoveSaga(action: GetPokemonMoveAction) {
  try {
    const pokemonMoveName = action.payload;
    const pokemonMove = yield call(pokemonService.getMove, pokemonMoveName);
    yield put(performGetPokemonMoveSuccessAction(pokemonMove));
  } catch (error) {
    yield put(performGetPokemonMoveErrorAction(error.message));
  }
}

function getInfoEvolutionPokemons(
  evolutionChain: EvolutionChain
): PokemonEvolutionSpecie[] {
  const chain1 = evolutionChain.chain;
  const chain2 = chain1 && chain1.evolves_to && chain1.evolves_to[0];
  const chain3 = chain2 && chain2.evolves_to && chain2.evolves_to[0];
  const pokemonEvolutionChain = [
    { ...chain1.species, id: getIdFromUrl(chain1.species.url) }
  ];
  if (chain2) {
    pokemonEvolutionChain.push({
      ...chain2.species,
      id: getIdFromUrl(chain2.species.url)
    });
  }
  if (chain3) {
    pokemonEvolutionChain.push({
      ...chain3.species,
      id: getIdFromUrl(chain3.species.url)
    });
  }
  return pokemonEvolutionChain;
}
