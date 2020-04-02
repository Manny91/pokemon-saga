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
  border: groove #4e4e4e 3px;
  width: 100%;
`;
const PokemonTypeBannerHeader = styled.div`
  height: 35px;
  text-transform: uppercase;
  text-align: center;
  border: groove #757575 3px;
  justify-content: center;
  display: flex;
  align-items: center;
  font-family: "VT323";
  font-size: 19px;
  font-weight: bold;
  background: linear-gradient(
    14deg,
    #460f0f 0,
    #891313 30%,
    #b31818 45%,
    #fd5555 65%,
    #b31818 95%
  );
`;

const PokemonTypeBanner = styled(PokemonTypeBannerHeader)`
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  margin: 3px;

  &.normal {
    background: #bfbfbf;
  }
  &.fighting {
    background: #d87c58;
  }
  &.flying {
    background: #999ade;
  }
  &.poison {
    background: #925192;
  }
  &.ground {
    background: #dea761;
  }
  &.rock {
    background: #897864;
  }
  &.bug {
    background: #b1c967;
  }
  &.ghost {
    background: #c195dc;
  }
  &.steel {
    background: #49769c;
  }
  &.fire {
    background: #cf1414;
  }
  &.water {
    background: #1689de;
  }
  &.grass {
    background: #47a047;
  }
  &.electric {
    background: #e6b700;
  }
  &.psychic {
    background: #fa43b8;
  }
  &.ice {
    background: #98c3de;
  }
  &.dragon {
    background: #89315d;
  }
  &.dark {
    background: #282433;
  }
  &.fairy {
    background: #dca0ce;
  }
  &.unknown {
    background: #545454;
  }
  &.shadow {
    background: #364163;
  }
`;
