import React from "react";
import ReactDOM from "react-dom";
import App from "./components/common/App";
import GlobalStyles from "./components/common/GlobalStyles";
import { ThemeProvider } from "styled-components";

ReactDOM.render(
  <ThemeProvider theme={{ mode: "dark" }}>
    <>
      <GlobalStyles />
      <App />
    </>
  </ThemeProvider>,
  document.getElementById("root")
);
