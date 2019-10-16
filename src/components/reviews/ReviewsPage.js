import React, { useEffect, useState } from "react";
import Title from "../common/Title";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { LeftArrowCircle } from "styled-icons/boxicons-solid/LeftArrowCircle";
import { getReviews } from "./servicesReview";
import Review from "./Review";

export default function Reviews({ firstPart, secondPart }) {
  const [reviews, setReviews] = useState([]);
  //   getReviews().then(reviews => console.log(reviews));

  useEffect(() => {
    getReviews().then(setReviews);
  }, []);
  return (
    <div>
      <NavLink to="/feedback">
        <LeftArrowStyled />
      </NavLink>
      <Title firstPart={firstPart} secondPart={secondPart} />
      <Review reviews={reviews} />
    </div>
  );
}

const LeftArrowStyled = styled(LeftArrowCircle)`
  position: fixed;
  color: brown;
  top: 15px;
  left: 10px;
  width: 35px;
`;
