import { createGlobalStyle } from "styled-components";

import { Theme } from "../utils";

const GlobalStyles = createGlobalStyle`
  html,
  body {
    height: 100%;
    padding: 0;
    margin: 0;
  }

  body {
    background-color: ${Theme.colors.ui.default};
    color: ${Theme.colors.text.default};
    font-family: ${Theme.font.family};
    font-size: ${Theme.font.size.md};
    font-weight: ${Theme.font.weight.medium};
    line-height: ${Theme.lineHeight.md};
  }

  body > div#__next {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100%;
  }

  header, footer {
    height: auto;
  }

  main {
    flex: 1;
  }

  a {
    color: ${Theme.colors.text.link};
    text-decoration: none;
  }

  img {
    height: auto;
  }

  button {
    border: 0;
    background-color: transparent;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
