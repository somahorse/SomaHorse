"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Briefcase,
  Search,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { href: "/client/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/client/projects", label: "Projects", icon: Briefcase },
  { href: "/client/talent-search", label: "Find Talent", icon: Search },
  { href: "/client/invoices", label: "Invoices", icon: FileText },
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header with Hamburger Menu */}
      <div className="fixed left-0 top-0 z-50 flex h-16 w-full items-center border-b border-slate-200 bg-white px-4 lg:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        <Link href="/" className="ml-4 flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image
              src="/somahorse-logo.png"
              alt="Somahorse Nexus logo"
              fill
              sizes="32px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-slate-900">
              Somahorse Nexus
            </span>
            <span className="text-xs font-semibold text-[#2563EB]">
              Client Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Backdrop Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo - Desktop */}
          <div className="hidden border-b border-slate-200 px-6 py-4 lg:block">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-10 w-10">
                <Image
                  src="/somahorse-logo.png"
                  alt="Somahorse Nexus logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold text-slate-900">
                  Somahorse Nexus
                </span>
                <span className="text-xs font-semibold text-[#2563EB]">
                  Client Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Logo - Mobile with Close Button */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 lg:hidden">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-10 w-10">
                <Image
                  src="/somahorse-logo.png"
                  alt="Somahorse Nexus logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold text-slate-900">
                  Somahorse Nexus
                </span>
                <span className="text-xs font-semibold text-[#2563EB]">
                  Client Portal
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-semibold transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      isActive ? "text-white" : "text-slate-700"
                    }`}
                  />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="border-t border-slate-200 px-4 py-4">
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-100">
              <LogOut className="h-5 w-5 text-slate-700" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-h-screen pt-16 lg:ml-64 lg:pt-0">
        {children}
      </main>
    </div>
  );
}

