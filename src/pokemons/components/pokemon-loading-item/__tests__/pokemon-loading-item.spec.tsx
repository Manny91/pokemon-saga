import React from "react";
import { PokemonLoadingItem } from "../pokemon-loading-item";
import "jest-styled-components";
import { renderWithTheme } from "../../../../utils/tests-utils/render-with-theme";

describe("PokemonLoadingItem Component", () => {
  it("should render properly", () => {
    const subject = renderWithTheme(<PokemonLoadingItem />);
    const tree = subject.container;
    expect(tree).toMatchSnapshot();
  });
});
