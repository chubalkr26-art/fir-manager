import { CaseStatus, FirStatus, useListCases, useListFirs } from "@/api";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { CaseView, FirRecordView } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  FolderOpen,
  PlusCircle,
  Upload,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function FirStatusBadge({ status }: { status: FirStatus }) {
  const map: Record<FirStatus, { label: string; cls: string }> = {
    [FirStatus.pending_summary]: {
      label: "Pending",
      cls: "bg-muted text-muted-foreground border-border",
    },
    [FirStatus.summarizing]: {
      label: "Summarizing",
      cls: "bg-primary/10 text-primary border-primary/30",
    },
    [FirStatus.summary_ready]: {
      label: "Ready",
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

function CaseStatusBadge({ status }: { status: CaseStatus }) {
  const map: Record<CaseStatus, { label: string; cls: string }> = {
    [CaseStatus.open]: {
      label: "Open",
      cls: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300",
    },
    [CaseStatus.under_investigation]: {
      label: "Investigating",
      cls: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300",
    },
    [CaseStatus.closed]: {
      label: "Closed",
      cls: "bg-muted text-muted-foreground border-border",
    },
    [CaseStatus.chargeshed]: {
      label: "Chargesheet",
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

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  sub: string;
  highlight?: boolean;
  index: number;
}

function StatCard({
  label,
  value,
  icon,
  sub,
  highlight,
  index,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.07 }}
    >
      <Card
        className={`border shadow-card ${highlight ? "border-primary/40 bg-primary/5" : ""}`}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                {label}
              </p>
              <p
                className={`text-3xl font-display font-bold leading-none ${highlight ? "text-primary" : "text-foreground"}`}
              >
                {value}
              </p>
              <p className="text-xs text-muted-foreground mt-1.5">{sub}</p>
            </div>
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${highlight ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}
            >
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Recent FIRs Table ────────────────────────────────────────────────────────

function RecentFirsTable({ firs }: { firs: FirRecordView[] }) {
  if (firs.length === 0) {
    return (
      <div
        className="py-12 text-center text-sm text-muted-foreground"
        data-ocid="dashboard.recent_firs.empty_state"
      >
        No FIR records yet. Upload the first FIR to get started.
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            {["FIR No.", "Title", "Complainant", "Date", "Status", ""].map(
              (h) => (
                <th
                  key={h}
                  className={`text-left px-4 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide ${h === "Complainant" ? "hidden md:table-cell" : ""} ${h === "Date" ? "hidden lg:table-cell" : ""}`}
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {firs.map((fir, i) => (
            <tr
              key={fir.id.toString()}
              className="border-b hover:bg-muted/30 transition-smooth"
              data-ocid={`dashboard.recent_firs.item.${i + 1}`}
            >
              <td className="px-4 py-3 font-mono text-xs font-semibold text-primary">
                {fir.firNumber}
              </td>
              <td className="px-4 py-3 text-foreground max-w-[160px]">
                <span className="truncate block">{fir.caseTitle}</span>
              </td>
              <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                {fir.complainantName}
              </td>
              <td className="px-4 py-3 text-muted-foreground whitespace-nowrap hidden lg:table-cell">
                {formatDate(fir.dateOfIncident)}
              </td>
              <td className="px-4 py-3">
                <FirStatusBadge status={fir.status} />
              </td>
              <td className="px-4 py-3">
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10"
                  aria-label="View FIR"
                  data-ocid={`dashboard.recent_firs.link.${i + 1}`}
                >
                  <Link to="/firs/$id" params={{ id: fir.id.toString() }}>
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Recent Cases Table ───────────────────────────────────────────────────────

function RecentCasesTable({ cases }: { cases: CaseView[] }) {
  if (cases.length === 0) {
    return (
      <div
        className="py-12 text-center text-sm text-muted-foreground"
        data-ocid="dashboard.recent_cases.empty_state"
      >
        No cases registered yet. Create a case to begin tracking.
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            {["Case No.", "Title", "FIRs", "Status", ""].map((h) => (
              <th
                key={h}
                className={`text-left px-4 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide ${h === "FIRs" ? "text-right hidden sm:table-cell" : ""}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cases.map((c, i) => (
            <tr
              key={c.id.toString()}
              className="border-b hover:bg-muted/30 transition-smooth"
              data-ocid={`dashboard.recent_cases.item.${i + 1}`}
            >
              <td className="px-4 py-3 font-mono text-xs font-semibold text-primary">
                {c.caseNumber}
              </td>
              <td className="px-4 py-3 text-foreground max-w-[180px]">
                <span className="truncate block">{c.title}</span>
              </td>
              <td className="px-4 py-3 text-right text-muted-foreground tabular-nums hidden sm:table-cell">
                {c.firIds.length}
              </td>
              <td className="px-4 py-3">
                <CaseStatusBadge status={c.status} />
              </td>
              <td className="px-4 py-3">
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10"
                  aria-label="View case"
                  data-ocid={`dashboard.recent_cases.link.${i + 1}`}
                >
                  <Link to="/cases/$id" params={{ id: c.id.toString() }}>
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { data: firs = [], isLoading: firsLoading } = useListFirs();
  const { data: cases = [], isLoading: casesLoading } = useListCases();

  const totalFirs = firs.length;
  const firsPending = firs.filter(
    (f) => f.status === FirStatus.pending_summary,
  ).length;
  const casesOpen = cases.filter(
    (c) =>
      c.status === CaseStatus.open ||
      c.status === CaseStatus.under_investigation,
  ).length;
  const casesClosed = cases.filter(
    (c) => c.status === CaseStatus.closed,
  ).length;

  const recentFirs = [...firs]
    .sort((a, b) => Number(b.uploadDate - a.uploadDate))
    .slice(0, 5);

  const recentCases = [...cases]
    .sort((a, b) => Number(b.createdDate - a.createdDate))
    .slice(0, 5);

  const stats: StatCardProps[] = [
    {
      label: "Total FIRs",
      value: totalFirs,
      icon: <FileText className="w-5 h-5" />,
      sub: "All registered FIRs",
      index: 0,
    },
    {
      label: "Pending Summary",
      value: firsPending,
      icon: <Clock className="w-5 h-5" />,
      sub: "Awaiting summarization",
      highlight: firsPending > 0,
      index: 1,
    },
    {
      label: "Cases Open",
      value: casesOpen,
      icon: <AlertTriangle className="w-5 h-5" />,
      sub: "Active investigations",
      highlight: casesOpen > 0,
      index: 2,
    },
    {
      label: "Cases Closed",
      value: casesClosed,
      icon: <CheckCircle2 className="w-5 h-5" />,
      sub: "Resolved cases",
      index: 3,
    },
  ];

  return (
    <Layout>
      <div
        className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-8 space-y-8"
        data-ocid="dashboard.page"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Mokokchung Police Station — Case Management Overview
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              data-ocid="dashboard.create_case.button"
            >
              <Link to="/cases">
                <PlusCircle className="w-4 h-4 mr-1.5" />
                Create Case
              </Link>
            </Button>
            <Button asChild size="sm" data-ocid="dashboard.upload_fir.button">
              <Link to="/firs/upload">
                <Upload className="w-4 h-4 mr-1.5" />
                Upload FIR
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          data-ocid="dashboard.stats.section"
        >
          {firsLoading || casesLoading
            ? (["s1", "s2", "s3", "s4"] as const).map((k) => (
                <Card key={k} className="border shadow-card">
                  <CardContent className="p-5">
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Skeleton className="h-8 w-16" />
                  </CardContent>
                </Card>
              ))
            : stats.map((s) => <StatCard key={s.label} {...s} />)}
        </div>

        {/* Recent Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.28 }}
          >
            <Card
              className="border shadow-card"
              data-ocid="dashboard.recent_firs.card"
            >
              <CardHeader className="px-4 py-3 border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-display font-semibold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Recent FIR Records
                  </CardTitle>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7"
                    data-ocid="dashboard.view_all_firs.link"
                  >
                    <Link to="/firs">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {firsLoading ? (
                  <div className="p-4 space-y-3">
                    {(["f1", "f2", "f3", "f4"] as const).map((k) => (
                      <Skeleton key={k} className="h-10 w-full" />
                    ))}
                  </div>
                ) : (
                  <RecentFirsTable firs={recentFirs} />
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.35 }}
          >
            <Card
              className="border shadow-card"
              data-ocid="dashboard.recent_cases.card"
            >
              <CardHeader className="px-4 py-3 border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-display font-semibold flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-primary" />
                    Recent Cases
                  </CardTitle>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7"
                    data-ocid="dashboard.view_all_cases.link"
                  >
                    <Link to="/cases">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {casesLoading ? (
                  <div className="p-4 space-y-3">
                    {(["c1", "c2", "c3", "c4"] as const).map((k) => (
                      <Skeleton key={k} className="h-10 w-full" />
                    ))}
                  </div>
                ) : (
                  <RecentCasesTable cases={recentCases} />
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
