import { getDocs } from "@/services/docs/getDocs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json(await getDocs());
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
