import React from "react";
import { PokemonImage } from "../pokemonImage";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render } from "@testing-library/react";
import "jest-styled-components";

describe("PokemonImage Component", () => {
  afterEach(cleanup);
  it("should render properly", () => {
    const subject = render(<PokemonImage id={"1"} />);
    const tree = subject.container;

    expect(tree).toMatchSnapshot();
  });
});
