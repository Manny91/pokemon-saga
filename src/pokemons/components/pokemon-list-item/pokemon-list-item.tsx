import React from "react";
import { PokemonImage } from "../pokemon-image/pokemon-image";
import styled from "../../../styled-components";

export const PokemonListItem = ({ name, id }: PokemonListItemProps) => {
  return (
    <PokemonItemWrapper>
      <PokemonItemId> {`#${id}`}</PokemonItemId>
      <PokemonItemBody>
        <PokemonImage id={id} />
        <PokemonItemTitle>{name}</PokemonItemTitle>
      </PokemonItemBody>
    </PokemonItemWrapper>
  );
};

export const PokemonItemWrapper = styled.li`
  display: flex;
  flex-direction: row;
  border: 2px solid black;
  cursor: pointer;
`;

const PokemonItemId = styled.p`
  font-size: 20px;
  padding: ${props => props.theme.spacing.sm};
`;
const PokemonItemBody = styled.div`
  display: flex;
  align-items: center;
`;
const PokemonItemTitle = styled.p`
  font-size: 16px;
  text-align: center;
  text-transform: capitalize;
  margin-left: ${props => props.theme.spacing.sm};
`;

interface PokemonListItemProps {
  name: string;
  id: string;
}
