import React from "react";
import styled from "../../../styled-components";
import { PokemonStat } from "../../../services/pokemon.service";

interface PokemonStatsDisplayerProps {
  stats: PokemonStat[];
}
export function PokemonStatsDisplayer({ stats }: PokemonStatsDisplayerProps) {
  return (
    stats && (
      <StatsWrapper>
        {stats.map((stat, i) => {
          return (
            <PokeStatContainer key={i}>{statToString(stat)}</PokeStatContainer>
          );
        })}
      </StatsWrapper>
    )
  );
}

function statToString({ stat, base_stat }: PokemonStat): string {
  if (stat) {
    const maxLengthString = 20;
    const statName = stat.name;
    const pokeStatStringLength = statName.length + base_stat.toString().length;
    return (
      statName +
      new Array(maxLengthString - pokeStatStringLength).fill(".").join("") +
      base_stat
    );
  }
  return "";
}

const StatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  background-color: ${props => props.theme.colors.greenScreen};
  padding: 15px 20px;
  border-radius: 3px;
  border: inset ${props => props.theme.colors.greenBorder} 3px;
`;

const PokeStatContainer = styled.p`
  margin: 5px 0px;
  font-weight: bold;
  text-transform: capitalize;
`;
