import {
  PokemonSpecieDetail,
  ChainLink
} from "./../../services/pokemon.service";
import { getFlavorDescriptionText } from "./../getDescriptionByLanguage";
describe("getDescriptionByLanguage", () => {
  const engText =
    "Bulbasaur can be seen napping in bright sunlight.↵There is a seed on its back. By soaking up the sun’s rays,↵the seed grows progressively larger.";
  const frText =
    "Bulbizarre passe son temps à faire la sieste sous le soleil.↵Il y a une graine sur son dos. Il absorbe les rayons du soleil↵pour faire doucement pousser la graine.";
  const itText =
    "È possibile vedere Bulbasaur mentre schiaccia un pisolino↵sotto il sole. Ha un seme piantato sulla schiena. Grazie ai↵raggi solari il seme cresce ingrandendosi progressivamente.";
  const flavorTextEntries = [
    {
      flavor_text: engText,
      language: { name: "en" }
    },
    {
      flavor_text: itText,
      language: { name: "it" }
    },
    {
      flavor_text: frText,
      language: { name: "fr" }
    }
  ];

  const mockPokemonSpecie: PokemonSpecieDetail = {
    base_happiness: 40,
    capture_rate: 70,
    flavor_text_entries: flavorTextEntries,
    evolutions: [],
    evolution_chain: {} as ChainLink,
    id: 1,
    name: "bulbasaur",
    url: "test-url"
  };

  const testCases = [
    {
      testDescription:
        "should return the correct english language description text",
      language: "en",
      expectedValue: engText
    },
    {
      testDescription:
        "should return the correct italian language description text",
      language: "it",
      expectedValue: itText
    },
    {
      testDescription:
        "should return the correct italian language description text",
      language: "fr",
      expectedValue: frText
    }
  ];

  testCases.map(testCase => {
    it(testCase.testDescription, () => {
      const actualValue = getFlavorDescriptionText(
        mockPokemonSpecie,
        testCase.language
      );
      expect(actualValue).toEqual(testCase.expectedValue);
    });
  });
});
