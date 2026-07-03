import { NextResponse } from "next/server";

const VERIFIED_COOKIE = "site_access_verified";
const BOT_UA_RE =
  /python-requests|urllib|scrapy|curl(?!y)|wget|httpx|aiohttp|go-http-client|java\/|libwww|mechanize|phantom|headless|selenium|puppeteer|playwright/i;

const WINDOW_MS = 60_000;
const SOFT_LIMIT = 60;
const HARD_LIMIT = 200;

const rateMap = new Map();
let lastGc = Date.now();

const DENY = new NextResponse("Access Denied", { status: 403 });
const RATE_LIMITED = new NextResponse("Too Many Requests", {
  status: 429,
  headers: { "Retry-After": "60" },
});

const LIMIT_RESPONSES = { hard: DENY, soft: RATE_LIMITED };

function fingerprint(req) {
  const raw = [
    req.headers.get("user-agent") ?? "",
    req.headers.get("accept-language") ?? "",
    req.headers.get("accept-encoding") ?? "",
    req.headers.get("sec-fetch-mode") ?? "",
    req.headers.get("sec-ch-ua") ?? "",
  ].join("|");

  let h = 2166136261;
  for (let i = 0; i < raw.length; i++) {
    h = Math.imul(h ^ raw.charCodeAt(i), 16777619) >>> 0;
  }
  return `fp_${h.toString(36)}`;
}

function rateLimitKey(fp) {
  const now = Date.now();

  if (now - lastGc > 300_000) {
    for (const [key, value] of rateMap.entries()) {
      if (value.windowStart < now - WINDOW_MS * 2) {
        rateMap.delete(key);
      }
    }
    lastGc = now;
  }

  const entry = rateMap.get(fp);
  const fresh = !entry || now - entry.windowStart > WINDOW_MS;

  fresh ? rateMap.set(fp, { windowStart: now, count: 1 }) : entry.count++;

  const count = fresh ? 1 : entry.count;
  return count > HARD_LIMIT ? "hard" : count > SOFT_LIMIT ? "soft" : "ok";
}

function isSuspicious(req) {
  const ua = req.headers.get("user-agent") ?? "";
  return ua.length < 10 || BOT_UA_RE.test(ua) || !req.headers.get("accept");
}

function hasVerifiedAccess(req) {
  return Boolean(req.cookies.get(VERIFIED_COOKIE)?.value);
}

export default function middleware(req) {
  if (hasVerifiedAccess(req)) {
    return NextResponse.next();
  }

  const fp = fingerprint(req);
  const limit = rateLimitKey(fp);

  return (
    (isSuspicious(req) && DENY) || LIMIT_RESPONSES[limit] || NextResponse.next()
  );
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|api/health).*)",
  ],
};
