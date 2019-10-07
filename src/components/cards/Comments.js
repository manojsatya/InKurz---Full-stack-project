import React from "react";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import styled from "styled-components/macro";

export default function Comments({ showComments, comments }) {
  // console.log(showComments);
  return (
    <CommentsSectionStyled className={showComments ? "visible" : null}>
      {comments.map((comment, index) => (
        <CommentsStyled key={index}>
          <img src="https://source.unsplash.com/random" alt="img-1" />
          <p>{comment}</p>
        </CommentsStyled>
      ))}
    </CommentsSectionStyled>
  );
}

const CommentsSectionStyled = styled.section`
  max-height: 0;
  overflow: hidden;
  margin: 0;
  background: whitesmoke;
  border-radius: 1rem;
  transition: all 0.5s ease;

  &.visible {
    max-height: 100vh;
    transition: all 1.5s ease;
  }
`;

const CommentsStyled = styled.section`
  display: grid;
  grid-template-columns: 1fr 6fr;
  margin: 0px;
  padding: 3px;
  p {
    width: 100%;
    padding: 10px 5px 5px 10px;
    margin: auto 0;
    /* padding-left: 10px; */
    background: wheat;
    border-radius: 0.5rem;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  /* display: inline; */
`;
