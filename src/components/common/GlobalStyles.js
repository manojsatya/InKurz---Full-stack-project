import { createGlobalStyle } from "styled-components/macro";

export default createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  #root {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: grid;
        grid-auto-rows: auto 45px;
    }

  body {
    margin: 0;
    background: ${props =>
      props.theme.mode === "dark" ? "#363434" : "#F9F6F2"};
    color: ${props => (props.theme.mode === "dark" ? "white" : "black")};
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    
  }

  input, button, textarea {
    font-size: 1em;
  }
`;
