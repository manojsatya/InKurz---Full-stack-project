import React, { useState } from "react";
import styled, { keyframes } from "styled-components/macro";
import PropTypes from "prop-types";
import Title from "./common/Title";
import Rating from "@material-ui/lab/Rating";
import { postReview } from "./reviews/servicesReview";
import { NavLink } from "react-router-dom";
import { LeftArrowCircle } from "styled-icons/boxicons-solid/LeftArrowCircle";

Feedback.propTypes = {
  firstPart: PropTypes.string,
  secondPart: PropTypes.string
};

export default function Feedback({ firstPart, secondPart }) {
  const [review, setReview] = useState("");
  const [value, setValue] = useState(0);

  return (
    <WrapperStyled>
      <NavLink to="/settings">
        <LeftArrowStyled />
      </NavLink>
      <Title firstPart={firstPart} secondPart={secondPart} />
      <form onSubmit={handleReviewSubmit}>
        <Pstyled>How would you rate us?</Pstyled>
        <Rating
          name="rating"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <Pstyled> How can we improve?</Pstyled>
        <TextareaStyled
          autoFocus
          name="review"
          rows="6"
          cols="40"
          value={review}
          onChange={event => setReview(event.target.value.substr(0, 250))}
        ></TextareaStyled>
        <CharStyled>{review.length}/250 characters </CharStyled>

        <ButtonStyled type="submit">Submit</ButtonStyled>
      </form>
    </WrapperStyled>
  );

  function handleReviewSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    postReview(data);
    form.reset();
    setValue(0);
    setReview("");
  }
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

const WrapperStyled = styled.div`
  animation: ${PageTransitionIn} 0.75s;
  margin: 20px;
`;

const Pstyled = styled.p`
  font-size: 1.2rem;
`;
const TextareaStyled = styled.textarea`
  margin-top: 15px;
  box-shadow: 0px 2px 10px grey;
  letter-spacing: 1px;
  line-height: 1.5;
`;

const ButtonStyled = styled.button`
  color: white;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#ffb930" : "#721313"};
  margin: 20px;
  width: 85%;
  height: 35px;
  outline: none;
  box-shadow: 0px 2px 5px grey;
  border-radius: 2rem;
`;

const CharStyled = styled.p`
  text-align: right;
  padding: 0;
  margin: 0;
  left: 0;
  font-style: italic;
  font-size: 0.9rem;
  color: ${props => (props.theme.mode === "dark" ? "#ffb930" : "#721313")};
`;

const LeftArrowStyled = styled(LeftArrowCircle)`
  position: fixed;
  color: ${props => (props.theme.mode === "dark" ? "#ffb930" : "#721313")};
  top: 15px;
  left: 10px;
  width: 35px;
`;
