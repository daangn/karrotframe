import type {
  InferActivityParams,
  RegisteredActivityName,
} from "@stackflow/config";
import type React from "react";

export type ActivityComponentType<ActivityName extends RegisteredActivityName> =
  React.FunctionComponent<{ params: InferActivityParams<ActivityName> }>;
