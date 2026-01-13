"use client";

import { useState } from "react";
import {
  Hammer,
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  Play,
  FileText,
  TrendingUp,
  Star,
  Target,
  Calendar,
  Zap,
  BookOpen,
  Trophy,
  ArrowRight,
  Eye,
  X,
} from "lucide-react";

type AssessmentStatus = "available" | "in-progress" | "completed" | "certified";

interface Assessment {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  status: AssessmentStatus;
  score?: number;
  certified: boolean;
  timeLimit?: number; // in hours
  skills: string[];
  challenge: string;
  completedAt?: string;
  startedAt?: string;
}

export default function TalentFoundry() {
  const [activeTab, setActiveTab] = useState<"available" | "in-progress" | "completed">(
    "available"
  );
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);

  // Mock data - replace with real data from hooks/API
  const [assessments] = useState<Assessment[]>([
    {
      id: "1",
      title: "Fraud Detection Model for Mobile Money",
      description:
        "Build an AI-powered fraud detection system that can identify suspicious transactions in real-time for mobile money platforms.",
      category: "AI/ML",
      difficulty: "advanced",
      status: "available",
      timeLimit: 48,
      skills: ["Python", "Machine Learning", "Data Science", "TensorFlow"],
      challenge:
        "Create a fraud detection model that analyzes transaction patterns and flags suspicious activities. The model should achieve at least 95% accuracy and process transactions in real-time.",
      certified: false,
    },
    {
      id: "2",
      title: "Customer Support Chatbot",
      description:
        "Develop an intelligent chatbot that can handle customer inquiries, provide product information, and escalate complex issues.",
      category: "AI/ML",
      difficulty: "intermediate",
      status: "in-progress",
      timeLimit: 24,
      skills: ["Python", "NLP", "OpenAI", "FastAPI"],
      challenge:
        "Build a conversational AI system that can understand customer intent, provide accurate responses, and maintain context throughout conversations.",
      startedAt: "2024-02-10",
      certified: false,
    },
    {
      id: "3",
      title: "Predictive Analytics Dashboard",
      description:
        "Create a comprehensive analytics dashboard with predictive models for business intelligence and decision-making.",
      category: "Data Science",
      difficulty: "advanced",
      status: "completed",
      score: 87,
      skills: ["Python", "React", "Data Visualization", "Machine Learning"],
      challenge:
        "Develop a dashboard that combines real-time data visualization with predictive analytics models to help businesses make data-driven decisions.",
      completedAt: "2024-01-25",
      certified: true,
    },
    {
      id: "4",
      title: "Image Classification System",
      description:
        "Build a deep learning model that can classify images into multiple categories with high accuracy.",
      category: "AI/ML",
      difficulty: "intermediate",
      status: "available",
      timeLimit: 36,
      skills: ["Python", "Deep Learning", "Computer Vision", "PyTorch"],
      challenge:
        "Create an image classification system using convolutional neural networks that can accurately categorize images across 10 different classes.",
      certified: false,
    },
    {
      id: "5",
      title: "API Integration & Automation",
      description:
        "Design and implement a robust API integration system with automated workflows and error handling.",
      category: "Backend Development",
      difficulty: "intermediate",
      status: "completed",
      score: 92,
      skills: ["Node.js", "TypeScript", "REST APIs", "Automation"],
      challenge:
        "Build a system that integrates multiple third-party APIs, handles rate limiting, implements retry logic, and provides comprehensive error handling.",
      completedAt: "2024-01-15",
      certified: true,
    },
    {
      id: "6",
      title: "Real-time Data Processing Pipeline",
      description:
        "Create a scalable data processing pipeline that can handle high-volume real-time data streams.",
      category: "Data Engineering",
      difficulty: "expert",
      status: "available",
      timeLimit: 72,
      skills: ["Python", "Apache Kafka", "Stream Processing", "AWS"],
      challenge:
        "Design and implement a real-time data processing pipeline that can handle millions of events per second with low latency and high reliability.",
      certified: false,
    },
  ]);

  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return { label: "Beginner", color: "bg-emerald-100 text-emerald-700" };
      case "intermediate":
        return { label: "Intermediate", color: "bg-blue-100 text-blue-700" };
      case "advanced":
        return { label: "Advanced", color: "bg-purple-100 text-purple-700" };
      case "expert":
        return { label: "Expert", color: "bg-red-100 text-red-700" };
      default:
        return { label: difficulty, color: "bg-slate-100 text-slate-700" };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "AI/ML":
        return Zap;
      case "Data Science":
        return TrendingUp;
      case "Backend Development":
        return Target;
      case "Data Engineering":
        return BookOpen;
      default:
        return FileText;
    }
  };

  const filteredAssessments = assessments.filter((assessment) => {
    switch (activeTab) {
      case "available":
        return assessment.status === "available";
      case "in-progress":
        return assessment.status === "in-progress";
      case "completed":
        return assessment.status === "completed" || assessment.status === "certified";
      default:
        return true;
    }
  });

  const stats = {
    total: assessments.length,
    available: assessments.filter((a) => a.status === "available").length,
    inProgress: assessments.filter((a) => a.status === "in-progress").length,
    completed: assessments.filter(
      (a) => a.status === "completed" || a.status === "certified"
    ).length,
    certified: assessments.filter((a) => a.certified).length,
    averageScore: Math.round(
      assessments
        .filter((a) => a.score !== undefined)
        .reduce((sum, a) => sum + (a.score || 0), 0) /
        assessments.filter((a) => a.score !== undefined).length
    ),
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">
              Talent Foundry
            </h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Complete assessments and earn certifications to showcase your skills
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">
                  Certifications
                </p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {stats.certified}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 sm:h-12 sm:w-12">
                <Trophy className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">In Progress</p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {stats.inProgress}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 sm:h-12 sm:w-12">
                <Clock className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">Completed</p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {stats.completed}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 sm:h-12 sm:w-12">
                <CheckCircle2 className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">Avg. Score</p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {stats.averageScore}%
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500 sm:h-12 sm:w-12">
                <Star className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab("available")}
            className={`whitespace-nowrap px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === "available"
                ? "border-b-2 border-[#2563EB] text-[#2563EB]"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Available ({stats.available})
          </button>
          <button
            onClick={() => setActiveTab("in-progress")}
            className={`whitespace-nowrap px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === "in-progress"
                ? "border-b-2 border-[#2563EB] text-[#2563EB]"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            In Progress ({stats.inProgress})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`whitespace-nowrap px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === "completed"
                ? "border-b-2 border-[#2563EB] text-[#2563EB]"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Completed ({stats.completed})
          </button>
        </div>

        {/* Assessments Grid */}
        {filteredAssessments.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAssessments.map((assessment) => {
              const difficultyConfig = getDifficultyConfig(assessment.difficulty);
              const CategoryIcon = getCategoryIcon(assessment.category);

              return (
                <div
                  key={assessment.id}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
                >
                  {/* Assessment Header */}
                  <div className="bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <CategoryIcon className="h-5 w-5 text-slate-600" />
                          <span className="text-xs font-semibold text-slate-600">
                            {assessment.category}
                          </span>
                        </div>
                        <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
                          {assessment.title}
                        </h3>
                      </div>
                      {assessment.certified && (
                        <Award className="h-6 w-6 text-amber-500" />
                      )}
                    </div>
                  </div>

                  {/* Assessment Content */}
                  <div className="p-4 sm:p-6">
                    <p className="mb-4 line-clamp-2 text-xs text-slate-600 sm:text-sm">
                      {assessment.description}
                    </p>

                    {/* Status and Difficulty */}
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${difficultyConfig.color}`}
                      >
                        {difficultyConfig.label}
                      </span>
                      {assessment.status === "in-progress" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                          <Clock className="h-3 w-3" />
                          In Progress
                        </span>
                      )}
                      {assessment.certified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" />
                          Certified
                        </span>
                      )}
                    </div>

                    {/* Score for completed */}
                    {assessment.score !== undefined && (
                      <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-600">Score</span>
                          <span className="text-lg font-extrabold text-slate-900">
                            {assessment.score}%
                          </span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className={`h-full ${
                              assessment.score >= 80
                                ? "bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500"
                                : assessment.score >= 60
                                ? "bg-gradient-to-r from-amber-400 via-orange-500 to-red-500"
                                : "bg-gradient-to-r from-red-400 via-pink-500 to-rose-500"
                            }`}
                            style={{ width: `${assessment.score}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1.5">
                        {assessment.skills.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700"
                          >
                            {skill}
                          </span>
                        ))}
                        {assessment.skills.length > 3 && (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                            +{assessment.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Time Limit */}
                    {assessment.timeLimit && (
                      <div className="mb-4 flex items-center gap-2 text-xs text-slate-600 sm:text-sm">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span>Time limit: {assessment.timeLimit} hours</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedAssessment(assessment)}
                        className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:px-4 sm:text-sm"
                      >
                        <Eye className="mr-1.5 inline h-4 w-4" />
                        View Details
                      </button>
                      {assessment.status === "available" && (
                        <button className="flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 sm:px-4 sm:text-sm">
                          <Play className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <Hammer className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">No assessments found</h3>
            <p className="mt-2 text-sm text-slate-600">
              {activeTab === "available"
                ? "All assessments are in progress or completed"
                : activeTab === "in-progress"
                ? "You don't have any assessments in progress"
                : "You haven't completed any assessments yet"}
            </p>
          </div>
        )}

        {/* Assessment Detail Modal */}
        {selectedAssessment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      {(() => {
                        const CategoryIcon = getCategoryIcon(selectedAssessment.category);
                        return (
                          <>
                            <CategoryIcon className="h-5 w-5 text-slate-600" />
                            <span className="text-sm font-semibold text-slate-600">
                              {selectedAssessment.category}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                    <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                      {selectedAssessment.title}
                    </h2>
                    {selectedAssessment.certified && (
                      <div className="mt-2 flex items-center gap-2">
                        <Award className="h-5 w-5 text-amber-500" />
                        <span className="text-sm font-semibold text-amber-700">
                          Certified Assessment
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedAssessment(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 space-y-6">
                {/* Status and Info */}
                <div className="flex flex-wrap items-center gap-3">
                  {(() => {
                    const difficultyConfig = getDifficultyConfig(selectedAssessment.difficulty);
                    return (
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ${difficultyConfig.color}`}
                      >
                        {difficultyConfig.label}
                      </span>
                    );
                  })()}
                  {selectedAssessment.timeLimit && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span>Time limit: {selectedAssessment.timeLimit} hours</span>
                    </div>
                  )}
                  {selectedAssessment.completedAt && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span>Completed: {formatDate(selectedAssessment.completedAt)}</span>
                    </div>
                  )}
                </div>

                {/* Score */}
                {selectedAssessment.score !== undefined && (
                  <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-600">Your Score</p>
                        <p className="mt-1 text-3xl font-extrabold text-slate-900">
                          {selectedAssessment.score}%
                        </p>
                      </div>
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
                        <Trophy className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full ${
                          selectedAssessment.score >= 80
                            ? "bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500"
                            : selectedAssessment.score >= 60
                            ? "bg-gradient-to-r from-amber-400 via-orange-500 to-red-500"
                            : "bg-gradient-to-r from-red-400 via-pink-500 to-rose-500"
                        }`}
                        style={{ width: `${selectedAssessment.score}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h3 className="mb-2 text-base font-extrabold text-slate-900">Description</h3>
                  <p className="text-sm leading-relaxed text-slate-700">
                    {selectedAssessment.description}
                  </p>
                </div>

                {/* Challenge */}
                <div>
                  <h3 className="mb-2 text-base font-extrabold text-slate-900">Challenge</h3>
                  <p className="text-sm leading-relaxed text-slate-700">
                    {selectedAssessment.challenge}
                  </p>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="mb-3 text-base font-extrabold text-slate-900">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAssessment.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 px-3 py-1.5 text-sm font-semibold text-slate-900"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 border-t border-slate-200 bg-slate-50 p-4 sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <button
                    onClick={() => setSelectedAssessment(null)}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Close
                  </button>
                  {selectedAssessment.status === "available" && (
                    <button className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                      <Play className="h-4 w-4" />
                      Start Assessment
                    </button>
                  )}
                  {selectedAssessment.status === "in-progress" && (
                    <button className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                      <ArrowRight className="h-4 w-4" />
                      Continue Assessment
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
