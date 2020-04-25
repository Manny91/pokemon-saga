import { renderWithTheme } from "../../utils/tests-utils/render-with-theme";
import React from "react";
import { Pokemons } from "../pokemons";
import {
  act,
  fireEvent,
  wait,
  getByTestId,
  getByPlaceholderText,
} from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { PokemonContainerProps } from "../pokemon.container";

describe("pokemons", () => {
  const testPropsBase = {
    getPokemons: jest.fn(),
    getMorePokemons: jest.fn(),
    pokemons: [],
    error: "",
    loading: false,
    pokemonSelected: "",
    loadingDetail: false,
  };
  const pokemonsData = [
    {
      id: "1",
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
    { id: "2", name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
    {
      id: "3",
      name: "venusaur",
      url: "https://pokeapi.co/api/v2/pokemon/3/",
    },
    {
      id: "4",
      name: "charmander",
      url: "https://pokeapi.co/api/v2/pokemon/4/",
    },
    {
      id: "5",
      name: "charmeleon",
      url: "https://pokeapi.co/api/v2/pokemon/5/",
    },
    {
      id: "6",
      name: "charizard",
      url: "https://pokeapi.co/api/v2/pokemon/6/",
    },
    {
      id: "7",
      name: "squirtle",
      url: "https://pokeapi.co/api/v2/pokemon/7/",
    },
    {
      id: "8",
      name: "wartortle",
      url: "https://pokeapi.co/api/v2/pokemon/8/",
    },
    {
      id: "9",
      name: "blastoise",
      url: "https://pokeapi.co/api/v2/pokemon/9/",
    },
    {
      id: "10",
      name: "caterpie",
      url: "https://pokeapi.co/api/v2/pokemon/10/",
    },
    {
      id: "11",
      name: "metapod",
      url: "https://pokeapi.co/api/v2/pokemon/11/",
    },
    {
      id: "12",
      name: "butterfree",
      url: "https://pokeapi.co/api/v2/pokemon/12/",
    },
    {
      id: "13",
      name: "weedle",
      url: "https://pokeapi.co/api/v2/pokemon/13/",
    },
    {
      id: "14",
      name: "kakuna",
      url: "https://pokeapi.co/api/v2/pokemon/14/",
    },
    {
      id: "15",
      name: "beedrill",
      url: "https://pokeapi.co/api/v2/pokemon/15/",
    },
    {
      id: "16",
      name: "pidgey",
      url: "https://pokeapi.co/api/v2/pokemon/16/",
    },
    {
      id: "17",
      name: "pidgeotto",
      url: "https://pokeapi.co/api/v2/pokemon/17/",
    },
    {
      id: "18",
      name: "pidgeot",
      url: "https://pokeapi.co/api/v2/pokemon/18/",
    },
    {
      id: "19",
      name: "rattata",
      url: "https://pokeapi.co/api/v2/pokemon/19/",
    },
    {
      id: "20",
      name: "raticate",
      url: "https://pokeapi.co/api/v2/pokemon/20/",
    },
  ];
  it("should call get pokemons", () => {
    setup(testPropsBase);
    expect(testPropsBase.getPokemons).toHaveBeenCalled();
  });

  it("should be able to call getMorePokemons when scrolling", async () => {
    const testProps = {
      ...testPropsBase,
      ...{
        pokemons: pokemonsData,
      },
    };
    const { pokemonList } = setup(testProps);
    const scrollHeight = pokemonList.clientHeight;
    fireEvent.scroll(pokemonList, { target: { scrollTop: scrollHeight } });
    wait(() => {
      expect(testPropsBase.getMorePokemons).toHaveBeenCalled();
    });
  });

  it("should be able to filter pokemons properly", () => {
    // let container = {} as HTMLElement;

    const testProps = {
      getPokemons: jest.fn(),
      getMorePokemons: jest.fn(),
      pokemons: pokemonsData,
      error: "",
      loading: false,
      pokemonSelected: "",
      loadingDetail: false,
    };

    const { pokemonInput, pokemonList } = setup(testProps);
    fireEvent.change(pokemonInput, { target: { value: "ivy" } });
    wait(() => {
      expect(pokemonList.children.length).toBe(1);
    });
  });

  const setup = (testProps: PokemonContainerProps) => {
    const utils = renderWithTheme(<Pokemons {...testProps} />);
    const pokemonList = getByTestId(utils.container, "pokemon-list");
    const pokemonInput = getByPlaceholderText(utils.container, "Search name");
    return {
      pokemonList,
      pokemonInput,
      ...utils,
    };
  };
});
