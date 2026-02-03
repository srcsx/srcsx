import { getCoursesByGroups } from "@/features/courses/services/getCourses";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json(await getCoursesByGroups());
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
