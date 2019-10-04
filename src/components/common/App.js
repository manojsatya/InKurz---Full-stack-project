import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "../HomePage";
import styled from "styled-components/macro";
// import axios from "axios";
import Navigation from "./Navigation";
import { getCards, patchCard } from "../Card/servicesCard";

export default function App() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    getCards().then(setCards);
  }, []);

  function handleBookmarkClick(card) {
    console.log("Hello I am here");
    patchCard(card._id, { isBookmarked: !card.isBookmarked }).then(
      updatedCard => {
        const index = cards.findIndex(card => card._id === updatedCard._id);
        setCards([
          ...cards.slice(0, index),
          { ...card, isBookmarked: updatedCard.isBookmarked },
          ...cards.slice(index + 1)
        ]);
      }
    );
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
            // render={() => (
            //   <HomePage
            //     cards={cardsBookmark}
            //     onBookmarkClick={handleBookmarkClick}
            //   />
            // )}
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
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  font-family: sans-serif;
`;
