import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserData } from "./utils/userData";

const needSetupUrls = [
  "/api/uv",
  "/api/uv-term-based",
  "/api/flowchart",
  "/api/files",
  "/api/courses-resources",
];

export const config = {
  matcher: "/api/:path*",
};

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const shouldHandle = needSetupUrls.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (!shouldHandle) {
    return NextResponse.next();
  }

  const user = await getUserData();

  if (!user.year)
    return NextResponse.json(
      { error: "Entry year is required" },
      { status: 401 },
    );

  if (!user.majorId)
    return NextResponse.json({ error: "Major is required" }, { status: 401 });

  return NextResponse.next();
}
