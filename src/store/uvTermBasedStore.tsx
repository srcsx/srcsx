import { Course } from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TermBoxType {
  courses: Course[];
  units: number;
}

interface UvTermBasedStoreType {
  termsStore: TermBoxType[];
  setTermsStore: (terms: TermBoxType[]) => void;

  coursesStore: number[];
  setCoursesStore: (courses: number[]) => void;

  passedUnitsStore: number;
  setPassedUnitsStore: (units: number) => void;

  clearAll: () => void;
}

export const useUvTermBasedStore = create<UvTermBasedStoreType>()(
  persist(
    (set) => ({
      termsStore: Array.from({ length: 8 }, () => ({
        courses: [],
        units: 0,
      })),
      coursesStore: [],
      passedUnitsStore: 0,

      setTermsStore: (data) => set({ termsStore: data }),

      setCoursesStore: (data) => set({ coursesStore: data }),

      setPassedUnitsStore: (units) => set({ passedUnitsStore: units }),

      clearAll: () =>
        set({
          termsStore: Array.from({ length: 8 }, () => ({
            courses: [],
            units: 0,
          })),
          coursesStore: [],
          passedUnitsStore: 0,
        }),
    }),
    {
      name: "uv-term-based-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
