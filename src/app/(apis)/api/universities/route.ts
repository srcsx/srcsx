import getUniversities from "@/services/universities/getUniversities";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json(await getUniversities());
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
