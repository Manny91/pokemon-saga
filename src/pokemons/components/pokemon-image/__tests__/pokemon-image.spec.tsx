import React from "react";
import { PokemonImage } from "../pokemon-image";
import { render } from "@testing-library/react";
import "jest-styled-components";

describe("PokemonImage Component", () => {
  it("should render properly", () => {
    const subject = render(<PokemonImage id={"1"} />);
    const tree = subject.container;
    expect(tree).toMatchSnapshot();
  });
});
