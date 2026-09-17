import { NextResponse } from "next/server";

const VERIFY_ORIGIN = "https://mujtoppers.in";
const isDevelopment = process.env.NODE_ENV === "development";

export default function middleware(req) {
  if (isDevelopment) {
    return NextResponse.next();
  }

  const accessCookie = req.cookies.get("site_access_verified")?.value;

  if (accessCookie === "1") {
    return NextResponse.next();
  }

  const verifyUrl = new URL("/verify", VERIFY_ORIGIN);
  verifyUrl.searchParams.set("next", req.url);

  return NextResponse.redirect(verifyUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|api/|verify|.*\\..*).*)",
  ],
};
