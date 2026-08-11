"use client";

import { useState, useEffect } from "react";
import { listFilesInFolder, isFolder, isPDF, isPPT, isWordDocument } from "@/lib/googleDrive";

export default function DriveFolderBrowser({ folderId, onFileClick, onPPTClick }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPath, setCurrentPath] = useState([{ id: folderId, name: "Root" }]);

  useEffect(() => {
    loadFolder(folderId);
  }, [folderId]);

  async function loadFolder(id) {
    setLoading(true);
    setError(null);
    
    try {
      const files = await listFilesInFolder(id);
      // Sort: folders first, then files alphabetically
      const sorted = files.sort((a, b) => {
        if (isFolder(a.mimeType) && !isFolder(b.mimeType)) return -1;
        if (!isFolder(a.mimeType) && isFolder(b.mimeType)) return 1;
        return a.name.localeCompare(b.name);
      });
      setItems(sorted);
    } catch (err) {
      setError("Failed to load folder contents");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleItemClick(item) {
    if (isFolder(item.mimeType)) {
      // Navigate into folder
      setCurrentPath([...currentPath, { id: item.id, name: item.name }]);
      loadFolder(item.id);
    } else if (isPDF(item.mimeType) || isWordDocument(item.mimeType)) {
      // Open document viewer for PDFs and Word files
      onFileClick?.(item);
    } else if (isPPT(item.mimeType)) {
      // Open PPT viewer
      onPPTClick?.(item);
    }
    // Do nothing for other file types - no external links
  }

  function navigateToFolder(index) {
    const targetFolder = currentPath[index];
    setCurrentPath(currentPath.slice(0, index + 1));
    loadFolder(targetFolder.id);
  }

  function goBack() {
    if (currentPath.length > 1) {
      navigateToFolder(currentPath.length - 2);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 flex-wrap">
        {currentPath.length > 1 && (
          <button
            onClick={goBack}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 transition text-sm font-medium text-zinc-700"
          >
            ← Back
          </button>
        )}
        <div className="flex items-center gap-2 flex-wrap">
          {currentPath.map((folder, index) => (
            <div key={folder.id} className="flex items-center gap-2">
              {index > 0 && <span className="text-zinc-400">/</span>}
              <button
                onClick={() => navigateToFolder(index)}
                className={`px-2 py-1 rounded text-sm font-medium transition ${
                  index === currentPath.length - 1
                    ? "text-orange-600 font-semibold"
                    : "text-zinc-600 hover:text-orange-600"
                }`}
              >
                {folder.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      {items.length === 0 ? (
        <div className="text-center py-8 text-zinc-500">
          No files or folders found
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => {
            const itemIsFolder = isFolder(item.mimeType);
            const itemIsPDF = isPDF(item.mimeType);
            const itemIsWord = isWordDocument(item.mimeType);
            const itemIsPPT = isPPT(item.mimeType);

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 bg-white hover:bg-orange-50 hover:border-orange-300 transition duration-200 text-left group"
              >
                {/* Icon */}
                <div className="shrink-0">
                  {itemIsFolder ? (
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-xl">
                      📁
                    </div>
                  ) : itemIsPDF ? (
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-xl">
                      📄
                    </div>
                  ) : itemIsPPT ? (
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-xl">
                      📊
                    </div>
                  ) : itemIsWord ? (
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-xl">
                      📝
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-xl">
                      📎
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-zinc-900 truncate group-hover:text-orange-600 transition">
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-500">
                    {itemIsFolder ? "Folder" : itemIsPPT ? "Presentation" : itemIsWord ? "Word Document" : item.size ? `${(item.size / 1024 / 1024).toFixed(2)} MB` : "File"}
                  </p>
                </div>

                {/* Arrow */}
                <div className="shrink-0 text-zinc-400 group-hover:text-orange-600 transition">
                  {itemIsFolder && "→"}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
