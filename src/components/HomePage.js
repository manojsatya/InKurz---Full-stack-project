import React from "react";
import Card from "./Card";
import Title from "./common/Title";
import styled from "styled-components/macro";

export default function Homepage({ cards }) {
  return (
    <HomepageStyled>
      <Title />
      {cards.map(card => (
        <Card key={card._id} {...card} />
      ))}
    </HomepageStyled>
  );
}

const HomepageStyled = styled.section`
  /* display: grid; */
  /* text-align: center; */
`;
