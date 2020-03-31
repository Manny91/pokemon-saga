import React from "react";
import { PokemonListItem } from "../pokemon-list-item";
import "@testing-library/jest-dom/extend-expect";
import "jest-styled-components";
import { renderWithTheme } from "../../../../utils/tests-utils/render-with-theme";

describe("PokemonListItem Component", () => {
  it("should render properly", () => {
    const testProps = { id: "1", name: "bulbasaur" };
    const subject = renderWithTheme(<PokemonListItem {...testProps} />);
    const tree = subject.container;
    expect(tree).toMatchSnapshot();
  });
});
