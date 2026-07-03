import { NextResponse } from "next/server";

function hasVerifiedAccess(request) {
  return request.cookies.get("site_access_verified")?.value === "1";
}

function buildVerifyRedirect(request) {
  const verifyUrl = new URL("https://www.mujtoppers.in/verify");
  verifyUrl.searchParams.set("next", request.nextUrl.toString());
  return NextResponse.redirect(verifyUrl);
}

export default function middleware(request) {
  if (hasVerifiedAccess(request)) {
    return NextResponse.next();
  }

  return buildVerifyRedirect(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|api/health).*)",
  ],
};
