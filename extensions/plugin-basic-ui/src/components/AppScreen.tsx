import { useActions } from "@stackflow/react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { createContext, useContext, useMemo, useRef } from "react";

import { useGlobalOptions } from "../basicUIPlugin";
import type { GlobalVars } from "../basicUIPlugin.css";
import { globalVars } from "../basicUIPlugin.css";
import {
  useLazy,
  useMounted,
  useNullableActivity,
  useStyleEffectHide,
  useStyleEffectOffset,
  useStyleEffectSwipeBack,
} from "../hooks";
import type { PropOf } from "../utils";
import { compactMap } from "../utils";
import AppBar from "./AppBar";
import * as css from "./AppScreen.css";

export type AppScreenContext = {
  scroll: (args: { top: number }) => void;
};
const Context = createContext<AppScreenContext>(null as any);

export function useAppScreen() {
  return useContext(Context);
}

export type AppScreenProps = Partial<
  Pick<GlobalVars, "backgroundColor" | "dimBackgroundColor">
> & {
  appBar?: Omit<
    PropOf<typeof AppBar>,
    "theme" | "modalPresentationStyle" | "ref" | "key"
  >;
  preventSwipeBack?: boolean;
  CUPERTINO_ONLY_modalPresentationStyle?: "fullScreen";
  ANDROID_ONLY_activityEnterStyle?: "slideInLeft";
  children: React.ReactNode;
};
const AppScreen: React.FC<AppScreenProps> = ({
  backgroundColor,
  dimBackgroundColor,
  appBar,
  preventSwipeBack,
  CUPERTINO_ONLY_modalPresentationStyle,
  ANDROID_ONLY_activityEnterStyle,
  children,
}) => {
  const globalOptions = useGlobalOptions();
  const activity = useNullableActivity();
  const mounted = useMounted();

  const { pop } = useActions();

  const appScreenRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
  const appBarRef = useRef<HTMLDivElement>(null);

  const modalPresentationStyle =
    globalOptions.theme === "cupertino"
      ? CUPERTINO_ONLY_modalPresentationStyle
      : undefined;
  const activityEnterStyle =
    globalOptions.theme === "android"
      ? ANDROID_ONLY_activityEnterStyle
      : undefined;

  const swipeBackPrevented =
    preventSwipeBack || modalPresentationStyle === "fullScreen";

  const hasAppBar = !!appBar;

  const zIndexBase = (activity?.zIndex ?? 0) * 5;

  let zIndexDim: number;
  let zIndexPaper: number;
  let zIndexEdge: number;
  let zIndexAppBar: number;

  switch (globalOptions.theme) {
    case "cupertino": {
      zIndexDim =
        zIndexBase + (modalPresentationStyle === "fullScreen" ? 2 : 0);
      zIndexPaper =
        zIndexBase +
        (hasAppBar && modalPresentationStyle !== "fullScreen" ? 1 : 3);
      zIndexEdge = zIndexBase + 4;
      zIndexAppBar = zIndexBase + 7;
      break;
    }
    default: {
      zIndexDim = zIndexBase;
      zIndexPaper = zIndexBase + (activityEnterStyle === "slideInLeft" ? 1 : 3);
      zIndexEdge = zIndexBase + 4;
      zIndexAppBar =
        zIndexBase + (activityEnterStyle === "slideInLeft" ? 7 : 4);
      break;
    }
  }

  const transitionState = activity?.transitionState ?? "enter-done";
  const lazyTransitionState = useLazy(transitionState);

  useStyleEffectHide({
    refs: [appScreenRef],
    hasEffect: true,
  });
  useStyleEffectOffset({
    refs:
      globalOptions.theme === "cupertino" ||
      activityEnterStyle === "slideInLeft"
        ? [paperRef]
        : [paperRef, appBarRef],
    theme: globalOptions.theme,
    activityEnterStyle,
    hasEffect: modalPresentationStyle !== "fullScreen",
  });
  useStyleEffectSwipeBack({
    dimRef,
    edgeRef,
    paperRef,
    theme: globalOptions.theme,
    prevented: swipeBackPrevented,
    onSwiped() {
      pop();
    },
    hasEffect: true,
  });

  const onAppBarTopClick: React.MouseEventHandler = (e) => {
    appBar?.onTopClick?.(e);

    if (!e.defaultPrevented) {
      paperRef.current?.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Context.Provider
      value={useMemo(
        () => ({
          scroll({ top }) {
            paperRef?.current?.scroll({
              top,
              behavior: "smooth",
            });
          },
        }),
        [paperRef],
      )}
    >
      <div
        ref={appScreenRef}
        className={css.appScreen({
          transitionState:
            transitionState === "enter-done" || transitionState === "exit-done"
              ? transitionState
              : lazyTransitionState,
        })}
        style={assignInlineVars(
          compactMap({
            [globalVars.backgroundColor]: backgroundColor,
            [globalVars.dimBackgroundColor]: dimBackgroundColor,
            [globalVars.appBar.height]: appBar?.height,
            [globalVars.appBar.heightTransitionDuration]:
              appBar?.heightTransitionDuration,
            [css.vars.zIndexes.dim]: `${zIndexDim}`,
            [css.vars.zIndexes.paper]: `${zIndexPaper}`,
            [css.vars.zIndexes.edge]: `${zIndexEdge}`,
            [css.vars.zIndexes.appBar]: `${zIndexAppBar}`,
            [css.vars.transitionDuration]:
              transitionState === "enter-active" ||
              transitionState === "exit-active"
                ? globalVars.computedTransitionDuration
                : "0ms",
          }),
        )}
        data-stackflow-component-name="AppScreen"
        data-stackflow-activity-id={mounted ? activity?.id : undefined}
        data-stackflow-activity-is-active={
          mounted ? activity?.isActive : undefined
        }
      >
        {activityEnterStyle !== "slideInLeft" && (
          <div className={css.dim} ref={dimRef} />
        )}
        {appBar && (
          <AppBar
            {...appBar}
            ref={appBarRef}
            modalPresentationStyle={modalPresentationStyle}
            activityEnterStyle={activityEnterStyle}
            onTopClick={onAppBarTopClick}
          />
        )}
        <div
          key={activity?.id}
          className={css.paper({
            hasAppBar,
            modalPresentationStyle,
            activityEnterStyle,
          })}
          ref={paperRef}
        >
          {children}
        </div>
        {!activity?.isRoot &&
          globalOptions.theme === "cupertino" &&
          !swipeBackPrevented && (
            <div className={css.edge({ hasAppBar })} ref={edgeRef} />
          )}
      </div>
    </Context.Provider>
  );
};

AppScreen.displayName = "AppScreen";

export default AppScreen;
