"use client";

import { useEffect, useRef, useState } from "react";
import { getDriveDownloadUrl, getPDFPreviewUrl, getWordPreviewUrl, isPDF, isWordDocument } from "@/lib/googleDrive";

export default function PDFViewerModal({ file, onClose }) {
  const [iframeKey, setIframeKey] = useState(Date.now());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    
    // Handle Escape key
    const handleEscape = (e) => {
      if (e.key === "Escape" && !document.fullscreenElement) onClose();
    };
    document.addEventListener("keydown", handleEscape);

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [onClose]);

  // Reset state when file changes
  useEffect(() => {
    setIframeKey(Date.now());
  }, [file?.id]);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  if (!file) return null;

  const isWordDoc = isWordDocument(file.mimeType);
  const isPdfFile = isPDF(file.mimeType);

  // Use Drive preview - works with view-only permissions
  const previewUrl = isWordDoc
    ? `${getWordPreviewUrl(file.id)}?rm=minimal&embedded=true`
    : `${getPDFPreviewUrl(file.id)}?rm=minimal&embedded=true`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/90 backdrop-blur-sm">
      {/* Modal Container */}
      <div ref={containerRef} className="relative w-full h-full max-w-7xl max-h-screen p-4 sm:p-6 bg-zinc-900">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 bg-white rounded-t-2xl p-4 shadow-lg">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-zinc-900 truncate">
              {file.name}
            </h2>
            <p className="text-sm text-zinc-500">
              {file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : isWordDoc ? "Word Document" : isPdfFile ? "PDF Document" : "Document"}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <a
              href={getDriveDownloadUrl(file.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-medium transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4 4-4M5 21h14" />
              </svg>
              Download
            </a>
            <a
              href={`https://drive.google.com/file/d/${file.id}/view`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Can't see? Open in Drive
            </a>
            <button
              onClick={toggleFullscreen}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              )}
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Document Viewer */}
        <div className="relative w-full h-[calc(100%-5rem)] bg-white rounded-b-2xl shadow-2xl overflow-hidden">
          {/* Branded overlay to hide pop-out button */}
          <div className="absolute top-0 right-0 z-10 pointer-events-none bg-zinc-800 p-2 rounded-bl-lg shadow-lg">
            <img src="/favicon.ico" alt="MujToppers" className="w-10 h-10" />
          </div>
          <iframe
            key={iframeKey}
            src={previewUrl}
            className="w-full h-full border-0"
            title={file.name}
            frameBorder="0"
            allow="autoplay"
            referrerPolicy="no-referrer-when-downgrade"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
