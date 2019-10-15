import React from "react";
import Card from "./cards/Card";
import Title from "./common/Title";
import styled from "styled-components/macro";
import { postComment } from "./cards/servicesComment";

export default function Homepage({
  cards,
  onBookmarkClick,
  firstPart,
  secondPart
}) {
  function onCommentSubmit(id, data) {
    return postComment(id, data);
  }

  return (
    <HomepageStyled>
      <Title firstPart={firstPart} secondPart={secondPart} />
      {cards.map(card => (
        <Card
          key={card._id}
          {...card}
          onBookmarkClick={() => onBookmarkClick(card)}
          onCommentSubmit={onCommentSubmit}
        />
      ))}
    </HomepageStyled>
  );
}

const HomepageStyled = styled.section`
  /* display: grid; */
  /* grid-gap: 40px; */
  /* text-align: center; */
`;
