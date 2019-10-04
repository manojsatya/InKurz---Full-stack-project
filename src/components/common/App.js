import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "../HomePage";
import styled from "styled-components/macro";
// import axios from "axios";
import Navigation from "./Navigation";
// import Bookmark from "../Bookmark";
import { getCards, patchCard } from "../Card/servicesCard";
import {
  getBookmarkedCards,
  postBookmarkedCard,
  deleteBookmarkedCard
} from "../Card/servicesBookmark";

export default function App() {
  // const [cards, setCards] = useState([
  //   {
  //     articles: []
  //   }
  // ]);
  const [cards, setCards] = useState([]);
  const [cardsBookmark, setCardsBookmark] = useState([]);
  useEffect(() => {
    getCards().then(setCards);
  }, []);

  useEffect(() => {
    getBookmarkedCards().then(setCardsBookmark);
  }, []);

  // useEffect(() => {
  //   const fetchCard = async () => {
  //     const result = await axios(
  //       "https://newsapi.org/v2/top-headlines?" +
  //         "country=de&" +
  //         "apiKey=020b3817a9ee4c8387dd3bcfac3eb12e"
  //     );
  //     setCards(result.data.articles);
  //   };
  //   fetchCard();
  // }, []);

  function handleBookmarkClick(cardData) {
    console.log("Hello I am here");
    // console.log();
    // cardData.isBookmarked = true;
    // const cardDataTitle = cardData.title
    //   .replace(/ /g, "")
    //   .replace(/[^a-zA-Z ]/g, "")
    //   .toLowerCase();

    const found = cardsBookmark.some(item => item.title === cardData.title);
    console.log(found);
    if (!found) {
      cardData.isBookmarked = true;
      postBookmarkedCard(cardData).then(cardBookmark => {
        setCardsBookmark([cardBookmark, ...cardsBookmark]);
      });
    } else {
      console.log("Card exists");
      const cardDataID = cardsBookmark.find(
        item => item.title === cardData.title
      );
      console.log(cardDataID._id);
      deleteBookmarkedCard(cardDataID).then(
        setCardsBookmark([...cardsBookmark])
      );
    }

    // const titleExists = cardsBookmark.reduce(
    //   (acc, title) => acc || title.title === cardsBookmark.title,
    //   false
    // );
    // console.log(titleExists);

    // for (let i = 0; i < cardsBookmark.length; i++) {
    //   const cardBookmarkTitle = cardsBookmark[i].title
    //     .replace(/ /g, "")
    //     .replace(/[^a-zA-Z ]/g, "")
    //     .toLowerCase();
    //   if (cardBookmarkTitle !== cardDataTitle) {

    //   } else {
    //     console.log("Card already bookmarked");
    //   }
    //   // console.log(cardsBookmark[i].title);
    // }

    // if (!cardData.isBookmarked) {
  }
  return (
    <Router>
      <AppStyled>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomePage cards={cards} onBookmarkClick={handleBookmarkClick} />
            )}
          />
          <Route
            path="/bookmarks"
            render={() => (
              <HomePage
                cards={cardsBookmark}
                onBookmarkClick={handleBookmarkClick}
              />
            )}
          />
        </Switch>
        {/* <HomePage cards={cards} onBookmarkClick={handleBookmarkClick} /> */}
        <Navigation />
      </AppStyled>
    </Router>
  );
}

const AppStyled = styled.section`
  display: grid;
  grid-template-rows: auto 48px;
  /* position: fixed; */
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  font-family: sans-serif;
`;
