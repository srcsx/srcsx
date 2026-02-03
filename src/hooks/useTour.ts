"use client";

import { useCallback, useEffect } from "react";
import { useTourStore } from "@/store/useTourStore";
import type { DriveStep } from "driver.js";
import { usePathname } from "next/navigation";

export function useTour(name: string, steps: DriveStep[]) {
  const pathname = usePathname();

  const { seenTours, hydrated } = useTourStore();

  const startTour = useCallback(
    (force = false) => {
      if (!hydrated) return;
      if (!seenTours.includes(name) || force) {
        useTourStore.getState().setTour(name, steps);
      }
    },
    [hydrated, seenTours, name, steps],
  );

  useEffect(() => {
    if (pathname !== name) return;

    startTour();
  }, [startTour]);

  return { restartTour: () => startTour(true) };
}
