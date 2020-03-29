import httpClient from "./httpClient";

export interface PokemonResponse {
  next: string;
  previous: string;
  results: Pokemon[];
}

export interface Pokemon {
  id: number;
  name: string;
  url: string;
}

async function getPokemons(params?: string): Promise<PokemonResponse> {
  const urlParams = params ? `?${params}` : "";
  const res = await httpClient.get(`pokemon/${urlParams}`);
  return res.json();
}

export default {
  getPokemons
};
