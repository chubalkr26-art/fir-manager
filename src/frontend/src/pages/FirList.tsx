import { FirStatus, useDeleteFir, useListFirs } from "@/api";
import { Layout } from "@/components/Layout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import type { FirId, FirRecordView } from "@/types";
import { Link } from "@tanstack/react-router";
import { Eye, FileText, Filter, Search, Trash2, Upload, X } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

type StatusFilterKey = "all" | FirStatus;

function FirStatusBadge({ status }: { status: FirStatus }) {
  const map: Record<FirStatus, { label: string; cls: string }> = {
    [FirStatus.pending_summary]: {
      label: "Pending Summary",
      cls: "bg-muted text-muted-foreground border-border",
    },
    [FirStatus.summarizing]: {
      label: "Summarizing…",
      cls: "bg-primary/10 text-primary border-primary/30",
    },
    [FirStatus.summary_ready]: {
      label: "Summary Ready",
      cls: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
    },
    [FirStatus.summary_failed]: {
      label: "Failed",
      cls: "bg-accent/10 text-accent border-accent/30",
    },
  };
  const { label, cls } = map[status] ?? { label: String(status), cls: "" };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${cls}`}
    >
      {label}
    </span>
  );
}

// ─── Delete button ────────────────────────────────────────────────────────────

function DeleteFirButton({
  fir,
  index,
}: { fir: FirRecordView; index: number }) {
  const deleteMutation = useDeleteFir();

  function handleDelete() {
    deleteMutation.mutate(fir.id as FirId, {
      onSuccess: () => toast.success(`FIR ${fir.firNumber} deleted.`),
      onError: () => toast.error("Failed to delete FIR."),
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          data-ocid={`fir_list.delete_button.${index}`}
          aria-label="Delete FIR"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent data-ocid="fir_list.delete.dialog">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete FIR Record</AlertDialogTitle>
          <AlertDialogDescription>
            Permanently delete <strong>{fir.firNumber}</strong>? This cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-ocid="fir_list.delete.cancel_button">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            data-ocid="fir_list.delete.confirm_button"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FirList() {
  const { data: firs = [], isLoading } = useListFirs();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterKey>("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filtered = useMemo(() => {
    return firs.filter((fir) => {
      const matchSearch =
        !search ||
        fir.firNumber.toLowerCase().includes(search.toLowerCase()) ||
        fir.caseTitle.toLowerCase().includes(search.toLowerCase()) ||
        fir.complainantName.toLowerCase().includes(search.toLowerCase()) ||
        fir.offenseType.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter === "all" || fir.status === statusFilter;

      const incidentMs = Number(fir.dateOfIncident) / 1_000_000;
      const matchFrom = !fromDate || incidentMs >= new Date(fromDate).getTime();
      const matchTo =
        !toDate || incidentMs <= new Date(toDate).getTime() + 86400000;

      return matchSearch && matchStatus && matchFrom && matchTo;
    });
  }, [firs, search, statusFilter, fromDate, toDate]);

  const sorted = [...filtered].sort((a, b) =>
    Number(b.uploadDate - a.uploadDate),
  );

  const hasFilters =
    !!search || statusFilter !== "all" || !!fromDate || !!toDate;

  function clearFilters() {
    setSearch("");
    setStatusFilter("all");
    setFromDate("");
    setToDate("");
  }

  return (
    <Layout>
      <div
        className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-8 space-y-6"
        data-ocid="fir_list.page"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              FIR Records
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              All First Information Reports registered at this station
            </p>
          </div>
          <Button asChild data-ocid="fir_list.upload_fir.button">
            <Link to="/firs/upload">
              <Upload className="w-4 h-4 mr-1.5" />
              Upload New FIR
            </Link>
          </Button>
        </div>

        {/* Filter Bar */}
        <Card
          className="border shadow-card"
          data-ocid="fir_list.filter.section"
        >
          <CardHeader className="px-4 py-3 border-b bg-muted/30">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
              <Filter className="w-4 h-4" />
              Filter Records
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="FIR #, title, complainant…"
                  className="pl-8 h-9 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  data-ocid="fir_list.search_input"
                />
              </div>

              {/* Status */}
              <Select
                value={statusFilter}
                onValueChange={(v) => setStatusFilter(v as StatusFilterKey)}
              >
                <SelectTrigger
                  className="h-9 text-sm"
                  data-ocid="fir_list.status.select"
                >
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value={FirStatus.pending_summary}>
                    Pending Summary
                  </SelectItem>
                  <SelectItem value={FirStatus.summarizing}>
                    Summarizing
                  </SelectItem>
                  <SelectItem value={FirStatus.summary_ready}>
                    Summary Ready
                  </SelectItem>
                  <SelectItem value={FirStatus.summary_failed}>
                    Failed
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* From Date */}
              <div>
                <Label className="sr-only">From Date</Label>
                <Input
                  type="date"
                  className="h-9 text-sm"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  data-ocid="fir_list.from_date.input"
                />
              </div>

              {/* To Date */}
              <div className="flex items-center gap-2">
                <Input
                  type="date"
                  className="h-9 text-sm flex-1"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  data-ocid="fir_list.to_date.input"
                />
                {hasFilters && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground"
                    onClick={clearFilters}
                    aria-label="Clear filters"
                    data-ocid="fir_list.clear_filters.button"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card
          className="border shadow-card overflow-hidden"
          data-ocid="fir_list.table"
        >
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 space-y-3" data-ocid="fir_list.loading_state">
                {(["r1", "r2", "r3", "r4", "r5", "r6"] as const).map((k) => (
                  <Skeleton key={k} className="h-11 w-full" />
                ))}
              </div>
            ) : sorted.length === 0 ? (
              <div
                className="py-16 text-center"
                data-ocid="fir_list.empty_state"
              >
                <FileText className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
                <p className="font-medium text-foreground">
                  No FIR records found
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {hasFilters
                    ? "Try adjusting your filters"
                    : "Upload the first FIR to get started"}
                </p>
                {!hasFilters && (
                  <Button
                    asChild
                    className="mt-4"
                    size="sm"
                    data-ocid="fir_list.empty_upload.button"
                  >
                    <Link to="/firs/upload">
                      <Upload className="w-4 h-4 mr-1.5" />
                      Upload FIR
                    </Link>
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/40">
                        <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap">
                          FIR No.
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                          Case Title
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden md:table-cell">
                          Complainant
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden lg:table-cell">
                          Offense Type
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden sm:table-cell">
                          Date of Incident
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                          Status
                        </th>
                        <th className="text-right px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sorted.map((fir, i) => (
                        <motion.tr
                          key={fir.id.toString()}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2, delay: i * 0.025 }}
                          className="border-b hover:bg-muted/30 transition-smooth"
                          data-ocid={`fir_list.item.${i + 1}`}
                        >
                          <td className="px-4 py-3 font-mono text-xs font-semibold text-primary whitespace-nowrap">
                            {fir.firNumber}
                          </td>
                          <td className="px-4 py-3 text-foreground max-w-[180px]">
                            <span className="truncate block">
                              {fir.caseTitle}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                            {fir.complainantName}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell max-w-[140px]">
                            <span className="truncate block">
                              {fir.offenseType}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground whitespace-nowrap hidden sm:table-cell">
                            {formatDate(fir.dateOfIncident)}
                          </td>
                          <td className="px-4 py-3">
                            <FirStatusBadge status={fir.status} />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                asChild
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10"
                                data-ocid={`fir_list.view_button.${i + 1}`}
                                aria-label="View FIR"
                              >
                                <Link
                                  to="/firs/$id"
                                  params={{ id: fir.id.toString() }}
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </Link>
                              </Button>
                              <DeleteFirButton fir={fir} index={i + 1} />
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-3 border-t bg-muted/20 text-xs text-muted-foreground">
                  Showing {sorted.length} of {firs.length} records
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
