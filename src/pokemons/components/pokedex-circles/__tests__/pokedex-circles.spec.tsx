import React from "react";
import { PokedexCircles } from "../pokedex-circles";
import "jest-styled-components";
import { renderWithTheme } from "../../../../utils/tests-utils/render-with-theme";

describe("PokedexCircles Component", () => {
  it("should render properly", () => {
    const subject = renderWithTheme(<PokedexCircles />);
    const tree = subject.container;
    expect(tree).toMatchSnapshot();
  });
});
