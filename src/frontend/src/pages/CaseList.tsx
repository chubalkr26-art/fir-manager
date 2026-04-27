import { CaseStatus, useCreateCase, useListCases } from "@/api";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import type { CaseView } from "@/types";
import { Link } from "@tanstack/react-router";
import { Eye, FolderOpen, PlusCircle, Search, X } from "lucide-react";
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

function CaseStatusBadge({ status }: { status: CaseStatus }) {
  const map: Record<CaseStatus, { label: string; cls: string }> = {
    [CaseStatus.open]: {
      label: "Open",
      cls: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300",
    },
    [CaseStatus.under_investigation]: {
      label: "Under Investigation",
      cls: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300",
    },
    [CaseStatus.closed]: {
      label: "Closed",
      cls: "bg-muted text-muted-foreground border-border",
    },
    [CaseStatus.chargeshed]: {
      label: "Chargesheet Filed",
      cls: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300",
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

// ─── Create Case Dialog ───────────────────────────────────────────────────────

interface CreateCaseDialogProps {
  open: boolean;
  onClose: () => void;
}

function CreateCaseDialog({ open, onClose }: CreateCaseDialogProps) {
  const { mutate: createCase, isPending } = useCreateCase();
  const [caseNumber, setCaseNumber] = useState("");
  const [title, setTitle] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!caseNumber.trim() || !title.trim()) return;
    createCase(
      { caseNumber: caseNumber.trim(), title: title.trim() },
      {
        onSuccess: () => {
          toast.success(`Case ${caseNumber.trim()} created successfully.`);
          setCaseNumber("");
          setTitle("");
          onClose();
        },
        onError: () => toast.error("Failed to create case. Please try again."),
      },
    );
  }

  function handleClose() {
    setCaseNumber("");
    setTitle("");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-md" data-ocid="case_list.create.dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            Create New Case
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-1">
          <div className="space-y-1.5">
            <Label htmlFor="case-number" className="text-sm font-medium">
              Case Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="case-number"
              placeholder="e.g. CASE/2024/001"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              required
              className="h-9"
              data-ocid="case_list.case_number.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="case-title" className="text-sm font-medium">
              Case Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="case-title"
              placeholder="Brief description of the case"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="h-9"
              data-ocid="case_list.case_title.input"
            />
          </div>
          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClose}
              data-ocid="case_list.create.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isPending || !caseNumber.trim() || !title.trim()}
              data-ocid="case_list.create.confirm_button"
            >
              {isPending ? "Creating…" : "Create Case"}
            </Button>
          </DialogFooter>
        </form>
        {isPending && (
          <output
            className="sr-only"
            data-ocid="case_list.create.loading_state"
          >
            Creating case…
          </output>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Status filter type ───────────────────────────────────────────────────────

type StatusFilterKey = "all" | CaseStatus;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CaseList() {
  const { data: cases = [], isLoading } = useListCases();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterKey>("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = useMemo(() => {
    return cases.filter((c) => {
      const matchSearch =
        !search ||
        c.caseNumber.toLowerCase().includes(search.toLowerCase()) ||
        c.title.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [cases, search, statusFilter]);

  const hasFilters = !!search || statusFilter !== "all";

  const statusGroups = [
    { key: CaseStatus.open, label: "Open" },
    { key: CaseStatus.under_investigation, label: "Investigating" },
    { key: CaseStatus.chargeshed, label: "Chargesheet" },
    { key: CaseStatus.closed, label: "Closed" },
  ] as const;

  return (
    <Layout>
      <div
        className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-8 space-y-6"
        data-ocid="case_list.page"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
              <FolderOpen className="w-6 h-6 text-primary" />
              Cases
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              All registered cases at Mokokchung Police Station
            </p>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            data-ocid="case_list.create_case.open_modal_button"
          >
            <PlusCircle className="w-4 h-4 mr-1.5" />
            Create Case
          </Button>
        </div>

        {/* Status filter pills + search row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Search */}
          <div className="relative max-w-sm w-full sm:w-auto">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search case # or title…"
              className="pl-8 h-9 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="case_list.search_input"
            />
          </div>

          {/* Status pills */}
          {!isLoading && cases.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {statusGroups.map((s) => {
                const count = cases.filter((c) => c.status === s.key).length;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() =>
                      setStatusFilter((prev) =>
                        prev === s.key ? "all" : s.key,
                      )
                    }
                    className={`px-3 py-1 rounded-full border text-xs font-medium transition-smooth ${
                      statusFilter === s.key
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-muted-foreground border-border hover:bg-muted"
                    }`}
                    data-ocid={`case_list.filter.${s.key}`}
                  >
                    {s.label} <span className="ml-0.5 font-bold">{count}</span>
                  </button>
                );
              })}
              {hasFilters && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("all");
                  }}
                  className="px-2.5 py-1 rounded-full border text-xs font-medium bg-card text-muted-foreground border-border hover:bg-muted transition-smooth flex items-center gap-1"
                  data-ocid="case_list.clear_filters.button"
                >
                  <X className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>
          )}
        </div>

        {/* Table */}
        <Card
          className="border shadow-card overflow-hidden"
          data-ocid="case_list.table"
        >
          <CardContent className="p-0">
            {isLoading ? (
              <div
                className="p-6 space-y-3"
                data-ocid="case_list.loading_state"
              >
                {(["r1", "r2", "r3", "r4", "r5"] as const).map((k) => (
                  <Skeleton key={k} className="h-11 w-full" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div
                className="py-16 text-center"
                data-ocid="case_list.empty_state"
              >
                <FolderOpen className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
                <p className="font-medium text-foreground">No cases found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {hasFilters
                    ? "Try adjusting your search or filters"
                    : "Create the first case to begin tracking investigations"}
                </p>
                {!hasFilters && (
                  <Button
                    className="mt-4"
                    size="sm"
                    onClick={() => setDialogOpen(true)}
                    data-ocid="case_list.empty_create.button"
                  >
                    <PlusCircle className="w-4 h-4 mr-1.5" />
                    Create Case
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
                          Case No.
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                          Title
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                          Status
                        </th>
                        <th className="text-right px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden sm:table-cell">
                          FIRs Linked
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden md:table-cell">
                          Created
                        </th>
                        <th className="text-right px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((c: CaseView, i) => (
                        <motion.tr
                          key={c.id.toString()}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2, delay: i * 0.025 }}
                          className="border-b hover:bg-muted/30 transition-smooth"
                          data-ocid={`case_list.item.${i + 1}`}
                        >
                          <td className="px-4 py-3 font-mono text-xs font-semibold text-primary whitespace-nowrap">
                            {c.caseNumber}
                          </td>
                          <td className="px-4 py-3 text-foreground max-w-[220px]">
                            <span className="truncate block">{c.title}</span>
                          </td>
                          <td className="px-4 py-3">
                            <CaseStatusBadge status={c.status} />
                          </td>
                          <td className="px-4 py-3 text-right text-muted-foreground tabular-nums hidden sm:table-cell">
                            {c.firIds.length}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground whitespace-nowrap hidden md:table-cell">
                            {formatDate(c.createdDate)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-end">
                              <Button
                                asChild
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10"
                                data-ocid={`case_list.view_button.${i + 1}`}
                                aria-label="View case"
                              >
                                <Link
                                  to="/cases/$id"
                                  params={{ id: c.id.toString() }}
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </Link>
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-3 border-t bg-muted/20 text-xs text-muted-foreground">
                  Showing {filtered.length} of {cases.length} cases
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <CreateCaseDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Layout>
  );
}
