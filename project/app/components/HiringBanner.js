import { ArrowRight, UsersRound } from "lucide-react";

export default function HiringBanner({ align = "center" }) {
  return (
    <div
      className={`mt-2 flex bg-transparent ${align === "left" ? "justify-center lg:justify-start" : "justify-center"}`}
    >
      <a
        href="https://forms.gle/sZW6rjS3MKKSqsVC9"
        className="inline-flex items-center gap-3 rounded-full bg-orange-500 px-6 py-3 text-base font-semibold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30"
      >
        <UsersRound aria-hidden="true" size={20} strokeWidth={2.5} />
        <span>We&apos;re hiring &mdash; apply by 10th Oct</span>
        <ArrowRight aria-hidden="true" size={21} strokeWidth={2.5} />
      </a>
    </div>
  );
}
