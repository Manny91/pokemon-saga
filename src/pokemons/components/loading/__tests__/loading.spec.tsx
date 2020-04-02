import React from "react";
import { Loading } from "../loading";
import "jest-styled-components";
import { renderWithTheme } from "../../../../utils/tests-utils/render-with-theme";

describe("Loading Component", () => {
  it("should render properly", () => {
    const subject = renderWithTheme(<Loading />);
    const tree = subject.container;
    expect(tree).toMatchSnapshot();
  });
});
