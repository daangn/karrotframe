import { Activity, ActivityParams, id, makeEvent } from "@stackflow/core";
import { StackflowReactPlugin } from "@stackflow/react";

import { makeTemplate } from "./makeTemplate";

const STATE_TAG = `${process.env.PACKAGE_NAME}@${process.env.PACKAGE_VERSION}`;

const SECOND = 1000;
const MINUTE = 60 * SECOND;

function getCurrentState() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.history.state;
}

function normalizeRoute(route: string | string[]) {
  return typeof route === "string" ? [route] : route;
}

interface State {
  _TAG: string;
  activity: Activity;
}
function parseState(state: unknown): State | null {
  const _state: any = state;

  if (
    typeof _state === "object" &&
    _state !== null &&
    "_TAG" in _state &&
    typeof _state._TAG === "string" &&
    _state._TAG === STATE_TAG
  ) {
    return state as State;
  }

  return null;
}

function pushState({
  state,
  url,
  useHash,
}: {
  state: State;
  url: string;
  useHash?: boolean;
}) {
  if (typeof window === "undefined") {
    return;
  }
  const nextUrl = useHash ? `${window.location.pathname}#${url}` : url;
  window.history.pushState(state, "", nextUrl);
}

function replaceState({
  state,
  url,
  useHash,
}: {
  state: State;
  url: string;
  useHash?: boolean;
}) {
  if (typeof window === "undefined") {
    return;
  }
  const nextUrl = useHash ? `${window.location.pathname}#${url}` : url;
  window.history.replaceState(state, "", nextUrl);
}

type HistorySyncPluginOptions<T extends { [activityName: string]: any }> = {
  routes: {
    [key in keyof T]: string | string[];
  };
  fallbackActivity: (args: { context: any }) => Extract<keyof T, string>;
  useHash?: boolean;
  experimental_initialPreloadRef?: (args: {
    context: any;
    path: string;
    activityId: string;
  }) => any;
  experimental_preloadRef?: (args: {
    context: any;
    path: string;
    activityId: string;
  }) => any;
  experimental_startTransition?: (cb: () => void) => void;
};
export function historySyncPlugin<T extends { [activityName: string]: any }>(
  options: HistorySyncPluginOptions<T>,
): StackflowReactPlugin<T> {
  return ({ context }) => {
    let pushFlag = false;
    let onPopStateDisposer: (() => void) | null = null;

    function getPreloadRef({
      activityId,
      activityName,
      activityParams,
    }: {
      activityId: string;
      activityName: string;
      activityParams: ActivityParams;
    }) {
      const template = makeTemplate(
        normalizeRoute(options.routes[activityName])[0],
      );
      const path = template.fill(activityParams);

      return options.experimental_preloadRef?.({
        activityId,
        context,
        path,
      });
    }

    const startTransition =
      options.experimental_startTransition ?? ((cb) => cb());

    return {
      key: "historySync",
      initialPushedEvent() {
        const initHistoryState = parseState(getCurrentState());

        const path = context?.req?.path
          ? context.req.path
          : typeof window !== "undefined"
          ? window.location.pathname + window.location.search
          : null;

        if (initHistoryState) {
          const preloadRef = options.experimental_initialPreloadRef?.({
            context,
            path,
            activityId: initHistoryState.activity.id,
          });

          return {
            ...initHistoryState.activity.pushedBy,
            ...(preloadRef ? { preloadRef } : null),
            name: "Pushed",
          };
        }

        if (!path) {
          return null;
        }

        const activityNames = Object.keys(options.routes);

        for (let i = 0; i < activityNames.length; i += 1) {
          const activityName = activityNames[i];
          const routes = normalizeRoute(options.routes[activityName]);

          for (let j = 0; j < routes.length; j += 1) {
            const route = routes[j];

            const template = makeTemplate(route);
            const params = template.parse(path);
            const matched = !!params;

            if (matched) {
              const activityId = id();

              const preloadRef = options.experimental_initialPreloadRef?.({
                activityId,
                context,
                path,
              });

              return makeEvent("Pushed", {
                activityId,
                activityName,
                params: {
                  ...params,
                },
                eventDate: new Date().getTime() - MINUTE,
                ...(preloadRef ? { preloadRef } : null),
              });
            }
          }
        }

        const fallbackActivityName = options.fallbackActivity({ context });
        const fallbackActivityRoutes = normalizeRoute(
          options.routes[fallbackActivityName],
        );
        const fallbackActivityId = id();

        const fallbackPreloadRef = options.experimental_initialPreloadRef?.({
          context,
          path: fallbackActivityRoutes[0],
          activityId: fallbackActivityId,
        });

        return makeEvent("Pushed", {
          activityId: fallbackActivityId,
          activityName: fallbackActivityName,
          params: {},
          eventDate: new Date().getTime() - MINUTE,
          ...(fallbackPreloadRef ? { preloadRef: fallbackPreloadRef } : null),
        });
      },
      onInit({ actions: { getStack, dispatchEvent } }) {
        const rootActivity = getStack().activities[0];
        const template = makeTemplate(
          normalizeRoute(options.routes[rootActivity.name])[0],
        );

        replaceState({
          url: template.fill(rootActivity.params),
          state: {
            _TAG: STATE_TAG,
            activity: rootActivity,
          },
          useHash: options.useHash,
        });

        const onPopState = (e: PopStateEvent) => {
          const historyState = parseState(e.state);

          if (!historyState) {
            return;
          }

          const { activities } = getStack();

          const targetActivity = activities.find(
            (activity) =>
              activity.id === historyState.activity.pushedBy.activityId,
          );

          const isBackward =
            (!targetActivity &&
              historyState.activity.pushedBy.activityId < activities[0].id) ||
            targetActivity?.transitionState === "enter-active" ||
            targetActivity?.transitionState === "enter-done";
          const isForward =
            (!targetActivity &&
              historyState.activity.pushedBy.activityId >
                activities[activities.length - 1].id) ||
            targetActivity?.transitionState === "exit-active" ||
            targetActivity?.transitionState === "exit-done";

          if (isBackward) {
            dispatchEvent("Popped", {});

            if (!targetActivity) {
              pushFlag = true;

              const preloadRef = getPreloadRef({
                activityId: historyState.activity.id,
                activityName: historyState.activity.name,
                activityParams: historyState.activity.params,
              });

              startTransition(() => {
                dispatchEvent("Pushed", {
                  ...historyState.activity.pushedBy,
                  ...(preloadRef ? { preloadRef } : null),
                });
              });
            }
          }
          if (isForward) {
            pushFlag = true;

            const preloadRef = getPreloadRef({
              activityId: historyState.activity.id,
              activityName: historyState.activity.name,
              activityParams: historyState.activity.params,
            });

            startTransition(() => {
              dispatchEvent("Pushed", {
                activityId: historyState.activity.pushedBy.activityId,
                activityName: historyState.activity.pushedBy.activityName,
                params: historyState.activity.pushedBy.params,
                ...(preloadRef ? { preloadRef } : null),
              });
            });
          }
        };

        onPopStateDisposer?.();

        if (typeof window !== "undefined") {
          window.addEventListener("popstate", onPopState);
        }

        onPopStateDisposer = () => {
          if (typeof window !== "undefined") {
            window.removeEventListener("popstate", onPopState);
          }
        };
      },
      onPushed({ effect: { activity } }) {
        if (pushFlag) {
          pushFlag = false;
          return;
        }

        const template = makeTemplate(
          normalizeRoute(options.routes[activity.name])[0],
        );

        pushState({
          url: template.fill(activity.params),
          state: {
            _TAG: STATE_TAG,
            activity,
          },
          useHash: options.useHash,
        });
      },
      onReplaced({ effect: { activity } }) {
        const template = makeTemplate(
          normalizeRoute(options.routes[activity.name])[0],
        );

        replaceState({
          url: template.fill(activity.params),
          state: {
            _TAG: STATE_TAG,
            activity,
          },
          useHash: options.useHash,
        });
      },
      onBeforePush({ params, actions: { overrideParams } }) {
        const preloadRef = getPreloadRef({
          activityId: params.activityId,
          activityName: params.activityName,
          activityParams: params.params,
        });

        overrideParams({
          ...params,
          ...(preloadRef ? { preloadRef } : null),
        });
      },
      onBeforePop({ actions: { preventDefault } }) {
        preventDefault();

        do {
          if (typeof window !== "undefined") {
            window.history.back();
          }
        } while (!parseState(getCurrentState()));
      },
    };
  };
}
