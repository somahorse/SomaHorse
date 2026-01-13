"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white/95 backdrop-blur shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-18 items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-14 w-14 sm:h-12 sm:w-12">
              <Image
                src="/somahorse-logo.png"
                alt="Somahorse Nexus logo"
                fill
                sizes="56px"
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-xl font-bold text-slate-900">
                Somahorse Nexus
              </span>
              <span className="text-sm font-semibold text-[#2563EB]">
                Operating System for Africa&apos;s AI Economy
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-8 text-base font-semibold">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative pb-2 text-slate-800 transition-colors hover:text-slate-900 ${
                      isActive ? "text-slate-900" : ""
                    } after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-linear-to-r after:from-cyan-400 after:to-violet-500 after:transition-transform after:duration-200 ${
                      isActive ? "after:scale-x-100" : "hover:after:scale-x-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center gap-3 pb-2">
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-4 py-2 text-base font-semibold text-white transition-opacity hover:opacity-90"
              >
                Signup
              </Link>
            </div>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-white text-slate-900 shadow-sm transition hover:bg-slate-50 active:scale-95 md:hidden"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen
              ? "max-h-[500px] opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2"
          }`}
        >
          <div className="mt-2 space-y-1 rounded-lg bg-white p-3 shadow-md pb-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-md px-3 py-3 text-base font-semibold transition hover:bg-slate-50 ${
                    isActive
                      ? "text-slate-900 bg-slate-50"
                      : "text-slate-800"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-3 flex flex-col gap-2 border-t border-slate-200 pt-3">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="w-full rounded-md px-3 py-3 text-center text-base font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="w-full rounded-md bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-3 py-3 text-center text-base font-semibold text-white transition-opacity hover:opacity-90"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}



