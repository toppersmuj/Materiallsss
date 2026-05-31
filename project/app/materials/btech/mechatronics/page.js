"use client";

import Link from "next/link";
import { useState } from "react";
import DriveFolderBrowser from "@/app/components/DriveFolderBrowser";
import PDFViewerModal from "@/app/components/PDFViewerModal";
import PPTViewerModal from "@/app/components/PPTViewerModal";
import { extractFileId } from "@/lib/googleDrive";

const years = [
  {
    id: "2nd-year",
    icon: "📚",
    title: "2nd Year",
    image: "https://lh3.googleusercontent.com/d/1XwwqRAAplENuLs43SSNAnd9Z9n-M8rN3",
    description: "Core engineering courses and fundamentals with curated lecture notes and PYQs.",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1RVDOTH3it7v1xi2TO2hM1r_HPkoGsyml?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1OURtiht9nIJJuxxE6zioqny9RdW1TmUI?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/14Ry_g28-fDcocOxl3qewuiUxB4-7NEuX?usp=drive_link" },
    ],
  },
  {
    id: "3rd-year",
    icon: "📈",
    title: "3rd Year",
    image: "https://lh3.googleusercontent.com/d/1cI7vkYb3k7DkKcoDY_7auDnQ9f7QImIM",
    description: "Advanced topics, specialization courses, and project-based learning materials.",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/16iYECMobLiEJstuOP3QrcXfF6Y9mh0lL?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1hmcy90QhWRriKtCyix3063V4r4a2QwJm?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "/coming-soon" },
    ],
  },
  {
    id: "4th-year",
    icon: "🎓",
    title: "4th Year",
    image: "https://lh3.googleusercontent.com/d/1xLPmD47Q-mmDOuM0zt_Vu4hCwfDHJWl5",
    description: "Final year projects, placement prep, and advanced elective course materials.",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1kbaZlgIFlL8kHTdI642AhnvRPLnolfXO?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1o4CNmwMHq2CI-xiNJ_y96ju2no5FEi2O?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "/coming-soon" },
    ],
  },
];

export default function MECHATRONICSPage() {
  const [openYear, setOpenYear] = useState(null);
  const [browsing, setBrowsing] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPPT, setSelectedPPT] = useState(null);

  const handleResourceClick = (resource, yearId) => {
    const folderId = extractFileId(resource.href);
    
    if (folderId && resource.href.includes('drive.google.com')) {
      setBrowsing({ 
        yearId, 
        resourceLabel: resource.label, 
        folderId 
      });
    } else if (resource.href.startsWith('/')) {
      window.location.href = resource.href;
    } else {
      window.open(resource.href, '_blank');
    }
  };

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
            <span className="animate-word-2 inline-block text-gradient-orange-underline">MECHATRONICS</span>
            {" "}
            <span className="animate-word-3 inline-block text-zinc-900">Years</span>
          </h1>
          <p className="animate-fade-in-up text-sm leading-relaxed text-zinc-600 sm:text-base">
            Pick your year and dive into curated mechatronics engineering study resources, notes, and more.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {years.map((year, index) => {
            // 2nd year (index 0) and 3rd year (index 1) should open upward
            const isBottomRow = index >= 0;
            
            return (
            <article
              key={year.id}
              onClick={() => setOpenYear((prev) => (prev === year.id ? null : year.id))}
              className={`relative flex h-full flex-col overflow-visible rounded-3xl border border-gray-200 bg-white text-zinc-800 shadow-lg shadow-gray-900/5 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-orange-500 hover:shadow-orange-100/50 cursor-pointer ${openYear === year.id ? "z-30" : "z-0"}`}
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
                <img src={year.image} alt={year.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-zinc-900/0" aria-hidden="true" />
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-900">
                  {year.icon} {year.title}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-6 p-8">
                <h2 className="text-xl font-semibold leading-tight text-zinc-900">
                  {year.title}
                </h2>
                <button
                  type="button"
                  className="flex items-center justify-between gap-3 rounded-2xl border border-orange-200 bg-orange-50/50 px-4 py-3 text-sm font-semibold text-zinc-700 transition duration-200 hover:border-orange-400 hover:bg-orange-50"
                >
                  <span>Resource bundles</span>
                  <span className={`text-xs font-semibold uppercase tracking-wide transition ${openYear === year.id ? "text-orange-600" : "text-zinc-500"}`}>
                    {openYear === year.id ? "Hide" : "View"}
                  </span>
                </button>
              </div>
              
              {openYear === year.id && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute left-6 right-6 z-40 duration-200 ${
                  isBottomRow 
                    ? 'bottom-[calc(40%-1rem)] animate-in fade-in slide-in-from-bottom-2' 
                    : 'top-[calc(95%-1rem)] animate-in fade-in slide-in-from-top-2'
                }`}>
                  <div className="rounded-2xl border border-zinc-200 bg-white/95 p-4 text-sm text-zinc-700 shadow-xl shadow-zinc-900/10 backdrop-blur">
                    <ul className="space-y-2">
                      {year.resources.map((resource) => (
                        <li
                          key={resource.label}
                          onClick={() => handleResourceClick(resource, year.id)}
                          className="group flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 transition duration-200 hover:bg-orange-50"
                        >
                          <span className="transition-colors duration-200 group-hover:text-zinc-900">
                            {resource.label}
                          </span>
                          <span
                            className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700 transition-colors duration-200 group-hover:text-orange-600"
                          >
                            Open
                            <span aria-hidden="true">&gt;</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </article>
            );
          })}
        </section>

        <Link
          href="/materials/btech"
          className="inline-flex w-fit items-center gap-2 self-center rounded-full border border-white/15 bg-zinc-900/80 px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-zinc-900"
        >
          &larr; Back to BTech branches
        </Link>
      </main>

      {/* Drive Folder Browser Modal */}
      {browsing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/90 backdrop-blur-sm">
          <div className="relative w-full h-full max-w-5xl max-h-screen p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 bg-white rounded-t-2xl p-4 shadow-lg">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-zinc-900">
                  {browsing.resourceLabel}
                </h2>
                <p className="text-sm text-zinc-500">Browse folders and files</p>
              </div>
              <button
                onClick={() => setBrowsing(null)}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold transition"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="bg-white rounded-b-2xl shadow-2xl p-6 h-[calc(100%-5rem)] overflow-y-auto">
              <DriveFolderBrowser 
                folderId={browsing.folderId}
                onFileClick={(file) => setSelectedFile(file)}
                onPPTClick={(file) => setSelectedPPT(file)}
              />
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {selectedFile && (
        <PDFViewerModal 
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}

      {/* PPT Viewer Modal */}
      {selectedPPT && (
        <PPTViewerModal 
          file={selectedPPT}
          onClose={() => setSelectedPPT(null)}
        />
      )}
    </div>
  );
}
