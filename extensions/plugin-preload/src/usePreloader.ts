import {
  makeTemplate,
  normalizeRoute,
  useRoutes,
} from "@stackflow/plugin-history-sync";
import type { ActivityComponentType } from "@stackflow/react";
import { useInitContext } from "@stackflow/react";
import { useMemo } from "react";

import { useLoaders } from "./LoadersContext";

export type PreloadFunc<T extends { [activityName: string]: unknown }> = <
  K extends Extract<keyof T, string>,
>(
  activityName: K,
  activityParams: T[K] extends ActivityComponentType<infer U> ? U : {},
  options?: {
    eventContext?: any;
  },
) => any;

export function usePreloader<T extends { [activityName: string]: unknown }>(): {
  preload: PreloadFunc<T>;
} {
  const loaders = useLoaders();
  const routes = useRoutes();

  const initContext = useInitContext();

  return useMemo(
    () => ({
      preload(activityName, activityParams, options) {
        const loader = loaders[activityName];

        if (!loader) {
          return null;
        }

        const route = routes[activityName];
        const template = route
          ? makeTemplate(normalizeRoute(route)[0])
          : undefined;
        const path = template?.fill(activityParams);

        return loader({
          activityParams,
          eventContext: {
            ...(path ? { path } : null),
            ...options?.eventContext,
          },
          initContext,
        });
      },
    }),
    [loaders, initContext],
  );
}
