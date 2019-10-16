import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "../HomePage";
import styled from "styled-components/macro";
// import Navigation from "./Navigation";
import { getCards, patchCard } from "../cards/servicesCard";
import NavigationNew from "./NavigationNew";
import Settings from "../Settings";
import Feedback from "../Feedback";
import Reviews from "../reviews/Reviews";

export default function App() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    getCards().then(setCards);
  }, []);

  function handleBookmarkClick(card) {
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

  function bookmarkCount() {
    const bookmarkCountNum = cards.filter(card => card.isBookmarked).length;
    return bookmarkCountNum;
  }

  return (
    <Router>
      <AppStyled>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomePage
                cards={cards}
                onBookmarkClick={handleBookmarkClick}
                firstPart="In"
                secondPart="Kurz"
              />
            )}
          />
          <Route
            path="/bookmarks"
            render={() => (
              <HomePage
                cards={cards.filter(card => card.isBookmarked)}
                onBookmarkClick={handleBookmarkClick}
                firstPart="Book"
                secondPart="marks"
              />
            )}
          />
          <Route
            path="/settings"
            render={() => <Settings firstPart="Set" secondPart="tings" />}
          />
          <Route
            path="/feedback"
            render={() => <Feedback firstPart="Feed" secondPart="back" />}
          />
          <Route
            path="/reviews"
            render={() => <Reviews firstPart="Re" secondPart="views" />}
          />
        </Switch>
        <NavigationNew bookmarkCount={bookmarkCount()} />
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
  /* height: 100%;
  width: 100%; */
  font-family: sans-serif;
`;
