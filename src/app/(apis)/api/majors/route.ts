import getMajors from "@/services/majors/getMajors";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json(await getMajors());
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
