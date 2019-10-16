import React, { useState } from "react";
import styled from "styled-components/macro";
// import PropTypes from "prop-types";
import Title from "./common/Title";
import Rating from "@material-ui/lab/Rating";
import { postReview } from "./reviews/servicesReview";
import { NavLink } from "react-router-dom";

export default function Feedback({ firstPart, secondPart }) {
  const [review, setReview] = useState("");
  const [value, setValue] = useState(0);

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

  return (
    <WrapperStyled>
      <Title firstPart={firstPart} secondPart={secondPart} />
      <p> Please give us feedback</p>
      <form onSubmit={handleReviewSubmit}>
        <TextareaStyled
          autoFocus
          name="review"
          rows="6"
          cols="35"
          maxlength="250"
          value={review}
          onChange={event => setReview(event.target.value)}
        ></TextareaStyled>
        <CharStyled>{review.length}/250 characters remaining</CharStyled>

        <p>Please give us a rating</p>
        <Rating
          name="rating"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <ButtonStyled type="submit">Submit</ButtonStyled>
      </form>
      <NavlinkStyled to="/reviews">See all reviews</NavlinkStyled>
    </WrapperStyled>
  );
}

// Settings.propTypes = {

// }

const WrapperStyled = styled.h3`
  text-align: center;
`;

const TextareaStyled = styled.textarea`
  margin-top: 20px;
  box-shadow: 0px 6px 20px grey;
  letter-spacing: 1px;
  line-height: 1.5;
`;

const ButtonStyled = styled.button`
  background-color: whitesmoke;
  margin: 20px;
  width: 85%;
  height: 35px;
  box-shadow: 0px 2px 5px grey;
  border-radius: 2rem;
`;

const CharStyled = styled.p`
  padding: 0;
  margin: 0;
  left: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-style: italic;
  font-size: 0.9rem;
  color: brown;
`;

const NavlinkStyled = styled(NavLink)`
  color: inherit;
  text-decoration: none;
  font-size: 1.3rem;
`;
