import React from "react";
import Card from "./cards/Card";
import Title from "./common/Title";
import styled from "styled-components/macro";

export default function Homepage({ cards, onBookmarkClick }) {
  return (
    <HomepageStyled>
      <Title />
      {cards.map(card => (
        <Card
          key={card._id}
          {...card}
          onBookmarkClick={() => onBookmarkClick(card)}
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
