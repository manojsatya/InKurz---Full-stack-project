import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import styled from "styled-components/macro";
import axios from "axios";
import Navigation from "./common/Navigation";
import Bookmark from "./Bookmark";

export default function App() {
  const [cards, setCards] = useState([
    {
      articles: []
    }
  ]);

  useEffect(() => {
    const fetchCard = async () => {
      const result = await axios(
        "https://newsapi.org/v2/top-headlines?" +
          "country=de&" +
          "apiKey=020b3817a9ee4c8387dd3bcfac3eb12e"
      );
      setCards(result.data.articles);
    };
    fetchCard();
  }, []);

  function handleBookmarkClick(card) {
    console.log("Hello I am here");
    console.log(card);
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
          <Route path="/bookmarks" render={() => <Bookmark />} />
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
