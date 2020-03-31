import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PokemonDetailContainerProps } from "./pokemons-detail.container";

export const PokemonDetail = ({
  getPokemonDetail,
  pokemon,
  loading,
  selectPokemon
}: PokemonDetailContainerProps) => {
  const { id } = useParams();
  useEffect(() => {
    if (id && !loading) {
      selectPokemon(id);
      getPokemonDetail(id);
    }
  }, [id, loading]);
  return (
    <>
      <div>Pokemon ID: {id}</div>
      <div>{pokemon?.name}</div>
      <div>{pokemon?.height}</div>
      <div>{pokemon?.weight}</div>
    </>
  );
};
