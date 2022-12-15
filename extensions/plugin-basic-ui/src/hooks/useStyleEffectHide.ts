/* eslint-disable no-param-reassign */

import type React from "react";

import { useStyleEffect } from "./useStyleEffect";

export function useStyleEffectHide({
  refs,
  hasEffect,
}: {
  refs: Array<React.RefObject<any>>;
  hasEffect?: boolean;
}) {
  useStyleEffect({
    styleName: "hide",
    refs,
    effect: hasEffect
      ? ({ activityTransitionState, refs }) => {
          switch (activityTransitionState) {
            case "enter-done": {
              refs.forEach((ref) => {
                if (!ref.current) {
                  return;
                }
                const $ref = ref.current;

                $ref.style.display = "none";
              });

              return () => {
                refs.forEach((ref) => {
                  if (!ref.current) {
                    return;
                  }
                  const $ref = ref.current;

                  $ref.style.display = "";
                });
              };
            }
            default: {
              refs.forEach((ref) => {
                if (!ref.current) {
                  return;
                }

                ref.current.style.display = "";
              });

              return () => {};
            }
          }
        }
      : undefined,
  });
}
