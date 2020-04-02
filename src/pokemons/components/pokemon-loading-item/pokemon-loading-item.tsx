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
  ${LoadingDot} {
    width: 15px;
    height: 15px;
  }
`;
