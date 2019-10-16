import React from "react";
import styled from "styled-components/macro";
import Rating from "@material-ui/lab/Rating";

function ShowReviews({ review, rating }) {
  return (
    <WrapperReview>
      <ReviewStyled>
        <ImgStyled src="https://source.unsplash.com/random" alt="face" />
        <RatingStyled name="rating" value={rating} readOnly />
        <p>{review}</p>
      </ReviewStyled>
      {/* <p>{rating}</p> */}
    </WrapperReview>
  );
}

export default function Review({ reviews }) {
  return (
    <div>
      {reviews.map(review => (
        <ShowReviews key={review._id} {...review} />
      ))}
    </div>
  );
}

const ReviewStyled = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  margin: 50px 20px 0 40px;
  border-radius: 0.8rem;
  box-shadow: 0 5px 10px gray;
`;

const RatingStyled = styled(Rating)`
  display: flex;
  justify-content: flex-end;
`;

const ImgStyled = styled.img`
  position: absolute;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  top: -40px;
  left: -35px;
  border: 1px brown solid;
`;

const WrapperReview = styled.div`
  /* margin: 15px; */
`;
