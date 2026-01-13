"use client";

import Navbar from "@/components/Navbar";
import ServiceModal from "@/components/ServiceModal";
import { useState } from "react";

const services = [
  {
    id: 1,
    title: "Custom Software & AI Development",
    description: "Design and build AI-powered systems tailored to your business needs.",
    tags: ["AI Systems", "Automation Tools", "Machine Learning", "Analytics"],
    color: "from-cyan-400 to-blue-500",
    bgColor: "bg-cyan-50",
    tagBgColor: "bg-cyan-500",
    details: {
      overview:
        "Transform your business operations with custom AI-powered software solutions designed specifically for your industry and challenges.",
      features: [
        "AI-powered automation tools that streamline workflows",
        "Custom machine learning models for predictive analytics",
        "Intelligent assistants that enhance productivity",
        "Analytics engines that turn data into actionable insights",
        "End-to-end development from concept to deployment",
      ],
      useCases: [
        "Fraud detection systems for financial services",
        "Predictive maintenance for manufacturing",
        "Intelligent document processing",
        "Customer behavior analysis",
        "Supply chain optimization",
      ],
      benefits: [
        "Reduced operational costs through automation",
        "Improved decision-making with data-driven insights",
        "Enhanced customer experiences",
        "Scalable solutions that grow with your business",
      ],
    },
  },
  {
    id: 2,
    title: "Tech & AI Consulting",
    description: "Strategic guidance for adopting AI and modern technology solutions.",
    tags: ["Digital Transformation", "AI Strategy", "System Audits", "Roadmaps"],
    color: "from-blue-500 to-violet-500",
    bgColor: "bg-blue-50",
    tagBgColor: "bg-blue-500",
    details: {
      overview:
        "Navigate your AI transformation journey with expert consulting that aligns technology with your business objectives.",
      features: [
        "Comprehensive digital transformation planning",
        "AI readiness assessments and strategy development",
        "System architecture audits and recommendations",
        "Automation roadmap creation",
        "Technology stack evaluation and selection",
      ],
      useCases: [
        "Enterprise AI adoption strategies",
        "Legacy system modernization",
        "Cloud migration planning",
        "AI ethics and governance frameworks",
        "Competitive technology analysis",
      ],
      benefits: [
        "Clear roadmap for AI implementation",
        "Reduced risk through expert guidance",
        "Optimized technology investments",
        "Future-proofed business operations",
      ],
    },
  },
  {
    id: 3,
    title: "Data Systems & Process Automation",
    description: "Organize, secure, and streamline business data and workflows.",
    tags: ["Cloud Systems", "Document Management", "Workflow Automation", "Data Security"],
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50",
    tagBgColor: "bg-violet-500",
    details: {
      overview:
        "Build robust data infrastructure and automate repetitive processes to unlock efficiency and reduce manual errors.",
      features: [
        "Cloud-based data management systems",
        "Automated document processing and storage",
        "Workflow automation for business processes",
        "Data security and compliance frameworks",
        "Real-time data synchronization",
      ],
      useCases: [
        "Customer data management systems",
        "Invoice and payment processing automation",
        "HR workflow automation",
        "Inventory management systems",
        "Compliance and reporting automation",
      ],
      benefits: [
        "Significant time savings through automation",
        "Improved data accuracy and consistency",
        "Enhanced security and compliance",
        "Better resource allocation",
      ],
    },
  },
  {
    id: 4,
    title: "Mobile App Development",
    description: "Build high-performance mobile applications for iOS, Android, and cross-platform.",
    tags: ["iOS", "Android", "Cross-Platform", "E-Commerce", "Enterprise Apps"],
    color: "from-orange-400 to-pink-500",
    bgColor: "bg-orange-50",
    tagBgColor: "bg-orange-500",
    details: {
      overview:
        "Create powerful mobile experiences that engage users and drive business growth across all platforms.",
      features: [
        "Native iOS and Android development",
        "Cross-platform solutions with React Native or Flutter",
        "AI-driven mobile applications",
        "E-commerce and marketplace apps",
        "Enterprise mobile tools",
      ],
      useCases: [
        "Customer-facing mobile applications",
        "Internal employee tools and dashboards",
        "Mobile payment solutions",
        "On-demand service platforms",
        "Mobile-first e-commerce experiences",
      ],
      benefits: [
        "Reach customers on their preferred devices",
        "Improved user engagement and retention",
        "Streamlined business operations",
        "Competitive mobile presence",
      ],
    },
  },
  {
    id: 5,
    title: "AI Data Analysis",
    description: "Transform raw data into actionable insights using advanced AI models.",
    tags: ["Forecasting", "Pattern Detection", "Dashboards", "Decision Support"],
    color: "from-green-400 to-teal-500",
    bgColor: "bg-green-50",
    tagBgColor: "bg-green-500",
    details: {
      overview:
        "Unlock the power of your data with AI-driven analysis that reveals patterns, predicts trends, and supports strategic decisions.",
      features: [
        "Advanced machine learning models for forecasting",
        "Automated pattern detection in large datasets",
        "Interactive dashboards and visualizations",
        "Real-time decision support systems",
        "Predictive analytics for business planning",
      ],
      useCases: [
        "Sales forecasting and demand prediction",
        "Customer churn analysis",
        "Market trend identification",
        "Risk assessment and fraud detection",
        "Performance optimization insights",
      ],
      benefits: [
        "Data-driven decision making",
        "Proactive problem identification",
        "Improved forecasting accuracy",
        "Competitive advantage through insights",
      ],
    },
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 lg:pt-16">
        {/* Hero Section */}
        <section className="mb-12 space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
            Our Services
          </p>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              AI Solutions for Africa&apos;s Industries
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-7 text-slate-600">
            From custom AI development to strategic consulting, we deliver
            end-to-end technology solutions that drive measurable impact.
          </p>
        </section>

        {/* Services Grid */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              {/* Colored Top Section */}
              <div className={`${service.bgColor} px-6 pt-6 pb-4`}>
                <h2 className="mb-2 text-2xl font-bold text-slate-900">
                  {service.title}
                </h2>
                <p className="text-sm leading-6 text-slate-700">
                  {service.description}
                </p>
              </div>

              {/* Tags Section */}
              <div className="flex-1 px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full ${service.tagBgColor} px-3 py-1 text-xs font-medium text-white`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action Section */}
              <div className="border-t border-slate-100 bg-white px-6 py-4">
                <button
                  onClick={() => setSelectedService(service)}
                  className="flex w-full items-center justify-between text-sm font-semibold text-slate-900 transition-colors hover:text-slate-700"
                >
                  <span>Explore</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
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
                  </div>
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}




