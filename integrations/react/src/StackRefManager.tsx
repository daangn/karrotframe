import type { StackflowActions } from "@stackflow/core";
import React from "react";

import type { BaseActivities } from "./BaseActivities";
import { useCoreActions } from "./core";
import type { UseActionsOutputType } from "./useActions";
import { useActions } from "./useActions";
import type { UseStepActionsOutputType } from "./useStepActions";
import { useStepActions } from "./useStepActions";

export type StackRefCurrentType<T extends BaseActivities> = {
  actions: Pick<StackflowActions, "dispatchEvent" | "getStack"> &
    Pick<UseActionsOutputType<T>, "push" | "pop" | "replace"> &
    Pick<UseStepActionsOutputType<{}>, "stepPush" | "stepReplace" | "stepPop">;
};

const StackRefManager = React.forwardRef<
  StackRefCurrentType<BaseActivities>,
  {}
>((_, ref) => {
  const { dispatchEvent, getStack } = useCoreActions();
  const { push, pop, replace } = useActions();
  const { stepPush, stepPop, stepReplace } = useStepActions("" as never);

  React.useImperativeHandle(ref, () => ({
    actions: {
      dispatchEvent,
      getStack,
      push,
      pop,
      replace,
      stepPush,
      stepPop,
      stepReplace,
    },
  }));

  return null;
});

export default StackRefManager;
