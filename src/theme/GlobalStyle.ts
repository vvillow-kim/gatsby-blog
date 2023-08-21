import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, #___gatsby {
    width: 100%;
    margin: 0;
    padding: 0;

    font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;

    background-color: ${(p) => p.theme.colors.background};
    color: ${(p) => p.theme.colors.onBackground};
  }
  
  a {
    color: #242424;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  
  h3 {
    font-size: 20px;
  }
`;

export default GlobalStyle;
