"use client";

import Link from "next/link";
import { useState } from "react";
import DriveFolderBrowser from "@/app/components/DriveFolderBrowser";
import PDFViewerModal from "@/app/components/PDFViewerModal";
import PPTViewerModal from "@/app/components/PPTViewerModal";
import { extractFileId } from "@/lib/googleDrive";

const subjects = [
  {
    id: "engineering-physics",
    title: "Engineering Physics",
    image: "/physics-ep.png",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1cdiHPynlmRHmneEPs7P6EV1DB7wzQGsh?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/17txyc5ZmKvQepWdVK1TCnJQgxaoou6Ke?usp=drive_link" },
      { label: "Video Playlists", href: "https://www.youtube.com/watch?v=cFxKviofjtk&list=PLcNkMHAVJZr7RpsuabjxKgd7awmRZdBg7" },
      { label: "Roadmap", href: "https://drive.google.com/file/d/1tMWeeRZ-9qhmQ0hoMlngzVmXSei-wotk/view?usp=sharing" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1vLEnibhuw07qeEWdmO3hHFX2VIqULpvh?usp=drive_link" },
    ],
  },
  {
    id: "computational-mathematics",
    title: "Computational Mathematics",
    image: "/physics-cm.png",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1E9xiBOD7h4fPZmhdEPcgHbdfMCQFJShj?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1uwQXdisM65p-Th-sUXc1TPh-X1mi8EbB?usp=drive_link" },
      { label: "Video Playlists", href: "https://www.youtube.com/watch?v=oiV7I8xQ4sU&list=PLcNkMHAVJZr6mvvy1gKioOY0R-8pq9u0-" },
      { label: "Roadmap", href: "https://drive.google.com/file/d/1LA8-hkDjSbpyNv7B4r8714hQXdXXzRnf/view?usp=sharing" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1WczQcbVvPcB294Jy3MjXcU_5u_-mbZMK?usp=drive_link" },
    ],
  },
  {
    id: "psuc",
    title: "PSUC",
    image: "/psuc.png",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1uCD8YvS2FX9jSoSpuRSvkeNMPVzXvg29?usp=sharing" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1sg0akPy_zBDDKiWKU_8pmuOTLlgyNtkq?usp=drive_link" },
      { label: "Video Playlists", href: "https://www.youtube.com/watch?v=aZb0iu4uGwA&t=8493s" },
      { label: "Roadmap", href: "https://drive.google.com/file/d/1z157mHPpnqS9nuAURS0gR14bUGUt7Cap/view?usp=sharing" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1QPtxeD2dVPCtpEcm3BX_G6vcyC8Wvyj8?usp=drive_link" },
    ],
  },
  {
    id: "wcs",
    title: "WCS",
    image: "/physics-wcs.png",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1UU1oz91PhMZ5l2EdY9biGW7y6NorYtuo?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1k9ByGWxq_vYW9qqd5I8D_hIfe8p2QN2p?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: " https://drive.google.com/drive/folders/1DcBG73Oy-yFUONh1-IiTtcnGGHjdThPN?usp=drive_link" },
    ],
  },
  {
    id: "evs",
    title: "EVS",
    image: "/physics-evs.png",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1hQJghqn4Vf-QaqwhguMY4ftBO7eW8VHD?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1cgnHpUK_ETAGC0GGl8IwZABdXvyjhMP7?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1jQLTV6Ja396boqgfkMEaah7Seux3YE7Z?usp=drive_link" },
    ],
  },
  {
    id: "biology-for-engineers",
    title: "Biology for Engineers",
    image: "/physics-bio.png",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1jxiFP_HFpCYDSPb2hwd2wJHZrYbgqPPz?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1a1onO670Zw09Ko-PNrISSzP97AI1xZSl?usp=drive_link"},
      { label: "Video Playlists", href: "https://www.youtube.com/watch?v=mi--nGzvIT0&list=PLcNkMHAVJZr4IJFQ_PJSPnoJLjk-_CQzF" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1JgGFDWvFm9N3Ur8K8-ylwTEKR55RqwNq?usp=drive_link" },
    ],
  },
  {
    id: "MATLAB",
    title: "MATLAB",
    image: "/physics-matlab.png",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/u/0/folders/1d75bxh_L7JvAKNheNZ3c6YOeqikO1CTB" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/u/0/folders/1VVt2FfnbjhGTebrL7ditH--K_BfWMJZa" },
      { label: "Video Playlists", href: "https://www.youtube.com/playlist?list=PLB_MQaW6Rcut-VLlP29zTzka8hs24bqJ9" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1A6qZYx7bSjd2DpnLz4XRFOkA0YajIaDm" },
    ],
  },
  {
    id: "Engineering Materials and Mechanics",
    title: "Engineering Materials and Mechanics",
    image: "/physics-emm.png",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/u/0/folders/1w54A2Vd87DQtFwEoUuy8m0nX9rANb4RA" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/u/0/folders/1nxBvjZVxG2QL4W_B8skkg4z-VYibmF7n" },
      { label: "Video Playlists", href: "https://www.youtube.com/playlist?list=PLB_MQaW6RcutYOUEk_7Je8K-Z3ixz_4TS" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1WonGMHUbrQ_LnZrF024GMbiYZxuNUk_Z" },
    ],
  },
  {
    id: "DV",
    title: "Data Visualization",
    image: "/DV.png",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1icdRleVL_OB6mx2Mj3dZAwEwDC0JxM2Z?usp=drive_link" },
      { label: "Topper Notes", href: "" },
      { label: "Video Playlists", href: "https://www.youtube.com/watch?v=leXt9btuyEY&list=PLcNkMHAVJZr4AsmftTx5slMud108TW52Q" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "" },
    ],
  },
  {
    id: "FDS",
    title: "Fundamentals of Data Structures",
    image: "/FDS.png",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1Mgft8Oi7PmlsmKSjqeckIemCeQIkJsFU?usp=drive_link" },
      { label: "Topper Notes", href: "" },
      { label: "Video Playlists", href: "https://www.youtube.com/watch?v=xLetJpcjHS0&list=PLcNkMHAVJZr6lHF_d9UqX9gD-jOzuZTHB" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1xselz6CvZGbDxyR6mqXJPdWCyNtWjWzn?usp=drive_link" },
    ],
  },
  {
    id: "ET",
    title: "Electrical Technology",
    image: "/ET.png",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/17VytjjVlUCyV5tkcBIVB1voVufQ5gQBz?usp=drive_link" },
      { label: "Topper Notes", href: "" },
      { label: "Video Playlists", href: "" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "" },
    ],
  },
  {
    id: "AM1",
    title: "Applied Mathematics 1",
    image: "/AM1.png",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1MvhGP7ida4115J-dwY3mHMJkQYo4R8Wo?usp=drive_link" },
      { label: "Topper Notes", href: "" },
      { label: "Video Playlists", href: "" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1N-OqAd4b_vFHvxoqLBKSpDJ3urRlsqJc?usp=drive_link" },
    ],
  },
];

export default function PhysicsCycleSubjects() {
  const [openSubject, setOpenSubject] = useState(null);
  const [browsing, setBrowsing] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPPT, setSelectedPPT] = useState(null);

  const handleResourceClick = (resource, subjectId) => {
    const folderId = extractFileId(resource.href);
    
    if (folderId && resource.href.includes('drive.google.com')) {
      setBrowsing({ 
        subjectId, 
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
        <header className="flex flex-col gap-5 text-center mx-auto lg:max-w-3xl">
          <span className="inline-flex items-center justify-center gap-2 self-center rounded-full border border-white/15 bg-zinc-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur">
            Physics Cycle
          </span>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            <span className="animate-word-1 inline-block text-zinc-900">Pick</span>
            {" "}
            <span className="animate-word-2 inline-block text-zinc-900">Your</span>
            {" "}
            <span className="animate-word-3 inline-block text-gradient-orange-underline">Subject</span>
            {" "}
            <span className="animate-word-4 inline-block text-zinc-900">And Dive Into The Resources</span>
          </h1>
          <p className="animate-fade-in-up text-sm leading-relaxed text-zinc-600 sm:text-base">
            Handpicked PDFs, PYQs, slide decks, and lab files to keep your cycle prep focussed. Tap a subject to jump straight to the external
            resource listing.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject, index) => {
            // Open upward for last 3 cards (bottom row), downward for first 2
            const isBottomRow = index >= 3;
            
            return (
            <article
              key={subject.id}
              onClick={() => setOpenSubject((prev) => (prev === subject.id ? null : subject.id))}
              className={`relative flex h-full flex-col overflow-visible rounded-3xl border border-gray-200 bg-white text-zinc-800 shadow-lg shadow-gray-900/5 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-orange-500 hover:shadow-orange-100/50 cursor-pointer ${openSubject === subject.id ? "z-30" : "z-0"}`}
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
                <img
                  src={subject.image}
                  alt={subject.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-zinc-900/0" aria-hidden="true" />
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-900">
                  📚 {subject.title}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-6 p-8">
                <h2 className="text-xl font-semibold leading-tight text-zinc-900">
                  {subject.title}
                </h2>
                <button
                  type="button"
                  className="flex items-center justify-between gap-3 rounded-2xl border border-orange-200 bg-orange-50/50 px-4 py-3 text-sm font-semibold text-zinc-700 transition duration-200 hover:border-orange-400 hover:bg-orange-50"
                >
                  <span>Resource bundles</span>
                  <span className={`text-xs font-semibold uppercase tracking-wide transition ${openSubject === subject.id ? "text-orange-600" : "text-zinc-500"}`}>
                    {openSubject === subject.id ? "Hide" : "View"}
                  </span>
                </button>
              </div>
              {openSubject === subject.id && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute left-6 right-6 z-40 duration-200 ${
                  isBottomRow 
                    ? 'bottom-[calc(40%-1rem)] animate-in fade-in slide-in-from-bottom-2' 
                    : 'top-[calc(95%-1rem)] animate-in fade-in slide-in-from-top-2'
                }`}>
                  <div className="rounded-2xl border border-zinc-200 bg-white/95 p-4 text-sm text-zinc-700 shadow-xl shadow-zinc-900/10 backdrop-blur">
                    <ul className="space-y-2">
                      {subject.resources.map((resource) => (
                        <li
                          key={resource.label}
                          onClick={() => handleResourceClick(resource, subject.id)}
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
          href="/materials/first-year"
          className="inline-flex w-fit items-center gap-2 self-center rounded-full border border-white/15 bg-zinc-900/80 px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-zinc-900"
        >
          &larr; Back to cycles overview
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
