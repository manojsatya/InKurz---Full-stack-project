import React from "react";
import styled from "styled-components/macro";

export default function FlashMessage({ msg }) {
  return (
    <FlashStyled>
      <p>{msg}</p>
    </FlashStyled>
  );
}

const FlashStyled = styled.section`
  position: fixed;
  color: white;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  bottom: 60px;
  background: ${props => (props.theme.mode === "dark" ? "#ffb930" : "#721313")};
  border-radius: 20px;
  p {
    padding: 8px;
    margin: 0;
  }
`;
