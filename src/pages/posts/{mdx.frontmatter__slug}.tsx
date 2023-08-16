import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import Seo from "../../components/seo";

type PostProps = {
  data: any;
  children: any;
};

const BlogPost = ({ data, children }: PostProps) => {
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>{data.mdx.frontmatter.date}</p>
      {children}
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`;

export const Head = ({ data }: any) => (
  <Seo title={data.mdx.frontmatter.title} />
);

export default BlogPost;
