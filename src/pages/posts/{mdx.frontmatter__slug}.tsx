import * as React from "react";
import { graphql, HeadProps, PageProps } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import SameSeriesPosts from "../../components/SameSeriesPosts";
import MdxContent from "../../components/MdxContent";
import highlightCurrentHeading from "../../helper/highlightCurrentHeading";
import { PostFrontmatter } from "../../types";

type PostDetailData = {
  mdx: {
    frontmatter: PostFrontmatter;
    sameSeriesPosts:
      | null
      | {
          frontmatter: Pick<PostFrontmatter, "title" | "slug">;
        }[];
    excerpt: string;
  };
};

const BlogPost = ({ data, children }: PageProps<PostDetailData>) => {
  const ref = React.useRef<HTMLDivElement>();
  const { frontmatter, sameSeriesPosts } = data.mdx;
  const { title, slug, date, series } = frontmatter;

  React.useEffect(() => {
    const headingElements = ref.current?.querySelectorAll<HTMLElement>(
      ".md h1, .md h2, .md h3, .md h4, .md h5, d h6"
    );

    const observer = new IntersectionObserver(
      () => highlightCurrentHeading(ref, headingElements),
      { rootMargin: "0px 0px -90% 0px", threshold: [0, 1.0] }
    );

    // `headingElements` 들에게 위에서 작성한 옵저버를 적용한다.
    headingElements?.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <Layout pageTitle={title}>
      <p>Posted: {date}</p>
      <SameSeriesPosts name={series} data={sameSeriesPosts} current={slug} />
      <MdxContent ref={ref as React.RefObject<HTMLDivElement>}>
        {children}
      </MdxContent>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        tags
        series
        heroImageAlt
        heroImage {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      sameSeriesPosts {
        frontmatter {
          title
          slug
        }
      }
      excerpt
      tableOfContents
    }
  }
`;

export const Head = ({ data }: any) => (
  <Seo title={data.mdx.frontmatter.title} />
);

export default BlogPost;
