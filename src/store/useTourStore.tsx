"use client";

import { DriveStep } from "driver.js";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TourState = {
  steps: DriveStep[];
  isOpen: boolean;
  activeTour: string | null;
  seenTours: string[];
  hydrated: boolean;

  setTour: (name: string, steps: DriveStep[]) => void;
  startTourNow: (name: string, steps: DriveStep[]) => void;
  clearTour: () => void;

  addSeenTour: (name: string) => void;
  setHydrated: () => void;
};

export const useTourStore = create<TourState>()(
  persist(
    (set, get) => ({
      steps: [],
      isOpen: false,
      activeTour: null,
      seenTours: [],
      hydrated: false,

      setHydrated: () => set({ hydrated: true }),

      setTour: (name, steps) =>
        set({
          activeTour: name,
          steps,
          isOpen: true,
        }),

      clearTour: () =>
        set({
          isOpen: false,
          steps: [],
          activeTour: null,
        }),

      addSeenTour: (name) => {
        const { seenTours } = get();
        if (!seenTours.includes(name)) {
          set({ seenTours: [...seenTours, name] });
        }
      },
      startTourNow: (name: string, steps: DriveStep[]) => {
        set({
          activeTour: name,
          steps,
          isOpen: true,
        });
      },
    }),
    {
      name: "tour-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
