import {
  ChainLink,
  EvolutionChain,
  PokemonEvolutionSpecie
} from "./../../../services/pokemon.service";
import {
  performGetPokemonsAction,
  performGetPokemonsSuccessAction,
  performGetPokemonsErrorAction,
  performGetMorePokemonsSuccessAction,
  PERFORM_GET_POKEMON_DETAIL,
  performGetPokemonDetailAction,
  performGetPokemonDetailSuccessAction
} from "./../pokemons.actions";
import { all, takeLatest, call, put, select } from "redux-saga/effects";
import {
  pokemonsSaga,
  performGetPokemonsSaga,
  performGetMorePokemonsSaga,
  performGetPokemonDetailsSaga
} from "../pokemons.saga";
import {
  PERFORM_GET_POKEMONS,
  PERFORM_GET_MORE_POKEMONS
} from "../pokemons.actions";
import pokemonService, {
  PokemonDetail,
  PokemonSpecieDetail
} from "../../../services/pokemon.service";
import { getPokemonsCount } from "../reducer";

describe("PokemonSagas", () => {
  it("Watches the expected actions types", () => {
    const generator = pokemonsSaga();
    const expectedYield = all([
      takeLatest(PERFORM_GET_POKEMONS, performGetPokemonsSaga),
      takeLatest(PERFORM_GET_MORE_POKEMONS, performGetMorePokemonsSaga),
      takeLatest(PERFORM_GET_POKEMON_DETAIL, performGetPokemonDetailsSaga)
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
        previous: "previous",
        results: [
          {
            id: "1",
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/"
          }
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

  describe("performGetPokemonDetail saga", () => {
    const pokemonId = "1";
    const action = performGetPokemonDetailAction(pokemonId);
    const detailGenerator = performGetPokemonDetailsSaga(action);

    it("should call performGetPokemonDetail with the correct pokemonId", () => {
      const evolutionChainId = 16;

      const speciesMock = {
        evolution_chain: {
          url: `https://pokeapi.co/api/v2/evolution-chain/${evolutionChainId}/`
        },
        id: 1
      } as PokemonSpecieDetail;

      const pokemonMockDetail = {
        name: "jigglypuf",
        species: { name: "jigglypuf", url: "test" },
        id: 1
      } as PokemonDetail;

      // expect that first call is to get the pokemonDetail
      const actualFirstNextYield = detailGenerator.next().value;
      const expectedFirstYield = call(pokemonService.getPokemon, pokemonId);
      expect(actualFirstNextYield).toEqual(expectedFirstYield);

      // expect that the second call is to get the pokemonSpecie
      const actualSecondNextYield = detailGenerator.next(
        pokemonMockDetail as PokemonSpecieDetail &
          PokemonDetail &
          EvolutionChain
      ).value;
      const expectedSecondYield = call(pokemonService.getSpecie, 1);
      expect(actualSecondNextYield).toEqual(expectedSecondYield);

      //expect that the third call is to get EvolutionChain
      const mockChainLink = {
        species: {
          name: "jigglypuff",
          url: "https://pokeapi.co/api/v2/pokemon-species/39/"
        }
      } as ChainLink;

      const mockEvolutionChain = {
        id: 16,
        chain: mockChainLink
      } as EvolutionChain;

      const actualThirdNextYield = detailGenerator.next(
        speciesMock as PokemonSpecieDetail & PokemonDetail & EvolutionChain
      ).value;
      // expect that the second yield is calling EvolutionChains
      const expectedThirdYield = call(
        pokemonService.getEvolutionChain,
        evolutionChainId
      );

      expect(actualThirdNextYield).toEqual(expectedThirdYield);

      // expect that we're calling the successAction after
      const actualSuccessYield = detailGenerator.next(
        mockEvolutionChain as PokemonSpecieDetail &
          PokemonDetail &
          EvolutionChain
      ).value;

      const expectedPayload = {
        name: "jigglypuf",
        id: 1,
        species: {
          id: 1,
          evolution_chain: {
            url: `https://pokeapi.co/api/v2/evolution-chain/${evolutionChainId}/`
          },
          evolutions: [
            {
              name: "jigglypuff",
              id: "39",
              url: "https://pokeapi.co/api/v2/pokemon-species/39/"
            }
          ]
        }
      };

      const expectedSuccessYield = put(
        performGetPokemonDetailSuccessAction(
          expectedPayload as PokemonDetail &
            PokemonSpecieDetail &
            EvolutionChain
        )
      );
      expect(actualSuccessYield).toEqual(expectedSuccessYield);
    });
  });
});
