"use client";

import Link from "next/link";
import { useState } from "react";
import DriveFolderBrowser from "@/app/components/DriveFolderBrowser";
import PDFViewerModal from "@/app/components/PDFViewerModal";
import PPTViewerModal from "@/app/components/PPTViewerModal";
import { extractFileId } from "@/lib/googleDrive";

const subjects = [
  {
    id: "accounts",
    title: "Accounts",
    image: "https://lh3.googleusercontent.com/d/1E-eT1SWNIpztu-f-6jIuJzZc0Gwt9oMj",
    href: "https://drive.google.com/drive/folders/1-lbhsFfH45u04Ysd5YtkJtMres_1J5Ni",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1ctyItzOxUfkHsvnqbEKCLoXS-5n1sg6E?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1vUHLnpNx89_wC3BruGECsaLdI8GPlHB5?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1cI3ur9If9YSPJ4Ft_v7zHi_RrOfilmjB?usp=drive_link" },
    ],
  },
  {
    id: "business-communication",
    title: "Business Communication",
    image: "https://lh3.googleusercontent.com/d/1qOiLjF2AIJ3ySnwznArqGa7QVUKuPJRG",
    href: "https://drive.google.com/drive/folders/1-lbhsFfH45u04Ysd5YtkJtMres_1J5Ni",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1TxjYgO6Nyzkb58ycG8bWMSMw_R-25VrP?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1B_t9AXxDgXH5dLiet-Xu1b-ziDKi75tM?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1pTpJgRYEzIhYSZcY-b9SmZoddMSZ1NXv?usp=drive_link" },
    ],
  },
  {
    id: "business-laws",
    title: "Business Laws",
    image: "https://lh3.googleusercontent.com/d/1eEz40YuMIfwCMVb2yPwt3QUotoauJw3j",
    href: "https://drive.google.com/drive/folders/1-lbhsFfH45u04Ysd5YtkJtMres_1J5Ni",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1a0Pz7WhrMXb8YEVq__Uu-qUPpsfogCJa?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1NMgb2S5iQo4KTaDSypG-evarqOOkw1pM?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/119GXTgRBujdiPMLGOBlY1Fc7mrM7XxUM?usp=drive_link" },
    ],
  },
  {
    id: "business-studies",
    title: "Business Studies",
    image: "https://lh3.googleusercontent.com/d/1MDUuGseYkLkV3dFk4LjJriA1uIdQVfPl",
    href: "https://drive.google.com/drive/folders/1-lbhsFfH45u04Ysd5YtkJtMres_1J5Ni",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1Pod_MOeqVoVJZxM_s4yx1xPzan9RqHJ-?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1zKMcLhFZU6CDiKkqMF3QZmCrT2n5zonT?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1Rl2dGdC3pxwRD7FQE-tr6Zh0cYUltqKx?usp=drive_link" },
    ],
  },
  {
    id: "computer",
    title: "Computer",
    image: "https://lh3.googleusercontent.com/d/1LMNTrqyfJ2x7qMcpu-YF7PFoRQjLvtCz",
    href: "https://drive.google.com/drive/folders/1-lbhsFfH45u04Ysd5YtkJtMres_1J5Ni",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1HDs4_1IUV_yZDsBZe8MPsRJ0urQfF40u?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1ikAC8cdfIAIF5vA50LDQ_Lg2rGeYue0a?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1mH8rC7APUbWisUMYFHMyLQm_A5OLcNaM?usp=drive_link" },
    ],
  },
  {
    id: "cost-accounting",
    title: "Cost Accounting",
    image: "https://lh3.googleusercontent.com/d/12972_yjSOI-AXOjxMgB3Ftw5uWXw2-Vo",
    href: "https://drive.google.com/drive/folders/1-lbhsFfH45u04Ysd5YtkJtMres_1J5Ni",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1QgCl_NJwB1A-93LVKuB6nYDBWBGl99QK?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/18hHfQAf2aMcBdMBoAaf84282fv3JvV37?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1aCYrg_khOqPMYQNonCoysDDJqRfKoDC9?usp=drive_link" },
    ],
  },
  {
    id: "economics",
    title: "Economics",
    image: "https://lh3.googleusercontent.com/d/1K8S1VUf1tHXVLWCK7Lf2csFCEz4yafQE",
    href: "https://drive.google.com/drive/folders/1-lbhsFfH45u04Ysd5YtkJtMres_1J5Ni",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1rCoVgB5YoRiwhM4b2pbB-yH9tP815wvD?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1Lboj719g0MwmL1GRVuoE3MnwG7Ysz2xb?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1Ll37qx2jILiida4PbZy_XCUF-kNZQL21?usp=drive_link" },
    ],
  },
  {
    id: "english-sem1",
    title: "English Sem 1",
    image: "https://lh3.googleusercontent.com/d/1p6PnsT0FGh1801nHf6E_INS3x-bGqyht",
    href: "https://drive.google.com/drive/folders/1-lbhsFfH45u04Ysd5YtkJtMres_1J5Ni",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1eEAm3AEI0v2xoim8mbOY5FkEx0apK_X0?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1kYsWXzEYLeTBNbJ6Lm-04b1L1oSAPOe1?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1EIEU5XTJLa8iV13nombOeo8pM49tGQyR?usp=drive_link" },
    ],
  },
  {
    id: "financial",
    title: "Financial Management",
    image: "https://lh3.googleusercontent.com/d/1InzgQ-cubIw8BE4y2WxH4jJ9kREXgp-v",
    href: "https://drive.google.com/drive/folders/1-lbhsFfH45u04Ysd5YtkJtMres_1J5Ni",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1x-Gcf80FUocm2XO59GGCLaKHox-hRR3O?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1GJXpG9KR3xjWZ-tWo0u-DTpzQrJrVULR?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1cGq2N8Mfpo4apMlsdPHoFlP0C6RbbU5k?usp=drive_link" },
    ],
  },
  {
    id: "human-resource",
    title: "Human Resource Management",
    image: "https://lh3.googleusercontent.com/d/1k1OGrCBJ_d_HfzBeOp4GtlcZTgiLlrUy",
    href: "https://drive.google.com/drive/folders/1-lbhsFfH45u04Ysd5YtkJtMres_1J5Ni",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1ZbIl__qGEN6Cw3g7nb7D78abmN5EYHCW?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/12bwTRlMTiaZa9tbPdfFuiSH-axp1NvEs?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/10ZgjPrj8vJvRk_EDg2QG3fBITIXLPovZ?usp=drive_link" },
    ],
  },
  {
    id: "macro-economics",
    title: "Macro Economics",
    image: "https://lh3.googleusercontent.com/d/1uLtqzKWON3-g1dTU1pWN4Gsay7LW3Q4D",
    href: "https://drive.google.com/drive/folders/1-lbhsFfH45u04Ysd5YtkJtMres_1J5Ni",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1CnaA1-h2t6WJa6WMA7SuFnUHYBS7Zy4A?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1QEh4xC0uYT66OUEQKB11WCUFH6VLlBqJ?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1zvm1uRgcnO6fOxMCuxp2b8yPW_T1rtnQ?usp=drive_link" },
    ],
  },
  {
    id: "marketing-management",
    title: "Marketing Management",
    image: "https://lh3.googleusercontent.com/d/1jrv0W8A0eEsRUfZwucS0LlDhs2EikB6Y",
    href: "https://drive.google.com/drive/folders/1-lbhsFfH45u04Ysd5YtkJtMres_1J5Ni",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1zVAF9zU9u0AlfxXIC_3cwc7P6oLNe_Mo?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1_9ghXFkcezUJst-6GTmpk-XRkXIE9LYF?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1wICzDiNRcXj8qOq5DaMmqeANwsPYnuVT?usp=drive_link" },
    ],
  },
  {
    id: "value-ethics",
    title: "Value Ethics and Management",
    image: "https://lh3.googleusercontent.com/d/1zGB0e5qQA_xlyelu9v6cP4wkN00ahi0D",
    href: "https://drive.google.com/drive/folders/1-lbhsFfH45u04Ysd5YtkJtMres_1J5Ni",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1sRpuIhokVLuh_F4lQHfRUI7brIxs0ddH?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1PVKm-lJn0LAKHN2M8nH4PqkKsTc4u_fF?usp=drive_link" },
      { label: "Video Playlists", href: "/coming-soon" },
      { label: "Roadmap", href: "/coming-soon" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/197is_Wp1p-8dMQTzHnIXVfrw24fDlR5d?usp=drive_link" },
    ],
  },
];

export default function BBAFirstYearSubjects() {
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
            BBA First Year
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
