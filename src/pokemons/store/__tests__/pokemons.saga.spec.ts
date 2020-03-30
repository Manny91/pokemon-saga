import {
  performGetPokemonsAction,
  performGetPokemonsSuccessAction,
  performGetPokemonsErrorAction,
  performGetMorePokemonsAction,
  performGetMorePokemonsSuccessAction
} from "./../pokemons.actions";
import { all, takeLatest, call, put, select } from "redux-saga/effects";
import {
  pokemonsSaga,
  performGetPokemonsSaga,
  performGetMorePokemonsSaga
} from "../pokemons.saga";
import {
  PERFORM_GET_POKEMONS,
  PERFORM_GET_MORE_POKEMONS
} from "../pokemons.actions";
import pokemonService from "../../../services/pokemon.service";
import { getPokemonsCount } from "../reducer";

describe("PokemonSagas", () => {
  it("Watches the expected actions types", () => {
    const generator = pokemonsSaga();
    const expectedYield = all([
      takeLatest(PERFORM_GET_POKEMONS, performGetPokemonsSaga),
      takeLatest(PERFORM_GET_MORE_POKEMONS, performGetMorePokemonsSaga)
    ]);
    const actualYield = generator.next().value;
    expect(actualYield).toEqual(expectedYield);
  });

  describe("performGetPokemons saga", () => {
    const action = performGetPokemonsAction();
    const generator = performGetPokemonsSaga(action);

    it("should call pokemonService.getPokemons correctly even if no payload passed", () => {
      // we call it with no arguments
      const expectedYield = call(pokemonService.getPokemons, undefined);
      const actualYield = generator.next().value;
      expect(actualYield).toEqual(expectedYield);
    });

    it("should call pokemonService.getPokemons correctly with action payload", () => {
      const offsetParamCount = "20";
      const actionWithCount = performGetPokemonsAction(offsetParamCount);
      const generatorActionWithCount = performGetPokemonsSaga(actionWithCount);

      // we call it with offset param count
      const expectedYield = call(pokemonService.getPokemons, offsetParamCount);
      const actualYield = generatorActionWithCount.next().value;
      expect(actualYield).toEqual(expectedYield);
    });
    it("should put performGetPokemonsSuccessAction after a successfull call", () => {
      const response = {
        count: 964,
        next: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
        previous: null,
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" }
        ]
      };
      const expectedYield = put(performGetPokemonsSuccessAction(response));

      const actualYield = generator.next(response).value;

      expect(actualYield).toEqual(expectedYield);
    });

    it("should put performGetPokemonsErrorAction after a failing call", () => {
      const error = { message: "test error" };
      const expectedYield = put(performGetPokemonsErrorAction(error.message));
      const actualYield = generator.throw(error).value;
      expect(actualYield).toEqual(expectedYield);
    });
  });

  describe("performGetMorePokemons saga", () => {
    const generator = performGetMorePokemonsSaga();
    const pokemonsCount = 20;

    it("should call performGetPokemons with the correct offset", () => {
      // set the pokemonsCount fetched by useSelect
      const offsetParam = `offset=${pokemonsCount}`;
      const actualFirstNextYield = generator.next({
        pokemonsState: { pokemonsCount }
      }).value;

      const expectedFristNextYield = select(getPokemonsCount);
      expect(actualFirstNextYield).toEqual(expectedFristNextYield);

      const actualSecondYield = generator.next(pokemonsCount.toString()).value;
      const expectedSecondYield = put(performGetPokemonsAction(offsetParam));
      expect(actualSecondYield).toEqual(expectedSecondYield);

      const actualSuccessYield = generator.next().value;
      const expectedSuccessYield = put(performGetMorePokemonsSuccessAction());
      expect(actualSuccessYield).toEqual(expectedSuccessYield);
    });
  });
});
