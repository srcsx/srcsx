import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserData } from "./utils/userData";

// Need setup urls.
const needSetupUrls = [
  "/api/uv",
  "/api/uv-term-based",
  "/api/flowchart",
  "/api/files",
  "/api/courses-resources",
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if user data is available.
  if (pathname.startsWith("/api") && needSetupUrls.includes(pathname)) {
    const user = await getUserData();

    if (!user.year)
      return NextResponse.json(
        { error: "Entry year is required" },
        { status: 400 },
      );

    if (!user.majorId)
      return NextResponse.json({ error: "Major is required" }, { status: 400 });
  }

  // Add url to headers.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-redirect-url", pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
