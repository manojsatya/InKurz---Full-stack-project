import React from "react";
import Card from "./cards/Card";
import Title from "./common/Title";
import styled from "styled-components/macro";
import { postComment } from "./cards/servicesComment";
import NavigationNew from "./common/NavigationNew";

export default function Homepage({
  cards,
  onBookmarkClick,
  firstPart,
  secondPart
}) {
  function onCommentSubmit(id, data) {
    return postComment(id, data);
  }

  function bookmarkCount() {
    const bookmarkCountNum = cards.filter(card => card.isBookmarked).length;
    return bookmarkCountNum;
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
      <NavigationNew bookmarkCount={bookmarkCount()} />
    </HomepageStyled>
  );
}

const HomepageStyled = styled.section``;
