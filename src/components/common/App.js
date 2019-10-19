import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "../HomePage";
import { ThemeProvider } from "styled-components";
import { getCards, patchCard } from "../cards/servicesCard";
import NavigationNew from "./NavigationNew";
import Settings from "../Settings";
import Feedback from "../Feedback";
import Reviews from "../reviews/ReviewsPage";
import Category from "../Category";
import GlobalStyles from "./GlobalStyles";

export default function App() {
  const [cards, setCards] = useState([]);
  const [theme, setTheme] = useState({
    mode: localStorage.getItem("mode")
  });
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

  function handleDarkModeClick() {
    setTheme({ mode: localStorage.getItem("mode") });
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomePage
                cards={cards.filter(card => card.country === "de")}
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
            path="/us"
            render={() => (
              <HomePage
                cards={cards.filter(card => card.country === "us")}
                onBookmarkClick={handleBookmarkClick}
                firstPart="United"
                secondPart="States"
              />
            )}
          />
          <Route
            path="/uk"
            render={() => (
              <HomePage
                cards={cards.filter(card => card.country === "gb")}
                onBookmarkClick={handleBookmarkClick}
                firstPart="United"
                secondPart="Kingdom"
              />
            )}
          />
          <Route
            path="/france"
            render={() => (
              <HomePage
                cards={cards.filter(card => card.country === "fr")}
                onBookmarkClick={handleBookmarkClick}
                firstPart="Fran"
                secondPart="ce"
              />
            )}
          />
          <Route
            path="/india"
            render={() => (
              <HomePage
                cards={cards.filter(card => card.country === "in")}
                onBookmarkClick={handleBookmarkClick}
                firstPart="Ind"
                secondPart="ia"
              />
            )}
          />
          <Route
            path="/australia"
            render={() => (
              <HomePage
                cards={cards.filter(card => card.country === "au")}
                onBookmarkClick={handleBookmarkClick}
                firstPart="Austr"
                secondPart="alia"
              />
            )}
          />
          <Route
            path="/italy"
            render={() => (
              <HomePage
                cards={cards.filter(card => card.country === "it")}
                onBookmarkClick={handleBookmarkClick}
                firstPart="Ita"
                secondPart="ly"
              />
            )}
          />
          <Route
            path="/categories"
            render={() => <Category firstPart="Cate" secondPart="gory" />}
          />
          <Route
            path="/settings"
            render={() => (
              <Settings
                firstPart="Set"
                secondPart="tings"
                onDarkModeClick={handleDarkModeClick}
              />
            )}
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
      </Router>
    </ThemeProvider>
  );
}
