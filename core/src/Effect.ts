import type { Activity } from "./AggregateOutput";

export type Effect =
  | {
      _TAG: "%SOMETHING_CHANGED%";
    }
  | {
      _TAG: "PUSHED";
      activity: Activity;
    }
  | {
      _TAG: "POPPED";
      activity: Activity;
    }
  | {
      _TAG: "REPLACED";
      activity: Activity;
    }
  | {
      _TAG: "NESTED_PUSHED";
      activity: Activity;
    }
  | {
      _TAG: "NESTED_POPPED";
      activity: Activity;
    }
  | {
      _TAG: "NESTED_REPLACED";
      activity: Activity;
    };
