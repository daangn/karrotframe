import React, { createContext } from "react";

import type { StackflowReactPlugin } from "../StackflowReactPlugin";

export type PluginsContextValue = Array<ReturnType<StackflowReactPlugin>>;
export const PluginsContext = createContext<PluginsContextValue>(null as any);

interface PluginsProviderProps {
  children: React.ReactNode;
  value: PluginsContextValue;
}
export const PluginsProvider = ({ children, value }: PluginsProviderProps) => (
  <PluginsContext.Provider value={value}>{children}</PluginsContext.Provider>
);

PluginsProvider.displayName = "PluginsProvider";
