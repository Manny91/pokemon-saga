import { PokemonSpecieDetail } from "../services/pokemon.service";

export const getFlavorDescriptionText = (
  specieDetail: PokemonSpecieDetail,
  languageCode: string
): string => {
  //we're getting the first one according to the language,
  // might be worth in the future checking for the specific version of the game
  // as there are different descriptions on that
  const flavorEntryEng = specieDetail.flavor_text_entries.find(flavour => {
    return flavour.language.name === languageCode;
  });
  return flavorEntryEng ? flavorEntryEng.flavor_text : "";
};
