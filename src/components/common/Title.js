import React from "react";
import styled from "styled-components/macro";

export default function Title() {
  return (
    <TitleStyled>
      In<SpanStyled>Kurz</SpanStyled>
      <LineStyledTop />
      <LineStyledBottom />
    </TitleStyled>
  );
}

const TitleStyled = styled.h1`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 35px;
  margin: 10px auto 10px;
  text-align: center;
`;

const SpanStyled = styled.span`
  color: #721313;
`;

const LineStyledTop = styled.hr`
  border: 1.5px solid black;
  width: 95%;
  margin: 2px auto 2px;
`;

const LineStyledBottom = styled.hr`
  border: 0.5px solid black;
  width: 85%;
  margin-top: 0px;
`;
// 721313
