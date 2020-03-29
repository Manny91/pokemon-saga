import { Pokemon } from "../services/pokemon.service";
import {
  getPokemons,
  getPokemonsError,
  getPokemonsLoading,
  PokemonState
} from "./store/reducer";
import { PokemonsDispatch } from "../store";
import { performGetPokemonsAction } from "./store/pokemons.actions";
import { connect } from "react-redux";
import { Pokemons } from "./pokemons";

interface DispatchProps {
  getPokemons(): void;
}

interface MapStateToProps {
  pokemons: Pokemon[];
  error: boolean;
  loading: boolean;
}

export type PokemonContainerProps = DispatchProps & MapStateToProps;

function mapStateToProps(state: PokemonState): MapStateToProps {
  return {
    pokemons: getPokemons(state),
    error: getPokemonsError(state),
    loading: getPokemonsLoading(state)
  };
}

const mapDispatchToProps = (dispatch: PokemonsDispatch): DispatchProps => ({
  getPokemons: () => dispatch(performGetPokemonsAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);
