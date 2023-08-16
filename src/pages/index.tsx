import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../components/Layout";
import { StaticImage } from "gatsby-plugin-image";
import Seo from "../components/seo";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout pageTitle={"Home Page"}>
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <StaticImage
        src="../images/dog.webp"
        alt="Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera"
      />
    </Layout>
  );
};

export const Head: HeadFC = () => <Seo title="Home Page" />;

export default IndexPage;
