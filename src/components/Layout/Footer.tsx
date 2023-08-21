import * as React from "react";
import { styled } from "styled-components";

function Footer() {
  return (
    <>
      <Container>
        <p>
          Copyright 2023{" "}
          <strong>
            <a href="/">willow</a>.
          </strong>
        </p>
        <p>
          <a href="https://creativecommons.org/licenses/by-nc-sa/2.0/kr/">
            CC BY-NC-SA 2.0 KR
          </a>
          .
        </p>
        {" | "}
        <p>
          Powered by{" "}
          <strong>
            <a href="https://www.gatsbyjs.com/">Gatsby</a>
          </strong>{" "}
          and{" "}
          <strong>
            <a href="https://pages.github.com/">GitHub Pages</a>
          </strong>
        </p>
        {" | "}
        <p>
          Referenced by{" "}
          <strong>
            <a href="https://https://ricale.kr/blog/">ricale</a>
          </strong>{" "}
          blog for making
        </p>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;

  margin-top: 60px;
  margin-bottom: 16px;

  font-size: 0.8125rem;

  color: #888888;
  p {
    white-space: nowrap;
  }
  a {
    color: #aaaaaa;
  }
  strong,
  strong > a {
    font-weight: normal;
    color: #242424;
  }
`;

export default Footer;
