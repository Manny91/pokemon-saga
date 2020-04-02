export const theme = {
  //TODO: add proper colours
  colors: {
    red: "#e61515",
    darkRed: "#ce0000",
    white: "white",
    yellow: "yellow",
    darkYellow: "#dada03",
    black: "black",
    blue: "#6f95ff",
    darkBlue: "#3c54a6",
    grey: "grey",
    lighterGreen: "#CBEE84",
    green: "#008000",
    greenScreen: "#A5CD53",
    greenScreenBackground: `linear-gradient(
        14deg,
        rgb(165, 205, 83) 60%,
        rgb(193, 217, 144) 65%
      )`,
    greenBorder: "#9aa28b",
    greenDarkBorder: "#4e4e4e",
    darkGreen: "#016301"
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
