import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PokemonDetailContainerProps } from "./pokemons-detail.container";

export const PokemonDetail = ({
  getPokemonDetail,
  pokemon,
  loading,
  selectPokemon,
  getPokemonMove,
  selectMove
}: PokemonDetailContainerProps) => {
  const { id } = useParams();
  useEffect(() => {
    if (id && !loading) {
      selectPokemon(id);
      getPokemonDetail(id);
    }
  }, [id]);

  useEffect(() => {
    if (pokemon) {
      const moveName = pokemon.moves[0].move.name;
      selectMove(moveName);
      getPokemonMove(moveName);
    }
  }, [pokemon]);
  return (
    <>
      <div>Pokemon ID: {id}</div>
      <div>{pokemon?.name}</div>
      <div>{pokemon?.height}</div>
      <div>{pokemon?.weight}</div>
      {pokemon?.species && (
        <div>
          Evolutions:
          {pokemon?.species.evolutions.map((evolution, key) => {
            return <div key={key}> {evolution.name}</div>;
          })}
        </div>
      )}
    </>
  );
};
