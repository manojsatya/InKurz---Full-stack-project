import React from "react";
import styled, { keyframes } from "styled-components/macro";
import Title from "./common/Title";
import australia from "../assets/icons/australia.jpg";
import business from "../assets/icons/business.jpg";
import entertainment from "../assets/icons/entertainment.jpg";
import france from "../assets/icons/france.jpg";
import health from "../assets/icons/health.jpg";
import india from "../assets/icons/india.jpg";
import italy from "../assets/icons/italy.jpg";
import science from "../assets/icons/science.jpg";
import sports from "../assets/icons/sports.jpg";
import technology from "../assets/icons/technology.jpg";
import uk from "../assets/icons/uk.jpg";
import us from "../assets/icons/us.jpg";
// TODO import all images and replace the links

export default function Category({ firstPart, secondPart }) {
  function CategoryGrid() {
    return (
      <GridContainerStyed>
        <CategoryStyled>
          <a href="/business">
            <img src={business} alt="business" />
            <span>Business</span>
          </a>
        </CategoryStyled>
        <CategoryStyled>
          <a href="/entertainment">
            <img src={entertainment} alt="entertainment" />
            <span>Entertainment</span>
          </a>
        </CategoryStyled>

        <CategoryStyled>
          <a href="/health">
            <img src={health} alt="health" />
            <span>Health</span>
          </a>
        </CategoryStyled>
        <CategoryStyled>
          <a href="/science">
            <img src={science} alt="science" />
            <span>Science</span>
          </a>
        </CategoryStyled>
        <CategoryStyled>
          <a href="/technology">
            <img src={technology} alt="technology" />
            <span>Technology</span>
          </a>
        </CategoryStyled>

        <CategoryStyled>
          <a href="/sports">
            <img src={sports} alt="sports" />
            <span>Sports</span>
          </a>
        </CategoryStyled>
      </GridContainerStyed>
    );
  }

  function CountryGrid() {
    return (
      <GridContainerStyed>
        <CategoryStyled>
          <a href="/us">
            <img src={us} alt="us" />
            <span>United States</span>
          </a>
        </CategoryStyled>
        <CategoryStyled>
          <a href="/uk">
            <img src={uk} alt="uk" />
            <span>United Kingdom</span>
          </a>
        </CategoryStyled>

        <CategoryStyled>
          <a href="/france">
            <img src={france} alt="france" />
            <span>France</span>
          </a>
        </CategoryStyled>
        <CategoryStyled>
          <a href="/india">
            <img src={india} alt="india" />
            <span>India</span>
          </a>
        </CategoryStyled>
        <CategoryStyled>
          <a href="/australia">
            <img src={australia} alt="australia" />
            <span>Australia</span>
          </a>
        </CategoryStyled>

        <CategoryStyled>
          <a href="/italy">
            <img src={italy} alt="italy" />
            <span>Italy</span>
          </a>
        </CategoryStyled>
      </GridContainerStyed>
    );
  }
  return (
    <div>
      <Title firstPart={firstPart} secondPart={secondPart} />
      <StyledH2>Topics:</StyledH2>
      <CategoryGrid />
      <StyledH2>Countries:</StyledH2>
      <CountryGrid />
    </div>
  );
}

const PageTransitionIn = keyframes`
from {
    opacity: 0;
    transform: translateY(100px);
}
to{
    opacity: 1,
    transform: translateY(0px)
}
`;

const GridContainerStyed = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 80px 80px 80px;
  grid-row-gap: 120px;
  animation: ${PageTransitionIn} 0.75s;
  img {
    height: 120px;
    width: 100px;
    border-radius: 0.4rem;
    box-shadow: 0 5px 10px gray;
  }
`;

const CategoryTransitionIn = keyframes`
from {
    opacity: 0;
    transform: translateY(100px);
}
to{
    opacity: 1,
    transform: translateY(0px)
}
`;

const CategoryStyled = styled.div`
  text-align: center;
  animation: ${CategoryTransitionIn} 0.75s;
  a {
    text-decoration: none;
    font-style: italic;
    color: ${props => (props.theme.mode === "dark" ? "#ffb930" : "#721313")};
    font-size: 1.1rem;
  }
`;

const StyledH2 = styled.h2`
  margin: 20px;
  text-align: start;
  text-decoration: underline;
`;
