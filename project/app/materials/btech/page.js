import Link from "next/link";
import HiringBanner from "@/app/components/HiringBanner";

const branches = [
  {
    id: "aiml",
    title: "AIML",
    icon: "🤖",
    image: "/AIML.png",
    href: "/materials/btech/aiml",
  },
  {
    id: "automobile",
    title: "AUTOMOBILE",
    icon: "🚗",
    image: "/AUTOMOBILE.png",
    href: "/materials/btech/automobile",
  },
  {
    id: "cce",
    title: "CCE",
    icon: "💻",
    image: "/CCE.png",
    href: "/materials/btech/cce",
  },
  {
    id: "cse",
    title: "CSE",
    icon: "🖥️",
    image: "/CSE.png",
    href: "/materials/btech/cse",
  },
  {
    id: "cybersecurity",
    title: "CYBER SECURITY",
    icon: "📊",
    image: "/CYBERSEC.png",
    href: "/materials/btech/cybersecurity",
  },
  {
    id: "dse",
    title: "DSE",
    icon: "📊",
    image: "/DSE.png",
    href: "/materials/btech/dse",
  },
  {
    id: "ece",
    title: "ECE",
    icon: "⚡",
    image: "/ECE.png",
    href: "/materials/btech/ece",
  },
   {
    id: "elc",
    title: "Electrical and Computer",
    icon: "⚡",
    image: "/elc.jpg",
    href: "/materials/btech/elc",
  },
  {
    id: "iot",
    title: "IOT",
    icon: "🌐",
    image: "/IOT.png",
    href: "/materials/btech/iot",
  },
  {
    id: "it",
    title: "IT",
    icon: "💾",
    image: "/IT.png",
    href: "/materials/btech/it",
  },
  {
    id: "mechanical",
    title: "MECHANICAL",
    icon: "⚙️",
    image: "/MECHANICAL.png",
    href: "/materials/btech/mechanical",
  },
  {
    id: "mechatronics",
    title: "MECHATRONICS",
    icon: "🔧",
    image: "/MECHATRONICS.png",
    href: "/materials/btech/mechatronics",
  },
];

export default function BTechBranches() {
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
        {/* Header */}
        <header className="flex flex-col gap-5 text-center mx-auto lg:max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            <span className="animate-word-1 inline-block text-zinc-900">Explore</span>
            {" "}
            <span className="animate-word-2 inline-block text-gradient-orange-underline">BTech</span>
            {" "}
            <span className="animate-word-3 inline-block text-zinc-900">Branches</span>
          </h1>
          <HiringBanner />
          <p className="animate-fade-in-up text-sm leading-relaxed text-zinc-600 sm:text-base">
            Select your engineering branch to access curated study materials, notes, and resources.
          </p>
        </header>

        {/* Branches Grid */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((branch) => (
            <Link
              key={branch.id}
              href={branch.href}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white text-zinc-800 shadow-lg shadow-gray-900/5 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-orange-500 hover:shadow-orange-100/50"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={branch.image}
                  alt={branch.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-zinc-900/0" aria-hidden="true" />
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-900">
                  {branch.icon} {branch.title}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-semibold leading-tight text-zinc-900 group-hover:text-orange-600 transition-colors duration-200">
                    {branch.title}
                  </h2>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 transition-colors duration-200 group-hover:text-orange-600">
                    View resources
                    <span aria-hidden="true">&gt;</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 self-center rounded-full border border-white/15 bg-zinc-900/80 px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-zinc-900"
        >
          &larr; Back to Home
        </Link>
      </main>
    </div>
  );
}
