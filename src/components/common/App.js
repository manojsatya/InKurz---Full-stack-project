import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "../HomePage";
import { ThemeProvider } from "styled-components";
import { getCards, patchCard } from "../cards/servicesCard";
import Settings from "../Settings";
import Feedback from "../Feedback";
import Reviews from "../reviews/ReviewsPage";
import Category from "../Category";
import GlobalStyles from "./GlobalStyles";
import Search from "../Search";
import Landing from "../auth/Landing";
import Register from "../auth/Register";

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

  function handleDarkModeClick() {
    setTheme({ mode: localStorage.getItem("mode") });
  }

  function withHomePage(firstPart, secondPart, filterProp) {
    return () => {
      const filteredCards = filterProp
        ? cards.filter(card => card.country === filterProp)
        : cards;
      return (
        <HomePage
          cards={filteredCards}
          onBookmarkClick={handleBookmarkClick}
          firstPart={firstPart}
          secondPart={secondPart}
        />
      );
    };
  }

  function withCategoryPage(firstPart, secondPart, filterProp) {
    return () => {
      const filteredCards = filterProp
        ? cards.filter(card => card.category === filterProp)
        : cards;
      return (
        <HomePage
          cards={filteredCards}
          onBookmarkClick={handleBookmarkClick}
          firstPart={firstPart}
          secondPart={secondPart}
        />
      );
    };
  }
  const MainPage = withHomePage("In", "Kurz", "de");
  const USPage = withHomePage("United", "States", "us");
  const UKPage = withHomePage("United", "Kingdom", "gb");
  const FrancePage = withHomePage("Fra", "nce", "fr");
  const IndiaPage = withHomePage("Ind", "ia", "in");
  const AustraliaPage = withHomePage("Austr", "alia", "au");
  const ItalyPage = withHomePage("Ita", "ly", "it");
  const BusinessPage = withCategoryPage("Busi", "ness", "business");
  const EntertainmentPage = withCategoryPage(
    "Enterta",
    "inment",
    "entertainment"
  );
  const HealthPage = withCategoryPage("Hea", "lth", "health");
  const SciencePage = withCategoryPage("Scie", "nce", "science");
  const TechnologyPage = withCategoryPage("Techno", "logy", "technology");
  const SportsPage = withCategoryPage("Spo", "rts", "sports");

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />

          <Route path="/mainpage" component={MainPage} />
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

          <Route path="/business" component={BusinessPage} />
          <Route path="/entertainment" component={EntertainmentPage} />
          <Route path="/health" component={HealthPage} />
          <Route path="/science" component={SciencePage} />
          <Route path="/technology" component={TechnologyPage} />
          <Route path="/sports" component={SportsPage} />
          <Route path="/us" component={USPage} />
          <Route path="/uk" component={UKPage} />
          <Route path="/france" component={FrancePage} />
          <Route path="/india" component={IndiaPage} />
          <Route path="/australia" component={AustraliaPage} />
          <Route path="/italy" component={ItalyPage} />

          <Route
            path="/categories"
            render={() => (
              <Category firstPart="Cate" secondPart="gory" cards={cards} />
            )}
          />
          <Route
            path="/search"
            render={() => (
              <Search
                firstPart="Sea"
                secondPart="rch"
                cards={cards}
                onBookmarkClick={handleBookmarkClick}
              />
            )}
          />
          <Route
            path="/settings"
            render={() => (
              <Settings
                firstPart="Set"
                secondPart="tings"
                onDarkModeClick={handleDarkModeClick}
                cards={cards}
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
      </Router>
    </ThemeProvider>
  );
}
