export const theme = {
  //TODO: add proper colours
  colors: {
    red: "#e61515",
    darkRed: "#ce0000",
    white: "white",
    yellow: "yellow",
    darkYellow: "#dada03",
    black: "black",
    blackBorder: "#757575",
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
    darkGreen: "#016301",
    pokemonTypes: {
      normal: "#bfbfbf",
      fighting: "#d87c58",
      flying: "#999ade",
      poison: "#925192",
      ground: "#dea761",
      rock: "#897864",
      bug: "#b1c967",
      ghost: "#c195dc",
      steel: "#49769c",
      fire: "#cf1414",
      water: "#1689de",
      grass: "#47a047",
      electric: "#e6b700",
      psychic: "#fa43b8",
      ice: "#98c3de",
      dragon: "#89315d",
      dark: "#282433",
      fairy: "#dca0ce",
      unknown: "#545454",
      shadow: "#364163"
    }
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
