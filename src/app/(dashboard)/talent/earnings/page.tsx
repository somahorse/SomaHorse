"use client";

import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  CreditCard,
  Banknote,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  Filter,
  FileText,
} from "lucide-react";

type PaymentStatus = "pending" | "processing" | "completed" | "failed";
type TimePeriod = "all" | "this-month" | "last-month" | "this-year";

interface Transaction {
  id: string;
  project: string;
  client: string;
  amount: number;
  status: PaymentStatus;
  date: string;
  type: "payment" | "withdrawal";
  description?: string;
}

export default function TalentEarnings() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("all");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Mock data - replace with real data from hooks/API
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      project: "AI Chatbot Development",
      client: "TechCorp Inc.",
      amount: 3200,
      status: "completed",
      date: "2024-02-10",
      type: "payment",
      description: "Payment for completed project deliverables",
    },
    {
      id: "2",
      project: "Data Analytics Dashboard",
      client: "DataFlow Systems",
      amount: 2800,
      status: "completed",
      date: "2024-02-05",
      type: "payment",
      description: "Final payment for project completion",
    },
    {
      id: "3",
      project: "Mobile App UI/UX",
      client: "StartupXYZ",
      amount: 4500,
      status: "completed",
      date: "2024-01-28",
      type: "payment",
      description: "Full project payment",
    },
    {
      id: "4",
      project: "E-commerce Platform",
      client: "RetailPro",
      amount: 2000,
      status: "pending",
      date: "2024-02-15",
      type: "payment",
      description: "Milestone payment - pending approval",
    },
    {
      id: "5",
      project: "API Integration Service",
      client: "ConnectAPI",
      amount: 1500,
      status: "processing",
      date: "2024-02-12",
      type: "payment",
      description: "Payment being processed",
    },
    {
      id: "6",
      project: "Cloud Migration Project",
      client: "Enterprise Solutions",
      amount: 3000,
      status: "completed",
      date: "2024-01-20",
      type: "payment",
      description: "Initial project payment",
    },
    {
      id: "7",
      project: "Withdrawal",
      client: "Bank Transfer",
      amount: 5000,
      status: "completed",
      date: "2024-02-08",
      type: "withdrawal",
      description: "Withdrawal to bank account",
    },
  ]);

  const getFilteredTransactions = () => {
    const now = new Date();
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      switch (timePeriod) {
        case "this-month":
          return (
            transactionDate.getMonth() === now.getMonth() &&
            transactionDate.getFullYear() === now.getFullYear()
          );
        case "last-month":
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
          return (
            transactionDate.getMonth() === lastMonth.getMonth() &&
            transactionDate.getFullYear() === lastMonth.getFullYear()
          );
        case "this-year":
          return transactionDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  };

  const filteredTransactions = getFilteredTransactions();

  const getStatusConfig = (status: PaymentStatus) => {
    switch (status) {
      case "completed":
        return {
          label: "Completed",
          color: "bg-emerald-100 text-emerald-700 border-emerald-200",
          icon: CheckCircle2,
          iconColor: "text-emerald-600",
        };
      case "pending":
        return {
          label: "Pending",
          color: "bg-amber-100 text-amber-700 border-amber-200",
          icon: Clock,
          iconColor: "text-amber-600",
        };
      case "processing":
        return {
          label: "Processing",
          color: "bg-blue-100 text-blue-700 border-blue-200",
          icon: Clock,
          iconColor: "text-blue-600",
        };
      case "failed":
        return {
          label: "Failed",
          color: "bg-red-100 text-red-700 border-red-200",
          icon: XCircle,
          iconColor: "text-red-600",
        };
    }
  };

  const calculateStats = () => {
    const completed = filteredTransactions.filter(
      (t) => t.status === "completed" && t.type === "payment"
    );
    const pending = filteredTransactions.filter(
      (t) => t.status === "pending" && t.type === "payment"
    );
    const processing = filteredTransactions.filter(
      (t) => t.status === "processing" && t.type === "payment"
    );
    const withdrawals = filteredTransactions.filter((t) => t.type === "withdrawal");

    const totalEarnings = completed.reduce((sum, t) => sum + t.amount, 0);
    const pendingAmount = pending.reduce((sum, t) => sum + t.amount, 0);
    const processingAmount = processing.reduce((sum, t) => sum + t.amount, 0);
    const totalWithdrawn = withdrawals
      .filter((t) => t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);
    const availableBalance = totalEarnings - totalWithdrawn;

    return {
      totalEarnings,
      pendingAmount,
      processingAmount,
      totalWithdrawn,
      availableBalance,
      completedCount: completed.length,
      pendingCount: pending.length,
    };
  };

  const stats = calculateStats();

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

  const getPeriodLabel = (period: TimePeriod) => {
    switch (period) {
      case "this-month":
        return "This Month";
      case "last-month":
        return "Last Month";
      case "this-year":
        return "This Year";
      default:
        return "All Time";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">
              Earnings
            </h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Track your earnings, payments, and financial overview
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:px-4 sm:text-sm">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Main Stats Cards */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">
                  Total Earnings
                </p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {formatCurrency(stats.totalEarnings)}
                </p>
                <div className="mt-2 flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-600 sm:h-4 sm:w-4" />
                  <span className="text-xs text-emerald-600 sm:text-sm">+18.2%</span>
                </div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 sm:h-12 sm:w-12">
                <DollarSign className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">
                  Available Balance
                </p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {formatCurrency(stats.availableBalance)}
                </p>
                <p className="mt-1 text-xs text-slate-500">Ready to withdraw</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 sm:h-12 sm:w-12">
                <Banknote className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">Pending</p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {formatCurrency(stats.pendingAmount)}
                </p>
                <p className="mt-1 text-xs text-slate-500">{stats.pendingCount} payments</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 sm:h-12 sm:w-12">
                <Clock className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">Total Withdrawn</p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {formatCurrency(stats.totalWithdrawn)}
                </p>
                <p className="mt-1 text-xs text-slate-500">All time</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500 sm:h-12 sm:w-12">
                <ArrowDownRight className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Period Filter */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <Filter className="h-5 w-5 shrink-0 text-slate-400" />
          {(["all", "this-month", "last-month", "this-year"] as TimePeriod[]).map((period) => (
            <button
              key={period}
              onClick={() => setTimePeriod(period)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${
                timePeriod === period
                  ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-white"
                  : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
              }`}
            >
              {getPeriodLabel(period)}
            </button>
          ))}
        </div>

        {/* Earnings Overview Card */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
            <div className="border-b border-slate-200 bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-extrabold text-slate-900 sm:text-lg">
                  Transaction History
                </h2>
                <span className="text-xs text-slate-600 sm:text-sm">
                  {getPeriodLabel(timePeriod)}
                </span>
              </div>
            </div>
            <div className="divide-y divide-slate-200">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => {
                  const statusConfig = getStatusConfig(transaction.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div
                      key={transaction.id}
                      onClick={() => setSelectedTransaction(transaction)}
                      className="cursor-pointer px-4 py-4 transition-colors hover:bg-slate-50 sm:px-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                              transaction.type === "payment"
                                ? "bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500"
                                : "bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500"
                            }`}
                          >
                            {transaction.type === "payment" ? (
                              <ArrowUpRight className="h-5 w-5 text-white" />
                            ) : (
                              <ArrowDownRight className="h-5 w-5 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                                {transaction.project}
                              </h3>
                              <span
                                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${statusConfig.color}`}
                              >
                                <StatusIcon className={`h-3 w-3 ${statusConfig.iconColor}`} />
                                {statusConfig.label}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                              {transaction.client}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {formatDate(transaction.date)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-base font-extrabold sm:text-lg ${
                              transaction.type === "payment"
                                ? "text-emerald-600"
                                : "text-slate-900"
                            }`}
                          >
                            {transaction.type === "payment" ? "+" : "-"}
                            {formatCurrency(transaction.amount)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-12 text-center">
                  <DollarSign className="mx-auto h-12 w-12 text-slate-400" />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    No transactions found
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    No transactions for {getPeriodLabel(timePeriod).toLowerCase()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & Summary */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
              <div className="border-b border-slate-200 bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 px-4 py-3 sm:px-6 sm:py-4">
                <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
                  Quick Actions
                </h3>
              </div>
              <div className="p-4 sm:p-6 space-y-3">
                <button className="flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-4 py-3 text-left transition-colors hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500">
                      <ArrowDownRight className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Withdraw Funds</p>
                      <p className="text-xs text-slate-600">Transfer to bank account</p>
                    </div>
                  </div>
                </button>
                <button className="flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-4 py-3 text-left transition-colors hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Payment Methods</p>
                      <p className="text-xs text-slate-600">Manage payment options</p>
                    </div>
                  </div>
                </button>
                <button className="flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-4 py-3 text-left transition-colors hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Tax Documents</p>
                      <p className="text-xs text-slate-600">View and download</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Earnings Summary */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
              <div className="border-b border-slate-200 bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 px-4 py-3 sm:px-6 sm:py-4">
                <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
                  Summary
                </h3>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Completed Payments</span>
                  <span className="text-sm font-bold text-slate-900">
                    {stats.completedCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Pending Payments</span>
                  <span className="text-sm font-bold text-amber-600">
                    {stats.pendingCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Processing</span>
                  <span className="text-sm font-bold text-blue-600">
                    {formatCurrency(stats.processingAmount)}
                  </span>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-slate-900">Net Earnings</span>
                    <span className="text-lg font-extrabold text-slate-900">
                      {formatCurrency(stats.totalEarnings)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Detail Modal */}
        {selectedTransaction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-xl">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                      Transaction Details
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">{selectedTransaction.project}</p>
                  </div>
                  <button
                    onClick={() => setSelectedTransaction(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white hover:text-slate-600"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-600 sm:text-sm">Amount</p>
                    <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                      {formatCurrency(selectedTransaction.amount)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-600 sm:text-sm">Status</p>
                    <div className="mt-1">
                      {(() => {
                        const statusConfig = getStatusConfig(selectedTransaction.status);
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
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-600 sm:text-sm">Date</p>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                      {formatDate(selectedTransaction.date)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-600 sm:text-sm">Type</p>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                      {selectedTransaction.type === "payment" ? "Payment" : "Withdrawal"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-slate-600">Client/Project</p>
                  <p className="text-base text-slate-900">{selectedTransaction.client}</p>
                </div>

                {selectedTransaction.description && (
                  <div>
                    <p className="mb-2 text-sm font-semibold text-slate-600">Description</p>
                    <p className="text-sm leading-relaxed text-slate-700">
                      {selectedTransaction.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="border-t border-slate-200 bg-slate-50 p-4 sm:p-6">
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="w-full rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
