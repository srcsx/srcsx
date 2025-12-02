import { DegreeLevel } from "@/generated/prisma/enums";
import getMajors from "@/services/majors/getMajors";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const university = searchParams.get("university");
    const type = searchParams.get("type");

    if (!university || !type) {
      return NextResponse.json({}, { status: 422 });
    }

    return NextResponse.json(
      await getMajors(type as DegreeLevel, Number(university)),
    );
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
