import type { CoreStore } from "@stackflow/core";
import type {
  ActivityDefinition,
  ActivityParamTypes,
  BaseParams,
} from "@stackflow/core/future";
import { makeStepId } from "../__internal__/activity";

export type StepActions<Params> = {
  pushStep: (params: Params, options?: {}) => void;
  replaceStep: (params: Params, options?: {}) => void;
  popStep: (options?: {}) => void;
};

export function makeStepActions<
  T extends ActivityDefinition<string, BaseParams>,
  K extends string,
>(
  getCoreActions: () => CoreStore["actions"] | undefined,
): StepActions<ActivityParamTypes<Extract<T, { name: K }>>> {
  return {
    pushStep(params) {
      const stepId = makeStepId();

      getCoreActions()?.stepPush({
        stepId,
        stepParams: params,
      });
    },
    replaceStep(params) {
      const stepId = makeStepId();

      getCoreActions()?.stepReplace({
        stepId,
        stepParams: params,
      });
    },
    popStep() {
      getCoreActions()?.stepPop({});
    },
  };
}
