import { NextResponse } from "next/server";
import { getRawCourses } from "@/features/courses/services/getCourses";

export async function GET() {
  try {
    return NextResponse.json(await getRawCourses(true, true, false, true));
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
