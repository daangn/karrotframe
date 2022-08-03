import React, { createContext, useContext } from "react";

export type RoutesMap = {
  [activityName in string]?: string | string[];
};

export const RoutesContext = createContext<RoutesMap>(null as any);

interface RoutesProviderProps {
  routes: RoutesMap;
  children: React.ReactNode;
}
export const RoutesProvider: React.FC<RoutesProviderProps> = (props) => (
  <RoutesContext.Provider value={props.routes}>
    {props.children}
  </RoutesContext.Provider>
);

export function useRoutes() {
  return useContext(RoutesContext);
}
