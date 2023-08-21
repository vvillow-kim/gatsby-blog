// src/pages/series/index.tsx

import * as React from "react";
import { graphql, Link, PageProps } from "gatsby";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import SeriesItem from "../../components/SeriesItem";
import { Series, SeriesSource } from "../../types";
import { styled } from "styled-components";

type SeriesPageData = {
  allMdx: {
    group: SeriesSource[];
  };
};

function getSeries(source: SeriesSource[]): Series[] {
  return source
    .map(({ edges, ...sr }) => ({
      ...sr,
      ...edges.sort((a, b) =>
        b.node.frontmatter.originalDate.localeCompare(
          a.node.frontmatter.originalDate
        )
      )[0].node,
    }))
    .sort((a, b) =>
      b.frontmatter.originalDate.localeCompare(a.frontmatter.originalDate)
    );
}

const SeriesPage = ({ data: source }: PageProps<SeriesPageData>) => {
  const series = getSeries(source.allMdx.group);
  return (
    <Layout>
      <h1>시리즈</h1>
      <Container>
        {series.map((sr) => (
          <SeriesItem key={sr.fieldValue} {...sr} />
        ))}
      </Container>
    </Layout>
  );
};

// src/pages/series/index.tsx

export const query = graphql`
  query {
    allMdx(limit: 2000) {
      group(field: { frontmatter: { series: SELECT } }) {
        fieldValue
        totalCount
        edges {
          node {
            frontmatter {
              title
              originalDate: date
              date(formatString: "YYYY. M. D.")
              heroImageAlt
              heroImage {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;

  & > * {
    width: calc(25% - 12px);

    @media (max-width: 768px) {
      width: calc(33% - 10px);
    }

    @media (max-width: 500px) {
      width: calc(50% - 8px);
    }
  }
`;

export const Head = () => <Seo title="시리즈 목록" />;

export default SeriesPage;
