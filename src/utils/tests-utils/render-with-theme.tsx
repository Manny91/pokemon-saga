import React from "react";
import { ThemeProvider } from "../../styled-components";
import { theme } from "../../theme";
import { render } from "@testing-library/react";

export const renderWithTheme = (ui: JSX.Element) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};
