import React from "react";
import { PokemonDetailView } from "../pokemon-detail";
import {
  PokemonDetail as Pokemon,
  PokemonSpecieDetail
} from "../../../../services/pokemon.service";
import "@testing-library/jest-dom/extend-expect";
import "jest-styled-components";
import { renderWithTheme } from "../../../../utils/tests-utils/render-with-theme";
import { MemoryRouter } from "react-router-dom";

describe("PokemonDetail Component", () => {
  const pokemonSpecie: PokemonSpecieDetail = {
    flavor_text_entries: [
      {
        flavor_text: "test",
        language: { name: "en" }
      }
    ],
    evolution_chain: { url: "evolution-chain-url" },
    evolutions: [
      {
        name: "ivisaur",
        url: "url-test",
        id: "1"
      }
    ],
    id: 1,
    name: "bulbasaur",
    url: "test-url"
  };
  const selectedMove = {
    id: 13,
    name: "razor-wind",
    pp: 10,
    accuracy: 10,
    power: 80,
    url: "https://pokeapi.co/api/v2/move/13/",
    move: { name: "razor-wind", url: "https://pokeapi.co/api/v2/move/13/" }
  };
  const pokemon: Pokemon = {
    abilities: [{ ability: { name: "chlorophyll" } }],
    height: 7,
    id: 1,
    moves: [selectedMove],
    name: "bulbasaur",
    order: 1,
    species: pokemonSpecie,
    sprites: {
      back_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/front/1.png",
      back_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
      front_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/front/1.png"
    },
    stats: [{ base_stat: 45, effort: 0, stat: { name: "speed" } }],
    types: [{ slot: 2, type: { name: "poison" } }],
    weight: 69
  };
  //   const testCases = [];
  it("should render properly", () => {
    const testProps = {
      pokemon: pokemon,
      loading: true,
      selectedMove: selectedMove,
      loadingMoves: false,
      getPokemonDetail: jest.fn(),
      selectPokemon: jest.fn(),
      getPokemonMove: jest.fn(),
      selectMove: jest.fn()
    };
    jest.mock("react-router", () => ({
      useParams: jest.fn().mockReturnValue({ id: "123" })
    }));

    const subject = renderWithTheme(
      <MemoryRouter>
        <PokemonDetailView {...testProps} />
      </MemoryRouter>
    );
    const tree = subject.container;
    expect(tree).toMatchSnapshot();
  });
});
