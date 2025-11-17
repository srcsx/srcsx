import { NextResponse } from "next/server";
import { getUserData } from "@/utils/userData";
import { getFiles } from "@/services/files/getFiles";

export async function GET() {
  try {
    const user = await getUserData();

    return NextResponse.json(
      await getFiles(user.majorId ?? 1, user.year ?? 1400),
    );
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
