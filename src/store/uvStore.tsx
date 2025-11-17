import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UvStoreType {
  coursesStore: number[];
  setCoursesStore: (coursesData: number[]) => void;
  updateCoursesStore: (course: number) => void;
  clearCoursesStore: () => void;

  passedUnitsStore: number;
  setPassedUnitsStore: (units: number) => void;
  updatePassedUnitsStore: (delta: number) => void;
  clearPassedUnitsStore: () => void;

  clearAll: () => void;
}

export const useUvStore = create<UvStoreType>()(
  persist(
    (set) => ({
      coursesStore: [],
      passedUnitsStore: 0,

      setCoursesStore: (coursesData) => set({ coursesStore: coursesData }),

      updateCoursesStore: (course) =>
        set((state) => {
          if (state.coursesStore.includes(course)) return state;
          return { coursesStore: [...state.coursesStore, course] };
        }),

      clearCoursesStore: () => set({ coursesStore: [] }),

      setPassedUnitsStore: (units) => set({ passedUnitsStore: units }),

      updatePassedUnitsStore: (delta) =>
        set((state) => ({
          passedUnitsStore: state.passedUnitsStore + delta,
        })),

      clearPassedUnitsStore: () => set({ passedUnitsStore: 0 }),

      clearAll: () => set({ coursesStore: [], passedUnitsStore: 0 }),
    }),
    {
      name: "uv-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
