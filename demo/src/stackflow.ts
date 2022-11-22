import { vars } from "@seed-design/design-token";
import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { stackflow } from "@stackflow/react";
import React from "react";

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
    Main: React.lazy(() => import("./activities/Main")),
    Article: {
      component: React.lazy(() => import("./activities/Article")),
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
    basicUIPlugin({
      theme,
      backgroundColor: vars.$semantic.color.paperDefault,
      appBar: {
        textColor: vars.$scale.color.gray900,
        iconColor: vars.$scale.color.gray900,
        borderColor,
      },
    }),
    historySyncPlugin({
      routes: {
        Main: "/",
        Article: "/articles/:articleId",
      },
      fallbackActivity: () => "Main",
    }),
  ],
});

export type TypeActivities = typeof activities;
