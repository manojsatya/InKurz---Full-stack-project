import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "../HomePage";
import styled from "styled-components/macro";
// import Navigation from "./Navigation";
import { getCards, patchCard } from "../cards/servicesCard";
import NavigationNew from "./NavigationNew";
import Settings from "../Settings";
import Feedback from "../Feedback";
import Reviews from "../reviews/ReviewsPage";
import Category from "../Category";

export default function App() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    getCards().then(cards => {
      cards.sort((a, b) => {
        const dateA = new Date(a.publishedAt);
        const dateB = new Date(b.publishedAt);
        return dateB - dateA;
      });
      setCards(cards);
    });
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
            path="/business"
            render={() => (
              <HomePage
                cards={cards.filter(card => card.category === "business")}
                onBookmarkClick={handleBookmarkClick}
                firstPart="Busi"
                secondPart="ness"
              />
            )}
          />
          <Route
            path="/entertainment"
            render={() => (
              <HomePage
                cards={cards.filter(card => card.category === "entertainment")}
                onBookmarkClick={handleBookmarkClick}
                firstPart="Enter"
                secondPart="tainment"
              />
            )}
          />
          <Route
            path="/health"
            render={() => (
              <HomePage
                cards={cards.filter(card => card.category === "health")}
                onBookmarkClick={handleBookmarkClick}
                firstPart="Hea"
                secondPart="lth"
              />
            )}
          />
          <Route
            path="/science"
            render={() => (
              <HomePage
                cards={cards.filter(card => card.category === "science")}
                onBookmarkClick={handleBookmarkClick}
                firstPart="Sci"
                secondPart="ence"
              />
            )}
          />
          <Route
            path="/technology"
            render={() => (
              <HomePage
                cards={cards.filter(card => card.category === "technology")}
                onBookmarkClick={handleBookmarkClick}
                firstPart="Tech"
                secondPart="nology"
              />
            )}
          />
          <Route
            path="/sports"
            render={() => (
              <HomePage
                cards={cards.filter(card => card.category === "sports")}
                onBookmarkClick={handleBookmarkClick}
                firstPart="Spo"
                secondPart="rts"
              />
            )}
          />
          <Route
            path="/categories"
            render={() => <Category firstPart="Cate" secondPart="gory" />}
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
