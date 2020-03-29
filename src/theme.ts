export const theme = {
  //TODO: add proper colours
  colors: {
    red: "red",
    white: "white"
  },
  media: {
    sm: `(min-width: 568px)`,
    md: `(min-width: 768px)`,
    lg: `(min-width: 992px)`
  },
  spacing: {
    xs: "5px",
    sm: "10px",
    md: "20px",
    lg: "30px"
  }
};

export type Theme = typeof theme;
