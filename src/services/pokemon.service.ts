import httpClient from "./httpClient";

export interface PokemonResponse {
  next: string;
  previous: string;
  results: Pokemon[];
}

export interface Pokemon {
  id: string;
  name: string;
  url: string;
}
interface PokemonStat {
  base_state: number;
  effort: number;
  stat: { name: string };
}

interface PokemonType {
  slot: number;
  type: { name: string };
}

export interface PokemonMove {
  name: string;
  url: string;
  id: number;
  accuracy: number;
  power: number;
  pp: number;
  move: { name: string; url: string };
}

export interface PokemonDetail {
  abilities: Ability[];
  height: number;
  name: string;
  weight: number;
  stats: PokemonStat[];
  species: PokemonSpecie;
  sprites: PokemonSprites;
  types: PokemonType[];
  id: number;
}

export interface PokemonSprites {
  back_default: string;
  front_default: string;
  back_shiny: string;
  front_shiny: string;
  back_female?: string;
  front_female?: string;
}

export interface PokemonSpecie {
  base_happiness: number;
  capture_rate: number;
  flavor_text_entries: FlavourText[];
  evolution_chain: ChainLink;
  evolutions: Pokemon[];
  id: number;
  name: string;
  url: string;
}

export interface FlavourText {
  flavor_text: string;
  language: Language;
}
interface Language {
  name: string;
}

interface Ability {
  name: string;
}

export interface ChainLink {
  id: number;
  chain: EvolutionChain[];
  url: string;
  species: { name: string };
  evolves_to: ChainLink[];
}

export interface EvolutionChain {
  id: number;
  chain: ChainLink;
}

async function getPokemons(params?: string): Promise<PokemonResponse> {
  const urlParams = params ? `?${params}` : "";
  const res = await httpClient.get(`pokemon/${urlParams}`);
  return res.json();
}

async function getPokemon(pokemonId: string): Promise<PokemonDetail> {
  const res = await httpClient.get(`pokemon/${pokemonId}`);
  return res.json();
}
export default {
  getPokemons,
  getPokemon
};
