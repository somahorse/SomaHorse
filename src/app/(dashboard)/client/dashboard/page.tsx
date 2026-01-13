"use client";

import {
  TrendingUp,
  DollarSign,
  Briefcase,
  CheckCircle2,
  Clock,
  Users,
  ArrowUpRight,
  Calendar,
  Target,
  Zap,
  AlertCircle,
  Plus,
  FileText,
  Building2,
  Search,
} from "lucide-react";

interface MetricCard {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ElementType;
  gradient: string;
}

export default function ClientDashboard() {
  // Mock data - replace with real data from your hooks/API
  const companyName = "TechCorp Inc.";

  const metrics: MetricCard[] = [
    {
      label: "Total Spending",
      value: "$45,200",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    },
    {
      label: "Active Projects",
      value: "6",
      change: "+2 this month",
      trend: "up",
      icon: Briefcase,
      gradient: "from-blue-400 via-indigo-500 to-purple-500",
    },
    {
      label: "Active Teams",
      value: "4",
      change: "+1 this month",
      trend: "up",
      icon: Users,
      gradient: "from-violet-400 via-purple-500 to-fuchsia-500",
    },
    {
      label: "On-Time Delivery",
      value: "92%",
      change: "+5.2%",
      trend: "up",
      icon: CheckCircle2,
      gradient: "from-amber-400 via-orange-500 to-red-500",
    },
  ];

  const recentProjects = [
    {
      id: 1,
      title: "AI Chatbot Development",
      status: "active",
      progress: 65,
      budget: 5000,
      deadline: "2024-02-15",
      teamSize: 3,
      talents: ["John Doe", "Jane Smith", "Mike Johnson"],
    },
    {
      id: 2,
      title: "Data Analytics Dashboard",
      status: "completed",
      progress: 100,
      budget: 3500,
      deadline: "2024-02-10",
      teamSize: 2,
      talents: ["Sarah Williams", "David Brown"],
    },
    {
      id: 3,
      title: "E-commerce Platform",
      status: "active",
      progress: 40,
      budget: 8000,
      deadline: "2024-03-20",
      teamSize: 4,
      talents: ["Emily Davis", "Chris Wilson", "Lisa Anderson", "Tom Martinez"],
    },
    {
      id: 4,
      title: "Cloud Migration",
      status: "draft",
      progress: 0,
      budget: 12000,
      deadline: "2024-04-20",
      teamSize: 0,
      talents: [],
    },
  ];

  const getStatusBadge = (status: string) => {
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
      default:
        return {
          label: status,
          color: "bg-slate-100 text-slate-700 border-slate-200",
          icon: AlertCircle,
          iconColor: "text-slate-600",
        };
    }
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

  const stats = {
    totalProjects: recentProjects.length,
    activeProjects: recentProjects.filter((p) => p.status === "active").length,
    completedProjects: recentProjects.filter((p) => p.status === "completed").length,
    totalSpent: recentProjects
      .filter((p) => p.status === "completed")
      .reduce((sum, p) => sum + p.budget, 0),
    activeTalents: new Set(
      recentProjects.flatMap((p) => p.talents)
    ).size,
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">
              Welcome back! 👋
            </h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Here&apos;s an overview of your projects and teams
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:px-4 sm:text-sm">
              <Calendar className="mr-2 inline h-4 w-4" />
              <span className="hidden sm:inline">View Calendar</span>
              <span className="sm:hidden">Calendar</span>
            </button>
          </div>
        </div>

        {/* Company Info Card */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
          <div className="bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 p-4 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 sm:h-16 sm:w-16">
                  <Building2 className="h-6 w-6 text-white sm:h-8 sm:w-8" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 sm:text-sm">
                    Company
                  </p>
                  <h2 className="mt-1 text-lg font-extrabold text-slate-900 sm:text-xl">
                    {companyName}
                  </h2>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="text-center sm:text-right">
                  <p className="text-xs font-semibold text-slate-600 sm:text-sm">
                    Total Projects
                  </p>
                  <p className="mt-1 text-lg font-extrabold text-slate-900 sm:text-xl">
                    {stats.totalProjects}
                  </p>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-xs font-semibold text-slate-600 sm:text-sm">
                    Active Teams
                  </p>
                  <p className="mt-1 text-lg font-extrabold text-slate-900 sm:text-xl">
                    {stats.activeTalents}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-600 sm:text-sm">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-xl font-extrabold text-slate-900 sm:text-2xl">
                      {metric.value}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-1">
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-600 sm:h-4 sm:w-4" />
                      ) : (
                        <TrendingUp className="h-3.5 w-3.5 rotate-180 text-red-600 sm:h-4 sm:w-4" />
                      )}
                      <span
                        className={`text-xs font-semibold sm:text-sm ${
                          metric.trend === "up"
                            ? "text-emerald-600"
                            : metric.trend === "down"
                            ? "text-red-600"
                            : "text-slate-600"
                        }`}
                      >
                        {metric.change}
                      </span>
                      <span className="text-xs text-slate-500 sm:text-sm">vs last month</span>
                    </div>
                  </div>
                  <div
                    className={`ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r ${metric.gradient} shadow-lg sm:h-12 sm:w-12`}
                  >
                    <Icon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Stats Row */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">
                  Active Projects
                </p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {stats.activeProjects}
                </p>
                <p className="mt-1 text-xs text-slate-500">In progress</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 sm:h-12 sm:w-12">
                <Zap className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">
                  Completed Projects
                </p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {stats.completedProjects}
                </p>
                <p className="mt-1 text-xs text-slate-500">All time</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 sm:h-12 sm:w-12">
                <CheckCircle2 className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">
                  Total Invested
                </p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {formatCurrency(stats.totalSpent)}
                </p>
                <p className="mt-1 text-xs text-slate-500">Completed projects</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 sm:h-12 sm:w-12">
                <Target className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
          <div className="border-b border-slate-200 bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900 sm:text-lg">
                Recent Projects
              </h2>
              <button className="flex items-center gap-1 text-xs font-semibold text-[#2563EB] transition-colors hover:text-[#1d4ed8] sm:text-sm">
                View All
                <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
          <div className="divide-y divide-slate-200">
            {recentProjects.map((project) => {
              const statusBadge = getStatusBadge(project.status);
              const StatusIcon = statusBadge.icon;

              return (
                <div
                  key={project.id}
                  className="px-4 py-4 transition-colors hover:bg-slate-50 sm:px-6 sm:py-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                          {project.title}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusBadge.color}`}
                        >
                          <StatusIcon className={`h-3.5 w-3.5 ${statusBadge.iconColor}`} />
                          {statusBadge.label}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                        {project.status !== "draft" && (
                          <div className="flex-1">
                            <div className="mb-1 flex items-center justify-between text-xs">
                              <span className="font-semibold text-slate-600">Progress</span>
                              <span className="font-bold text-slate-900">
                                {project.progress}%
                              </span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                              <div
                                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-slate-400" />
                            <span className="font-semibold text-slate-900">
                              {formatCurrency(project.budget)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-600">{formatDate(project.deadline)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-600">
                              {project.teamSize} {project.teamSize === 1 ? "talent" : "talents"}
                            </span>
                          </div>
                        </div>
                      </div>
                      {project.talents.length > 0 && (
                        <div className="mt-3">
                          <p className="mb-1 text-xs font-semibold text-slate-600">Team Members</p>
                          <div className="flex flex-wrap gap-2">
                            {project.talents.map((talent, index) => (
                              <span
                                key={index}
                                className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
                              >
                                {talent}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <button className="group rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:shadow-md sm:p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 sm:h-12 sm:w-12">
              <Plus className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
              New Project
            </h3>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              Start a new project
            </p>
          </button>

          <button className="group rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:shadow-md sm:p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 sm:h-12 sm:w-12">
              <Search className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
              Find Talent
            </h3>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              Browse available talent
            </p>
          </button>

          <button className="group rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:shadow-md sm:p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500 sm:h-12 sm:w-12">
              <FileText className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
              View Invoices
            </h3>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              Manage payments
            </p>
          </button>

          <button className="group rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:shadow-md sm:p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 sm:h-12 sm:w-12">
              <Briefcase className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
              All Projects
            </h3>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              View all projects
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

