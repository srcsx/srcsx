import { Course } from "@/generated/prisma/client";

export type UV_STAGE_TYPE = "SELECT_COURSE" | "FINAL_RESULT";

export type UVGroupResultObject = {
  name: string;
  remaining_courses: Course[];
  required_courses: Course[];
  remaining_units: number;
  type: string;
};

export type UVFinalResult = {
  data: UVGroupResultObject[];
  required_courses: Course[];
  remaining_units: number;
};
