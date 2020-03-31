import { PokemonResponse, Pokemon } from "./../../../services/pokemon.service";
import {
  PokemonState,
  getPokemons,
  getPokemonsLoading,
  getPokemonsError,
  getPokemonsCount
} from "./../reducer";
import {
  PERFORM_GET_POKEMONS,
  GetPokemonsAction,
  GetPokemonsSuccessAction,
  PERFORM_GET_POKEMONS_SUCCESS,
  GetPokemonsErrorAction,
  PERFORM_GET_POKEMONS_ERROR,
  GetMorePokemonsAction,
  PERFORM_GET_MORE_POKEMONS,
  GetMorePokemonsSuccessAction,
  PERFORM_GET_MORE_POKEMONS_SUCCESS
} from "./../pokemons.actions";
import pokemonsReducer from "../reducer";
import { AppState } from "../../../store";
import { OutputSelector } from "reselect";

const defaultState: PokemonState = {
  loading: true,
  error: "",
  pokemons: [],
  pokemonsCount: 0,
  loadingDetail: false,
  pokemonsDetail: {},
  pokemonSelectedId: ""
};

describe("PokemonReducer", () => {
  // this could be potentially changed to table tests I'll leave it for later
  it("Sets the expected state for performing GetPokemonsAction", () => {
    const action: GetPokemonsAction = { type: PERFORM_GET_POKEMONS };
    const expectedState = {
      ...defaultState,
      loading: true
    };

    const actualState = pokemonsReducer(defaultState, action);
    expect(actualState).toEqual(expectedState);
  });

  it("Sets the expected state for performing GetPokemonsSuccessAction", () => {
    const payload: PokemonResponse = {
      next: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
      previous: "",
      results: [
        {
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/"
        } as Pokemon
      ]
    };
    const pokemons: Pokemon[] = [
      {
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/",
        id: "1"
      }
    ];
    const action: GetPokemonsSuccessAction = {
      type: PERFORM_GET_POKEMONS_SUCCESS,
      payload
    };
    const expectedState: PokemonState = {
      ...defaultState,
      loading: false,
      pokemons,
      pokemonsCount: 1
    };

    const actualState = pokemonsReducer(defaultState, action);
    expect(actualState).toEqual(expectedState);
  });

  it("Sets the expected state for performing GetPokemonsSuccessAction with CurrentState", () => {
    const pokemonsState = [
      {
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/",
        id: "1"
      }
    ];
    const currentState: PokemonState = {
      loading: true,
      error: "",
      pokemonsCount: 1,
      pokemons: pokemonsState,
      pokemonSelectedId: "",
      pokemonsDetail: {},
      loadingDetail: false
    };

    const payload: PokemonResponse = {
      next: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
      previous: "",
      results: [
        {
          name: "ivysaur",
          url: "https://pokeapi.co/api/v2/pokemon/2/"
        } as Pokemon,
        {
          name: "venasaur",
          url: "https://pokeapi.co/api/v2/pokemon/3/"
        } as Pokemon
      ]
    };
    const action: GetPokemonsSuccessAction = {
      type: PERFORM_GET_POKEMONS_SUCCESS,
      payload
    };
    const expectedState: PokemonState = {
      ...defaultState,
      loading: false,
      pokemons: [
        ...pokemonsState,
        {
          name: "ivysaur",
          url: "https://pokeapi.co/api/v2/pokemon/2/",
          id: "2"
        },
        {
          name: "venasaur",
          url: "https://pokeapi.co/api/v2/pokemon/3/",
          id: "3"
        }
      ],
      pokemonsCount: 3
    };

    const actualState = pokemonsReducer(currentState, action);
    expect(actualState).toEqual(expectedState);
  });

  it("Sets the expected state for performing GetPokemonsErrorAction", () => {
    const payload = "error";

    const action: GetPokemonsErrorAction = {
      type: PERFORM_GET_POKEMONS_ERROR,
      payload
    };
    const expectedState: PokemonState = {
      ...defaultState,
      loading: false,
      error: payload
    };

    const actualState = pokemonsReducer(defaultState, action);
    expect(actualState).toEqual(expectedState);
  });
  it("Sets the expected state for performing GetMorePokemonsAction", () => {
    const action: GetMorePokemonsAction = { type: PERFORM_GET_MORE_POKEMONS };
    const expectedState = {
      ...defaultState,
      loading: true
    };

    const actualState = pokemonsReducer(defaultState, action);
    expect(actualState).toEqual(expectedState);
  });

  it("Sets the expected state for performing GetMorePokemonsSuccessAction", () => {
    const action: GetMorePokemonsSuccessAction = {
      type: PERFORM_GET_MORE_POKEMONS_SUCCESS
    };
    const expectedState = {
      ...defaultState,
      loading: false
    };

    const actualState = pokemonsReducer(defaultState, action);
    expect(actualState).toEqual(expectedState);
  });
});

describe("PokemonSelectors", () => {
  type expectedType = Pokemon[] | string | boolean | number;
  interface PokemonSelectorsTestCase {
    state: PokemonState;
    selectorName: string;
    selector: OutputSelector<
      AppState,
      expectedType,
      (res: PokemonState) => expectedType
    >;
    expectedValue: expectedType;
  }
  const testCases: PokemonSelectorsTestCase[] = [
    {
      state: {
        ...defaultState,
        pokemons: [{ id: "1", name: "bulbasaur", url: "testUrl" }]
      },
      selector: getPokemons,
      selectorName: "getPokemons",
      expectedValue: [{ id: "1", name: "bulbasaur", url: "testUrl" }]
    },
    {
      state: { ...defaultState, error: "ERROR TEST" },
      selector: getPokemonsError,
      selectorName: "getPokemonsError",
      expectedValue: "ERROR TEST"
    },
    {
      state: { ...defaultState, loading: true },
      selector: getPokemonsLoading,
      selectorName: "getPokemonsLoading",
      expectedValue: true
    },
    {
      state: { ...defaultState, pokemonsCount: 2 },
      selectorName: "getPokemonsCount",
      selector: getPokemonsCount,
      expectedValue: 2
    }
  ];

  testCases.map((testCase: PokemonSelectorsTestCase) => {
    it(`should return the expected state for the selector ${testCase.selectorName}`, () => {
      const actualValue = testCase.selector({
        pokemonsState: {
          ...testCase.state
        }
      });
      expect(actualValue).toEqual(testCase.expectedValue);
    });
  });
});
