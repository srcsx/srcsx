import { NextResponse } from "next/server";
import { getRawCourses } from "@/features/courses/services/getCourses";
import { getCourses } from "@/features/courses/services/getCoursesBuilder";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    switch (searchParams.get("type")) {
      case "general":
        return NextResponse.json(
          await getCourses()
            .addGeneralCourses()
            .includePreRequisites(true)
            .includeUnitPreRequisites(true)
            .get(),
        );
      case "major":
        return NextResponse.json(
          await getCourses()
            .addMajorCourses()
            .includePreRequisites(true)
            .includeUnitPreRequisites(true)
            .get(),
        );
      default:
        return NextResponse.json(
          await getCourses()
            .addMajorCourses()
            .addGeneralCourses()
            .includePreRequisites(true)
            .includeUnitPreRequisites(true)
            .get(),
        );
    }
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
