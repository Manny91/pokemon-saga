import React, { useEffect } from "react";
import { PokemonContainerProps } from "./pokemon.container";

export const Pokemons = ({
  getPokemons,
  loading,
  pokemons,
  error
}: PokemonContainerProps) => {
  useEffect(() => {
    getPokemons();
  }, [getPokemons]);

  console.log("pokemons", pokemons);
  return <div>hello</div>;
};
