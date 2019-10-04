import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";

Card.propTypes = {
  title: PropTypes.string,
  urlToImage: PropTypes.string,
  description: PropTypes.string,
  publishedAt: PropTypes.string
};

export default function Card({
  title,
  urlToImage,
  description,
  publishedAt,
  onBookmarkClick,
  isBookmarked
}) {
  const moment = require("moment");
  const diffTime = moment(publishedAt).fromNow();

  const [bookmark, setBookmark] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setMsg("");
    }, 3000);
  });

  function handleBookmarkClick(event) {
    event.stopPropagation();
    bookmark && isBookmarked ? setBookmark(false) : setBookmark(true);
    bookmark && isBookmarked
      ? setMsg("Removed Bookmark")
      : setMsg("Bookmarked Successfully");
    onBookmarkClick();
  }

  function chooseBookmark() {
    return bookmark || isBookmarked ? (
      <BookmarkIcon fontSize="large" onClick={handleBookmarkClick} />
    ) : (
      <BookmarkBorderIcon fontSize="large" onClick={handleBookmarkClick} />
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
          <TimeStyled>{diffTime}</TimeStyled>
          {chooseBookmark()}
          {/* <BookmarkIcon /> */}
        </BelowContent>
      </ContentStyled>
      <FlashStyled>{msg}</FlashStyled>
    </CardStyled>
  );
}

const ImgStyled = styled.img`
  width: 100vw;
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
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FlashStyled = styled.section`
  position: fixed;
  color: white;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  bottom: 40vh;
  background: #721313;
  border-radius: 20px;

  p {
    padding: 8px;
    margin: 0;
  }
`;
