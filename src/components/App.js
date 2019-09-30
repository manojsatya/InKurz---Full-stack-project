import React, { useState } from "react";
import HomePage from "./HomePage";
import styled from "styled-components/macro";

export default function App() {
  const [cards, setCards] = useState([
    {
      urlToImage:
        "https://content3.promiflash.de/article-images/video_1080/die-love-island-maedels-kommen-zur-cocktailparty.jpg",
      title: "Lorem Ipsum is simply dummy text of the universe",
      description:
        "Lorem Ipsum is simply dummy text of the simply dummy text of thuniverse. Lorem Ipsum is simply dummy text of the universe. Lorem Ipsum is simply dummy text of the universe"
    },
    {
      urlToImage:
        "https://content3.promiflash.de/article-images/video_1080/die-love-island-maedels-kommen-zur-cocktailparty.jpg",
      title: "Lorem Ipsum is simply dummy text of the universe",
      description:
        "Lorem Ipsum is simply dummy text of the simply dummy text of thuniverse. Lorem Ipsum is simply dummy text of the universe. Lorem Ipsum is simply dummy text of the universe"
    }
  ]);
  return (
    <AppStyled>
      <HomePage cards={cards} />
    </AppStyled>
  );
}

const AppStyled = styled.section`
  display: grid;
  grid-template-rows: auto 48px;
  height: 100vh;
  font-family: sans-serif;
`;
