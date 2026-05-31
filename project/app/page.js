import Link from "next/link";

const tracks = [
  {
    id: "first-year",
    icon: "📚",
    title: "First Year",
    shortLabel: "FY",
    image: "https://lh3.googleusercontent.com/d/12IcyZQi37bXuFb7GJ_a9BKkjtUwSiJ--",
    description:
      "Foundation courses and core fundamentals with curated lecture notes and PYQs.",
    bullets: [
      "Semester-wise roadmaps",
      "Lab manuals and viva decks",
      "Continuous assessment prep kits",
    ],
    href: "/materials/first-year",
    cta: "Explore cycles",
  },
  {
    id: "bba",
    icon: "📈",
    title: "BBA",
    shortLabel: "BBA",
    image: "https://lh3.googleusercontent.com/d/1xhXcjGftQ9niqEB8U8JEiAAU4jP9yfe5",
    description:
      "Business modules, finance briefs, and case-study breakdowns tailored for MUJ BBA cohorts.",
    bullets: [
      "Subject cheat-sheets",
      "Presentation templates",
      "Interview-ready talking points",
    ],
    href: "/materials/bba",
    cta: "View details",
  },
  {
    id: "btech",
    icon: "⚙️",
    title: "BTech",
    shortLabel: "BTech",
    image: "https://lh3.googleusercontent.com/d/1zdwc1PZymNqlZ6kX4UF28eymhnbckPEe",
    description:
      "Branch-specific deep dives, project starter kits, and placement-focused resources.",
    bullets: [
      "Core concept refreshers",
      "Mini project blueprints",
      "DSA and aptitude drills",
    ],
    href: "/materials/btech",
    cta: "View details",
  },
];  

export default function Home() {
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
        <section className="flex flex-col gap-5 text-center lg:max-w-3xl lg:text-left">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            <span className="animate-word-1 inline-block text-zinc-900">Your</span>
            {" "}
            <span className="animate-word-2 inline-block text-gradient-orange-underline">Semester</span>
            {" "}
            <span className="animate-word-3 inline-block text-zinc-900">Playbook</span>
            {" "}
            <span className="animate-word-4 inline-block text-zinc-900">Starts Here</span>
          </h1>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => (
            <Link
              key={track.id}
              href={track.href}
              prefetch={false}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white text-zinc-800 shadow-lg shadow-gray-900/5 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-orange-500 hover:shadow-orange-100/50"
            >
              {/* Image */}
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={track.image}
                  alt={track.title}
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-128 ${track.id === 'first-year' ? 'scale-125 object-center' : ''} ${track.id === 'btech' ? 'scale-135 object-center' : ''}`}
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-zinc-900/0" aria-hidden="true" />
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-zinc-900">
                  {track.icon} {track.shortLabel}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between p-8">
                <div className="flex flex-col gap-8">
                  <h2 className="text-4xl font-semibold text-zinc-900 group-hover:text-orange-600 transition-colors">
                    {track.title}
                  </h2>
                  <span className="inline-flex items-center gap-2 text-base font-semibold text-zinc-700 transition-colors duration-200 group-hover:text-orange-600">
                    {track.cta}
                    <span aria-hidden="true">&gt;</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
