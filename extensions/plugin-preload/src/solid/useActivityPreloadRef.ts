import { useActivity } from "@stackflow/solid";

/**
 * Get current activity preload reference
 */
export function useActivityPreloadRef<T>(): () => T {
  const activity = useActivity();
  const activityContext = () => activity()?.context as any;

  return () => activityContext()?.preloadRef;
}
