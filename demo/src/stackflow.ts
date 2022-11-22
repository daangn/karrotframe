import { vars } from "@seed-design/design-token";
import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { stackDepthChangePlugin } from "@stackflow/plugin-stack-depth-change";
import { stackflow } from "@stackflow/react";

import Article from "./activities/Article";
import Main from "./activities/Main";

const theme = "cupertino";

const borderColor =
  theme === "cupertino"
    ? vars.$semantic.color.divider3
    : vars.$semantic.color.divider2;

export const { Stack, activities, useFlow } = stackflow({
  transitionDuration: 350,
  activities: {
    Main,
    Article: {
      component: Article,
      paramsSchema: {
        type: "object" as const,
        properties: {
          articleId: {
            type: "string" as const,
          },
          title: {
            type: "string" as const,
          },
        },
        required: ["articleId", "title"],
      },
    },
  },
  initialActivity: () => "Main",
  plugins: [
    basicRendererPlugin(),
    stackDepthChangePlugin({
      onInit: ({ depth, activities, activeActivities }) => {},
      onDepthChanged: ({ depth, activities, activeActivities }) => {},
    }),
    basicUIPlugin({
      theme,
      backgroundColor: vars.$semantic.color.paperDefault,
      appBar: {
        textColor: vars.$scale.color.gray900,
        iconColor: vars.$scale.color.gray900,
        borderColor,
      },
    }),
  ],
});

export type TypeActivities = typeof activities;
