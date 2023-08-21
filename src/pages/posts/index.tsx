import * as React from "react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import { Link, graphql } from "gatsby";
import { styled } from "styled-components";

const BlogPage = ({ data }: any) => {
  return (
    <Layout pageTitle="">
      {data.allMdx.nodes.map((node: any) => (
        <PostContainer key={node.id}>
          <PostTitle>
            <Link to={`/posts/${node.frontmatter.slug}`}>
              {node.frontmatter.title}
              <PostedAt>{node.frontmatter.date}</PostedAt>
            </Link>
          </PostTitle>
          <PostSummary>{node.excerpt}</PostSummary>
        </PostContainer>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          slug
        }
        id
        excerpt
      }
    }
  }
`;

const PostContainer = styled.article`
  margin-bottom: 60px;
`;

const PostTitle = styled.p`
  font-size: 22px;
  font-weight: 500;
`;

const PostedAt = styled.p`
  font-size: 14px;
  margin-top: 6px;
  font-weight: 400;
  color: #6b6b6b;
`;

const PostSummary = styled.p`
  font-family: source-serif-pro, Georgia, Cambria, "Times New Roman", Times,
    serif;
  font-size: 18px;
  line-height: 2rem;
`;

export const Head = () => <Seo title="My Blog Posts" />;

export default BlogPage;
