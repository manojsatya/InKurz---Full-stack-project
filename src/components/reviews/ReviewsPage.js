import React, { useEffect, useState } from "react";
import Title from "../common/Title";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { LeftArrowCircle } from "styled-icons/boxicons-solid/LeftArrowCircle";
import { getReviews } from "./servicesReview";
import Review from "./Review";

Reviews.propTypes = {
  firstPart: PropTypes.string,
  secondPart: PropTypes.string
};

export default function Reviews({ firstPart, secondPart }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then(reviews => {
      reviews.sort((a, b) => {
        const dateA = new Date(a.reviewedAt);
        const dateB = new Date(b.reviewedAt);
        return dateB - dateA;
      });
      setReviews(reviews);
    });
  }, []);
  return (
    <div>
      <NavLink to="/settings">
        <LeftArrowStyled />
      </NavLink>
      <Title firstPart={firstPart} secondPart={secondPart} />
      <Review reviews={reviews} />
    </div>
  );
}

const LeftArrowStyled = styled(LeftArrowCircle)`
  position: fixed;
  color: ${props => (props.theme.mode === "dark" ? "#ffb930" : "#721313")};
  top: 15px;
  left: 10px;
  width: 35px;
`;
