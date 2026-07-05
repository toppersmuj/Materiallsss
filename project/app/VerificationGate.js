"use client";

import { useEffect, useState } from "react";

const BASE_ORIGIN =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://mujtoppers.in";
const REDIRECT_FLAG = "verification_redirect_in_progress";

export default function VerificationGate({ children, fallback = null }) {
    const [isAllowed, setIsAllowed] = useState(false);

    const loadingContent = fallback ?? (
        <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-full border-4 border-orange-200 border-t-orange-600 animate-spin" />
            <p className="text-sm font-medium text-zinc-700">Redirecting to verification...</p>
        </div>
    );

    useEffect(() => {
        const checkVerification = async () => {
            try {
                const response = await fetch(`${BASE_ORIGIN}/api/turnstile/verify`, {
                    method: "GET",
                    credentials: "include",
                    cache: "no-store",
                });

                const data = await response.json().catch(() => ({}));

                if (response.ok && data?.verified === true) {
                    window.sessionStorage.removeItem(REDIRECT_FLAG);
                    setIsAllowed(true);
                    return;
                }

                window.sessionStorage.setItem(REDIRECT_FLAG, "1");
                const currentUrl = window.location.href;
                window.location.replace(
                    `${BASE_ORIGIN}/verify?next=${encodeURIComponent(currentUrl)}`,
                );
            } catch {
                window.sessionStorage.setItem(REDIRECT_FLAG, "1");
                const currentUrl = window.location.href;
                window.location.replace(
                    `${BASE_ORIGIN}/verify?next=${encodeURIComponent(currentUrl)}`,
                );
            }
        };

        void checkVerification();
    }, []);

    if (isAllowed) {
        return <>{children}</>;
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 text-center text-zinc-900">
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at top, rgba(251, 146, 60, 0.22), transparent 40%), radial-gradient(circle at bottom, rgba(255, 255, 255, 0.9), transparent 55%), linear-gradient(135deg, #fffaf5 0%, #fff2e7 50%, #fffdf9 100%)",
                }}
                aria-hidden="true"
            />
            <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-orange-200/40 blur-3xl animate-pulse" aria-hidden="true" />
            <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-amber-100/50 blur-3xl animate-pulse [animation-delay:700ms]" aria-hidden="true" />
            <div className="relative z-10 rounded-3xl border border-white/70 bg-white/80 px-8 py-10 shadow-2xl shadow-orange-100/60 backdrop-blur-xl">
                {loadingContent}
            </div>
        </div>
    );
}