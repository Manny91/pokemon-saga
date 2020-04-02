import { PokemonDetail, PokemonMove } from "./../../services/pokemon.service";
import { Pokemon } from "../../services/pokemon.service";
import { PokemonsActions } from "./pokemons.actions";
import { createSelector } from "reselect";
import { AppState } from "../../store";
import { getIdFromUrl } from "../../utils/getIdFromUrl";

interface PokemonsDictionary<T> {
  [Key: string]: T;
}

interface PokemonsMovesDictionary<T> {
  [Key: string]: T;
}

export interface PokemonState {
  loading: boolean;
  error: string;
  pokemons: Pokemon[];
  pokemonsCount: number;
  pokemonSelectedId: string;
  loadingDetail: boolean;
  pokemonsDetail: PokemonsDictionary<PokemonDetail>;
  pokemonsMoves: PokemonsMovesDictionary<PokemonMove>;
  loadingMove: boolean;
  errorLoadingMove: string;
  moveNameSelected: string;
}

export const initialPokemonState: PokemonState = {
  loading: true,
  error: "",
  pokemons: [],
  pokemonsCount: 0,
  pokemonSelectedId: "",
  loadingDetail: false,
  pokemonsDetail: {},
  pokemonsMoves: {},
  loadingMove: false,
  errorLoadingMove: "",
  moveNameSelected: ""
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
    case "[Pokemons] Select Pokemon By Id":
      return {
        ...state,
        pokemonSelectedId: action.payload
      };
    case "[Pokemons] Perform Get Pokemon Detail":
      return {
        ...state,
        loadingDetail: true
      };

    case "[Pokemons] Perform Get Pokemon Detail Error":
      return {
        ...state,
        loadingDetail: false,
        error: action.payload
      };
    case "[Pokemons] Perform Get Pokemon Detail Success":
      return {
        ...state,
        loadingDetail: false,
        error: false,
        pokemonsDetail: addPokemon(state.pokemonsDetail, action.payload)
      };

    case "[Pokemons] Perform Get Pokemon Move":
      return {
        ...state,
        loadingMove: true
      };

    case "[Pokemons] Perform Get Pokemon Move Success":
      return {
        ...state,
        loadingMove: false,
        pokemonsMoves: addMove(state.pokemonsMoves, action.payload)
      };

    case "[Pokemons] Perform Get Pokemon Move Error":
      return {
        ...state,
        loadingMove: false,
        errorLoadingMove: action.payload
      };
    case "[Pokemons] Select Move By Name":
      return {
        ...state,
        moveNameSelected: action.payload
      };
    default:
      return state;
  }
}

const addMove = (
  storedMoves: PokemonsMovesDictionary<PokemonMove>,
  move: PokemonMove
): PokemonsMovesDictionary<PokemonMove> => {
  const movesCopy = { ...storedMoves };
  movesCopy[move.name] = move;
  return movesCopy;
};

const addPokemon = (
  storePokemons: PokemonsDictionary<PokemonDetail>,
  pokemonDetail: PokemonDetail
): PokemonsDictionary<PokemonDetail> => {
  const pokemonsCopy = { ...storePokemons };
  pokemonsCopy[pokemonDetail.id.toString()] = pokemonDetail;
  return pokemonsCopy;
};

const addPokemons = (
  storedPokemons: Pokemon[],
  pokemons: Pokemon[]
): Partial<PokemonState> => {
  const pokemonsList = storedPokemons.concat(
    pokemons.map((pokemon: Pokemon) => {
      const id = getIdFromUrl(pokemon.url);
      return { id, ...pokemon };
    })
  );
  return { pokemons: pokemonsList, pokemonsCount: pokemonsList.length };
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
export const getPokemonSelectedId = createSelector(
  pokemonsState,
  pokemonsState => pokemonsState.pokemonSelectedId
);
export const getPokemonsDetail = createSelector(
  pokemonsState,
  pokemonsState => pokemonsState.pokemonsDetail
);
export const getPokemonSelected = createSelector(
  getPokemonsDetail,
  getPokemonSelectedId,
  (pokemons, pokemonSelectedId) => pokemons[pokemonSelectedId]
);
export const getPokemonLoadingDetail = createSelector(
  pokemonsState,
  pokemonsState => pokemonsState.loadingDetail
);

export const getPokemonMoves = createSelector(
  pokemonsState,
  pokemonsState => pokemonsState.pokemonsMoves
);

export const getPokemonMoveSelected = createSelector(
  pokemonsState,
  pokemonsState => pokemonsState.moveNameSelected
);

export const getPokemonMoveLoading = createSelector(
  pokemonsState,
  pokemonsState => pokemonsState.loadingMove
);

export const getMoveSelected = createSelector(
  getPokemonMoves,
  getPokemonMoveSelected,
  (pokemonMoves, moveName) => pokemonMoves[moveName]
);
