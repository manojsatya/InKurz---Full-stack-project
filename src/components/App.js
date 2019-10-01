import React, { useState, useEffect } from "react";
import HomePage from "./HomePage";
import styled from "styled-components/macro";
import axios from "axios";

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

  function handleBookmarkClick() {
    console.log("Hello I am here");
  }
  return (
    <AppStyled>
      <HomePage cards={cards} onBookmarkClick={handleBookmarkClick} />
    </AppStyled>
  );
}

const AppStyled = styled.section`
  display: grid;
  grid-gap: 20px;
  grid-template-rows: auto 48px;
  height: 100vh;
  font-family: sans-serif;
`;
