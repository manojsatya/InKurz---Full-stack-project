import { createGlobalStyle } from "styled-components/macro";

export default createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: ${props => (props.theme.mode === "dark" ? "#111" : "#F9F6F2")};
    color: ${props => (props.theme.mode === "dark" ? "white" : "black")}
    /* background-color: #F9F6F2; */
    
  }

  input, button, textarea {
    font-size: 1em;
  }
`;
