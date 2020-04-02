import React from "react";
import { Loading, LoadingDot } from "../loading/loading";
import styled from "../../../styled-components";

export const PokemonLoadingItem = () => {
  return (
    <LoadingWrapper>
      <Loading />
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  margin-top: -30px;
  margin-left: ${props => props.theme.spacing.lg};
  ${LoadingDot} {
    width: 15px;
    height: 15px;
  }
`;
