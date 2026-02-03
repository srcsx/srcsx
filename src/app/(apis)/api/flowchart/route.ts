import { NextResponse } from "next/server";
import { getCoursesForFlowchart } from "@/features/courses/services/getCourses";
import { buildCourseTree } from "@/features/flowchart/services/getFlowchart";

export async function GET() {
  try {
    return NextResponse.json(buildCourseTree(await getCoursesForFlowchart()));
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ err }, { status: 500 });
    }
  }
}
