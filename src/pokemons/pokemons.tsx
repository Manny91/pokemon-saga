import React, { useEffect, useState } from "react";
import { PokemonContainerProps } from "./pokemon.container";
import styled from "../styled-components";
import { PokemonListItem } from "./components/pokemon-list-item/pokemon-list-item";
import PokemonDetailContainer from "./components/pokemon-detail/pokemons-detail.container";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { PokedexCircles } from "./components/pokedex-circles/pokedex-circles";
import { StyledLink } from "./components/styled-link/styled-link";
import { PokemonLoadingItem } from "./components/pokemon-loading-item/pokemon-loading-item";

export const Pokemons = ({
  getPokemons,
  pokemonSelected,
  pokemons,
  getMorePokemons,
  error,
  loading,
  loadingDetail
}: PokemonContainerProps) => {
  const scrollRef = React.useRef<HTMLUListElement>(null);
  const isLoading = loading || loadingDetail;
  const [pokemonsFiltered, setPokemonsFiltered] = useState(pokemons);

  useEffect(() => {
    getPokemons();
  }, [getPokemons]);

  useEffect(() => {
    setPokemonsFiltered(pokemons);
  }, [pokemons]);

  const handleScroll = (_: React.UIEvent<HTMLUListElement>) => {
    // added default values as a null-check
    const scrollTop = scrollRef.current?.scrollTop || 0;
    const clientHeight = scrollRef.current?.clientHeight || 0;
    const scrollHeight = scrollRef.current?.scrollHeight || 1;
    if (scrollHeight - scrollTop === clientHeight) {
      getMorePokemons();
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueTyped = event.target.value;
    const newPokemonsFiltered = pokemons.filter(
      pokemons => pokemons.name.indexOf(valueTyped) !== -1
    );
    setPokemonsFiltered(newPokemonsFiltered);
  };
  return (
    <PokemonsPage>
      <BrowserRouter>
        <PokedexCircles />
        <Container>
          <Left>
            {error && <h2> {error}</h2>}
            <InputContainer>
              <InputSearch
                placeholder="Search name"
                onChange={onChangeHandler}
              />
            </InputContainer>
            <PokemonList ref={scrollRef} onScroll={handleScroll}>
              {pokemonsFiltered &&
                pokemonsFiltered.map(({ name, id }) => {
                  return (
                    <StyledLink key={id} to={`/pokemon/${id}/`}>
                      <PokemonListItem
                        pokemonSelected={pokemonSelected}
                        name={name}
                        id={id.toString()}
                      />
                    </StyledLink>
                  );
                })}
            </PokemonList>
            {isLoading && <PokemonLoadingItem />}
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
  height: 40vh;
  overflow: auto;
  padding: 0px;
  border: 5px double;
  margin: ${props => props.theme.spacing.sm};
  @media ${props => props.theme.media.md} {
    height: 500px;
  }
`;

const InputContainer = styled.div`
  margin: ${props => props.theme.spacing.sm};
  padding: 0px;
  border: 5px double;
  margin: 10px;
  display: flex;
`;
const InputSearch = styled.input`
  background-color: ${props => props.theme.colors.greenScreen};
  width: 100%;
  height: 30px;
  font-size: 20px;
  font-family: "VT323";
  border-color: ${props => props.theme.colors.greenBorder};
`;
