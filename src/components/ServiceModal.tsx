"use client";

import { useEffect, useState, useRef } from "react";

interface Service {
  id: number;
  title: string;
  description: string;
  tags: string[];
  color: string;
  bgColor: string;
  tagBgColor: string;
  details: {
    overview: string;
    features: string[];
    useCases: string[];
    benefits: string[];
  };
}

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    // Trigger animation
    setTimeout(() => setIsAnimating(false), 10);
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartY.current;
    
    // Only allow dragging down
    if (deltaY > 0) {
      setDragY(deltaY);
      // Prevent scrolling while dragging
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    // If dragged more than 100px, close the modal
    if (dragY > 100) {
      setIsAnimating(true);
      setTimeout(() => {
        onClose();
      }, 200);
    } else {
      // Snap back
      setDragY(0);
    }
    
    setIsDragging(false);
  };

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:bg-black/30 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`fixed inset-x-0 bottom-0 z-50 flex max-h-[90vh] flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl md:inset-auto md:left-1/2 md:top-1/2 md:max-h-[85vh] md:w-full md:max-w-3xl md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl ${
          !isDragging ? "transition-all duration-300" : ""
        } ${
          isAnimating
            ? "translate-y-full opacity-0 md:translate-y-0 md:scale-95"
            : "translate-y-0 opacity-100 md:scale-100"
        }`}
        style={{
          transform: isDragging
            ? `translateY(${dragY}px)`
            : undefined,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag Handle (Mobile Only) */}
        <div className="flex justify-center pt-3 pb-2 md:hidden">
          <div className="h-1.5 w-12 rounded-full bg-slate-300" />
        </div>

        {/* Header */}
        <div className={`${service.bgColor} px-6 pt-6 pb-4 md:px-8 md:pt-8`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
                {service.title}
              </h2>
              <p className="text-sm leading-6 text-slate-700 md:text-base">
                {service.description}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/80 text-slate-600 transition-colors hover:bg-white hover:text-slate-900"
              aria-label="Close modal"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-8">
          <div className="space-y-8">
            {/* Overview */}
            <section>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Overview</h3>
              <p className="text-base leading-7 text-slate-700">
                {service.details.overview}
              </p>
            </section>

            {/* Features */}
            <section>
              <h3 className="mb-4 text-xl font-bold text-slate-900">Key Features</h3>
              <ul className="space-y-2">
                {service.details.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${service.tagBgColor}`} />
                    <span className="text-base leading-7 text-slate-700">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Use Cases */}
            <section>
              <h3 className="mb-4 text-xl font-bold text-slate-900">Use Cases</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {service.details.useCases.map((useCase, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-sm font-medium text-slate-900">{useCase}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Benefits */}
            <section>
              <h3 className="mb-4 text-xl font-bold text-slate-900">Benefits</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {service.details.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className={`rounded-lg ${service.bgColor} p-4`}
                  >
                    <p className="text-sm font-medium text-slate-900">{benefit}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 md:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              onClick={handleClose}
              className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
            >
              Close
            </button>
            <a
              href="/contact"
              className={`rounded-lg ${service.tagBgColor} px-6 py-2.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90`}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </>
  );
}


