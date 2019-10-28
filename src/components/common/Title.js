import React from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";

Title.propTypes = {
  firstPart: PropTypes.string,
  secondPart: PropTypes.string
};

export default function Title({ firstPart, secondPart }) {
  return (
    <TitleStyled>
      {firstPart}
      <SpanStyled>{secondPart}</SpanStyled>
      <LineStyledTop />
      <LineStyledBottom />
    </TitleStyled>
  );
}

const TitleStyled = styled.h1`
  font-family: "Baloo", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 40px;
  margin: 10px auto 10px;
  text-align: center;
`;

const SpanStyled = styled.span`
  color: ${props => (props.theme.mode === "dark" ? "#ffb930" : "#721313")};
`;

const LineStyledTop = styled.hr`
  border: 1.5px solid
    ${props => (props.theme.mode === "dark" ? "white" : "#111")};
  width: 95%;
  margin: 2px auto 2px;
`;

const LineStyledBottom = styled.hr`
  border: 0.5px solid
    ${props => (props.theme.mode === "dark" ? "white" : "#111")};
  width: 85%;
  margin-top: 0px;
`;
