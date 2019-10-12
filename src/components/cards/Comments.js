import React from "react";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import styled from "styled-components/macro";

export default function Comments({ id, showComments, comments, handleDelete }) {
  function handleDeleteClick(id, deleteComment) {
    handleDelete(id, deleteComment);
  }

  return (
    <div>
      <CommentsSectionStyled className={showComments ? "visible" : null}>
        {comments.map((item, index) => (
          <div>
            <CommentsStyled key={index}>
              <img src="https://source.unsplash.com/random" alt="img-1" />
              <p>{item.comment}</p>
            </CommentsStyled>
            <EditDeleteStyled>
              <EditButtonStyled>edit</EditButtonStyled>
              <DeleteButtonStyled onClick={() => handleDeleteClick(id, item)}>
                delete
              </DeleteButtonStyled>
            </EditDeleteStyled>
          </div>
        ))}
      </CommentsSectionStyled>
    </div>
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
  font-size: 1.1rem;
  p {
    width: 100%;
    padding: 10px 5px 5px 10px;
    margin: auto 0;
    /* padding-left: 10px; */
    background: wheat;
    border-radius: 0.5rem 0.5rem 0 0.5rem;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  /* display: inline; */
`;

const EditDeleteStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 0;
  margin-top: -6px;
  margin-right: 3px;
`;

const EditButtonStyled = styled.button`
  padding-right: 20px;
  border: 0;
  background-color: wheat;
  border-radius: 0 0 0 0.5rem;
  text-decoration: underline;
  color: brown;
`;

const DeleteButtonStyled = styled.button`
  padding-right: 20px;
  border: 0;
  background-color: wheat;
  border-radius: 0 0 0.5rem 0;
  text-decoration: underline;
  color: brown;
  outline: none;
`;
