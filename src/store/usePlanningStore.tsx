import { Course as OriginCourse } from "@/generated/prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Course = OriginCourse & { oneCoursePerTerm: boolean };

interface TermCourses {
  course: Course;
  isPassed: boolean;
}

interface TermBoxType {
  courses: TermCourses[];
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

export const usePlanningStore = create<UvTermBasedStoreType>()(
  persist(
    (set) => ({
      termsStore: Array.from({ length: 11 }, () => ({
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
          termsStore: Array.from({ length: 11 }, () => ({
            courses: [],
            units: 0,
          })),
          coursesStore: [],
          passedUnitsStore: 0,
        }),
    }),
    {
      name: "planning-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
