import { UVFinalResult } from "@/types/uv";

import { Course as OriginCourse } from "@/generated/prisma/client";

type Course = OriginCourse & { oneCoursePerTerm: boolean };

export interface Term {
  courses: Course[];
  units: number;
}

export interface ResultType {
  issues: { term: number; message: string }[];
  result: UVFinalResult;
}
