import React from "react";
import { PokemonDescriptionDisplayer } from "../description-displayer";
import "jest-styled-components";
import { renderWithTheme } from "../../../../utils/tests-utils/render-with-theme";

describe("PokemonDescriptionDisplayer Component", () => {
  it("should render properly when loading is false", () => {
    const testProps = {
      loading: false,
      description: "pokemon description test"
    };
    const subject = renderWithTheme(
      <PokemonDescriptionDisplayer {...testProps} />
    );
    const tree = subject.container;
    expect(tree).toMatchSnapshot();
  });

  it("should render properly when loading is true", () => {
    const testProps = {
      loading: true,
      description: "pokemon description test"
    };
    const subject = renderWithTheme(
      <PokemonDescriptionDisplayer {...testProps} />
    );
    const tree = subject.container;
    expect(tree).toMatchSnapshot();
  });
});
