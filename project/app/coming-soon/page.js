"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import HiringBanner from "../components/HiringBanner";

export default function ComingSoonPage() {
  const router = useRouter();
  
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-16 text-zinc-900 sm:px-8 lg:px-10">
      <div
        className="absolute inset-0 -z-20 bg-study-doodle bg-cover bg-center"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-linear-to-b from-white/95 via-zinc-100/90 to-white/95"
        aria-hidden="true"
      />
      <main className="mx-auto flex w-full max-w-4xl flex-col items-center gap-12 px-4 text-center sm:px-6">
        <div className="flex flex-col gap-8">
          <div className="inline-flex items-center justify-center">
            <span className="text-8xl">🚧</span>
          </div>
          
          <h1 className="text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
            <span className="text-[#ff6a00]">Coming</span> Soon
          </h1>
          <HiringBanner />
          
          <p className="text-lg leading-relaxed text-zinc-600 sm:text-xl">
            We're working hard to bring you this. Check back soon for updates!
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-500 bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-600 hover:border-orange-600"
          >
            &larr; Back to Home
          </Link>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition-all duration-200 hover:border-orange-500 hover:bg-orange-50"
          >
            Go Back
          </button>
        </div>
      </main>
    </div>
  );
}
