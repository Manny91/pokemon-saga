import React from "react";
import styled from "../../../styled-components";

interface PokemonItemImageProps {
  id: string;
}
export const PokemonImage = ({ id }: PokemonItemImageProps) => {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return <Image src={imageUrl} />;
};

const Image = styled.img`
  image-rendering: pixelated;
`;
