import React from "react";
import { PokemonImage } from "../pokemon-image/pokemon-image";
import styled from "../../../styled-components";

export const PokemonListItem = ({
  name,
  id,
  pokemonSelected,
  showId = true
}: PokemonListItemProps) => {
  const selectedClass = pokemonSelected === id ? "selected" : "";
  const wrapperClassName = !showId ? "reduced" : "";
  return (
    <PokemonItemWrapper className={selectedClass}>
      {showId && <PokemonItemId> {`#${id}`}</PokemonItemId>}
      <PokemonItemBody className={wrapperClassName}>
        <PokemonImage id={id} />
        <PokemonItemTitle>{name}</PokemonItemTitle>
      </PokemonItemBody>
    </PokemonItemWrapper>
  );
};

export const PokemonItemWrapper = styled.li`
  display: flex;
  border: 2px solid black;
  cursor: pointer;
  align-items: center;
  background-color: ${props => props.theme.colors.greenScreen};
  border-width: 3px;
  border-style: inset;
  border-color: ${props => props.theme.colors.greenBorder};
  font-weight: 500;
  color: ${props => props.theme.colors.black};
  font-family: "VT323";
  &.selected {
    font-weight: bold;
    background-color: ${props => props.theme.colors.lighterGreen};
  }
  &:hover {
    font-weight: bold;
  }
`;

const PokemonItemId = styled.p`
  font-size: 22px;
  padding: ${props => props.theme.spacing.xs};
`;
const PokemonItemBody = styled.div`
  display: flex;
  align-items: center;

  &.reduced {
    justify-content: center;
    width: 100%;
    @media ${props => props.theme.media.lg} {
      flex-direction: column;
      width: 140px;
    }
  }
`;
const PokemonItemTitle = styled.p`
  font-size: 20px;
  text-align: center;
  text-transform: capitalize;
  margin-left: ${props => props.theme.spacing.sm};
`;

interface PokemonListItemProps {
  name: string;
  id: string;
  showId?: boolean;
  pokemonSelected?: string;
}
