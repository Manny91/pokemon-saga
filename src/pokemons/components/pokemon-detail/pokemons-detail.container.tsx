import { connect } from "react-redux";
import { PokemonDetail } from "./pokemon-detail";
import { AppState, PokemonsDispatch } from "../../../store";
import {
  performGetPokemonDetailAction,
  selectPokemonById
} from "../../store/pokemons.actions";
import { PokemonDetail as Pokemon } from "../../../services/pokemon.service";
import { getPokemonsLoading, getPokemonSelected } from "../../store/reducer";

interface DispatchProps {
  getPokemonDetail(pokemonId: string): void;
  selectPokemon(pokemonId: string): void;
}

interface MapStateToProps {
  pokemon?: Pokemon;
  loading: boolean;
}

export type PokemonDetailContainerProps = DispatchProps & MapStateToProps;

function mapStateToProps(state: AppState): MapStateToProps {
  return {
    pokemon: getPokemonSelected(state),
    loading: getPokemonsLoading(state)
  };
}

const mapDispatchToProps = (dispatch: PokemonsDispatch): DispatchProps => ({
  getPokemonDetail: (pokemonId: string) =>
    dispatch(performGetPokemonDetailAction(pokemonId)),
  selectPokemon: (pokemonId: string) => {
    dispatch(selectPokemonById(pokemonId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail);
