import React from "react";
import styled from "../../../styled-components";
import { PokemonType } from "../../../services/pokemon.service";

interface PokemonTypeProps {
  types: PokemonType[];
}
export function PokemonTypeDisplayer({ types }: PokemonTypeProps) {
  return types ? (
    <TypeWrapper>
      {types.map((pokeType: PokemonType, index) => (
        <PokemonTypeBanner className={pokeType.type.name} key={index}>
          {pokeType.type.name}
        </PokemonTypeBanner>
      ))}
    </TypeWrapper>
  ) : null;
}
const TypeWrapper = styled.div`
  background: linear-gradient(14deg, #afafaf 50%, #ffffff 80%, #afafaf 90%);
  border: groove ${props => props.theme.colors.greenDarkBorder} 3px;
  width: 100%;
`;
const PokemonTypeBannerHeader = styled.div`
  height: 35px;
  text-transform: uppercase;
  text-align: center;
  border: groove ${props => props.theme.colors.blackBorder} 3px;
  justify-content: center;
  display: flex;
  align-items: center;
  font-size: 19px;
  font-weight: bold;
`;

const PokemonTypeBanner = styled(PokemonTypeBannerHeader)`
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  margin: 3px;

  &.normal {
    background: ${props => props.theme.colors.pokemonTypes.normal};
  }
  &.fighting {
    background: ${props => props.theme.colors.pokemonTypes.fighting};
  }
  &.flying {
    background: ${props => props.theme.colors.pokemonTypes.flying};
  }
  &.poison {
    background: ${props => props.theme.colors.pokemonTypes.poison};
  }
  &.ground {
    background: ${props => props.theme.colors.pokemonTypes.ground};
  }
  &.rock {
    background: ${props => props.theme.colors.pokemonTypes.rock};
  }
  &.bug {
    background: ${props => props.theme.colors.pokemonTypes.bug};
  }
  &.ghost {
    background: ${props => props.theme.colors.pokemonTypes.ghost};
  }
  &.steel {
    background: ${props => props.theme.colors.pokemonTypes.steel};
  }
  &.fire {
    background: ${props => props.theme.colors.pokemonTypes.fire};
  }
  &.water {
    background: ${props => props.theme.colors.pokemonTypes.water};
  }
  &.grass {
    background: ${props => props.theme.colors.pokemonTypes.grass};
  }
  &.electric {
    background: ${props => props.theme.colors.pokemonTypes.electric};
  }
  &.psychic {
    background: ${props => props.theme.colors.pokemonTypes.psychic};
  }
  &.ice {
    background: ${props => props.theme.colors.pokemonTypes.ice};
  }
  &.dragon {
    background: ${props => props.theme.colors.pokemonTypes.dragon};
  }
  &.dark {
    background: ${props => props.theme.colors.pokemonTypes.dark};
  }
  &.fairy {
    background: ${props => props.theme.colors.pokemonTypes.fairy};
  }
  &.unknown {
    background: ${props => props.theme.colors.pokemonTypes.unknown};
  }
  &.shadow {
    background: ${props => props.theme.colors.pokemonTypes.shadow};
  }
`;
