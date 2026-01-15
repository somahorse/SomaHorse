"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  X,
  CreditCard,
  Building2,
  ArrowRight,
  Receipt,
} from "lucide-react";

type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";
type FilterStatus = "all" | InvoiceStatus;
type TimePeriod = "all" | "this-month" | "last-month" | "this-year";

interface Invoice {
  id: string;
  invoiceNumber: string;
  project: string;
  projectId: string;
  amount: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  description: string;
  lineItems: {
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }[];
  talent: string;
  paymentMethod?: string;
}

export default function ClientInvoices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("all");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Mock data - replace with real data from hooks/API
  const [invoices] = useState<Invoice[]>([
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      project: "AI Chatbot Development",
      projectId: "1",
      amount: 3000,
      tax: 300,
      total: 3300,
      status: "paid",
      issueDate: "2024-02-01",
      dueDate: "2024-02-15",
      paidDate: "2024-02-10",
      description: "Milestone payment for Phase 1 completion",
      lineItems: [
        {
          description: "Chatbot architecture design",
          quantity: 1,
          rate: 1500,
          amount: 1500,
        },
        {
          description: "NLP integration development",
          quantity: 1,
          rate: 1500,
          amount: 1500,
        },
      ],
      talent: "John Doe",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-002",
      project: "Data Analytics Dashboard",
      projectId: "2",
      amount: 3500,
      tax: 350,
      total: 3850,
      status: "paid",
      issueDate: "2024-01-25",
      dueDate: "2024-02-10",
      paidDate: "2024-02-05",
      description: "Final payment for project completion",
      lineItems: [
        {
          description: "Dashboard design and wireframes",
          quantity: 1,
          rate: 1200,
          amount: 1200,
        },
        {
          description: "Data visualization components",
          quantity: 1,
          rate: 1000,
          amount: 1000,
        },
        {
          description: "Real-time data integration",
          quantity: 1,
          rate: 1300,
          amount: 1300,
        },
      ],
      talent: "Sarah Williams",
      paymentMethod: "Credit Card",
    },
    {
      id: "3",
      invoiceNumber: "INV-2024-003",
      project: "E-commerce Platform",
      projectId: "3",
      amount: 3200,
      tax: 320,
      total: 3520,
      status: "sent",
      issueDate: "2024-02-10",
      dueDate: "2024-02-25",
      description: "Milestone payment for Phase 2",
      lineItems: [
        {
          description: "Product catalog system",
          quantity: 1,
          rate: 1200,
          amount: 1200,
        },
        {
          description: "Shopping cart functionality",
          quantity: 1,
          rate: 1000,
          amount: 1000,
        },
        {
          description: "Payment gateway integration",
          quantity: 1,
          rate: 1000,
          amount: 1000,
        },
      ],
      talent: "Emily Davis",
    },
    {
      id: "4",
      invoiceNumber: "INV-2024-004",
      project: "Mobile App UI/UX",
      projectId: "5",
      amount: 4500,
      tax: 450,
      total: 4950,
      status: "paid",
      issueDate: "2023-12-15",
      dueDate: "2023-12-30",
      paidDate: "2023-12-28",
      description: "Full project payment",
      lineItems: [
        {
          description: "UI/UX design mockups",
          quantity: 1,
          rate: 2000,
          amount: 2000,
        },
        {
          description: "Design system documentation",
          quantity: 1,
          rate: 1000,
          amount: 1000,
        },
        {
          description: "Interactive prototypes",
          quantity: 1,
          rate: 1500,
          amount: 1500,
        },
      ],
      talent: "Alex Thompson",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "5",
      invoiceNumber: "INV-2024-005",
      project: "Cloud Migration Project",
      projectId: "4",
      amount: 5000,
      tax: 500,
      total: 5500,
      status: "overdue",
      issueDate: "2024-01-20",
      dueDate: "2024-02-05",
      description: "Initial project payment",
      lineItems: [
        {
          description: "Infrastructure assessment",
          quantity: 1,
          rate: 2000,
          amount: 2000,
        },
        {
          description: "Migration strategy",
          quantity: 1,
          rate: 1500,
          amount: 1500,
        },
        {
          description: "Cloud architecture design",
          quantity: 1,
          rate: 1500,
          amount: 1500,
        },
      ],
      talent: "Mike Johnson",
    },
    {
      id: "6",
      invoiceNumber: "INV-2024-006",
      project: "API Integration Service",
      projectId: "6",
      amount: 1500,
      tax: 150,
      total: 1650,
      status: "draft",
      issueDate: "2024-02-12",
      dueDate: "2024-02-27",
      description: "Partial payment for completed work",
      lineItems: [
        {
          description: "API documentation",
          quantity: 1,
          rate: 800,
          amount: 800,
        },
        {
          description: "Integration code",
          quantity: 1,
          rate: 700,
          amount: 700,
        },
      ],
      talent: "Robert Lee",
    },
  ]);

  const getStatusConfig = (status: InvoiceStatus) => {
    switch (status) {
      case "paid":
        return {
          label: "Paid",
          color: "bg-emerald-100 text-emerald-700 border-emerald-200",
          icon: CheckCircle2,
          iconColor: "text-emerald-600",
        };
      case "sent":
        return {
          label: "Sent",
          color: "bg-blue-100 text-blue-700 border-blue-200",
          icon: Clock,
          iconColor: "text-blue-600",
        };
      case "overdue":
        return {
          label: "Overdue",
          color: "bg-red-100 text-red-700 border-red-200",
          icon: AlertCircle,
          iconColor: "text-red-600",
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
          color: "bg-slate-100 text-slate-700 border-slate-200",
          icon: XCircle,
          iconColor: "text-slate-600",
        };
    }
  };

  const getFilteredInvoices = () => {
    const now = new Date();
    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.talent.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
      const invoiceDate = new Date(invoice.issueDate);
      let matchesTimePeriod = true;
      switch (timePeriod) {
        case "this-month":
          matchesTimePeriod =
            invoiceDate.getMonth() === now.getMonth() &&
            invoiceDate.getFullYear() === now.getFullYear();
          break;
        case "last-month":
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
          matchesTimePeriod =
            invoiceDate.getMonth() === lastMonth.getMonth() &&
            invoiceDate.getFullYear() === lastMonth.getFullYear();
          break;
        case "this-year":
          matchesTimePeriod = invoiceDate.getFullYear() === now.getFullYear();
          break;
      }
      return matchesSearch && matchesStatus && matchesTimePeriod;
    });
  };

  const filteredInvoices = getFilteredInvoices();

  const stats = {
    total: invoices.length,
    paid: invoices.filter((i) => i.status === "paid").length,
    pending: invoices.filter((i) => i.status === "sent" || i.status === "overdue").length,
    totalPaid: invoices
      .filter((i) => i.status === "paid")
      .reduce((sum, i) => sum + i.total, 0),
    totalPending: invoices
      .filter((i) => i.status === "sent" || i.status === "overdue")
      .reduce((sum, i) => sum + i.total, 0),
    overdue: invoices.filter((i) => i.status === "overdue").length,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
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
              Invoices
            </h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              View and manage all your project invoices
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:px-4 sm:text-sm">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export All</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">Total Invoices</p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {stats.total}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 sm:h-12 sm:w-12">
                <FileText className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">Paid</p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {stats.paid}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {formatCurrency(stats.totalPaid)}
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
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">Pending</p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {stats.pending}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {formatCurrency(stats.totalPending)}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 sm:h-12 sm:w-12">
                <Clock className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600 sm:text-sm">Overdue</p>
                <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {stats.overdue}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-red-400 via-pink-500 to-rose-500 sm:h-12 sm:w-12">
                <AlertCircle className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-slate-400" />
            <div className="flex gap-2 overflow-x-auto">
              {(["all", "paid", "sent", "overdue", "draft"] as FilterStatus[]).map((status) => (
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
              ))}
            </div>
          </div>
        </div>

        {/* Time Period Filter */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <Calendar className="h-5 w-5 shrink-0 text-slate-400" />
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

        {/* Invoices List */}
        {filteredInvoices.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
            <div className="divide-y divide-slate-200">
              {filteredInvoices.map((invoice) => {
                const statusConfig = getStatusConfig(invoice.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={invoice.id}
                    onClick={() => setSelectedInvoice(invoice)}
                    className="cursor-pointer px-4 py-4 transition-colors hover:bg-slate-50 sm:px-6 sm:py-4"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <h3 className="text-sm font-extrabold text-slate-900 sm:text-base">
                            {invoice.invoiceNumber}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusConfig.color}`}
                          >
                            <StatusIcon className={`h-3.5 w-3.5 ${statusConfig.iconColor}`} />
                            {statusConfig.label}
                          </span>
                        </div>
                        <p className="mt-2 text-sm font-semibold text-slate-900">
                          {invoice.project}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-600 sm:text-sm">
                          <div className="flex items-center gap-1.5">
                            <Building2 className="h-4 w-4 text-slate-400" />
                            <span>{invoice.talent}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span>Due: {formatDate(invoice.dueDate)}</span>
                          </div>
                          {invoice.paidDate && (
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                              <span>Paid: {formatDate(invoice.paidDate)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs font-semibold text-slate-600 sm:text-sm">Total</p>
                          <p className="mt-1 text-lg font-extrabold text-slate-900">
                            {formatCurrency(invoice.total)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInvoice(invoice);
                          }}
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-50"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <Receipt className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">No invoices found</h3>
            <p className="mt-2 text-sm text-slate-600">
              {searchQuery || statusFilter !== "all" || timePeriod !== "all"
                ? "Try adjusting your search or filters"
                : "You don't have any invoices yet"}
            </p>
          </div>
        )}

        {/* Invoice Detail Modal */}
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-cyan-50 via-blue-50 to-violet-50 p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                      {selectedInvoice.invoiceNumber}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">{selectedInvoice.project}</p>
                  </div>
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 space-y-6">
                {/* Invoice Info */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-600 sm:text-sm">Issue Date</p>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                      {formatDate(selectedInvoice.issueDate)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-600 sm:text-sm">Due Date</p>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                      {formatDate(selectedInvoice.dueDate)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-600 sm:text-sm">Status</p>
                    <div className="mt-1">
                      {(() => {
                        const statusConfig = getStatusConfig(selectedInvoice.status);
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
                  {selectedInvoice.paidDate && (
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-semibold text-slate-600 sm:text-sm">Paid Date</p>
                      <p className="mt-1 text-base font-semibold text-slate-900">
                        {formatDate(selectedInvoice.paidDate)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Talent Info */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-2 text-xs font-semibold text-slate-600 sm:text-sm">Talent</p>
                  <p className="text-base font-semibold text-slate-900">
                    {selectedInvoice.talent}
                  </p>
                </div>

                {/* Description */}
                <div>
                  <p className="mb-2 text-sm font-semibold text-slate-600">Description</p>
                  <p className="text-sm text-slate-700">{selectedInvoice.description}</p>
                </div>

                {/* Line Items */}
                <div>
                  <h3 className="mb-3 text-base font-extrabold text-slate-900">Line Items</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600 sm:px-4 sm:text-sm">
                            Description
                          </th>
                          <th className="px-3 py-2 text-center text-xs font-semibold text-slate-600 sm:px-4 sm:text-sm">
                            Quantity
                          </th>
                          <th className="px-3 py-2 text-right text-xs font-semibold text-slate-600 sm:px-4 sm:text-sm">
                            Rate
                          </th>
                          <th className="px-3 py-2 text-right text-xs font-semibold text-slate-600 sm:px-4 sm:text-sm">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedInvoice.lineItems.map((item, index) => (
                          <tr key={index} className="border-b border-slate-100">
                            <td className="px-3 py-3 text-xs text-slate-900 sm:px-4 sm:text-sm">
                              {item.description}
                            </td>
                            <td className="px-3 py-3 text-center text-xs text-slate-600 sm:px-4 sm:text-sm">
                              {item.quantity}
                            </td>
                            <td className="px-3 py-3 text-right text-xs text-slate-600 sm:px-4 sm:text-sm">
                              {formatCurrency(item.rate)}
                            </td>
                            <td className="px-3 py-3 text-right text-xs font-semibold text-slate-900 sm:px-4 sm:text-sm">
                              {formatCurrency(item.amount)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Totals */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Subtotal</span>
                      <span className="font-semibold text-slate-900">
                        {formatCurrency(selectedInvoice.amount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Tax (10%)</span>
                      <span className="font-semibold text-slate-900">
                        {formatCurrency(selectedInvoice.tax)}
                      </span>
                    </div>
                    <div className="border-t border-slate-200 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-extrabold text-slate-900">Total</span>
                        <span className="text-lg font-extrabold text-slate-900">
                          {formatCurrency(selectedInvoice.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                {selectedInvoice.paymentMethod && (
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <CreditCard className="h-5 w-5 text-slate-600" />
                    <div>
                      <p className="text-xs font-semibold text-slate-600">Payment Method</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {selectedInvoice.paymentMethod}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 border-t border-slate-200 bg-slate-50 p-4 sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Close
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </button>
                  {selectedInvoice.status === "sent" && (
                    <button className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                      <CreditCard className="h-4 w-4" />
                      Pay Now
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



