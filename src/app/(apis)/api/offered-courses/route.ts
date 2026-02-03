import { NextResponse } from "next/server";
import getOfferedCourses from "@/features/offered-courses/services/getOfferedCourses";
import { getUserData } from "@/utils/userData";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const term = searchParams.get("term");

    if (!term) {
      return NextResponse.json({}, { status: 422 });
    }

    const user = await getUserData();

    if (!user.majorId && !user.year) {
      return NextResponse.json({}, { status: 422 });
    }

    return NextResponse.json(
      await getOfferedCourses(user.majorId!, parseInt(term)),
    );
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
