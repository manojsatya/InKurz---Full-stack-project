import { createGlobalStyle } from "styled-components/macro";

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: #F9F6F2;
    /* background-color: white; */
  }

  input, button, textarea {
    font-size: 1em;
  }
`;
