import React, { useEffect } from "react";
import { PokemonContainerProps } from "./pokemon.container";
import styled from "../styled-components";
import { PokemonListItem } from "./components/pokemon-list-item/pokemon-list-item";
import PokemonDetailContainer from "./components/pokemon-detail/pokemons-detail.container";
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";

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
    <PokemonsPage>
      <BrowserRouter>
        <Left>
          {error && <h2> {error}</h2>}
          <PokemonList ref={scrollRef} onScroll={handleScroll}>
            {pokemons &&
              pokemons.map(({ name, id }) => {
                return (
                  <StyledLink key={id} to={`/pokemon/${id}/`}>
                    <PokemonListItem name={name} id={id} />
                  </StyledLink>
                );
              })}
          </PokemonList>
        </Left>
        <Right>
          <Switch>
            <Route path="/pokemon/:id/" component={PokemonDetailContainer} />
          </Switch>
        </Right>
      </BrowserRouter>
    </PokemonsPage>
  );
};
const PokemonsPage = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
const Left = styled.section``;
const Right = styled(Left)``;
const PokemonList = styled.ul`
  height: 500px;
  overflow: auto;
`;
