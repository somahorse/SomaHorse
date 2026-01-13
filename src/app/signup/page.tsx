"use client";

import { useState } from "react";
import Link from "next/link";

type UserType = "client" | "talent" | null;

export default function Signup() {
  const [selectedType, setSelectedType] = useState<UserType>(null);

  const handleSelect = (type: "client" | "talent") => {
    setSelectedType(type);
  };

  const handleCreateAccount = () => {
    if (selectedType === "talent") {
      // Redirect to join page for talent
      window.location.href = "/join";
    } else if (selectedType === "client") {
      // Redirect to client signup form
      window.location.href = "/signup/client";
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Join as a Client or Talent
            </h1>
            <p className="text-base text-slate-600">
              Choose your role to get started
            </p>
          </div>

          {/* Selection Cards */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            {/* Client Card */}
            <button
              type="button"
              onClick={() => handleSelect("client")}
              className={`group relative rounded-xl border-2 p-6 text-left transition-all hover:shadow-lg ${
                selectedType === "client"
                  ? "border-transparent bg-gradient-to-br from-cyan-50 via-blue-50 to-violet-50 shadow-md"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              {/* Checkmark */}
              {selectedType === "client" && (
                <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}

              {/* Icon */}
              <div className="mb-4">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${
                    selectedType === "client"
                      ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                      : "bg-slate-100 group-hover:bg-slate-200"
                  } transition-colors`}
                >
                  <svg
                    className={`h-6 w-6 ${
                      selectedType === "client" ? "text-white" : "text-slate-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Text */}
              <h3 className="text-lg font-semibold text-slate-900">
                I&apos;m a client, hiring for a project
              </h3>
            </button>

            {/* Talent Card */}
            <button
              type="button"
              onClick={() => handleSelect("talent")}
              className={`group relative rounded-xl border-2 p-6 text-left transition-all hover:shadow-lg ${
                selectedType === "talent"
                  ? "border-transparent bg-gradient-to-br from-cyan-50 via-blue-50 to-violet-50 shadow-md"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              {/* Checkmark */}
              {selectedType === "talent" && (
                <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}

              {/* Icon */}
              <div className="mb-4">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${
                    selectedType === "talent"
                      ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                      : "bg-slate-100 group-hover:bg-slate-200"
                  } transition-colors`}
                >
                  <svg
                    className={`h-6 w-6 ${
                      selectedType === "talent" ? "text-white" : "text-slate-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Text */}
              <h3 className="text-lg font-semibold text-slate-900">
                I&apos;m a talent, looking for work
              </h3>
            </button>
          </div>

          {/* Create Account Button */}
          <button
            type="button"
            onClick={handleCreateAccount}
            disabled={!selectedType}
            className={`w-full rounded-lg px-6 py-3 text-base font-semibold text-white transition-all ${
              selectedType
                ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 hover:opacity-90 cursor-pointer"
                : "bg-slate-300 cursor-not-allowed"
            }`}
          >
            {selectedType === "talent"
              ? "Create Account as a Talent"
              : selectedType === "client"
              ? "Create Account as a Client"
              : "Create Account"}
          </button>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#2563EB] transition-colors hover:text-[#1d4ed8] hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

