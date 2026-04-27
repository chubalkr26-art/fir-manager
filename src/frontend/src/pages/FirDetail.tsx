import {
  FirStatus,
  useFirById,
  useSaveSummary,
  useSummaryByFirId,
  useTriggerSummarization,
  useUpdateSummary,
} from "@/api";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import type { FirRecordView, SummaryView } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  Calendar,
  Check,
  ChevronRight,
  Clipboard,
  Copy,
  Download,
  Edit3,
  ExternalLink,
  FileText,
  FolderOpen,
  Hash,
  Loader2,
  Save,
  Shield,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function fmtDateTime(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function firStatusMeta(status: FirStatus): {
  label: string;
  variant: "default" | "secondary" | "outline" | "destructive";
} {
  switch (status) {
    case FirStatus.summary_ready:
      return { label: "Summary Ready", variant: "default" };
    case FirStatus.summarizing:
      return { label: "Summarizing…", variant: "secondary" };
    case FirStatus.summary_failed:
      return { label: "Summary Failed", variant: "destructive" };
    default:
      return { label: "Pending Summary", variant: "outline" };
  }
}

// ─── Left Panel ───────────────────────────────────────────────────────────────

function FirInfoPanel({ fir }: { fir: FirRecordView }) {
  const docUrl = fir.document.getDirectURL();
  const { label, variant } = firStatusMeta(fir.status);

  const fields = [
    {
      icon: <Hash className="w-3.5 h-3.5 text-primary" />,
      label: "FIR Number",
      value: (
        <span className="font-display font-bold text-lg text-foreground leading-none">
          {fir.firNumber}
        </span>
      ),
    },
    {
      icon: <Shield className="w-3.5 h-3.5 text-primary" />,
      label: "Case Title",
      value: (
        <span className="font-medium text-foreground">{fir.caseTitle}</span>
      ),
    },
    {
      icon: <User className="w-3.5 h-3.5 text-primary" />,
      label: "Complainant",
      value: (
        <span className="font-medium text-foreground">
          {fir.complainantName}
        </span>
      ),
    },
  ];

  return (
    <Card className="shadow-card border-border h-fit">
      <CardHeader className="pb-3 border-b bg-muted/30">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="font-display text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            FIR Details
          </CardTitle>
          <Badge variant={variant}>{label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {fields.map(({ icon, label: fieldLabel, value }) => (
          <div key={fieldLabel} className="flex items-start gap-3">
            <div className="mt-0.5 w-7 h-7 rounded bg-primary/10 flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">
                {fieldLabel}
              </p>
              {value}
            </div>
          </div>
        ))}

        {/* Offense type */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 w-7 h-7 rounded bg-primary/10 flex items-center justify-center shrink-0">
            <AlertCircle className="w-3.5 h-3.5 text-primary" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">
              Offense Type
            </p>
            <Badge variant="outline" className="text-xs font-medium">
              {fir.offenseType}
            </Badge>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {[
            { label: "Date of Incident", value: fmtDate(fir.dateOfIncident) },
            { label: "Upload Date", value: fmtDate(fir.uploadDate) },
          ].map(({ label: dateLabel, value }) => (
            <div key={dateLabel} className="bg-muted/40 rounded-md p-2.5">
              <div className="flex items-center gap-1 mb-1">
                <Calendar className="w-2.5 h-2.5 text-muted-foreground" />
                <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold">
                  {dateLabel}
                </p>
              </div>
              <p className="text-xs font-bold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        {/* Uploaded by */}
        <div className="border-t pt-3">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">
            Uploaded By
          </p>
          <p
            className="font-mono text-xs text-muted-foreground truncate"
            title={fir.uploadedBy.toString()}
          >
            {fir.uploadedBy.toString().slice(0, 28)}…
          </p>
        </div>

        {/* Document */}
        <div className="border-t pt-3 space-y-2">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
            Document
          </p>
          <div className="flex items-center gap-2 bg-muted/40 rounded-md px-3 py-2.5 border border-border">
            <FileText className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs font-medium text-foreground truncate min-w-0 flex-1">
              {fir.documentFilename}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 gap-1.5 text-xs"
              data-ocid="fir_detail.view_document.button"
            >
              <a href={docUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3" />
                View
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 gap-1.5 text-xs"
              data-ocid="fir_detail.download_document.button"
            >
              <a href={docUrl} download={fir.documentFilename}>
                <Download className="w-3 h-3" />
                Download
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Summary Panel ────────────────────────────────────────────────────────────

function SummaryPanel({
  fir,
  summary,
  isLoadingSummary,
}: {
  fir: FirRecordView;
  summary: SummaryView | null | undefined;
  isLoadingSummary: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [copied, setCopied] = useState(false);

  const triggerSummarization = useTriggerSummarization();
  const updateSummary = useUpdateSummary();
  const saveSummary = useSaveSummary();

  const isSummarizing = fir.status === FirStatus.summarizing;
  const isSummaryReady = fir.status === FirStatus.summary_ready;
  const isSummaryFailed = fir.status === FirStatus.summary_failed;

  function startEdit() {
    setEditText(summary?.summaryText ?? "");
    setIsEditing(true);
  }

  function cancelEdit() {
    setIsEditing(false);
    setEditText("");
  }

  async function handleSave() {
    try {
      if (summary) {
        await updateSummary.mutateAsync({
          id: summary.id,
          summaryText: editText,
        });
      } else {
        await saveSummary.mutateAsync({ firId: fir.id, summaryText: editText });
      }
      setIsEditing(false);
      toast.success("Summary saved successfully");
    } catch {
      toast.error("Failed to save summary");
    }
  }

  async function handleCopy() {
    const formattedText = [
      `FIR SUMMARY — ${fir.firNumber}`,
      "─".repeat(50),
      `Case Title      : ${fir.caseTitle}`,
      `Complainant     : ${fir.complainantName}`,
      `Offense Type    : ${fir.offenseType}`,
      `Date of Incident: ${fmtDate(fir.dateOfIncident)}`,
      "",
      "SUMMARY:",
      "",
      summary?.summaryText ?? "",
      "",
      `Generated       : ${summary ? fmtDateTime(summary.generatedDate) : ""}`,
      summary?.lastEditedDate
        ? `Last Edited     : ${fmtDateTime(summary.lastEditedDate)}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    await navigator.clipboard.writeText(formattedText);
    setCopied(true);
    toast.success("Summary copied — ready to paste in MS Word");
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleGenerateSummary() {
    try {
      await triggerSummarization.mutateAsync(fir.id);
      toast.info("AI summarization started — this may take a moment");
    } catch {
      toast.error("Failed to start summarization");
    }
  }

  return (
    <Card className="shadow-card border-border flex flex-col">
      <CardHeader className="pb-3 border-b bg-muted/30">
        <CardTitle className="font-display text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent" />
          AI-Generated Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-5 flex flex-col gap-4 flex-1">
        {/* Loading summary */}
        {isLoadingSummary ? (
          <div
            className="space-y-3 py-2"
            data-ocid="fir_detail.summary.loading_state"
          >
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : isSummarizing ? (
          /* Summarizing state */
          <div
            className="flex flex-col items-center justify-center gap-5 py-12 text-center"
            data-ocid="fir_detail.summarizing.loading_state"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                <Loader2 className="w-7 h-7 text-primary animate-spin" />
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="font-semibold text-foreground">
                AI Summarization in Progress
              </p>
              <p className="text-sm text-muted-foreground max-w-sm">
                The system is analyzing the FIR document. This typically takes
                30–60 seconds. Refresh to check the status.
              </p>
            </div>
          </div>
        ) : isSummaryFailed ? (
          /* Failed state */
          <div
            className="flex flex-col items-center justify-center gap-5 py-10 text-center"
            data-ocid="fir_detail.summary.error_state"
          >
            <div className="w-14 h-14 rounded-full bg-destructive/10 border-2 border-destructive/20 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">
                Summarization Failed
              </p>
              <p className="text-sm text-muted-foreground max-w-sm">
                The AI could not process this document. Retry or enter the
                summary manually.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateSummary}
                disabled={triggerSummarization.isPending}
                data-ocid="fir_detail.retry_summary.button"
                className="gap-1.5"
              >
                {triggerSummarization.isPending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                Retry
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setEditText("");
                  setIsEditing(true);
                }}
                data-ocid="fir_detail.manual_summary.button"
                className="gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Enter Manually
              </Button>
            </div>
          </div>
        ) : isEditing ? (
          /* Edit mode */
          <div
            className="flex flex-col gap-3"
            data-ocid="fir_detail.edit_summary.panel"
          >
            <div className="relative">
              <Textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="Enter the FIR summary here…"
                className="min-h-[300px] resize-none font-body text-sm leading-relaxed pr-20"
                data-ocid="fir_detail.summary.textarea"
                autoFocus
              />
              <span className="absolute bottom-3 right-3 text-xs text-muted-foreground pointer-events-none">
                {editText.length} chars
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={
                  updateSummary.isPending ||
                  saveSummary.isPending ||
                  !editText.trim()
                }
                className="flex-1 gap-2"
                data-ocid="fir_detail.save_summary.save_button"
              >
                {updateSummary.isPending || saveSummary.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Summary
              </Button>
              <Button
                variant="outline"
                onClick={cancelEdit}
                className="gap-2"
                data-ocid="fir_detail.cancel_edit.cancel_button"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          </div>
        ) : isSummaryReady && summary ? (
          /* Ready — read-only view */
          <div className="flex flex-col gap-4">
            {/* Summary text */}
            <div
              className="bg-muted/40 border border-border rounded-md p-4 font-body text-sm leading-relaxed text-foreground whitespace-pre-wrap min-h-[200px]"
              data-ocid="fir_detail.summary_text.panel"
            >
              {summary.summaryText}
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground border-t pt-3">
              <span>
                Generated:{" "}
                <strong className="text-foreground font-medium">
                  {fmtDateTime(summary.generatedDate)}
                </strong>
              </span>
              {summary.lastEditedDate && (
                <span>
                  Last edited:{" "}
                  <strong className="text-foreground font-medium">
                    {fmtDateTime(summary.lastEditedDate)}
                  </strong>
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-1">
              {/* Primary CTA — Copy */}
              <Button
                size="lg"
                onClick={handleCopy}
                className="w-full gap-2.5 text-sm font-bold tracking-wide h-12"
                data-ocid="fir_detail.copy_summary.primary_button"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Summary to Clipboard
                  </>
                )}
              </Button>

              {/* Secondary — Edit */}
              <Button
                variant="outline"
                onClick={startEdit}
                className="w-full gap-2"
                data-ocid="fir_detail.edit_summary.edit_button"
              >
                <Edit3 className="w-4 h-4" />
                Edit Summary
              </Button>

              {/* Tertiary — Re-generate */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGenerateSummary}
                disabled={triggerSummarization.isPending}
                className="w-full gap-2 text-muted-foreground hover:text-foreground"
                data-ocid="fir_detail.regenerate_summary.button"
              >
                {triggerSummarization.isPending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                Re-generate with AI
              </Button>
            </div>
          </div>
        ) : (
          /* No summary + pending */
          <div
            className="flex flex-col items-center justify-center gap-5 py-12 text-center"
            data-ocid="fir_detail.no_summary.empty_state"
          >
            <div className="w-14 h-14 rounded-full bg-muted border-2 border-border flex items-center justify-center">
              <Clipboard className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">No Summary Yet</p>
              <p className="text-sm text-muted-foreground max-w-xs">
                Generate an AI-powered summary of the FIR, or write one
                manually.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              <Button
                onClick={handleGenerateSummary}
                disabled={triggerSummarization.isPending}
                className="gap-2"
                data-ocid="fir_detail.generate_summary.button"
              >
                {triggerSummarization.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                Generate Summary
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setEditText("");
                  setIsEditing(true);
                }}
                className="gap-2"
                data-ocid="fir_detail.manual_summary.button"
              >
                <Edit3 className="w-4 h-4" />
                Enter Manually
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FirDetail() {
  const { id } = useParams({ from: "/firs/$id" });
  const firId = BigInt(id);

  const { data: fir, isLoading: firLoading } = useFirById(firId);
  const { data: summary, isLoading: summaryLoading } = useSummaryByFirId(firId);

  return (
    <Layout>
      <div
        className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 space-y-5"
        data-ocid="fir_detail.page"
      >
        {/* Breadcrumbs */}
        <nav
          className="flex items-center gap-1.5 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
          data-ocid="fir_detail.breadcrumb.panel"
        >
          <Link
            to="/"
            className="hover:text-foreground transition-smooth"
            data-ocid="fir_detail.breadcrumb_dashboard.link"
          >
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link
            to="/firs"
            className="hover:text-foreground transition-smooth"
            data-ocid="fir_detail.breadcrumb_firs.link"
          >
            FIR Records
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-foreground font-medium truncate">
            {firLoading
              ? "Loading…"
              : fir
                ? `FIR #${fir.firNumber}`
                : `FIR #${id}`}
          </span>
        </nav>

        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              {firLoading ? (
                <Skeleton className="h-7 w-48" />
              ) : fir ? (
                `FIR ${fir.firNumber}`
              ) : (
                "FIR Not Found"
              )}
            </h1>
            {fir && (
              <p className="text-muted-foreground text-sm mt-0.5">
                {fir.caseTitle}
              </p>
            )}
          </div>
          {fir?.caseId != null && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-1.5 shrink-0"
              data-ocid="fir_detail.view_case.button"
            >
              <Link to="/cases/$id" params={{ id: String(fir.caseId) }}>
                <FolderOpen className="w-3.5 h-3.5" />
                View Case
              </Link>
            </Button>
          )}
        </div>

        {/* Loading skeleton */}
        {firLoading ? (
          <div
            className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6"
            data-ocid="fir_detail.loading_state"
          >
            <Card className="shadow-card">
              <CardHeader className="border-b bg-muted/30">
                <Skeleton className="h-5 w-28" />
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-9 w-full" />
                ))}
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader className="border-b bg-muted/30">
                <Skeleton className="h-5 w-36" />
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </CardContent>
            </Card>
          </div>
        ) : !fir ? (
          <Card
            className="shadow-card border-border"
            data-ocid="fir_detail.not_found.error_state"
          >
            <CardContent className="flex flex-col items-center justify-center py-20 text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-destructive/10 border-2 border-destructive/20 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  FIR Record Not Found
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  This FIR may have been removed or the ID is invalid.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                data-ocid="fir_detail.back_to_firs.button"
              >
                <Link to="/firs">Back to FIR Records</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Two-panel layout */
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 items-start">
            <FirInfoPanel fir={fir} />
            <SummaryPanel
              fir={fir}
              summary={summary ?? null}
              isLoadingSummary={summaryLoading}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
