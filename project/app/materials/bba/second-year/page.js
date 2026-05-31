"use client";

import Link from "next/link";
import { useState } from "react";
import DriveFolderBrowser from "@/app/components/DriveFolderBrowser";
import PDFViewerModal from "@/app/components/PDFViewerModal";
import PPTViewerModal from "@/app/components/PPTViewerModal";
import { extractFileId } from "@/lib/googleDrive";

const subjects = [
  {
    id: "advertising-management",
    title: "Advertising Management",
    image: "https://lh3.googleusercontent.com/d/1t0zjqp3vjGiziXUsyM9h37akGJhfjg0K",
    href: "https://drive.google.com/drive/folders/1JhFS_M_K4uejbSJIxh3FPtYU-6UgHjdk",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1-d4cdyNU8QTy0zXFzHfLPZQ7J-XVhupD?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1xkOFVjbJYOjzZh8RnGx6ybnwiFp1zwV5?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/11GvYtG44ZzAhLFYWcShYxDE6HmNTL38t?usp=drive_link" },
    ],
  },
  {
    id: "brm",
    title: "BRM",
    image: "https://lh3.googleusercontent.com/d/1ETbMC28ETUN6lGgBPoOgjkcIrjOBvGif",
    href: "https://drive.google.com/drive/folders/1JhFS_M_K4uejbSJIxh3FPtYU-6UgHjdk",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1Fr_PEe-dhebD_0tAvEy-RsrpmGl9E_1x?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1Hs-RfwcRcoawSRXy32IK2yblM3wRIvut?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1ojeCFdcklxXhuDwSFcyUx4hxqDxtVZoH?usp=drive_link" },
    ],
  },
  {
    id: "consumer-behaviour",
    title: "Consumer Behaviour",
    image: "https://lh3.googleusercontent.com/d/1p9Of028aN6aVlCKUBVrhkAzdlQ3NYhBL",
    href: "https://drive.google.com/drive/folders/1JhFS_M_K4uejbSJIxh3FPtYU-6UgHjdk",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1SLWjexd6yeUtW7FQcOvkYTZe2lEAR2fu?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1G4aipLEwHVd438dXJVF158W4FShX0E9y?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1Adim1xXzsKYnIsXiMXcAo1eK4e18gSvr?usp=drive_link" },
    ],
  },
  {
    id: "corporate-law",
    title: "Corporate Law",
    image: "https://lh3.googleusercontent.com/d/1_f-AVJ6G9ebgd_uZMMAVpa5xecqekoEE",
    href: "https://drive.google.com/drive/folders/1JhFS_M_K4uejbSJIxh3FPtYU-6UgHjdk",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1WNXBCMkwHEHY4DzN6jofJujbn1pxi4UZ?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/18-RAwLmzhimp4ekc4c99afCjlRoZmCkY?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/168Pbqffu0Apo5_os4zoipOeODMnrCh7Z?usp=drive_link" },
    ],
  },
  {
    id: "crm",
    title: "CRM",
    image: "https://lh3.googleusercontent.com/d/1Atp0kCQyZoj33neElP9f2-iInkKEVfsy",
    href: "https://drive.google.com/drive/folders/1JhFS_M_K4uejbSJIxh3FPtYU-6UgHjdk",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/13gBjXJOA73q4NfUCuHANivEDJ74qn0SN?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1oQePmqqsI-MjP_Miitxb8HCIj6SQM5ZQ?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1_h4OO9dGcI-UVGNDIz4fLi00OkTTIN9L?usp=drive_link" },
    ],
  },
  {
    id: "english-sem2",
    title: "English Sem 2",
    image: "https://lh3.googleusercontent.com/d/1p6PnsT0FGh1801nHf6E_INS3x-bGqyht",
    href: "https://drive.google.com/drive/folders/1JhFS_M_K4uejbSJIxh3FPtYU-6UgHjdk",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1Z7cmFSgASYy8z5eHdNL1dFKT12Otb9uR?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1JnLPL34LhPeWThl9_pF-_WYRDbXrooR8?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1-vxJVjuCp4twhUu8TJj7Q5C_emdrdjxZ?usp=drive_link" },
    ],
  },
  {
    id: "evs",
    title: "EVS",
    image: "https://lh3.googleusercontent.com/d/1fC03trFyiq4_laftnwfPbJ8OR8uCJMU_",
    href: "https://drive.google.com/drive/folders/1JhFS_M_K4uejbSJIxh3FPtYU-6UgHjdk",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1wyEtlKPkaUOcG5PhM1Zf0Xwl4BZpR4hm?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1fDc4yhnxD9Q5qgHiI9oFG64ZoYZjEJZm?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1InrzGu2q3hBWA9snQHop48-awaB7N5dI?usp=drive_link" },
    ],
  },
  {
    id: "excel",
    title: "Excel",
    image: "https://lh3.googleusercontent.com/d/1okuvIEE_6vQaE80qOcZgp8LNr2sGEAF8",
    href: "https://drive.google.com/drive/folders/1JhFS_M_K4uejbSJIxh3FPtYU-6UgHjdk",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1sGlo5xqZcwzjym1RIBQAz2f0lIHFq7QD?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1URIMb9IVWl5GxFmlWwcTrLtHdz1quO2l?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1vZQNmIMXsqNxYD-zC-Ecdsi6f0ZvY0G0?usp=drive_link" },
    ],
  },
  {
    id: "french",
    title: "French",
    image: "https://lh3.googleusercontent.com/d/1v5ioVv92PYaWWXhVHqZ9lNaLGms97Q1F",
    href: "https://drive.google.com/drive/folders/1JhFS_M_K4uejbSJIxh3FPtYU-6UgHjdk",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1yGYgUBdC5SH3yxPSLF6qGco8xW-Lj3Fm?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1y2AuantYCmxDpfFEfUMjnZiNSn7ccKM4?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1U9cUhMSB3a1ygtgI1RInf1NqAAXLrG0N?usp=drive_link" },
    ],
  },
  {
    id: "management-accounting",
    title: "Management Accounting",
    image: "https://lh3.googleusercontent.com/d/1jrv0W8A0eEsRUfZwucS0LlDhs2EikB6Y",
    href: "https://drive.google.com/drive/folders/1JhFS_M_K4uejbSJIxh3FPtYU-6UgHjdk",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1rmIIVEULxlGMgQYXSIzgJUygV5BEnVXQ?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1aj44riWbr5OnJLuhye-XV0Y6TaAMgxHy?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/10cDdEiTgUWWw6hbQYqysBUn0nFhdhCUn?usp=drive_link" },
    ],
  },
  {
    id: "marketing-of",
    title: "Marketing of Services",
    image: "https://lh3.googleusercontent.com/d/1VJtpO6pgv7FwAhbMUifbv0nJ78nhRjOx",
    href: "https://drive.google.com/drive/folders/1JhFS_M_K4uejbSJIxh3FPtYU-6UgHjdk",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1GidMSW2xZxiJq_XmjRFune0-uLBnBOW7?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1nzt67jMtneYHRM8yaBg0_LaQ2BkaAxCp?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/16ejr3Xnl-bhZsMqaGw4B_7YekmLShYFf?usp=drive_link" },
    ],
  },
  {
    id: "marketing-research",
    title: "Marketing Research",
    image: "https://lh3.googleusercontent.com/d/1Q4lURQbB948XezFFgltdF8jhYJh5u0tq",
    href: "https://drive.google.com/drive/folders/1JhFS_M_K4uejbSJIxh3FPtYU-6UgHjdk",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1qfL1JxRvMqB67WyKZflmJsYcuUQ5CK8d?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/19KvIqKowP-86G4TacRpeZ2sTPGjnHSSQ?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1gtHL2JDRvwqKwtUs0K4yX-oZTOgNuDRp?usp=drive_link" },
    ],
  },
  {
    id: "product-brand",
    title: "Product Brand Management",
    image: "https://lh3.googleusercontent.com/d/1jzWagHYTvUuMzUklcaVc8f2KcZe5koWh",
    href: "https://drive.google.com/drive/folders/1JhFS_M_K4uejbSJIxh3FPtYU-6UgHjdk",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1HyAGtdhi5UZx7wL8lPJP56GCkU4F7f9K?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1fW1YMxh7uRkbcMqE-ioE8l1PzRM0JaKc?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1SV9gBejlmHG4L9qdFEEOX9lMSIMPlvfB?usp=drive_link" },
    ],
  },
  {
    id: "productions",
    title: "Productions and Operations Management",
    image: "https://lh3.googleusercontent.com/d/1cEdWh-igtkDrOK5mvPz2QNKsP7FagC7-",
    href: "https://drive.google.com/drive/folders/1JhFS_M_K4uejbSJIxh3FPtYU-6UgHjdk",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1TgVuCn4F6CM_byzlbQw66ImFbmWPh2Us?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1VQ3Bg3Omq01t_1QE9Cyv9tnyYfo790nP?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1T8nRJJ2d-RFRT0TIfbmNmKNSu16xQfyK?usp=drive_link" },
    ],
  },
  {
    id: "project-planning",
    title: "Project Planning and Control",
    image: "https://lh3.googleusercontent.com/d/1IWbHgQytZ97xmeHJLOdhPLpptOQMcepe",
    href: "https://drive.google.com/drive/folders/1JhFS_M_K4uejbSJIxh3FPtYU-6UgHjdk",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1ea4MZdtiUuR3oP1FozFHQBVowP0n10Ru?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1T6ayXHbXUlw0zvwfriMjv1CpzY-Q7NlT?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1oIs-rpAvHrIpsb07MqgVpnceTehutUD6?usp=drive_link" },
    ],
  },
  {
    id: "statistics",
    title: "Statistics",
    image: "https://lh3.googleusercontent.com/d/1PDx7jugft-8pAzcNRvKkCZOS_irLtL9g",
    href: "https://drive.google.com/drive/folders/1JhFS_M_K4uejbSJIxh3FPtYU-6UgHjdk",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1CVntJllbA1qVGL15U7f0DxB1LJgsYrV5?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1SPt5sTSFjWFyujB8I_jpeGPsck4eQ68r?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1yGieKcpJKxPMdU7h0mhlzgkM1k5QlEhX?usp=drive_link" },
    ],
  },
];

export default function BBASecondYearSubjects() {
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
        <header className="flex flex-col gap-5 text-center lg:max-w-3xl lg:text-left">
          <span className="inline-flex items-center justify-center gap-2 self-center rounded-full border border-white/15 bg-zinc-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur lg:self-start">
            BBA Second Year
          </span>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            <span className="animate-word-1 inline-block text-zinc-900">Pick Your</span>
            {" "}
            <span className="animate-word-2 inline-block text-gradient-orange-underline">Subject</span>
            {" "}
            <span className="animate-word-3 inline-block text-zinc-900">And Dive Into</span>
            {" "}
            <span className="animate-word-4 inline-block text-zinc-900">The Resources</span>
          </h1>
          <p className="animate-fade-in-up text-sm leading-relaxed text-zinc-600 sm:text-base">
            Handpicked PDFs, PYQs, slide decks, and study materials to keep your BBA prep focused. Tap a subject to jump straight to the external resource listing.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject, index) => {
            // Open upward for bottom row cards
            const isBottomRow = index >= subjects.length - 3;
            
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
          href="/materials/bba"
          className="inline-flex w-fit items-center gap-2 self-center rounded-full border border-white/15 bg-zinc-900/80 px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-zinc-900 lg:self-start"
        >
          &larr; Back to BBA years
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
