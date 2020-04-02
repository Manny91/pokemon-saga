import { PokemonAbility } from "../../../services/pokemon.service";
import React from "react";
import styled from "../../../styled-components";

interface AbilitiesDisplayerProps {
  abilities: PokemonAbility[];
}

export const PokemonAbilitiesDisplayer = ({
  abilities
}: AbilitiesDisplayerProps) => {
  const abilitiesFlatted = flatAbilities(abilities);
  return (
    abilitiesFlatted && (
      <AbilityWrapper>
        <PokeAbilityContainerHeader> Abilities: </PokeAbilityContainerHeader>
        {abilitiesFlatted.map((ability, i) => {
          return (
            <PokeAbilityContainer key={i}>{ability.name}</PokeAbilityContainer>
          );
        })}
      </AbilityWrapper>
    )
  );
};

function flatAbilities(abilities: PokemonAbility[]): Ability[] {
  const abilityFlat = abilities.map(ability => {
    return ability.ability;
  });
  return abilityFlat;
}

const AbilityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.colors.greenScreen};
  padding: 15px 20px;
  border-radius: 3px;
  flex-grow: 1;
  min-width: 120px;
  border: inset ${props => props.theme.colors.greenBorder} 3px;
`;

const PokeAbilityContainer = styled.p`
  margin: 5px 0px;
  font-weight: bold;
  text-transform: capitalize;
`;

const PokeAbilityContainerHeader = styled.h4`
  text-transform: capitalize;
`;
interface Ability {
  name: string;
}
