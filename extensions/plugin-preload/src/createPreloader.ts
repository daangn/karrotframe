import type { PreloadFunc } from "./usePreloader";
import { usePreloader } from "./usePreloader";

export function createPreloader<T extends Record<string, unknown>>(): {
  usePreloader: () => { preload: PreloadFunc<T> };
} {
  return {
    usePreloader,
  };
}
