import * as React from "react";
import Layout from "../components/Layout";
import Seo from "../components/seo";

const AboutPage = () => {
  return (
    <Layout>
      <p>
        Hi there! I'm the proud creator of this site, which I built with Gatsby.
      </p>
    </Layout>
  );
};

export const Head = () => <Seo title="About Me" />;

export default AboutPage;
