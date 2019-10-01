import React from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
const moment = require("moment");

Card.propTypes = {
  title: PropTypes.string,
  urlToImage: PropTypes.string,
  description: PropTypes.string,
  publishedAt: PropTypes.string
};

export default function Card({ title, urlToImage, description, publishedAt }) {
  const diffTime = moment(publishedAt).fromNow();
  return (
    <CardStyled>
      <ImgStyled src={urlToImage} alt="card_image" />
      <ContentStyled>
        <h3>{title}</h3>
        <p>{description}</p>
        <TimeStyled>{diffTime}</TimeStyled>
      </ContentStyled>
    </CardStyled>
  );
}

const ImgStyled = styled.img`
  width: 100vw;
  margin-top: 0;
`;

const CardStyled = styled.section`
  background-color: "#F9F6F2";
  /* padding-bottom: 15px; */
  /* margin-bottom: 40px; */
  font-family: "Times New Roman", Times, serif;
  p {
    line-height: 1.3;
  }
  h3 {
    margin: 0;
  }
`;

const ContentStyled = styled.section`
  padding: 15px;
  margin-bottom: 30px;
  box-shadow: 0 5px 0px #bdacac;
`;

const TimeStyled = styled.p`
  font-style: italic;
  color: #721313;
`;
