import React, { useEffect } from "react";
import { PokemonContainerProps } from "./pokemon.container";
import styled from "../styled-components";
import { PokemonListItem } from "./components/pokemon-list-item/pokemon-list-item";
import PokemonDetailContainer from "./components/pokemon-detail/pokemons-detail.container";
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";
import { PokedexCircles } from "./components/pokedex-circles/pokedex-circles";

export const Pokemons = ({
  getPokemons,
  pokemonSelected,
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
        <PokedexCircles />
        <Container>
          <Left>
            {error && <h2> {error}</h2>}
            <PokemonList ref={scrollRef} onScroll={handleScroll}>
              {pokemons &&
                pokemons.map(({ name, id }) => {
                  return (
                    <StyledLink key={id} to={`/pokemon/${id}/`}>
                      <PokemonListItem
                        pokemonSelected={pokemonSelected}
                        name={name}
                        id={id}
                      />
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
        </Container>
      </BrowserRouter>
    </PokemonsPage>
  );
};
const PokemonsPage = styled.div`
  display: flex;
  border-radius: 15px;
  background-color: ${props => props.theme.colors.red};
  border: 10px double;
  flex-direction: column;
  font-family: "VT323";
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media ${props => props.theme.media.md} {
    flex-direction: row;
  }
`;
const Left = styled.section`
  width: 100%;
  @media ${props => props.theme.media.md} {
    width: 330px;
  }
`;
const Right = styled.section`
  padding: 0px ${props => props.theme.spacing.sm};
  @media ${props => props.theme.media.md} {
    border-left: 10px double;
    width: 100%;
  }
`;
const PokemonList = styled.ul`
  height: 55vh;
  overflow: auto;
  padding: 0px;
  border: 5px double;
  margin: ${props => props.theme.spacing.sm};
  @media ${props => props.theme.media.md} {
    height: 500px;
  }
`;
