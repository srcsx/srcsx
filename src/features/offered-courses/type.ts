import { OfferedCourse } from "@/generated/prisma/client";

export type Course = OfferedCourse & {
  course: Course & {
    preCourseRequisites: { id: number; name: string; corequisite: boolean }[];
    unitRequisites: { unit: number }[];
  };
};
