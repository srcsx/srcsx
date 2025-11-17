import { NextResponse } from "next/server";
import { checkCourses } from "@/services/uv/checkCourses";
import { getCoursesByGroups } from "@/services/courses/getCourses";

interface ResultBody {
  courses: number[];
}

export async function POST(req: Request) {
  try {
    const result: ResultBody = await req.json();

    if (!result.courses)
      return NextResponse.json(
        { error: "Courses is required" },
        { status: 400 },
      );

    const groupCourses = await getCoursesByGroups();

    if (!groupCourses || groupCourses?.length === 0) {
      return;
    }

    // Get and return final result.
    return NextResponse.json(
      checkCourses(groupCourses, new Set(result.courses.map(Number))),
    );
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
