import React from "react";
import { PokemonStatsDisplayer } from "../stats-displayer";
import "@testing-library/jest-dom/extend-expect";
import "jest-styled-components";
import { renderWithTheme } from "../../../../utils/tests-utils/render-with-theme";

describe("PokemonStatsDisplayer Component", () => {
  it("should render properly", () => {
    const testProps = {
      stats: [
        {
          base_stat: 70,
          effort: 0,
          stat: { name: "speed" }
        }
      ]
    };
    const subject = renderWithTheme(<PokemonStatsDisplayer {...testProps} />);
    const tree = subject.container;
    expect(tree).toMatchSnapshot();
  });
});
