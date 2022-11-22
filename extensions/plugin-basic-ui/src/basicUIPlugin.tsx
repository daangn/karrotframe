import type { StackflowReactPlugin } from "@stackflow/react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import React, { createContext, useContext, useMemo } from "react";

import * as theme from "./theme.css";
import type { RecursivePartial } from "./utils";
import { compactMap } from "./utils";

type BasicUIPluginOptions = RecursivePartial<theme.GlobalVars> & {
  theme: "android" | "cupertino";
  appBar?: {
    closeButton?:
      | {
          renderIcon?: () => React.ReactNode;
          onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
        }
      | {
          render?: () => React.ReactNode;
        };
  };
};

const GlobalOptionsContext = createContext<BasicUIPluginOptions>({
  theme: "android",
});

export const GlobalOptionsProvider = GlobalOptionsContext.Provider;

export function useGlobalOptions() {
  return useContext(GlobalOptionsContext);
}

type BasicUIPluginWrapperProps = {
  options: BasicUIPluginOptions;
  children: React.ReactNode;
};
const BasicUIPluginWrapper: React.FC<BasicUIPluginWrapperProps> = (props) => {
  const options = useMemo(() => props.options, []);

  return (
    <GlobalOptionsProvider value={options}>
      <div
        style={assignInlineVars(
          compactMap({
            [theme.globalVars.backgroundColor]: options.backgroundColor,
            [theme.globalVars.dimBackgroundColor]: options.dimBackgroundColor,
            [theme.globalVars.appBar.borderColor]: options.appBar?.borderColor,
            [theme.globalVars.appBar.borderSize]: options.appBar?.borderSize,
            [theme.globalVars.appBar.height]: options.appBar?.height,
            [theme.globalVars.appBar.iconColor]: options.appBar?.iconColor,
            [theme.globalVars.appBar.textColor]: options.appBar?.textColor,
            [theme.globalVars.bottomSheet.borderRadius]:
              options.bottomSheet?.borderRadius,
            [theme.globalVars.modal.borderRadius]: options.modal?.borderRadius,
          }),
        )}
      >
        {props.children}
      </div>
    </GlobalOptionsProvider>
  );
};

export const basicUIPlugin: (
  options: BasicUIPluginOptions,
) => StackflowReactPlugin = (options) => () => ({
  key: "basic-ui",
  wrapStack({ stack }) {
    return (
      <BasicUIPluginWrapper options={options}>
        {stack.render()}
      </BasicUIPluginWrapper>
    );
  },
});
