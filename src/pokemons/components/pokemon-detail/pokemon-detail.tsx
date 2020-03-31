import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export const PokemonDetail = () => {
  const { name } = useParams();
  useEffect(() => {}, [name]);
  return <div>Pokemon ID: {name}</div>;
};
