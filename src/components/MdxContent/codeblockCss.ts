import { css } from "styled-components";

const codeblockCss = css`
  pre[class*="language-"] {
    margin: 0 0 16px;
  }

  .gatsby-highlight-code-line {
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 0.25em solid #999999;
    background-color: #444444;
  }

  pre > code {
    padding: unset;
    border-radius: unset;
    background-color: unset;
    color: unset;
  }
  .codeblock-container {
    position: relative;
    padding-top: 0.1px;
    .codeblock-title {
      position: absolute;
      top: 0px;
      left: 8px;
      padding: 2px 8px;

      font-size: 0.875rem;
      font-family: consolas, monospace;
      background-color: #000000;
      color: white;
    }
    .codeblock-copy-button {
      position: absolute;
      top: 0;
      right: 0;

      padding: 4px 6px;
      border: 0;

      font-size: 0.75rem;
      color: #dddddd;
      text-decoration: underline;

      background-color: transparent;
      cursor: pointer;
    }
    .codeblock-title + div pre[class*="language-"] {
      margin-top: 8px;
    }
    .codeblock-title + div + .codeblock-copy-button {
      top: 8px;
    }

    pre[class*="language-"] {
      padding-top: 30px;
    }
  }

  @media (max-width: 500px) {
    .codeblock-container {
      padding-top: 0;
      .codeblock-title {
        position: static;
        background-color: #666666;
      }
    }
  }
`;

export default codeblockCss;
