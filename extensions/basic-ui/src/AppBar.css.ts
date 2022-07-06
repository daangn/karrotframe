import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { recipe } from "@vanilla-extract/recipes";

import {
  android,
  background,
  cupertino,
  enterActive,
  enterDone,
  exitActive,
  staticAndroid,
  staticCupertino,
  vars,
} from "./AppScreen.css";
import { f } from "./styles";

export const appBar = recipe({
  base: [
    f.posAbs,
    f.flexAlignCenter,
    f.fullWidth,
    background,
    {
      height: vars.appBar.height,
      paddingTop: ["constant(safe-area-inset-top)", "env(safe-area-inset-top)"],
      zIndex: vars.zIndexes.appBar,
      selectors: {
        [`${cupertino} &, ${staticCupertino} &`]: {
          position: "absolute",
        },
        [`${cupertino}${exitActive} &, ${staticCupertino} ${exitActive} &`]: {
          transform: "translateX(100%)",
        },
        [`${android} &, ${staticAndroid} &`]: {
          opacity: 0,
          transform: "translateY(10rem)",
          transition: `transform ${vars.transitionDuration}, opacity ${vars.transitionDuration}`,
        },
        [`${android}${enterActive} &, ${staticAndroid} ${enterActive} &`]: {
          opacity: 1,
          transform: "translateY(0)",
        },
        [`${android}${enterDone} &, ${staticAndroid} ${enterDone} &`]: {
          opacity: 1,
          transform: "translateY(0)",
        },
      },
    },
  ],
  variants: {
    border: {
      true: {
        boxShadow: `inset 0px ${calc(vars.appBar.borderSize).negate()} 0 ${
          vars.appBar.borderColor
        }`,
      },
    },
    isTopActive: {
      false: {
        selectors: {
          [`${android}${enterActive} &, ${staticAndroid} ${enterActive} &`]: {
            transform: "translateY(-2rem)",
          },
          [`${android}${enterDone} &, ${staticAndroid} ${enterDone} &`]: {
            transform: "translateY(-2rem)",
          },
        },
      },
    },
  },
});

export const left = style([
  f.flexAlignCenter,
  f.fullHeight,
  {
    padding: "0 0.5rem",
    ":empty": {
      display: "none",
    },
  },
]);

export const backButton = style([
  f.flexAlignCenter,
  f.flexJustifyCenter,
  f.cursorPointer,
  f.resetButton,
  {
    color: vars.appBar.iconColor,
    transition: "opacity 300ms",
    width: "2.25rem",
    height: "2.75rem",
    ":active": {
      opacity: "0.2",
      transition: "opacity 0s",
    },
  },
]);

export const closeButton = style([backButton]);

export const center = style([
  f.flexAlignCenter,
  {
    flex: 1,
  },
]);

export const centerMain = recipe({
  base: {
    width: vars.appBar.center.mainWidth,
    color: vars.appBar.textColor,
    selectors: {
      [`${android} &, ${staticAndroid} &`]: {
        width: "100%",
        justifyContent: "flex-start",
        paddingLeft: "1rem",
        fontSize: "1.1875rem",
        lineHeight: "1.5",
        fontWeight: "bold",
        boxSizing: "border-box",
      },
      [`${cupertino} &, ${staticCupertino} &`]: {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "-apple-system, BlinkMacSystemFont",
        fontWeight: 600,
        fontSize: "1rem",
        left: "50%",
        transform: "translate(-50%)",
        height: vars.appBar.height,
        top: ["constant(safe-area-inset-top)", "env(safe-area-inset-top)"],
      },
    },
  },
  variants: {
    hasLeft: {
      true: {
        selectors: {
          [`${android} &, ${staticAndroid} &`]: {
            paddingLeft: "0.375rem",
          },
        },
      },
    },
  },
});

export const centerText = style([
  f.overflowHidden,
  f.whiteSpaceNowrap,
  f.fullWidth,
  {
    textOverflow: "ellipsis",
    fontSize: "inherit",
    fontWeight: "inherit",
  },
]);

export const right = style([
  f.flexAlignCenter,
  f.fullHeight,
  f.posRel,
  {
    padding: "0 0.5rem",
    marginLeft: "auto",
    ":empty": {
      display: "none",
    },
    selectors: {
      [`${android} &, ${staticAndroid} &`]: {
        padding: "0 0.5rem 0 0",
      },
    },
  },
]);
