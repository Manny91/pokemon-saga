import React, { useEffect } from "react";
import { PokemonContainerProps } from "./pokemon.container";
import styled from "../styled-components";
import { PokemonImage } from "./components/pokemonImage";

export const Pokemons = ({
  getPokemons,
  loading,
  pokemons,
  getMorePokemons,
  error
}: PokemonContainerProps) => {
  const scrollRef = React.useRef<HTMLUListElement>(null);
  useEffect(() => {
    getPokemons();
  }, [getPokemons]);

  const handleScroll = (_: React.UIEvent<HTMLUListElement>) => {
    // added default values as a null-check
    const scrollTop = scrollRef.current?.scrollTop || 0;
    const clientHeight = scrollRef.current?.clientHeight || 0;
    const scrollHeight = scrollRef.current?.scrollHeight || 1;
    if (scrollHeight - scrollTop === clientHeight) {
      getMorePokemons();
    }
  };
  return (
    <>
      {error && <h2> {error}</h2>}
      <PokemonList ref={scrollRef} onScroll={handleScroll}>
        {pokemons &&
          pokemons.map(({ name, id }) => {
            return <PokemonListItem key={id} name={name} id={id} />;
          })}
      </PokemonList>
      {loading && <LoadingItems />}
    </>
  );
};

const LoadingItems = () => {
  return <h2>LOADING</h2>;
};
const PokemonListItem = ({ name, id }: PokemonListItemProps) => {
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

const PokemonList = styled.ul`
  height: 500px;
  overflow: auto;
`;

const PokemonItemWrapper = styled.li`
  display: flex;
  flex-direction: row;
  border: 2px solid black;
`;

const PokemonItemId = styled.p`
  font-size: 20px;
  padding: ${props => props.theme.spacing.sm};
`;
const PokemonItemBody = styled.div`
  display: flex;
  flex-direction: column;
`;
const PokemonItemTitle = styled.p`
  font-size: 16px;
  text-align: center;
  text-transform: capitalize;
`;

interface PokemonListItemProps {
  name: string;
  id: string;
}
