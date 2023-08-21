// src/templates/SeriesDetailPageTemplates.ts
import * as React from "react";
import { graphql, Link, PageProps } from "gatsby";
import Layout from "../components/Layout";

type SeriesDetailPageTemplateData = {
  // ...
};
type SeriesDetailPageTemplateContext = {
  series: string;
};
const SeriesDetailPageTemplate = ({
  // `pageContext` 에는 gatsby-node.ts 의 createPages 에서 넘겨주는 값들이 들어있다.
  pageContext,
  // `data` 에는 아래 쪽에 있는 pageQuery 쿼리의 결과값이 들어있다.
  data,
}: PageProps<
  SeriesDetailPageTemplateData,
  SeriesDetailPageTemplateContext
>) => {
  const { series } = pageContext;
  const { totalCount, edges } = data.allMdx;

  return (
    <Layout>
      <h1>{`시리즈 "${series}"`}</h1>
      <ol>
        {edges.map(({ node: { frontmatter } }) => (
          <li key={frontmatter.slug}>
            <Link to={`/posts/${frontmatter.slug}`}>{frontmatter.title}</Link>
          </li>
        ))}
      </ol>
    </Layout>
  );
};

// $series 는 gatsby-node.ts 의 createPages 로부터 넘겨받는다.
export const pageQuery = graphql`
  query ($series: String) {
    allMdx(
      limit: 2000
      sort: { frontmatter: { date: ASC } }
      filter: { frontmatter: { series: { in: [$series] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`;

export default SeriesDetailPageTemplate;
