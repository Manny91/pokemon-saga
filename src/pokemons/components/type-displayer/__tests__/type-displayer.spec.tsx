import React from "react";
import { PokemonTypeDisplayer } from "../type-displayer";
import "@testing-library/jest-dom/extend-expect";
import "jest-styled-components";
import { renderWithTheme } from "../../../../utils/tests-utils/render-with-theme";

describe("PokemonTypeDisplayer Component", () => {
  it("should render properly", () => {
    const testProps = {
      types: [{ slot: 0, type: { name: "grass" } }]
    };
    const subject = renderWithTheme(<PokemonTypeDisplayer {...testProps} />);
    const tree = subject.container;
    expect(tree).toMatchSnapshot();
  });
});
