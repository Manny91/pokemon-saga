import { LoadingWrapper, Loading } from "../loading/loading";
import styled from "../../../styled-components";
import React from "react";

export const PokemonDescriptionDisplayer = ({
  description,
  loading
}: PokemonDetails) => {
  return (
    <StatScreen>
      {!loading && <Description>{description}</Description>}
      {loading && <Loading />}
    </StatScreen>
  );
};

const StatScreen = styled.div`
  border: 1px solid;
  background-color: ${props => props.theme.colors.greenScreen};
  padding: 5px;
  border-radius: 3px;
  border: inset ${props => props.theme.colors.greenBorder} 3px;
  ${LoadingWrapper} {
    margin: 7px;
  }
`;
interface PokemonDetails {
  description: string;
  loading: boolean;
}
const Description = styled.h4`
  margin: 7px;
`;
