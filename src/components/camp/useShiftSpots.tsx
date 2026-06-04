import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { SHIFT_SPOTS as DEFAULT_SPOTS } from "./ProgramShiftHeader";

const SPOTS_URL =
  "https://functions.poehali.dev/4fc3a949-19b1-496b-9b78-f0fe9d34a3d0?action=shift_spots";

type SpotsMap = Record<number, number>;

const defaultMap: SpotsMap = Object.fromEntries(
  Object.entries(DEFAULT_SPOTS).map(([id, v]) => [Number(id), v.count])
);

const ShiftSpotsContext = createContext<SpotsMap>(defaultMap);

export function ShiftSpotsProvider({ children }: { children: ReactNode }) {
  const [spots, setSpots] = useState<SpotsMap>(defaultMap);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(SPOTS_URL);
        const data = await res.json();
        const raw = (data.spots || {}) as Record<string, number>;
        const next: SpotsMap = { ...defaultMap };
        Object.entries(raw).forEach(([id, count]) => {
          if (typeof count === "number") next[Number(id)] = count;
        });
        if (!cancelled) setSpots(next);
      } catch {
        /* оставляем значения по умолчанию */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ShiftSpotsContext.Provider value={spots}>
      {children}
    </ShiftSpotsContext.Provider>
  );
}

export function useShiftSpots(): SpotsMap {
  return useContext(ShiftSpotsContext);
}
