// gatsby-node.ts
import { GatsbyNode } from "gatsby";
import path from "path";

type TagGroupsQueryData = {
  tagsGroup: {
    group: {
      fieldValue: string;
    }[];
  };
  seriesGroup: {
    group: {
      fieldValue: string;
    }[];
  };
};

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const result = await graphql<TagGroupsQueryData>(`
    {
      tagsGroup: allMdx(limit: 2000) {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
        }
      }
      seriesGroup: allMdx(limit: 2000) {
        group(field: { frontmatter: { series: SELECT } }) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors || !result.data) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const tagsTemplatePath = path.resolve("src/templates/TagDetailPage.tsx");
  const seriesTemplatePath = path.resolve("src/templates/SeriesDetailPage.tsx");

  const { tagsGroup, seriesGroup } = result.data;

  tagsGroup.group.forEach((tag) => {
    actions.createPage({
      path: `/tags/${tag.fieldValue}/`,
      component: tagsTemplatePath,
      context: { tag: tag.fieldValue },
    });
  });

  seriesGroup.group.forEach((series) => {
    actions.createPage({
      path: `/series/${series.fieldValue}/`,
      component: seriesTemplatePath,
      context: { series: series.fieldValue },
    });
  });
};

type SameSeriesPostsData = {
  frontmatter: {
    date: string;
  };
};

export const createResolvers: GatsbyNode["createResolvers"] = ({
  createResolvers,
}) => {
  createResolvers({
    Mdx: {
      sameSeriesPosts: {
        type: ["Mdx"],
        // FIXME: ricale
        // Gatsby 에서 `createResolvers` 타입을 `Function` 으로만 제공해서
        // `resolve` 에 대한 타입 지정이 되질 않는다.
        // @ts-ignore
        resolve: async (source, args, context, info) => {
          if (!source.frontmatter.series) {
            return;
          }

          const { entries }: { entries: SameSeriesPostsData[] } =
            await context.nodeModel.findAll({
              query: {
                filter: {
                  frontmatter: {
                    series: {
                      eq: source.frontmatter.series,
                    },
                    date: { ne: "" },
                  },
                },
              },
              type: "Mdx",
            });

          return [...entries].sort((a, b) =>
            a.frontmatter.date.localeCompare(b.frontmatter.date)
          );
        },
      },
    },
  });
};
