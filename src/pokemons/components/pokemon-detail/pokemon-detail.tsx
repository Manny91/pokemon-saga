import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PokemonListItem } from "../pokemon-list-item/pokemon-list-item";
import styled from "../../../styled-components";
import { PokemonMoveDisplayer } from "../move-displayer/moves-displayer";
import { PokemonMove } from "../../../services/pokemon.service";
import { PokemonImage } from "../pokemon-image/pokemon-image";
import { PokemonTypeDisplayer } from "../type-displayer/type-displayer";
import { PokemonStatsDisplayer } from "../stats-displayer/stats-displayer";
import { PokemonDescriptionDisplayer } from "../description-displayer/description-displayer";
import { getFlavorDescriptionText } from "../../../utils/getDescriptionByLanguage";
import { PokemonAbilitiesDisplayer } from "../ability-displayer/ability-displayer";
import { StyledLink } from "../styled-link/styled-link";
import { PokemonDetailContainerProps } from "./pokemons-detail.container";

export const PokemonDetailView = ({
  getPokemonDetail,
  pokemon,
  loading,
  selectPokemon,
  getPokemonMove,
  selectMove,
  selectedMove,
  loadingMoves
}: PokemonDetailContainerProps) => {
  const { id } = useParams();
  const evolutions = pokemon?.species.evolutions;
  const [selectedMoveIndex, setSelectedMoveIndex] = useState(0);
  const pokemonImageId = id + "";
  const types = pokemon?.types;
  const pokemonStats = pokemon?.stats;
  const pokemonDescription =
    pokemon?.species && getFlavorDescriptionText(pokemon?.species, "en");
  const pokemonAbilities = pokemon?.abilities;
  const pokemonMovesList = pokemon?.moves;
  useEffect(() => {
    if (id && !loading) {
      selectPokemon(id);
      getPokemonDetail(id);
    }
  }, [id]);

  useEffect(() => {
    if (pokemon) {
      const moveName = pokemon.moves[0].move.name;
      selectMoveByName(moveName);
    }
  }, [pokemon]);

  const selectMoveByName = (moveName: string) => {
    selectMove(moveName);
    getPokemonMove(moveName);
  };

  const selectMoveHandlerList = (moveName: string) => {
    if (pokemon) {
      const moveIndex = pokemon.moves.findIndex((move: PokemonMove) => {
        return move.move.name === moveName;
      });
      setSelectedMoveIndex(moveIndex);
    }
  };

  useEffect(() => {
    if (pokemon) {
      const pokemonMoves = pokemon.moves;
      const move: PokemonMove = pokemonMoves[selectedMoveIndex];
      const pokeMove = pokemonMoves.find(
        (pokeMove: PokemonMove) => pokeMove.move.name === move.move.name
      );
      if (pokeMove) {
        selectMoveByName(pokeMove.move.name);
      }
    }
  }, [selectedMoveIndex]);

  const handleMoveNext = () => {
    setSelectedMoveIndex(selectedMoveIndex + 1);
  };
  const handleMovePrevious = () => {
    setSelectedMoveIndex(Math.max(0, selectedMoveIndex - 1));
  };
  return (
    <>
      {pokemon && (
        <>
          <DisplayerWrapper>
            <InfoDisplayer>
              <TextDisplayer>
                <TextParagraph>Name: {pokemon.name}</TextParagraph>
                <TextParagraph> Order: {pokemon.order}</TextParagraph>
                <TextParagraph>
                  Height: {`${pokemon?.height / 10} meters`}
                </TextParagraph>
                <TextParagraph>Weight: {`${pokemon?.weight} Kg`}</TextParagraph>
              </TextDisplayer>
              <PokemonImage id={pokemonImageId} />
            </InfoDisplayer>
            <PokemonEvolutionList>
              {evolutions &&
                evolutions.map(({ name, id }) => {
                  return (
                    <StyledLink key={id} to={`/pokemon/${id}/`}>
                      {id && (
                        <PokemonListItem name={name} id={id} showId={false} />
                      )}
                    </StyledLink>
                  );
                })}
            </PokemonEvolutionList>
          </DisplayerWrapper>
          <MoveAndTypeSection>
            <MoveSectionDisplayer>
              <PokemonMoveListContainer>
                <PokemonMovesListDisplayer
                  selectedMove={selectedMove}
                  selectMoveHandler={selectMoveHandlerList}
                  pokemonMoves={pokemonMovesList}
                />
              </PokemonMoveListContainer>
            </MoveSectionDisplayer>
            <MoveSectionDisplayer>
              <PokemonMoveDisplayer
                handleMoveNext={handleMoveNext}
                handleMovePrevious={handleMovePrevious}
                move={selectedMove}
                loadingMoves={loadingMoves}
              />
            </MoveSectionDisplayer>
            {types && (
              <TypeSectionDisplayer>
                {types && <PokemonTypeDisplayer types={types} />}
              </TypeSectionDisplayer>
            )}
          </MoveAndTypeSection>

          <DisplayerWrapper>
            {pokemonStats && <PokemonStatsDisplayer stats={pokemonStats} />}
            {pokemonDescription && (
              <PokemonDescriptionDisplayer
                loading={loading}
                description={pokemonDescription}
              />
            )}
            {pokemonAbilities && (
              <PokemonAbilitiesDisplayer abilities={pokemonAbilities} />
            )}
          </DisplayerWrapper>
        </>
      )}
    </>
  );
};

const PokemonEvolutionList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 0px;
  margin: ${props => props.theme.spacing.xs};
  @media ${props => props.theme.media.lg} {
    flex-direction: row;
  }
`;
const DisplayerWrapper = styled.div`
  padding: ${props => props.theme.spacing.xs};
  display: flex;
  flex-direction: column;
  border: groove ${props => props.theme.colors.greenDarkBorder} 3px;
  @media ${props => props.theme.media.md} {
    margin: ${props => props.theme.spacing.sm};
    flex-direction: row;
  }
`;
const MoveAndTypeSection = styled(DisplayerWrapper)``;
const MoveSectionDisplayer = styled(DisplayerWrapper)`
  height: 100px;
  flex-direction: row;
  width: 100%;
  border: none;
  @media ${props => props.theme.media.md} {
    width: 50%;
    padding: 0px;
    margin: 0px;
  }
`;

const TypeSectionDisplayer = styled(MoveSectionDisplayer)`
  padding: 0px;
`;

const TextDisplayer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;
const InfoDisplayer = styled.div`
  padding: ${props => props.theme.spacing.sm};
  border: inset ${props => props.theme.colors.greenBorder} 3px;
  display: flex;
  background: ${props => props.theme.colors.greenScreenBackground};
  @media ${props => props.theme.media.md} {
    width: 100%;
  }
  margin: ${props => props.theme.spacing.xs};
`;

const TextParagraph = styled.h3`
  text-transform: capitalize;
  margin: ${props => props.theme.spacing.xs};
`;
const PokemonMoveListContainer = styled(InfoDisplayer)`
  flex-direction: column;
  overflow: auto;
`;
const PokemonMoveListItem = styled.li`
  font-weight: bold;
  display: flex;
  padding: 7px;
  cursor: pointer;
  &.selected {
    display: list-item;
  }
`;

interface PokemonMovesListDisplayerProps {
  pokemonMoves?: PokemonMove[];
  selectMoveHandler: (moveName: string) => void;
  selectedMove: PokemonMove;
}
// TODO this should be extracted from here
const PokemonMovesListDisplayer = ({
  pokemonMoves,
  selectMoveHandler,
  selectedMove
}: PokemonMovesListDisplayerProps) => {
  return (
    <>
      {pokemonMoves &&
        pokemonMoves.map((pokemonMove: PokemonMove, key) => {
          const isSelectedClass =
            selectedMove && selectedMove.name === pokemonMove.move.name
              ? "selected"
              : "";
          return (
            <PokemonMoveListItem
              className={isSelectedClass}
              key={key}
              onClick={() => selectMoveHandler(pokemonMove.move.name)}
            >
              {pokemonMove.move.name}
            </PokemonMoveListItem>
          );
        })}
    </>
  );
};
