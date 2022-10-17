import {
  createGlobalTheme,
  createGlobalThemeContract,
  createThemeContract,
  style,
} from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { recipe } from "@vanilla-extract/recipes";

import { f } from "./styles";

export const vars = createGlobalThemeContract(
  {
    backgroundColor: "background-color",
    dimBackgroundColor: "dim-background-color",
    appBar: {
      height: "app-bar-height",
      borderColor: "app-bar-border-color",
      borderSize: "app-bar-border-size",
      textColor: "app-bar-text-color",
      iconColor: "app-bar-icon-color",
    },
  },
  (value) => `stackflow-basic-ui-${value}`,
);

export const localVars = createThemeContract({
  transitionDuration: null,
  zIndexes: {
    dim: null,
    paper: null,
    edge: null,
    appBar: null,
  },
  appBar: {
    center: {
      mainWidth: null,
    },
  },
});

export const root = ":root";
export const rootAndroid = ":root[data-stackflow-basic-ui-theme=android]";
export const rootCupertino = ":root[data-stackflow-basic-ui-theme=cupertino]";

export const android = style({});
export const cupertino = style({});

createGlobalTheme(`${root}, ${rootAndroid}, ${android}`, vars, {
  backgroundColor: "#fff",
  dimBackgroundColor: "rgba(0, 0, 0, 0.15)",
  appBar: {
    height: "3.5rem",
    borderColor: "rgba(0, 0, 0, 0.07)",
    borderSize: "1px",
    iconColor: "#212124",
    textColor: "#212124",
  },
});

createGlobalTheme(`${rootCupertino}, ${cupertino}`, vars, {
  backgroundColor: "#fff",
  dimBackgroundColor: "rgba(0, 0, 0, 0.15)",
  appBar: {
    height: "2.75rem",
    borderColor: "rgba(0, 0, 0, 0.12)",
    borderSize: "0.5px",
    iconColor: "#212124",
    textColor: "#212124",
  },
});

export const enterActive = style({});
export const enterDone = style({});
export const exitActive = style({});
export const exitDone = style({
  transform: "translateX(100%)",
});

const dimBackgroundColor = style({
  backgroundColor: vars.dimBackgroundColor,
});

export const background = style({
  backgroundColor: vars.backgroundColor,
});

export const allTransitions = style({
  transition: localVars.transitionDuration,
});

export const appScreen = recipe({
  base: [f.posAbsFull, f.overflowHidden],
  variants: {
    theme: {
      android,
      cupertino,
    },
    transitionState: {
      "enter-active": enterActive,
      "enter-done": enterDone,
      "exit-active": exitActive,
      "exit-done": exitDone,
    },
  },
});

export const dim = style([
  f.posAbsFull,
  dimBackgroundColor,
  allTransitions,
  {
    opacity: 0,
    zIndex: localVars.zIndexes.dim,
    selectors: {
      [`${android} &, ${rootAndroid} &`]: {
        height: "10rem",
        background: `linear-gradient(${vars.dimBackgroundColor}, rgba(0, 0, 0, 0))`,
      },
      [`${enterActive} &`]: {
        opacity: 1,
      },
      [`${enterDone} &`]: {
        opacity: 1,
      },
      [`${exitActive} &`]: {
        opacity: 0,
      },
      [`${exitDone} &`]: {
        opacity: 0,
      },
    },
  },
]);

export const paper = recipe({
  base: [
    f.posAbsFull,
    background,
    allTransitions,
    {
      overflowY: "scroll",
      WebkitOverflowScrolling: "touch",
      "::-webkit-scrollbar": {
        display: "none",
      },
      zIndex: localVars.zIndexes.paper,
      selectors: {
        [`${cupertino} &, ${rootCupertino} &`]: {
          transform: "translateX(100%)",
        },
        [`${cupertino}${enterActive} &, ${rootCupertino} ${enterActive} &`]: {
          transform: "translateX(0)",
        },
        [`${cupertino}${enterDone} &, ${rootCupertino} ${enterDone} &`]: {
          transform: "translateX(0)",
        },
        [`${android} &, ${rootAndroid} &`]: {
          opacity: 0,
          transform: "translateY(10rem)",
        },
        [`${android}${enterActive} &, ${rootAndroid} ${enterActive} &`]: {
          opacity: 1,
          transform: "translateY(0)",
        },
        [`${android}${enterDone} &, ${rootAndroid} ${enterDone} &`]: {
          opacity: 1,
          transform: "translateY(0)",
        },
      },
    },
  ],
  variants: {
    hasAppBar: {
      true: [
        f.borderBox,
        {
          paddingTop: [
            `calc(${vars.appBar.height} + constant(safe-area-inset-top))`,
            `calc(${vars.appBar.height} + env(safe-area-inset-top))`,
          ],
        },
      ],
    },
  },
});

export const edge = recipe({
  base: [
    f.posAbs,
    f.top0,
    f.left0,
    f.fullHeight,
    {
      width: "1.25rem",
      zIndex: localVars.zIndexes.edge,
    },
  ],
  variants: {
    hasAppBar: {
      true: {
        top: vars.appBar.height,
        height: calc("100%").subtract(vars.appBar.height).toString(),
      },
    },
  },
});
