import Link from "next/link";

const years = [
  {
    id: "first-year",
    icon: "📚",
    title: "First Year",
    image: "https://lh3.googleusercontent.com/d/12IcyZQi37bXuFb7GJ_a9BKkjtUwSiJ--",
    description:
      "Foundation business courses and core fundamentals with curated lecture notes and PYQs.",
    href: "/materials/bba/first-year",
    cta: "Open first year resources",
  },
  {
    id: "second-year",
    icon: "📈",
    title: "Second Year",
    image: "https://lh3.googleusercontent.com/d/1XwwqRAAplENuLs43SSNAnd9Z9n-M8rN3",
    description:
      "Advanced business modules, finance briefs, and case-study breakdowns for second year.",
    href: "/materials/bba/second-year",
    cta: "Open second year resources",
  },
];

export default function BBAPage() {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-23 text-zinc-900 sm:px-8 lg:px-10">
      <div
        className="absolute inset-0 -z-20 bg-study-doodle bg-cover bg-center"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-linear-to-b from-white/95 via-zinc-100/90 to-white/95"
        aria-hidden="true"
      />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-0">
        <section className="flex flex-col gap-5 text-center mx-auto lg:max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            <span className="animate-word-1 inline-block text-zinc-900">Explore</span>
            {" "}
            <span className="animate-word-2 inline-block text-gradient-orange-underline">BBA</span>
            {" "}
            <span className="animate-word-3 inline-block text-zinc-900">Years</span>
          </h1>
          <p className="animate-fade-in-up text-sm leading-relaxed text-zinc-600 sm:text-base">
            Pick your year and dive into curated business study resources, notes, and more.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {years.map((year) => (
            <Link
              key={year.id}
              href={year.href}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white text-zinc-800 shadow-lg shadow-gray-900/5 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-orange-500 hover:shadow-orange-100/50"
            >
              {/* Image */}
              <div className="relative aspect-21/9 overflow-hidden">
                <img
                  src={year.image}
                  alt={year.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-zinc-900/0" aria-hidden="true" />
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-900">
                  {year.icon} {year.title.split(" ")[0]}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between p-8">
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-semibold text-zinc-900 transition-colors group-hover:text-orange-600">
                    <span style={{ color: "#ff6a00" }}>{year.title.split(" ")[0]}</span>{" "}
                    {year.title.split(" ").slice(1).join(" ")}
                  </h2>
                </div>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 transition-colors duration-200 group-hover:text-orange-600">
                  {year.cta}
                  <span aria-hidden="true">&gt;</span>
                </span>
              </div>
            </Link>
          ))}
        </section>

        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 self-center rounded-full border border-white/15 bg-zinc-900/80 px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-zinc-900"
        >
          &larr; Back to all tracks
        </Link>
      </main>
    </div>
  );
}
