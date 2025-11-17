import { NextResponse } from "next/server";
import { checkCourses } from "@/services/uv/checkCourses";
import {
  getCoursesByGroups,
  getRawCourses,
} from "@/services/courses/getCourses";
import { checkTermBased } from "@/services/uvTermBased/checkTermBased";

export async function POST(req: Request) {
  try {
    // Get courses.
    const courses = await getRawCourses(true, true, true, false, true, true);

    if (!courses) {
      return;
    }

    const input: number[][] = await req.json();

    const { issues, passedCourses } = checkTermBased(courses, input);

    const groupCourses = await getCoursesByGroups();

    if (!groupCourses || groupCourses?.length === 0) {
      return;
    }

    // Check result.
    const result = checkCourses(
      groupCourses,
      new Set(passedCourses.map(Number)),
    );

    return NextResponse.json({ issues, result });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
