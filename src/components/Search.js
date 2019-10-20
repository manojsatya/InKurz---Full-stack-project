import React, { useState } from "react";
import Title from "./common/Title";
import styled from "styled-components/macro";
import Card from "./cards/Card";
import { postComment } from "./cards/servicesComment";

export default function Search({
  cards,
  onBookmarkClick,
  firstPart,
  secondPart
}) {
  const [search, setSearch] = useState("");
  function onCommentSubmit(id, data) {
    return postComment(id, data);
  }

  const searchedCards = cards
    .filter(card => card.description !== null)
    .filter(
      card =>
        card.description.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );

  console.log({ searchedCards });

  return (
    <div>
      <Title firstPart={firstPart} secondPart={secondPart} />

      <InputStyled
        type="text"
        autoFocus
        name="search"
        placeholder="Search ..."
        autoComplete="off"
        value={search}
        onChange={event => setSearch(event.target.value)}
      />

      <SearchResultsStyled>
        {search.length >= 1 && (
          <ButtonStyled onClick={() => setSearch("")}>
            Clear Search
          </ButtonStyled>
        )}
        {search.length >= 1 && <p>{searchedCards.length} articles found</p>}
      </SearchResultsStyled>

      {search.length >= 1 &&
        searchedCards.map(card => (
          <Card
            key={card._id}
            {...card}
            onBookmarkClick={() => onBookmarkClick(card)}
            onCommentSubmit={onCommentSubmit}
          />
        ))}
    </div>
  );
}

const InputStyled = styled.input`
  display: flex;
  margin: 10px auto;
  height: 35px;
  width: 90%;
  border-radius: 0.3rem;
  outline: none;
  border: 1px solid
    ${props => (props.theme.mode === "dark" ? "#ffb930" : "#721313")};
`;

const SearchResultsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    margin-right: 20px;
    font-style: italic;
    color: ${props => (props.theme.mode === "dark" ? "#ffb930" : "#721313")};
  }
`;

const ButtonStyled = styled.button`
  font-size: 0.8rem;
  padding: 5px;
  margin: 10px 15px;
  border-radius: 0.3rem;
  outline: none;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#ffb930" : "#721313"};
  color: ${props => (props.theme.mode === "dark" ? "#111" : "white")};
`;
