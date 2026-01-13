"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";

const industries = [
  {
    id: 1,
    title: "Fintech",
    image: "/images/fintech.png",
    description:
      "We revolutionize financial services across Africa by building AI-powered solutions that enhance security, improve accessibility, and drive financial inclusion.",
    details: [
      "Fraud detection and prevention systems for mobile money platforms",
      "Credit scoring algorithms using alternative data sources",
      "Automated loan processing and risk assessment tools",
      "Real-time transaction monitoring and anomaly detection",
      "Personalized financial advisory services powered by AI",
      "Blockchain integration for secure and transparent transactions",
    ],
    gradient: "from-cyan-400 via-blue-500 to-violet-500",
    bgColor: "bg-gradient-to-br from-cyan-50 via-blue-50 to-violet-50",
  },
  {
    id: 2,
    title: "Agriculture",
    image: "/images/agriculture.png",
    description:
      "Empowering African farmers with intelligent solutions that optimize crop yields, predict weather patterns, and connect agricultural value chains.",
    details: [
      "AI-powered crop disease detection and treatment recommendations",
      "Predictive analytics for optimal planting and harvesting times",
      "Soil analysis and nutrient management systems",
      "Market price prediction and supply chain optimization",
      "Livestock health monitoring and management platforms",
      "Smart irrigation systems with automated water management",
    ],
    gradient: "from-green-400 via-emerald-500 to-teal-500",
    bgColor: "bg-white",
  },
  {
    id: 3,
    title: "Healthcare",
    image: "/images/healthcare.png",
    description:
      "Transforming healthcare delivery in Africa through AI-driven diagnostics, telemedicine platforms, and intelligent health management systems.",
    details: [
      "Medical image analysis for early disease detection",
      "AI-powered symptom checker and triage systems",
      "Telemedicine platforms connecting patients with healthcare providers",
      "Drug interaction and prescription management tools",
      "Epidemic prediction and outbreak monitoring systems",
      "Personalized treatment recommendations based on patient data",
    ],
    gradient: "from-rose-400 via-pink-500 to-red-500",
    bgColor: "bg-gradient-to-br from-rose-50 via-pink-50 to-red-50",
  },
  {
    id: 4,
    title: "Automation",
    image: "/images/automation.png",
    description:
      "Streamlining business operations across industries with intelligent automation solutions that reduce costs and increase efficiency.",
    details: [
      "Process automation for manufacturing and logistics",
      "Intelligent document processing and data extraction",
      "Customer service chatbots and virtual assistants",
      "Supply chain optimization and inventory management",
      "Workflow automation for administrative tasks",
      "Predictive maintenance systems for industrial equipment",
    ],
    gradient: "from-orange-400 via-amber-500 to-yellow-500",
    bgColor: "bg-white",
  },
  {
    id: 5,
    title: "Education",
    image: "/images/education.png",
    description:
      "Revolutionizing learning experiences with personalized AI-driven educational platforms that adapt to each student's needs and learning style.",
    details: [
      "Personalized learning paths and adaptive curriculum",
      "AI-powered tutoring and homework assistance",
      "Automated grading and feedback systems",
      "Language learning platforms with speech recognition",
      "Student performance analytics and early intervention tools",
      "Virtual classrooms and remote learning solutions",
    ],
    gradient: "from-indigo-400 via-purple-500 to-violet-500",
    bgColor: "bg-gradient-to-br from-indigo-50 via-purple-50 to-violet-50",
  },
];

export default function Industries() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="pb-20 pt-12 lg:pt-16">
        {/* Hero Section */}
        <section className="mb-16 space-y-4 px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
            Our Industries
          </p>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Transforming Africa&apos;s Key Sectors
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-7 text-slate-600">
            We deliver AI-powered solutions across five critical industries,
            driving innovation and measurable impact throughout the continent.
          </p>
        </section>

        {/* Industries Sections */}
        <div className="space-y-0">
          {industries.map((industry, index) => {
            const isEven = index % 2 === 0;
            const hasGradientBg = index % 2 === 0; // Alternating: 0, 2, 4 have gradient

            return (
              <section
                key={industry.id}
                className={`w-full py-12 md:py-16 lg:py-20 ${hasGradientBg ? industry.bgColor : "bg-white"
                  }`}
              >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div
                    className={`flex flex-col gap-8 md:gap-12 lg:flex-row lg:items-center ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                      }`}
                  >
                    {/* Image */}
                    <div className="flex-shrink-0 lg:w-1/2">
                      <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-lg">
                        <Image
                          src={industry.image}
                          alt={industry.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center lg:w-1/2">
                      <div className="space-y-6">
                        <div>
                          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
                            {industry.title}
                          </h2>
                          <p className="text-lg leading-8 text-slate-700">
                            {industry.description}
                          </p>
                        </div>

                        <div>
                          <h3 className="mb-4 text-xl font-semibold text-slate-900">
                            How We Help
                          </h3>
                          <ul className="space-y-3">
                            {industry.details.map((detail, detailIndex) => (
                              <li
                                key={detailIndex}
                                className="flex items-start gap-3"
                              >
                                <div
                                  className={`mt-2 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r ${industry.gradient}`}
                                />
                                <span className="text-base leading-7 text-slate-700">
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <a
                            href="/contact"
                            className={`inline-block rounded-lg bg-gradient-to-r ${industry.gradient} px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90`}
                          >
                            Learn More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA Section */}
        <section className="mt-20 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 p-8 text-center text-white sm:p-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Ready to Transform Your Industry?
            </h2>
            <p className="mb-8 mx-auto max-w-2xl text-lg">
              Let&apos;s discuss how our AI solutions can drive innovation and
              growth in your sector.
            </p>
            <a
              href="/contact"
              className="inline-block rounded-lg bg-white px-8 py-3 text-base font-semibold text-slate-900 transition-opacity hover:opacity-90"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}


