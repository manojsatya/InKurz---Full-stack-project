import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
// import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Comments from "./Comments";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { postComment } from "../cards/servicesComment";

Card.propTypes = {
  title: PropTypes.string,
  urlToImage: PropTypes.string,
  description: PropTypes.string,
  publishedAt: PropTypes.string,
  onBookmarkClick: PropTypes.func,
  isBookmarked: PropTypes.bool
};

export default function Card({
  title,
  comments,
  urlToImage,
  description,
  publishedAt,
  onBookmarkClick,
  isBookmarked
}) {
  const moment = require("moment");
  const diffTime = moment(publishedAt).fromNow();

  const [msg, setMsg] = useState("");
  const [isCommentsVisible, setisCommentsVisible] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setMsg("");
    }, 3000);
  }, [isBookmarked]);

  function toggleComments() {
    setisCommentsVisible(!isCommentsVisible);
  }

  function createComment(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const comment = Object.fromEntries(formData);
    // console.log(comment);
    postComment(comment.text).then(comment => {
      setComment([...comments, comment]);
    });
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
      <button type="submit">
        <ArrowForwardIcon
          fontSize="default"
          style={{
            marginBottom: "-7px",
            backgroundColor: "brown",
            borderRadius: "50%",
            color: "white",
            transitionDelay: "all 3s"
          }}
        />
      </button>
    );
  }

  function inputComment() {
    return (
      <FormSection>
        <AccountCircleIcon fontSize="large" style={{ marginTop: "10px" }} />
        <form onSubmit={createComment}>
          <FormInputStyled
            placeholder="Add a comment..."
            autoComplete="off"
            name="comment"
            onChange={event => setComment(event.target.value)}
            active={comment}
          />
          {comment.length >= 1 && showButton()}
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
            {comments.length > 1 && comments.length + " "}

            {comments.length === 0
              ? "Add comment"
              : comments.length === 1
              ? "1 comment"
              : "comments"}
          </p>
          {chooseBookmark()}
        </BelowContent>
        <Comments
          comments={comments}
          showComments={isCommentsVisible}
          // onClick={toggleComments}
        />
        {inputComment()}
        {/* <FormStyled>
          <input placeholder="Add a comment..." />
        </FormStyled> */}
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
  transition: width 0.5s 0.25s;
`;
