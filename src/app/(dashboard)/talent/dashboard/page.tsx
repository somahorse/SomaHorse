"use client";

import {
  TrendingUp,
  DollarSign,
  Briefcase,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowUpRight,
  Calendar,
  Target,
  Award,
  Users,
  Zap,
} from "lucide-react";

type ProfileStatus = "active" | "visible" | "pending" | "inactive";

interface MetricCard {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ElementType;
  gradient: string;
}

export default function TalentDashboard() {
  // Mock data - replace with real data from your hooks/API
  const profileStatus: ProfileStatus = "active";
  const isVisible = true;

  const metrics: MetricCard[] = [
    {
      label: "Total Earnings",
      value: "$12,450",
      change: "+18.2%",
      trend: "up",
      icon: DollarSign,
      gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    },
    {
      label: "Active Projects",
      value: "8",
      change: "+3 this month",
      trend: "up",
      icon: Briefcase,
      gradient: "from-blue-400 via-indigo-500 to-purple-500",
    },
    {
      label: "Completion Rate",
      value: "94%",
      change: "+2.1%",
      trend: "up",
      icon: CheckCircle2,
      gradient: "from-violet-400 via-purple-500 to-fuchsia-500",
    },
    {
      label: "Response Time",
      value: "2.4h",
      change: "-15%",
      trend: "up",
      icon: Zap,
      gradient: "from-amber-400 via-orange-500 to-red-500",
    },
  ];

  const recentProjects = [
    {
      id: 1,
      title: "AI Chatbot Development",
      client: "TechCorp Inc.",
      status: "in-progress",
      progress: 65,
      deadline: "2024-02-15",
      earnings: "$3,200",
    },
    {
      id: 2,
      title: "Data Analytics Dashboard",
      client: "DataFlow Systems",
      status: "review",
      progress: 100,
      deadline: "2024-02-10",
      earnings: "$2,800",
    },
    {
      id: 3,
      title: "Mobile App UI/UX",
      client: "StartupXYZ",
      status: "completed",
      progress: 100,
      deadline: "2024-02-05",
      earnings: "$4,500",
    },
  ];

  const getStatusBadge = (status: ProfileStatus, visible: boolean) => {
    if (status === "active" && visible) {
      return {
        label: "Active & Visible",
        icon: Eye,
        color: "bg-emerald-100 text-emerald-700 border-emerald-200",
        iconColor: "text-emerald-600",
      };
    }
    if (status === "active" && !visible) {
      return {
        label: "Active (Hidden)",
        icon: EyeOff,
        color: "bg-amber-100 text-amber-700 border-amber-200",
        iconColor: "text-amber-600",
      };
    }
    if (status === "pending") {
      return {
        label: "Pending Review",
        icon: Clock,
        color: "bg-blue-100 text-blue-700 border-blue-200",
        iconColor: "text-blue-600",
      };
    }
    return {
      label: "Inactive",
      icon: AlertCircle,
      color: "bg-slate-100 text-slate-700 border-slate-200",
      iconColor: "text-slate-600",
    };
  };

  const statusBadge = getStatusBadge(profileStatus, isVisible);
  const StatusIcon = statusBadge.icon;

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
              Here&apos;s what&apos;s happening with your profile today
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

        {/* Profile Status Card */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
          <div className="bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 p-4 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 sm:h-16 sm:w-16">
                  <StatusIcon className="h-6 w-6 text-white sm:h-8 sm:w-8" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 sm:text-sm">
                    Profile Status
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold sm:gap-2 sm:px-3 sm:text-sm ${statusBadge.color}`}
                    >
                      <StatusIcon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${statusBadge.iconColor}`} />
                      <span className="whitespace-nowrap">{statusBadge.label}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="sm:text-right">
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">
                  Profile Completion
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 sm:w-32">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                      style={{ width: "85%" }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-900 sm:text-sm">85%</span>
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
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">
                  Total Projects
                </p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">24</p>
                <p className="mt-1 text-xs text-slate-500">All time</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 sm:h-12 sm:w-12">
                <Target className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">
                  Client Rating
                </p>
                <div className="mt-1 flex items-center gap-1">
                  <p className="text-xl font-extrabold text-slate-900 sm:text-2xl">4.9</p>
                  <Award className="h-4 w-4 text-amber-500 sm:h-5 sm:w-5" />
                </div>
                <p className="mt-1 text-xs text-slate-500">Based on 18 reviews</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 sm:h-12 sm:w-12">
                <Award className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">
                  Active Clients
                </p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">6</p>
                <p className="mt-1 text-xs text-slate-500">Current month</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 sm:h-12 sm:w-12">
                <Users className="h-5 w-5 text-white sm:h-6 sm:w-6" />
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
                <span className="hidden sm:inline">View All</span>
                <span className="sm:hidden">All</span>
                <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
          <div className="divide-y divide-slate-200">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="px-4 py-3 transition-colors hover:bg-slate-50 sm:px-6 sm:py-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                        {project.title}
                      </h3>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                          project.status === "completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : project.status === "in-progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {project.status === "completed"
                          ? "Completed"
                          : project.status === "in-progress"
                          ? "In Progress"
                          : "Under Review"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-600 sm:text-sm">{project.client}</p>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                      <div className="flex-1">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-600">
                            Progress
                          </span>
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
                      <div className="text-left sm:text-right">
                        <p className="text-xs font-semibold text-slate-600">
                          Earnings
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          {project.earnings}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <button className="group rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:shadow-md sm:p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 sm:h-12 sm:w-12">
              <Briefcase className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
              Browse Projects
            </h3>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              Find new opportunities
            </p>
          </button>

          <button className="group rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:shadow-md sm:p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 sm:h-12 sm:w-12">
              <Target className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
              Update Profile
            </h3>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              Enhance your visibility
            </p>
          </button>

          <button className="group rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:shadow-md sm:p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500 sm:h-12 sm:w-12">
              <Award className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
              View Assessments
            </h3>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              Check your skills
            </p>
          </button>

          <button className="group rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:shadow-md sm:p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 sm:h-12 sm:w-12">
              <DollarSign className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
              View Earnings
            </h3>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              Track your income
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
