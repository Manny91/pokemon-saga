import React from "react";
import { PokemonMoveDisplayer } from "../moves-displayer";
import "jest-styled-components";
import { renderWithTheme } from "../../../../utils/tests-utils/render-with-theme";

describe("PokemonMoveDisplayer Component", () => {
  it("should render properly when loading is false", () => {
    const testProps = {
      handleMoveNext: jest.fn(),
      handleMovePrevious: jest.fn(),
      move: {
        name: "razor-wind",
        pp: 10,
        power: 10,
        accuracy: 100,
        url: "test-url",
        id: 10,
        move: { name: "razor-wind", url: "test-url" }
      },
      loadingMoves: false
    };
    const subject = renderWithTheme(<PokemonMoveDisplayer {...testProps} />);
    const tree = subject.container;
    expect(tree).toMatchSnapshot();
  });

  it("should render properly when loading is true", () => {
    const testProps = {
      handleMoveNext: jest.fn(),
      handleMovePrevious: jest.fn(),
      move: {
        name: "razor-wind",
        pp: 10,
        power: 10,
        accuracy: 100,
        url: "test-url",
        id: 10,
        move: { name: "razor-wind", url: "test-url" }
      },
      loadingMoves: true
    };
    const subject = renderWithTheme(<PokemonMoveDisplayer {...testProps} />);
    const tree = subject.container;
    expect(tree).toMatchSnapshot();
  });
});
