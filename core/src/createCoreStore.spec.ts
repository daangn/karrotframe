import { createCoreStore } from "./createCoreStore";
import { makeEvent } from "./event-utils";
import type { StackflowPlugin } from "./interfaces";
import { last } from "./utils";

const SECOND = 1000;
const MINUTE = 60 * SECOND;

let dt = 0;

const enoughPastTime = () => {
  dt += 1;
  return new Date(Date.now() - MINUTE).getTime() + dt;
};

test("createCoreStore - beforePush 훅이 정상적으로 동작합니다", () => {
  const onBeforePush = jest.fn();
  const otherHook = jest.fn();

  const { actions, setInitialEvents, start } = createCoreStore({
    initialEvents: [
      makeEvent("Initialized", {
        transitionDuration: 350,
        eventDate: enoughPastTime(),
      }),
    ],
    plugins: [
      () => ({
        key: "test",
        onBeforePush,
        onBeforeReplace: otherHook,
        onBeforePop: otherHook,
      }),
    ],
  });

  setInitialEvents([
    makeEvent("Initialized", {
      transitionDuration: 350,
      eventDate: enoughPastTime(),
    }),
    makeEvent("ActivityRegistered", {
      activityName: "hello",
      eventDate: enoughPastTime(),
    }),
    makeEvent("Pushed", {
      activityId: "a1",
      activityName: "hello",
      activityParams: {},
      eventDate: enoughPastTime(),
    }),
  ]);

  start();

  actions.push({
    activityId: "a2",
    activityName: "hello",
    activityParams: {},
  });

  expect(onBeforePush).toHaveBeenCalledTimes(1);
  expect(otherHook).toHaveBeenCalledTimes(0);
});

test("createCoreStore - Pushed 훅이 정상적으로 작동합니다", () => {
  const onPushed = jest.fn();
  const otherHook = jest.fn();

  const { actions, setInitialEvents, start } = createCoreStore({
    initialEvents: [
      makeEvent("Initialized", {
        transitionDuration: 350,
        eventDate: enoughPastTime(),
      }),
    ],
    plugins: [
      () => ({
        key: "test",
        onPushed,
        onReplaced: otherHook,
        onPopped: otherHook,
      }),
    ],
  });

  setInitialEvents([
    makeEvent("Initialized", {
      transitionDuration: 350,
      eventDate: enoughPastTime(),
    }),
    makeEvent("ActivityRegistered", {
      activityName: "hello",
      eventDate: enoughPastTime(),
    }),
    makeEvent("Pushed", {
      activityId: "a1",
      activityName: "hello",
      activityParams: {},
      eventDate: enoughPastTime(),
    }),
  ]);

  start();

  actions.push({
    activityId: "a2",
    activityName: "hello",
    activityParams: {},
  });

  const stack = actions.getStack();

  expect(last(stack.activities)?.id).toEqual("a2");
  expect(onPushed).toHaveBeenCalledTimes(1);
  expect(otherHook).toHaveBeenCalledTimes(0);
});

test("createCoreStore - onBeforePush 훅에서 preventDefault가 호출되면, 기본 동작을 멈춥니다", () => {
  const onBeforePush: ReturnType<StackflowPlugin>["onBeforePush"] = jest.fn(
    ({ actions }) => {
      actions.preventDefault();
    },
  );
  const onPushed = jest.fn();
  const otherHook = jest.fn();

  const { actions, setInitialEvents, start } = createCoreStore({
    initialEvents: [
      makeEvent("Initialized", {
        transitionDuration: 350,
        eventDate: enoughPastTime(),
      }),
    ],
    plugins: [
      () => ({
        key: "test",
        onBeforePush,
        onBeforeReplace: otherHook,
        onBeforePop: otherHook,
        onPushed,
        onReplaced: otherHook,
        onPopped: otherHook,
      }),
    ],
  });

  setInitialEvents([
    makeEvent("Initialized", {
      transitionDuration: 350,
      eventDate: enoughPastTime(),
    }),
    makeEvent("ActivityRegistered", {
      activityName: "hello",
      eventDate: enoughPastTime(),
    }),
    makeEvent("Pushed", {
      activityId: "a1",
      activityName: "hello",
      activityParams: {},
      eventDate: enoughPastTime(),
    }),
  ]);

  start();

  actions.push({
    activityId: "a2",
    activityName: "hello",
    activityParams: {},
  });

  const stack = actions.getStack();

  expect(last(stack.activities)?.id).toEqual("a1");
  expect(onBeforePush).toHaveBeenCalledTimes(1);
  expect(onPushed).toHaveBeenCalledTimes(0);
  expect(otherHook).toHaveBeenCalledTimes(0);
});

test("createCoreStore - subscribe에 등록하면, 스택 상태 변경이 있을때 호출됩니다", async () => {
  const listener1 = jest.fn();
  const listener2 = jest.fn();
  const listener3 = jest.fn();

  const { actions, setInitialEvents, start, subscribe } = createCoreStore({
    initialEvents: [
      makeEvent("Initialized", {
        transitionDuration: 350,
        eventDate: enoughPastTime(),
      }),
    ],
    plugins: [],
  });

  setInitialEvents([
    makeEvent("Initialized", {
      transitionDuration: 150,
      eventDate: enoughPastTime(),
    }),
    makeEvent("ActivityRegistered", {
      activityName: "hello",
      eventDate: enoughPastTime(),
    }),
    makeEvent("Pushed", {
      activityId: "a1",
      activityName: "hello",
      activityParams: {},
      eventDate: enoughPastTime(),
    }),
  ]);

  subscribe(listener1);
  const dispose = subscribe(listener2);
  subscribe(listener3);

  dispose();

  start();

  actions.push({
    activityId: "a2",
    activityName: "hello",
    activityParams: {},
  });

  expect(listener1).toHaveBeenCalledTimes(1);
  expect(listener2).toHaveBeenCalledTimes(0);
  expect(listener3).toHaveBeenCalledTimes(1);

  await new Promise((res) => {
    setTimeout(res, 300);
  });

  expect(listener1).toHaveBeenCalledTimes(2);
  expect(listener2).toHaveBeenCalledTimes(0);
  expect(listener3).toHaveBeenCalledTimes(2);
});

test("createCoreStore - onBeforePush 훅에서 overrideActionParams로 기존 actionParams를 덮어쓸 수 있습니다", () => {
  const onBeforePush: ReturnType<StackflowPlugin>["onBeforePush"] = jest.fn(
    ({ actions, actionParams }) => {
      actions.overrideActionParams({
        ...actionParams,
        activityParams: {
          ...actionParams.activityParams,
          hello: "2",
        },
      });
    },
  );

  const { actions, setInitialEvents, start } = createCoreStore({
    initialEvents: [
      makeEvent("Initialized", {
        transitionDuration: 350,
        eventDate: enoughPastTime(),
      }),
    ],
    plugins: [
      () => ({
        key: "test",
        onBeforePush,
      }),
    ],
  });

  setInitialEvents([
    makeEvent("Initialized", {
      transitionDuration: 350,
      eventDate: enoughPastTime(),
    }),
    makeEvent("ActivityRegistered", {
      activityName: "hello",
      eventDate: enoughPastTime(),
    }),
    makeEvent("Pushed", {
      activityId: "a1",
      activityName: "hello",
      activityParams: {},
      eventDate: enoughPastTime(),
    }),
  ]);

  start();

  actions.push({
    activityId: "a2",
    activityName: "hello",
    activityParams: {
      hello: "1",
    },
  });

  const stack = actions.getStack();

  expect(onBeforePush).toHaveBeenCalledTimes(1);
  expect(last(stack.activities)?.id).toEqual("a2");
  expect(last(stack.activities)?.params?.hello).toEqual("2");
});
