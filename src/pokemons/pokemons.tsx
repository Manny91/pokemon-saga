import React, { useEffect } from "react";
import { PokemonContainerProps } from "./pokemon.container";
import styled from "../styled-components";
import { PokemonListItem } from "./components/pokemon-list-item/pokemon-list-item";
import { PokemonLoadingItem } from "./components/pokemon-loading-item/pokemon-loading-item";
import { PokemonDetail } from "./components/pokemon-detail/pokemon-detail";
import { Route, BrowserRouter, Switch } from "react-router-dom";

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
      <Left>
        {error && <h2> {error}</h2>}
        <PokemonList ref={scrollRef} onScroll={handleScroll}>
          {pokemons &&
            pokemons.map(({ name, id }) => {
              return <PokemonListItem key={id} name={name} id={id} />;
            })}
        </PokemonList>
        {loading && <PokemonLoadingItem />}
      </Left>
      <Right>
        <BrowserRouter>
          <Switch>
            <Route path="/:name/" component={PokemonDetail} />
          </Switch>
        </BrowserRouter>
      </Right>
    </PokemonsPage>
  );
};
const PokemonsPage = styled.div`
  display: flex;
  flex-direction: column;
`;

const Left = styled.section``;
const Right = styled(Left)``;
const PokemonList = styled.ul`
  height: 500px;
  overflow: auto;
`;
