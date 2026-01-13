"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";

const faqItems = [
  {
    id: 1,
    question: "How do I join Somahorse Nexus as a developer?",
    answer: "To join as talent, visit our 'Join as Talent' page and complete the application form. You'll need to provide your professional details, specify your experience level and skills, and share your LinkedIn profile. Once submitted, you'll enter the Talent Foundry for assessment through real AI project work.",
    helpful: null as boolean | null,
  },
  {
    id: 2,
    question: "What industries does Somahorse Nexus serve?",
    answer: "We focus on industries where AI and automation deliver immediate impact: Fintech & Financial Services (fraud detection, cashflow forecasting, credit scoring), Agriculture & Agritech (yield prediction, satellite monitoring, smart irrigation), Healthcare & MedTech (diagnostics support, workflow automation, equipment monitoring), Manufacturing & Automation (predictive maintenance, quality inspection, process optimization), and Education & E-Learning (adaptive learning systems, assessment automation, content recommendation).",
    helpful: null as boolean | null,
  },
  {
    id: 3,
    question: "How does the revenue share work for developers?",
    answer: "Developers on our platform receive a 60% revenue share on completed projects. This means when you deliver AI solutions through our Industrial Solutions Hub, you earn directly from the value you create. Earnings are tracked transparently through our Capital & Impact Dashboard.",
    helpful: null as boolean | null,
  },
  {
    id: 4,
    question: "What makes Somahorse Nexus different from other platforms?",
    answer: "We're not a marketplace or training program—we're a talent operating system. We close the proof gap by certifying developers through real AI project work, not just credentials. Our three integrated engines (Talent Foundry, Industrial Solutions Hub, and Capital & Impact Dashboard) create a closed loop that develops talent, deploys solutions, and measures real-world outcomes.",
    helpful: null as boolean | null,
  },
  {
    id: 5,
    question: "When will the platform launch?",
    answer: "Somahorse Nexus is legally registered and operational. We're in active development of our Fintech-first MVP, with launch scheduled for Q1 2026. We're currently securing initial launch partners and preparing for a pre-seed funding round.",
    helpful: null as boolean | null,
  },
  {
    id: 6,
    question: "How do businesses get started with Somahorse Nexus?",
    answer: "Businesses can request a proposal through our contact form or email us directly. We provide a catalogue of predefined AI tools tailored by sector, pre-vetted developer teams, and end-to-end project management. Our solutions are designed to deliver measurable efficiency gains and operational improvements.",
    helpful: null as boolean | null,
  },
];

export default function Contact() {
  const [expandedId, setExpandedId] = useState<number | null>(2);
  const [helpfulStates, setHelpfulStates] = useState<Record<number, boolean | null>>({});

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleHelpful = (id: number, isHelpful: boolean) => {
    setHelpfulStates((prev) => ({
      ...prev,
      [id]: prev[id] === isHelpful ? null : isHelpful,
    }));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 pb-20 pt-12 sm:px-6 lg:pt-16">
        {/* Hero Section */}
        <section className="mb-12 space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
            Get in Touch
          </p>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Let&apos;s Build Together
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-7 text-slate-600">
            Whether you&apos;re a developer, enterprise, investor, or partner,
            we&apos;d love to connect and explore how we can work together.
          </p>
        </section>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Send us a message
            </h2>
            <form className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-slate-900"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition-colors focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                >
                  <option value="">Select a subject</option>
                  <option value="developer">Join as Talent</option>
                  <option value="business">Business Inquiry</option>
                  <option value="investor">Investor Inquiry</option>
                  <option value="partner">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-900"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us about your inquiry..."
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
              >
                Send Message
              </button>
            </form>
          </section>

          {/* Contact Details */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Email
                </h3>
                <a
                  href="mailto:somahorsenexus@gmail.com"
                  className="text-lg font-medium text-[#2563EB] transition-colors hover:underline"
                >
                  somahorsenexus@gmail.com
                </a>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Website
                </h3>
                <a
                  href="https://somahorsenexus.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-[#2563EB] transition-colors hover:underline"
                >
                  somahorsenexus.com
                </a>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Company
                </h3>
                <p className="text-lg font-medium text-slate-900">
                  Somahorse Nexus Pty Ltd
                </p>
                <p className="text-sm text-slate-600">
                  Legally registered and operational
                </p>
              </div>

              <div className="rounded-2xl bg-linear-to-br from-cyan-50 via-blue-50 to-violet-50 p-6">
                <h3 className="mb-3 text-lg font-bold text-slate-900">
                  Interested in building with us?
                </h3>
                <p className="mb-4 text-sm leading-6 text-slate-700">
                  Whether you are a developer, an enterprise, an investor or a
                  partner, let us connect.
                </p>
                <a
                  href="/join"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] transition-colors hover:underline"
                >
                  Find Opportunities
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* FAQ Accordion Section */}
        <section className="mt-16">
          <h2 className="mb-8 text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-0">
            {faqItems.map((item, index) => {
              const isExpanded = expandedId === item.id;
              const helpfulState = helpfulStates[item.id];

              return (
                <div key={item.id}>
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-slate-900"
                  >
                    <span className="text-lg font-semibold text-slate-900">
                      {item.question}
                    </span>
                    <svg
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="pb-5">
                      <div className="space-y-4">
                        <p className="text-base leading-7 text-slate-700">
                          {item.answer}
                        </p>

                        {/* Helpful Section */}
                        <div className="pt-4">
                          <h4 className="mb-2 text-sm font-semibold text-slate-900">
                            Was this helpful?
                          </h4>
                          <div className="flex items-center gap-4">
                            <p className="text-xs text-slate-500">
                              0 found this helpful
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleHelpful(item.id, true);
                                }}
                                className={`flex h-9 w-9 items-center justify-center rounded border transition-colors ${
                                  helpfulState === true
                                    ? "border-[#2563EB] bg-[#2563EB]/10"
                                    : "border-slate-300 bg-white hover:border-slate-400"
                                }`}
                                aria-label="Helpful"
                              >
                                <svg
                                  className="h-4 w-4 text-slate-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleHelpful(item.id, false);
                                }}
                                className={`flex h-9 w-9 items-center justify-center rounded border transition-colors ${
                                  helpfulState === false
                                    ? "border-[#2563EB] bg-[#2563EB]/10"
                                    : "border-slate-300 bg-white hover:border-slate-400"
                                }`}
                                aria-label="Not helpful"
                              >
                                <svg
                                  className="h-4 w-4 text-slate-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 019.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {index < faqItems.length - 1 && (
                    <div className="border-t border-slate-200" />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}




