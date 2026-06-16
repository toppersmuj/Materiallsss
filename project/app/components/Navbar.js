"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      isMenuOpen &&
      event.target instanceof HTMLElement &&
      !event.target.closest("#mobile-menu")
    ) {
      setIsMenuOpen(false);
    }
  };

  document.addEventListener("click", handleClickOutside);

  return () =>
    document.removeEventListener("click", handleClickOutside);
}, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full shadow-md py-3 px-4 sm:px-6 z-50 border-b border-black bg-white/80 backdrop-blur-md font-sans">
        <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="https://www.mujtoppers.in/" className="flex items-center ml-[-8px] sm:ml-[-12px]">
            <span className="text-lg font-bold text-black tracking-tight uppercase">
              MUJTOPPERS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-5 mr-[-8px] sm:mr-[-12px]">
            <Link
              href="https://www.mujtoppers.in/"
              className="text-[16px] font-bold text-black hover:bg-black hover:text-white transition-all px-4 py-2 rounded-lg"
            >
              Home
            </Link>
            <Link
              href="https://material.mujtoppers.in "
              className="text-[16px] font-bold text-black hover:bg-black hover:text-white transition-all px-4 py-2 rounded-lg"
            >
              Material
            </Link>
            <Link
              href="https://www.mujtoppers.in/collegeTip"
              className="text-[16px] font-bold text-black hover:bg-black hover:text-white transition-all px-4 py-2 rounded-lg"
            >
              College Tip
            </Link>
            <Link
              href="https://www.mujtoppers.in/blogs"
              className="text-[16px] font-bold text-black hover:bg-black hover:text-white transition-all px-4 py-2 rounded-lg"
            >
              Blogs
            </Link>
            <Link
              href="https://about.mujtoppers.in/"
              className="text-[16px] font-bold text-black hover:bg-black hover:text-white transition-all px-4 py-2 rounded-lg"
            >
              About Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden ml-auto mr-5">
  <Menu
  onClick={() => setIsMenuOpen(true)}
  className="cursor-pointer text-black"
  size={32}
/>
</div>
          {/* <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-black hover:bg-black/5 active:bg-black/10 focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute left-0 block w-6 h-0.5 bg-black transform transition-all duration-300 ease-out ${
                  isMenuOpen ? "top-[11px] rotate-45" : "top-1"
                }`}
              />
              <span
                className={`absolute left-0 top-[11px] block w-6 h-0.5 bg-black transition-all duration-200 ${
                  isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              />
              <span
                className={`absolute left-0 block w-6 h-0.5 bg-black transform transition-all duration-300 ease-out ${
                  isMenuOpen ? "top-[11px] -rotate-45" : "top-5"
                }`}
              />
            </div>
          </button> */}
        </div>
      </nav>

            {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div
            id="mobile-menu"
            className="absolute top-0 right-0 bg-white min-h-screen w-2/3 shadow-lg p-5"
          >
            <button
              className="absolute top-5 right-5 text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              <X />
            </button>

            <ul className="flex flex-col gap-6 mt-12 p-5">
              <li>
                <Link
                  href="https://www.mujtoppers.in/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg text-black font-semibold"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="https://material.mujtoppers.in/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg text-black font-semibold"
                >
                  Material
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.mujtoppers.in/collegeTip"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg text-black font-semibold"
                >
                  College Tip
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.mujtoppers.in/blogs"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg text-black font-semibold"
                >
                  Blogs
                </Link>
              </li>

              <li>
                <Link
                  href="https://about.mujtoppers.in/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg text-black font-semibold"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
