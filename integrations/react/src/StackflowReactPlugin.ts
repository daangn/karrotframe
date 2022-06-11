import { Activity, AggregateOutput, StackflowPlugin } from "@stackflow/core";
import React from "react";

export type StackflowReactPlugin = (args: { context: any }) => {
  render?: (args: {
    stack: AggregateOutput & {
      render: (overrideStack?: Partial<AggregateOutput>) => {
        activities: Array<
          Activity & {
            key: string;
            render: (overrideActivity?: Partial<Activity>) => React.ReactNode;
          }
        >;
      };
    };
  }) => React.ReactElement<any, any> | null;
  wrapStack?: (args: {
    stack: AggregateOutput & {
      render: () => React.ReactNode;
    };
  }) => React.ReactElement<any, any> | null;
  wrapActivity?: (args: {
    activity: Activity & {
      render: () => React.ReactNode;
    };
  }) => React.ReactElement<any, any> | null;
} & ReturnType<StackflowPlugin>;
