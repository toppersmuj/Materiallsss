"use client";

import Link from "next/link";
import { useState } from "react";
import DriveFolderBrowser from "@/app/components/DriveFolderBrowser";
import PDFViewerModal from "@/app/components/PDFViewerModal";
import PPTViewerModal from "@/app/components/PPTViewerModal";
import { extractFileId } from "@/lib/googleDrive";

const subjects = [
  {
    id: "bme",
    title: "Basic Mechanical Engineering",
    image: "https://lh3.googleusercontent.com/d/11a5cvbC7YpQn4boHbrh6kPIVUO8xzJuU",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1iFt8KI6RlCJuKmh_eS5BrpZTY9zceAtF?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1LDW0nEprx0ist_bksa1yfVvkkSVUSiVY?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1-b9UqQAlnWScESNJY44U6NHckBK5nXIz?usp=sharing" },
    ],
  },
  {
    id: "cam",
    title: "Calculus And Matrices",
    image: "https://lh3.googleusercontent.com/d/1z5kUxQ7anWM2lZP7xO0Um8FjUnQtp_n9",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/12GoSnbJ23iwIIOpoHXh_D6s7lNGBIZj0?usp=sharing" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1jYUROJAOM8qdC8PV068oBWgNYLFemrSP?usp=sharing" },
      { label: "Video Playlists", href: "https://www.youtube.com/watch?v=p5rBJj5CKCg&list=PLU6SqdYcYsfLPxjd-k-MaoG7qgRQ-2fKc" },
      { label: "Roadmap", href: "https://drive.google.com/file/d/1Z5iIhj5j7em8VY-FNC9xkQUMJl5kX-ld/view?usp=sharing" },
      { label: "PPT Links", href: "/coming-soon" },
    ],
  },
  {
    id: "communication",
    title: "Communication Skills",
    image: "https://lh3.googleusercontent.com/d/1v3a1pK0Z-8M39Qy3lzkKxUx6aNl8bTs4",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1YeLSrKw8RlW4bq8h9xiIL0cm0_XALBsL?usp=sharing" },
      { label: "Topper Notes", href: "/coming-soon" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1huqgnywcxKrFvGrPbJC8RUd1LUfQTlvq?usp=sharing" },
    ],
  },
  {
    id: "digital-systems",
    title: "Digital Systems",
    image: "https://lh3.googleusercontent.com/d/16DCGRHQ47_AONewupSgHI2Bu4AIxlNts",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1yeExodboTvLqQlFLK1HpgUUqB9DCPzw9?usp=sharing" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1cZ-9hZf6qAxPq499xetV_5xkwY0wovf0?usp=drive_link" },
      { label: "Video Playlists", href: "https://www.youtube.com/watch?v=Vd2UJiIPbag&list=PL9RcWoqXmzaLTYUdnzKhF4bYug3GjGcEc" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1yqGjU8dl5qC7oXpLImorqkQOuueFs6Ip?usp=sharing" },
    ],
  },
  {
    id: "eg",
    title: "Engineering Graphics",
    image: "https://lh3.googleusercontent.com/d/1JSy-5VyjEQr0MmWlbmI0kHkUKAWwdL1q",
    resources: [
      { label: "PYQs", href: "/coming-soon" },
      { label: "Topper Notes", href: "/coming-soon" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1aUb1NUHRMYv5NsmD5uMYMKimcqIrPQ6T?usp=sharing" },
    ],
  },
  {
    id: "electronics-circuits",
    title: "Electronics Circuits",
    image: "https://lh3.googleusercontent.com/d/1z85zcd5EZ21t9d4T54gR8_ipA4UwT0dY",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1COX_yd-Rc3P5MVjuvYr6Qj0xpxZL1g8L?usp=sharing" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1WScrhWKFeUoa5SzvWhHtEJCNsD0X3pbv?usp=sharing" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1yeR_8v8ZqD450_rL8koQdaMEq7m8_47f?usp=sharing" },
    ],
  },
  {
    id: "engineering-chemistry",
    title: "Engineering Chemistry",
    image: "https://lh3.googleusercontent.com/d/1MqrNRIk3J15k-rvr1MWGKtDyR5wM0u1b",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1GD1HGrput-7Tuy6QxZtJu8MLQ8xXihcp?usp=sharing" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/18zJ9h_wWpwApCFPuBxh3XZqwJw1coffG?usp=sharing" },
      { label: "Video Playlists", href: "https://www.youtube.com/watch?v=XCZakSI-M0I&list=PLLf6O8XdGj03gLo6znlqJbMzgIgt8tSU1" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/16lzdUUL7USIeFMzqevtAgesfDCpDaO4s?usp=sharing" },
    ],
  },
  {
    id: "manufacturing",
    title: "Manufacturing Process",
    image: "https://lh3.googleusercontent.com/d/1E3PvbXn7CnkhZzVFUjMf4mx55e3TTtGr",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1-yr6RUFYjKx9G2iRFmAIgKgxDj8awZgJ?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1Ktml0qp-4zDY3LnlT_LDm-8-ozf-CYV4?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1TBI82B0G7BVVwra1-wjMX9bmEgAb_qe0?usp=drive_link" },
    ],
  },
  {
    id: "psuc",
    title: "Problem Solving Using Computers",
    image: "https://lh3.googleusercontent.com/d/1qNmcdINQ1sgw6dVt2AaUsF2z3-ucWqNZ",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1uCD8YvS2FX9jSoSpuRSvkeNMPVzXvg29?usp=sharing" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1teWpDZeuxAY17BzwD00TMB0QCFdaoDWO?usp=sharing" },
      { label: "Video Playlists", href: "https://youtu.be/aZb0iu4uGwA?si=VZgQb_cPf9gTpxnq" },
      { label: "Roadmap", href: "https://drive.google.com/file/d/1z157mHPpnqS9nuAURS0gR14bUGUt7Cap/view?usp=sharing" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1NFKR4nxD6nRoM06WgRyp6rbZ6GHouUKr?usp=sharing" },
    ],
  },
  {
    id: "uhv",
    title: "Universal Human Values",
    image: "https://lh3.googleusercontent.com/d/1FzEx20wSMwJv31pkTmz5a94PmrpHsZJg",
    resources: [
      { label: "PYQs", href: "/coming-soon" },
      { label: "Topper Notes", href: "/coming-soon" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1X7pOQKOyYhbVjbDxsGBOditmRDqQOyfJ?usp=sharing" },
    ],
  },
];

export default function ChemistryCycleSubjects() {
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
            Chemistry Cycle
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
            // Open upward for last 6 cards (bottom 2 rows), downward for first 4 (top row and second row)
            const isBottomRow = index >= 6;
            
            return (
            <article
              key={subject.id}
              onClick={() => setOpenSubject((prev) => (prev === subject.id ? null : subject.id))}
              className={`relative flex h-full flex-col overflow-visible rounded-3xl border border-gray-200 bg-white text-zinc-800 shadow-lg shadow-gray-900/5 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-orange-500 hover:shadow-orange-100/50 cursor-pointer ${openSubject === subject.id ? "z-30" : "z-0"}`}
            >
              <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
                <img
                  src={subject.image}
                  alt={subject.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-zinc-900/0" aria-hidden="true" />
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-900">
                  📚 Select a Resource
                </span>
              </div>
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
