declare global {
  interface Window {
    ym?: (counterId: number, action: string, target: string, params?: Record<string, unknown>) => void;
  }
}

const COUNTER_ID = 108772321;

export function ymGoal(target: string, params?: Record<string, unknown>) {
  try {
    if (typeof window !== "undefined" && typeof window.ym === "function") {
      window.ym(COUNTER_ID, "reachGoal", target, params);
    }
  } catch {
    /* noop */
  }
}

export default ymGoal;
