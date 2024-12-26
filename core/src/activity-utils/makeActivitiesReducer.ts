import type { Activity, ActivityTransitionState } from "../Stack";
import type { DomainEvent, PushedEvent, ReplacedEvent } from "../event-types";
import { createActivityFromEvent } from "./createActivityFromEvent";
import { createReducer } from "./createReducer";
import { findNewActivityIndex } from "./findNewActivityIndex";

function noop(activities: Activity[]) {
  return activities;
}

/**
 * Create activity list reducers for each event type (Activity[] + Event => Activity[])
 */
export function makeActivitiesReducer(context: {
  transitionDuration: number;
  now: number;
}) {
  let _pausedAt: number | null = null;
  let _pausedEvents: Array<PushedEvent | ReplacedEvent> = [];

  return createReducer({
    /**
     * Push new activity to activities
     */
    Pushed(activities: Activity[], event: PushedEvent): Activity[] {
      if (_pausedAt) {
        _pausedEvents.push(event);
        return activities;
      }

      const isTransitionDone =
        context.now - event.eventDate >= context.transitionDuration;

      const transitionState: ActivityTransitionState =
        event.skipEnterActiveState || isTransitionDone
          ? "enter-done"
          : "enter-active";

      const reservedIndex = findNewActivityIndex(activities, event);

      return [
        ...activities.slice(0, reservedIndex),
        createActivityFromEvent(event, transitionState),
        ...activities.slice(reservedIndex + 1),
      ];
    },

    /**
     * Replace activity at reservedIndex with new activity
     */
    Replaced(activities: Activity[], event: ReplacedEvent): Activity[] {
      if (_pausedAt) {
        _pausedEvents.push(event);
        return activities;
      }

      const isTransitionDone =
        context.now - event.eventDate >= context.transitionDuration;

      const reservedIndex = findNewActivityIndex(activities, event);

      // reuse state of alreadyExistingActivity
      const transitionState =
        activities[reservedIndex]?.transitionState ??
        (event.skipEnterActiveState || isTransitionDone
          ? "enter-done"
          : "enter-active");

      return [
        ...activities.slice(0, reservedIndex),
        createActivityFromEvent(event, transitionState),
        ...activities.slice(reservedIndex + 1),
      ];
    },

    Paused(activities, event) {
      _pausedAt = event.eventDate;
      return activities;
    },

    Resumed(activities, event) {
      if (!_pausedAt) {
        return activities;
      }

      const pausedAt = _pausedAt;
      const pausedEvents = _pausedEvents;
      const resumedAt = event.eventDate;

      _pausedAt = null;
      _pausedEvents = [];

      let outputActivities = activities;

      for (const pausedEvent of pausedEvents) {
        if (pausedEvent.name === "Pushed") {
          outputActivities = this.Pushed(activities, pausedEvent);
        }
        if (pausedEvent.name === "Replaced") {
          outputActivities = this.Replaced(activities, pausedEvent);
        }
      }

      return outputActivities.map((activity) => {
        const isTargetActivity =
          activity.enteredBy.eventDate > pausedAt &&
          activity.enteredBy.eventDate <= resumedAt;

        if (!isTargetActivity) {
          return activity;
        }

        const isTransitionDone =
          context.now - resumedAt >= context.transitionDuration;

        const transitionState: ActivityTransitionState = isTransitionDone
          ? "enter-done"
          : "enter-active";

        return {
          ...activity,
          transitionState,
        };
      });
    },

    /**
     * noop
     */
    Initialized: noop,
    ActivityRegistered: noop,
    Popped: noop,
    StepPushed: noop,
    StepReplaced: noop,
    StepPopped: noop,
  });
}
