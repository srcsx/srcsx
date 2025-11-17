import { NextResponse } from "next/server";
import { getCoursesForFlowchart } from "@/services/courses/getCourses";
import { buildCourseTree } from "@/services/flowchart/getFlowchart";

export async function GET() {
  try {
    return NextResponse.json(buildCourseTree(await getCoursesForFlowchart()));
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ err }, { status: 500 });
    }
  }
}
