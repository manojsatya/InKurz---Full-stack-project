import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components/macro";
import PropTypes from "prop-types";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Comments from "./Comments";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { getComments, deleteComment, patchComment } from "./servicesComment";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { NavLink } from "react-router-dom";

Card.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  urlToImage: PropTypes.string,
  description: PropTypes.string,
  publishedAt: PropTypes.string,
  onBookmarkClick: PropTypes.func,
  isBookmarked: PropTypes.bool,
  onCommentSubmit: PropTypes.func
};

export default function Card({
  _id,
  title,
  // comments,
  url,
  urlToImage,
  category,
  description,
  publishedAt,
  onBookmarkClick,
  isBookmarked,
  onCommentSubmit
}) {
  const moment = require("moment");
  const diffTime = moment(publishedAt).fromNow();

  const [msg, setMsg] = useState("");
  const [isCommentsVisible, setisCommentsVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [logindialog, setLoginDailog] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMsg("");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [isBookmarked]);

  useEffect(() => {
    getComments(_id).then(setCommentsList);
  }, [_id]);

  function toggleComments() {
    setisCommentsVisible(!isCommentsVisible);
  }

  function handleDeleteComment(cardId, commentData) {
    deleteComment(cardId, commentData).then(card =>
      setCommentsList(card.comments)
    );
  }

  function handleEditComment(cardId, commentData) {
    patchComment(cardId, commentData).then(card =>
      setCommentsList(card.comments)
    );
  }

  function handleCommentSubmit(event) {
    event.preventDefault();
    if (localStorage.getItem("jwtToken")) {
      const form = event.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      onCommentSubmit(_id, data).then(card => setCommentsList(card.comments));
      form.reset();
      setComment("");
      form.comment.focus();
    } else {
      setLoginDailog(true);
      //  loginRequest();
    }
  }

  function handleClose() {
    setLoginDailog(false);
  }

  function loginRequest() {
    return (
      <Dialog
        open={logindialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Please sign in to comment
        </DialogTitle>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <NavLink to="/" onClick={handleClose} style={{ margin: "0 auto" }}>
            Login
          </NavLink>
        </div>
      </Dialog>
    );
  }
  function handleBookmarkClick(event) {
    event.stopPropagation();
    isBookmarked
      ? setMsg("Removed Bookmark")
      : setMsg("Bookmarked Successfully");
    onBookmarkClick();
  }

  function chooseBookmark() {
    return isBookmarked ? (
      <BookmarkIconStyled fontSize="large" onClick={handleBookmarkClick} />
    ) : (
      <BookmarkIcon fontSize="large" onClick={handleBookmarkClick} />
    );
  }

  function ShowButton() {
    return (
      <ButtonStyled type="submit">
        <ArrowForwardIconStyled fontSize="default" />
      </ButtonStyled>
    );
  }

  function inputComment() {
    return (
      <FormSection>
        <AccountCircleIcon fontSize="large" style={{ marginTop: "10px" }} />
        <form onSubmit={handleCommentSubmit}>
          <FormInputStyled
            placeholder="Add a comment..."
            autoComplete="off"
            name="comment"
            onChange={event => setComment(event.target.value)}
            active={comment}
            value={comment}
          />
          {comment.length >= 1 && <ShowButton />}
        </form>
      </FormSection>
    );
  }

  return (
    <CardStyled>
      <ImgStyled src={urlToImage} alt="card_image" />
      {/* <CategoryStyled>
        <span>{category}</span>
      </CategoryStyled> */}
      <ContentStyled>
        <TimeStyled>{diffTime}</TimeStyled>
        <h5>
          <b>{title}</b>
        </h5>
        <p>
          {description}
          <a href={url} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </p>
        <BelowContent>
          <p onClick={toggleComments}>
            {commentsList.length > 1 && commentsList.length + " "}

            {commentsList.length === 0
              ? ""
              : commentsList.length === 1
              ? "1 comment"
              : "comments"}
          </p>
          {chooseBookmark()}
        </BelowContent>
        {loginRequest()}
        <Comments
          comments={commentsList}
          showComments={isCommentsVisible}
          id={_id}
          handleDelete={handleDeleteComment}
          handleEdit={handleEditComment}
        />
        {inputComment()}
      </ContentStyled>

      <FlashStyled>{msg}</FlashStyled>
    </CardStyled>
  );
}

const ImgStyled = styled.img`
  width: 100%;
  margin-top: 0;
`;

const CardStyled = styled.section`
  background-color: "#F9F6F2";
  font-family: "Times New Roman", Times, serif;
  p {
    line-height: 1.3;
    font-size: 1.2rem;
  }
  h3 {
    margin: 0;
  }
`;

const ContentStyled = styled.section`
  padding: 15px;
  margin-bottom: 30px;
  box-shadow: 0 5px 0px #bdacac;
  a {
    margin-left: auto;
    color: ${props => (props.theme.mode === "dark" ? "#ffb930" : "#721313")};
  }
`;

const TimeStyled = styled.p`
  font-style: italic;
  padding: 0;
  margin: 0;
  color: ${props => (props.theme.mode === "dark" ? "#ffb930" : "#721313")};
`;

const BelowContent = styled.section`
  padding: 0;
  /* margin: 5px; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  p {
    font-size: 1.1rem;
    margin: auto 0;
    padding: 0;
    text-decoration: underline;
    color: ${props => (props.theme.mode === "dark" ? "#ffb930" : "#721313")};
  }
`;

const FlashStyled = styled.section`
  position: fixed;
  color: white;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  bottom: 20vh;
  background: #721313;
  border-radius: 20px;
  /* opacity: ${props => (props.bookmarkClick ? "1" : "0")};
  transition: all 0.5s; */
  p {
    padding: 8px;
    margin: 0;
  }
`;

const FormSection = styled.section`
  display: grid;
  grid-template-columns: 0.25fr auto;
`;

const FormInputStyled = styled.input`
  margin: 10px 0px 10px 15px;
  /* width: ${props => (props.active.length >= 1 ? "78%" : "95%")}; */
  width: 80%;
  padding: 10px 5px 5px 10px;
  border-radius: 0.4rem;
  /* transition: width 0.25s; */
`;

const submitButtonAnimation = keyframes`
from {
  left : 100px;
}
to {
  left: 0px;
}
`;

const ButtonStyled = styled.button`
  animation: ${submitButtonAnimation} 1s linear;
  animation-delay: 1s;
  animation-iteration-count: 1;
  /* transition-delay: 10s; */
`;
const ArrowForwardIconStyled = styled(ArrowForwardIcon)`
  margin-bottom: "-3px";
  background-color: ${props =>
    props.theme.mode === "dark" ? "#ffb930" : "#721313"};
  border-radius: 50%;
  color: ${props => (props.theme.mode === "dark" ? "black" : "white")};
`;

const BookmarkIconStyled = styled(BookmarkIcon)`
  color: ${props => (props.theme.mode === "dark" ? "#ffb930" : "#721313")};
`;

// const CategoryStyled = styled.span`
//   background-color: ${props =>
//     props.theme.mode === "dark" ? "#ffb930" : "#721313"};
//   color: ${props => (props.theme.mode === "dark" ? "black" : "white")};
//   width: 35%;
//   padding: 5px 5px 5px 15px;
//   font-size: 1.1rem;
//   text-transform: capitalize;
//   z-index: 1;
// `;
