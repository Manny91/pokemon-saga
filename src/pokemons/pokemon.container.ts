import { Pokemon } from "../services/pokemon.service";
import {
  getPokemons,
  getPokemonsError,
  getPokemonsLoading
} from "./store/reducer";
import { PokemonsDispatch, AppState } from "../store";
import {
  performGetPokemonsAction,
  performGetMorePokemonsAction
} from "./store/pokemons.actions";
import { connect } from "react-redux";
import { Pokemons } from "./pokemons";

interface DispatchProps {
  getPokemons(): void;
  getMorePokemons(): void;
}

interface MapStateToProps {
  pokemons: Pokemon[];
  error: string;
  loading: boolean;
}

export type PokemonContainerProps = DispatchProps & MapStateToProps;

function mapStateToProps(state: AppState): MapStateToProps {
  return {
    pokemons: getPokemons(state),
    error: getPokemonsError(state),
    loading: getPokemonsLoading(state)
  };
}

const mapDispatchToProps = (dispatch: PokemonsDispatch): DispatchProps => ({
  getPokemons: () => dispatch(performGetPokemonsAction()),
  getMorePokemons: () => dispatch(performGetMorePokemonsAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);
