import React from "react";
import Card from "./Card";
import Title from "./common/Title";
import styled from "styled-components/macro";
import { uid } from "react-uid";
// import FlashMessage from "./FlashMessage";

export default function Homepage({ cards, onBookmarkClick }) {
  return (
    <HomepageStyled>
      <Title />
      {cards.map(card => (
        <Card
          key={uid(card)}
          {...card}
          onBookmarkClick={() => onBookmarkClick(card)}
        />
      ))}
      {/* {onFlash && <FlashMessage>{Children}</FlashMessage>} */}
    </HomepageStyled>
  );
}

const HomepageStyled = styled.section`
  /* display: grid; */
  /* grid-gap: 40px; */
  /* text-align: center; */
`;
