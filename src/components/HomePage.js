import React from "react";
import Card from "./cards/Card";
import Title from "./common/Title";
import styled from "styled-components/macro";
import { postComment } from "./cards/servicesComment";
import NavigationNew from "./common/NavigationNew";
import PropTypes from "prop-types";

Homepage.propTypes = {
  cards: PropTypes.array,
  onBookmarkClick: PropTypes.func,
  firstPart: PropTypes.string,
  secondPart: PropTypes.string
};

export default function Homepage({
  cards,
  onBookmarkClick,
  firstPart,
  secondPart
}) {
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

  function onCommentSubmit(id, data) {
    return postComment(id, data);
  }

  function bookmarkCount() {
    const bookmarkCountNum = cards.filter(card => card.isBookmarked).length;
    return bookmarkCountNum;
  }
}

const HomepageStyled = styled.section``;
