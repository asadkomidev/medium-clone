import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const reqHeaders = new Headers(request.headers);
  // toLowerCase() to avoid 404 due to Next.js case-sensitivity

  const url = request.url.toLowerCase();
  reqHeaders.set("x-url", url);
  return NextResponse.next({
    request: {
      headers: reqHeaders,
    },
  });
}
