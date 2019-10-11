import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components/macro";
import PropTypes from "prop-types";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Comments from "./Comments";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { getComments, deleteComment } from "./servicesComment";

Card.propTypes = {
  title: PropTypes.string,
  urlToImage: PropTypes.string,
  description: PropTypes.string,
  publishedAt: PropTypes.string,
  onBookmarkClick: PropTypes.func,
  isBookmarked: PropTypes.bool
};

export default function Card({
  _id,
  title,
  // comments,
  urlToImage,
  description,
  publishedAt,
  onBookmarkClick,
  isBookmarked,
  onCommentSubmit,
  onDeleteComment
}) {
  const moment = require("moment");
  const diffTime = moment(publishedAt).fromNow();

  const [msg, setMsg] = useState("");
  const [isCommentsVisible, setisCommentsVisible] = useState(false);
  const [commentLength, setCommentLength] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setMsg("");
    }, 3000);
  }, [isBookmarked]);

  useEffect(() => {
    getComments(_id).then(setCommentsList);
  }, []);

  function toggleComments() {
    setisCommentsVisible(!isCommentsVisible);
  }

  function handleDeleteComment(cardId, comment) {
    // console.log("inside handledeletecomment");
    // console.log(cardId);
    // console.log(comment._id);
    deleteComment(cardId, comment);
  }

  function handleCommentSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    onCommentSubmit(_id, data).then(card => setCommentsList(card.comments));
    form.reset();
    setCommentLength("");
    form.comment.focus();
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
      <BookmarkIcon
        fontSize="large"
        onClick={handleBookmarkClick}
        style={{ fill: "brown" }}
      />
    ) : (
      <BookmarkIcon fontSize="large" onClick={handleBookmarkClick} />
    );
  }

  function showButton() {
    return (
      <ButtonStyled type="submit">
        <ArrowForwardIcon
          fontSize="default"
          style={{
            marginBottom: "-7px",
            backgroundColor: "brown",
            borderRadius: "50%",
            color: "white"
            // animationDelay: "2s"
            // transitionDelay: "all 30s"
          }}
        />
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
            onChange={event => setCommentLength(event.target.value)}
            active={commentLength}
          />
          {commentLength.length >= 1 && showButton()}
        </form>
      </FormSection>
    );
  }

  return (
    <CardStyled>
      <ImgStyled src={urlToImage} alt="card_image" />
      <ContentStyled>
        <TimeStyled>{diffTime}</TimeStyled>
        <h3>{title}</h3>
        <p>{description}</p>
        <BelowContent>
          {/* <TimeStyled>{diffTime}</TimeStyled> */}
          <p onClick={toggleComments}>
            {commentsList.length > 1 && commentsList.length + " "}

            {commentsList.length === 0
              ? "Add comment"
              : commentsList.length === 1
              ? "1 comment"
              : "comments"}
          </p>
          {chooseBookmark()}
        </BelowContent>
        <Comments
          comments={commentsList}
          showComments={isCommentsVisible}
          id={_id}
          handleDelete={handleDeleteComment}
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
`;

const TimeStyled = styled.p`
  font-style: italic;
  padding: 0;
  margin: 0;
  color: #721313;
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
    color: brown;
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
  grid-template-columns: 0.25fr 75%;
`;

const FormInputStyled = styled.input`
  margin: 10px 0px 10px 15px;
  width: ${props => (props.active.length >= 1 ? "78%" : "95%")};
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
