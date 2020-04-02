import React from "react";
import styled from "styled-components";

type State = {
  handleClick?: () => void;
};
export const PokedexCircles = ({ handleClick }: State) => {
  return (
    <PokedexCirclesContainer onClick={handleClick}>
      <PokedexCircle />
      <PokedexCircleSmallRed />
      <PokedexCircleSmallYellow />
      <PokedexCircleSmallGreen />
    </PokedexCirclesContainer>
  );
};
function PokedexCircle() {
  return (
    <PokedexCircleStyled>
      <PokedexCircleInsideStyled />
    </PokedexCircleStyled>
  );
}
function PokedexCircleSmallRed() {
  return (
    <PokedexCircleSmallWrapperStyled>
      <PokedexCircleInsideRedStyled />
    </PokedexCircleSmallWrapperStyled>
  );
}
function PokedexCircleSmallYellow() {
  return (
    <PokedexCircleSmallWrapperStyled>
      <PokedexCircleInsideYellowStyled />
    </PokedexCircleSmallWrapperStyled>
  );
}
function PokedexCircleSmallGreen() {
  return (
    <PokedexCircleSmallWrapperStyled>
      <PokedexCircleInsideGreenStyled />
    </PokedexCircleSmallWrapperStyled>
  );
}

const PokedexCirclesContainer = styled.div`
  display: flex;
  cursor: pointer;
  border-bottom: 10px double ${props => props.theme.black};
  padding: 0px ${props => props.theme.spacing.sm};
`;
const PokedexCircleStyled = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${props => props.theme.colors.white};
  border-radius: 50%;
  border: double black 10px;
  position: relative;

  height: 50px;
  width: 50px;
  margin: ${props => props.theme.spacing.sm};
  &:after {
    content: "";
    filter: blur(1px);
    position: absolute;
    top: 25%;
    width: 12%;
    height: 12%;
    background-color: ${props => props.theme.colors.white};
    left: 25%;
    border-radius: 50%;
  }
  @media ${props => props.theme.media.md} {
    margin: 1em;
    width: 100px;
    height: 100px;
  }
`;
const PokedexCircleSmallWrapperStyled = styled(PokedexCircleStyled)`
  height: 15px;
  width: 15px;
  @media ${props => props.theme.media.md} {
    width: 20px;
    height: 20px;
  }
`;
const PokedexCircleInsideStyled = styled.div`
  background-image: linear-gradient(
    to right,
    ${props => props.theme.colors.blue},
    ${props => props.theme.colors.darkBlue}
  );
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;
const PokedexCircleInsideRedStyled = styled(PokedexCircleInsideStyled)`
  background-image: linear-gradient(
    to right,
    ${props => props.theme.colors.red},
    ${props => props.theme.colors.darkRed}
  );
`;
const PokedexCircleInsideYellowStyled = styled(PokedexCircleInsideStyled)`
  background-image: linear-gradient(
    to right,
    ${props => props.theme.colors.yellow},
    ${props => props.theme.colors.darkYellow}
  );
`;
const PokedexCircleInsideGreenStyled = styled(PokedexCircleInsideStyled)`
  background-image: linear-gradient(
    to right,
    ${props => props.theme.colors.green},
    ${props => props.theme.colors.darkGreen}
  );
`;
