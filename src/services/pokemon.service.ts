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
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: { name: string };
}

export interface PokemonType {
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
  abilities: PokemonAbility[];
  height: number;
  name: string;
  order: number;
  weight: number;
  stats: PokemonStat[];
  species: PokemonSpecieDetail;
  sprites: PokemonSprites;
  types: PokemonType[];
  id: number;
  moves: PokemonMove[];
}

export interface PokemonSprites {
  back_default: string;
  front_default: string;
  back_shiny: string;
  front_shiny: string;
  back_female?: string;
  front_female?: string;
}

export interface FlavourText {
  flavor_text: string;
  language: Language;
}
interface Language {
  name: string;
}

export interface PokemonAbility {
  ability: { name: string };
}

export interface PokemonEvolutionSpecie {
  name: string;
  url: string;
  id?: string;
}
export interface ChainLink {
  species: PokemonEvolutionSpecie;
  evolves_to?: ChainLink[];
}

export interface EvolutionChain {
  id: number;
  chain: ChainLink;
}
export interface PokemonSpecieDetail {
  flavor_text_entries: FlavourText[];
  evolution_chain: { url: string };
  evolutions: PokemonEvolutionSpecie[];
  id: number;
  name: string;
  url: string;
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

async function getPokemons(params?: string): Promise<PokemonResponse> {
  const urlParams = params ? `?${params}` : "";
  const res = await httpClient.get(`pokemon/${urlParams}`);
  return res.json();
}

async function getPokemon(pokemonId: string): Promise<PokemonDetail> {
  const res = await httpClient.get(`pokemon/${pokemonId}`);
  return res.json();
}

async function getSpecie(pokemonNo: number): Promise<PokemonSpecieDetail> {
  const res = await httpClient.get(`pokemon-species/${pokemonNo}`);
  return res.json();
}

async function getEvolutionChain(
  evolutionChainId: number
): Promise<EvolutionChain> {
  const res = await httpClient.get(`evolution-chain/${evolutionChainId}`);
  return res.json();
}

async function getMove(pokemonMoveName: string): Promise<PokemonMove> {
  const res = await httpClient.get(`move/${pokemonMoveName}`);
  return res.json();
}

export default {
  getPokemons,
  getPokemon,
  getSpecie,
  getEvolutionChain,
  getMove
};
