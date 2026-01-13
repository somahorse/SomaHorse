"use client";

import { useEffect, useState, useRef } from "react";

interface SuccessModalProps {
  onClose: () => void;
  onTakeTest: () => void;
}

export default function SuccessModal({ onClose, onTakeTest }: SuccessModalProps) {
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
        className={`fixed inset-x-0 bottom-0 z-50 flex max-h-[90vh] flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl md:inset-auto md:left-1/2 md:top-1/2 md:max-h-[85vh] md:w-full md:max-w-lg md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl ${
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

        {/* Content */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-8 text-center md:px-8 md:py-12">
          {/* Success Icon */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 md:h-24 md:w-24">
            <svg
              className="h-12 w-12 text-green-500 md:h-14 md:w-14"
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

          {/* Success Message */}
          <h2 className="mb-4 text-2xl font-bold text-slate-900 md:text-3xl">
            Application Submitted Successfully!
          </h2>
          <p className="mb-8 max-w-md text-base leading-7 text-slate-600 md:text-lg">
            Thank you for your interest in joining Somahorse Nexus. We&apos;ve received your application and will review it shortly.
          </p>

          {/* Test Information */}
          <div className="mb-8 w-full max-w-md rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 p-6">
            <p className="mb-4 text-sm font-semibold text-slate-900 md:text-base">
              Next Step: Aptitude Test
            </p>
            <p className="text-sm leading-6 text-slate-700 md:text-base">
              To help us assess your competency and ensure the best fit, please complete our 15-minute aptitude test. This will help us understand your skills while we review your experience.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <button
              onClick={handleClose}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
            >
              Close
            </button>
            <button
              onClick={onTakeTest}
              className="flex-1 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Take the Test Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}



