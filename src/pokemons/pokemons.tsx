import React, { useEffect } from "react";
import { PokemonContainerProps } from "./pokemon.container";
import styled from "../styled-components";

export const Pokemons = ({
  getPokemons,
  loading,
  pokemons,
  error
}: PokemonContainerProps) => {
  useEffect(() => {
    getPokemons();
  }, [getPokemons]);

  return (
    <PokemonList>
      {pokemons &&
        pokemons.map(({ name, id }) => {
          return <PokemonListItem key={id} name={name} id={id} />;
        })}
    </PokemonList>
  );
};

const PokemonListItem = ({ name, id }: PokemonListItemProps) => {
  return (
    <PokemonItemWrapper>
      <PokemonItemId> {`#${id}`}</PokemonItemId>
      <PokemonItemBody>
        <PokemonItemImage id={id} />
        <PokemonItemTitle>{name}</PokemonItemTitle>
      </PokemonItemBody>
    </PokemonItemWrapper>
  );
};
interface PokemonItemImageProps {
  id: number;
}
const PokemonItemImage = ({ id }: PokemonItemImageProps) => {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return <PokemonImage src={imageUrl} />;
};

const PokemonList = styled.ul`
  height: 500px;
  overflow: auto;
`;

const PokemonItemWrapper = styled.li`
  display: flex;
  flex-direction: row;
  border: 2px solid black;
`;

const PokemonItemId = styled.p`
  font-size: 20px;
  padding: ${props => props.theme.spacing.sm};
`;
const PokemonItemBody = styled.div`
  display: flex;
  flex-direction: column;
`;
const PokemonItemTitle = styled.p`
  font-size: 16px;
  text-align: center;
  text-transform: capitalize;
`;

const PokemonImage = styled.img`
  image-rendering: pixelated;
`;

interface PokemonListItemProps {
  name: string;
  id: number;
}
