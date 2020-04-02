import { connect } from "react-redux";
import { PokemonDetail } from "./pokemon-detail";
import { AppState, PokemonsDispatch } from "../../../store";
import {
  performGetPokemonDetailAction,
  selectPokemonByIdAction,
  performGetPokemonMoveAction,
  selectMoveByNameAction
} from "../../store/pokemons.actions";
import {
  PokemonDetail as Pokemon,
  PokemonMove
} from "../../../services/pokemon.service";
import {
  getPokemonSelected,
  getPokemonLoadingDetail,
  getMoveSelected,
  getPokemonMoveLoading
} from "../../store/reducer";

interface DispatchProps {
  getPokemonDetail(pokemonId: string): void;
  selectPokemon(pokemonId: string): void;
  getPokemonMove(pokemonMoveName: string): void;
  selectMove(moveName: string): void;
}

interface MapStateToProps {
  pokemon?: Pokemon;
  loading: boolean;
  selectedMove: PokemonMove;
  loadingMoves: boolean;
}

export type PokemonDetailContainerProps = DispatchProps & MapStateToProps;

function mapStateToProps(state: AppState): MapStateToProps {
  return {
    pokemon: getPokemonSelected(state),
    loading: getPokemonLoadingDetail(state),
    selectedMove: getMoveSelected(state),
    loadingMoves: getPokemonMoveLoading(state)
  };
}

const mapDispatchToProps = (dispatch: PokemonsDispatch): DispatchProps => ({
  getPokemonDetail: (pokemonId: string) =>
    dispatch(performGetPokemonDetailAction(pokemonId)),
  selectPokemon: (pokemonId: string) => {
    dispatch(selectPokemonByIdAction(pokemonId));
  },
  getPokemonMove: (pokemonMoveName: string) => {
    dispatch(performGetPokemonMoveAction(pokemonMoveName));
  },
  selectMove: (moveName: string) => {
    dispatch(selectMoveByNameAction(moveName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail);
