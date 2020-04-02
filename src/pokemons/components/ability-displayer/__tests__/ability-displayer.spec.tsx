import React from "react";
import { PokemonAbilitiesDisplayer } from "../ability-displayer";
import "jest-styled-components";
import { renderWithTheme } from "../../../../utils/tests-utils/render-with-theme";

describe("PokemonAbilitiesDisplayer Component", () => {
  it("should render properly", () => {
    const abilities = [
      { ability: { name: "test ability" } },
      { ability: { name: "test ability 2" } }
    ];
    const subject = renderWithTheme(
      <PokemonAbilitiesDisplayer abilities={abilities} />
    );
    const tree = subject.container;
    expect(tree).toMatchSnapshot();
  });
});
