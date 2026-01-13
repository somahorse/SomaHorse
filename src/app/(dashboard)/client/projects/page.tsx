"use client";

import { useState } from "react";
import {
  Briefcase,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Users,
  ArrowRight,
  Eye,
  MoreVertical,
  Plus,
  Edit,
  Trash2,
  X,
} from "lucide-react";

type ProjectStatus = "draft" | "active" | "completed" | "cancelled";
type FilterStatus = "all" | ProjectStatus;

interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  progress: number;
  budget: number;
  startDate: string;
  endDate: string;
  deliverables: string[];
  description: string;
  teamSize: number;
  talents: string[];
  spent: number;
}

export default function ClientProjects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Mock data - replace with real data from hooks/API
  const [projects] = useState<Project[]>([
    {
      id: "1",
      title: "AI Chatbot Development",
      status: "active",
      progress: 65,
      budget: 5000,
      spent: 3250,
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      deliverables: [
        "Chatbot architecture design",
        "Natural language processing integration",
        "User interface development",
        "Testing and deployment",
      ],
      description:
        "Building an intelligent chatbot solution for customer support with AI-powered responses and multi-language support.",
      teamSize: 3,
      talents: ["John Doe", "Jane Smith", "Mike Johnson"],
    },
    {
      id: "2",
      title: "Data Analytics Dashboard",
      status: "completed",
      progress: 100,
      budget: 3500,
      spent: 3500,
      startDate: "2023-12-01",
      endDate: "2024-01-10",
      deliverables: [
        "Dashboard design and wireframes",
        "Data visualization components",
        "Real-time data integration",
        "User authentication system",
      ],
      description:
        "Created a comprehensive analytics dashboard with real-time data visualization and interactive charts for business intelligence.",
      teamSize: 2,
      talents: ["Sarah Williams", "David Brown"],
    },
    {
      id: "3",
      title: "E-commerce Platform",
      status: "active",
      progress: 40,
      budget: 8000,
      spent: 3200,
      startDate: "2024-01-20",
      endDate: "2024-03-20",
      deliverables: [
        "Product catalog system",
        "Shopping cart functionality",
        "Payment gateway integration",
        "Order management system",
      ],
      description:
        "Developing a full-featured e-commerce platform with modern design and seamless payment processing.",
      teamSize: 4,
      talents: ["Emily Davis", "Chris Wilson", "Lisa Anderson", "Tom Martinez"],
    },
    {
      id: "4",
      title: "Cloud Migration Project",
      status: "draft",
      progress: 0,
      budget: 12000,
      spent: 0,
      startDate: "2024-02-20",
      endDate: "2024-04-20",
      deliverables: [
        "Infrastructure assessment",
        "Migration strategy",
        "Cloud architecture design",
        "Migration execution",
      ],
      description:
        "Planning and executing migration of on-premise infrastructure to cloud-based solution.",
      teamSize: 0,
      talents: [],
    },
    {
      id: "5",
      title: "Mobile App UI/UX",
      status: "completed",
      progress: 100,
      budget: 4500,
      spent: 4500,
      startDate: "2023-11-15",
      endDate: "2023-12-20",
      deliverables: [
        "UI/UX design mockups",
        "Design system documentation",
        "Interactive prototypes",
        "Developer handoff files",
      ],
      description:
        "Designed a modern and intuitive mobile app interface with focus on user experience and accessibility.",
      teamSize: 2,
      talents: ["Alex Thompson", "Maria Garcia"],
    },
    {
      id: "6",
      title: "API Integration Service",
      status: "cancelled",
      progress: 25,
      budget: 3000,
      spent: 750,
      startDate: "2023-10-01",
      endDate: "2023-11-15",
      deliverables: ["API documentation", "Integration code"],
      description: "Project was cancelled due to requirements change.",
      teamSize: 1,
      talents: ["Robert Lee"],
    },
  ]);

  const getStatusConfig = (status: ProjectStatus) => {
    switch (status) {
      case "active":
        return {
          label: "Active",
          color: "bg-blue-100 text-blue-700 border-blue-200",
          icon: Clock,
          iconColor: "text-blue-600",
        };
      case "completed":
        return {
          label: "Completed",
          color: "bg-emerald-100 text-emerald-700 border-emerald-200",
          icon: CheckCircle2,
          iconColor: "text-emerald-600",
        };
      case "draft":
        return {
          label: "Draft",
          color: "bg-amber-100 text-amber-700 border-amber-200",
          icon: FileText,
          iconColor: "text-amber-600",
        };
      case "cancelled":
        return {
          label: "Cancelled",
          color: "bg-red-100 text-red-700 border-red-200",
          icon: XCircle,
          iconColor: "text-red-600",
        };
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === "active").length,
    completed: projects.filter((p) => p.status === "completed").length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: projects.reduce((sum, p) => sum + p.spent, 0),
    totalTalents: new Set(projects.flatMap((p) => p.talents)).size,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
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
              Projects
            </h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Manage and track all your projects
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
            <Plus className="h-4 w-4" />
            New Project
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">Total Projects</p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {stats.total}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 sm:h-12 sm:w-12">
                <Briefcase className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">Active Projects</p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {stats.active}
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
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">Total Budget</p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {formatCurrency(stats.totalBudget)}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 sm:h-12 sm:w-12">
                <DollarSign className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">Active Talents</p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {stats.totalTalents}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 sm:h-12 sm:w-12">
                <Users className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-slate-400" />
            <div className="flex gap-2 overflow-x-auto">
              {(["all", "active", "completed", "draft", "cancelled"] as FilterStatus[]).map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${
                      statusFilter === status
                        ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-white"
                        : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {status === "all"
                      ? "All"
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const statusConfig = getStatusConfig(project.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={project.id}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
                >
                  {/* Project Header */}
                  <div className="bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
                          {project.title}
                        </h3>
                        <div className="mt-2 flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusConfig.color}`}
                          >
                            <StatusIcon className={`h-3.5 w-3.5 ${statusConfig.iconColor}`} />
                            {statusConfig.label}
                          </span>
                        </div>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-4 sm:p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-slate-600 sm:text-sm">Budget</p>
                        <p className="mt-1 text-lg font-extrabold text-slate-900">
                          {formatCurrency(project.budget)}
                        </p>
                      </div>
                      {project.spent > 0 && (
                        <div className="text-right">
                          <p className="text-xs font-semibold text-slate-600 sm:text-sm">Spent</p>
                          <p className="mt-1 text-lg font-extrabold text-slate-900">
                            {formatCurrency(project.spent)}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Progress */}
                    {project.status !== "draft" && project.status !== "cancelled" && (
                      <div className="mb-4">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-600">Progress</span>
                          <span className="font-bold text-slate-900">{project.progress}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Timeline */}
                    <div className="mb-4 space-y-2 text-xs text-slate-600 sm:text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span>
                          {formatDate(project.startDate)} - {formatDate(project.endDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-slate-400" />
                        <span>
                          {project.teamSize} {project.teamSize === 1 ? "talent" : "talents"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <span>{project.deliverables.length} deliverables</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-4 line-clamp-2 text-xs text-slate-600 sm:text-sm">
                      {project.description}
                    </p>

                    {/* Team Members */}
                    {project.talents.length > 0 && (
                      <div className="mb-4">
                        <p className="mb-2 text-xs font-semibold text-slate-600">Team</p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.talents.slice(0, 3).map((talent, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700"
                            >
                              {talent}
                            </span>
                          ))}
                          {project.talents.length > 3 && (
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                              +{project.talents.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:px-4 sm:text-sm"
                      >
                        <Eye className="mr-1.5 inline h-4 w-4" />
                        View Details
                      </button>
                      {project.status === "draft" && (
                        <button className="flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:px-4 sm:text-sm">
                          <Edit className="h-4 w-4" />
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
            <Briefcase className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">No projects found</h3>
            <p className="mt-2 text-sm text-slate-600">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "You don't have any projects yet. Create your first project to get started."}
            </p>
            {!searchQuery && statusFilter === "all" && (
              <button className="mt-4 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                <Plus className="mr-2 inline h-4 w-4" />
                Create Project
              </button>
            )}
          </div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                      {selectedProject.title}
                    </h2>
                    <div className="mt-2 flex items-center gap-2">
                      {(() => {
                        const statusConfig = getStatusConfig(selectedProject.status);
                        const StatusIcon = statusConfig.icon;
                        return (
                          <span
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold ${statusConfig.color}`}
                          >
                            <StatusIcon className={`h-4 w-4 ${statusConfig.iconColor}`} />
                            {statusConfig.label}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 space-y-6">
                {/* Budget and Spending */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-600 sm:text-sm">Budget</p>
                    <p className="mt-1 text-xl font-extrabold text-slate-900">
                      {formatCurrency(selectedProject.budget)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-600 sm:text-sm">Spent</p>
                    <p className="mt-1 text-xl font-extrabold text-slate-900">
                      {formatCurrency(selectedProject.spent)}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                {selectedProject.status !== "draft" &&
                  selectedProject.status !== "cancelled" && (
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-semibold text-slate-600">Project Progress</span>
                        <span className="font-bold text-slate-900">
                          {selectedProject.progress}%
                        </span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                          style={{ width: `${selectedProject.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                {/* Timeline */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="font-semibold">Start Date</span>
                    </div>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                      {formatDate(selectedProject.startDate)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="font-semibold">End Date</span>
                    </div>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                      {formatDate(selectedProject.endDate)}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="mb-2 text-base font-extrabold text-slate-900">Description</h3>
                  <p className="text-sm leading-relaxed text-slate-700">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Team Members */}
                {selectedProject.talents.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-base font-extrabold text-slate-900">Team Members</h3>
                    <div className="space-y-2">
                      {selectedProject.talents.map((talent, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
                              <Users className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-slate-900">{talent}</span>
                          </div>
                          <button className="text-xs font-semibold text-[#2563EB] hover:text-[#1d4ed8]">
                            View Profile
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Deliverables */}
                <div>
                  <h3 className="mb-3 text-base font-extrabold text-slate-900">Deliverables</h3>
                  <ul className="space-y-2">
                    {selectedProject.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                        <span className="text-sm text-slate-700">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 border-t border-slate-200 bg-slate-50 p-4 sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Close
                  </button>
                  {selectedProject.status === "active" && (
                    <button className="rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                      Manage Project
                    </button>
                  )}
                  {selectedProject.status === "draft" && (
                    <button className="rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                      Launch Project
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

