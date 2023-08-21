import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { styled, ThemeProvider } from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import GlobalStyle from "../../theme/GlobalStyle";
import normal from "../../theme/normal";

const Layout = ({ pageTitle, children }: any) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <ThemeProvider theme={normal}>
      <GlobalStyle />
      <Container>
        <Header title="Willow" />
        <main>
          <h1>{pageTitle}</h1>
          {children}
        </main>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;

  > main {
    padding-left: ${(p) => p.theme.dimens.margin}px;
    padding-right: ${(p) => p.theme.dimens.margin}px;
    padding-bottom: ${(p) => p.theme.dimens.margin}px;

    @media (max-width: 799px) {
      padding-left: ${(p) => p.theme.dimens.margin + 4}px;
      padding-right: ${(p) => p.theme.dimens.margin + 4}px;
    }
  }
`;

export default Layout;
