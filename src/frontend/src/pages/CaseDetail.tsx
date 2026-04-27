import {
  CaseStatus,
  FirStatus,
  useCaseById,
  useLinkFirToCase,
  useListFirs,
  useUpdateCase,
} from "@/api";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  ChevronRight,
  ExternalLink,
  FileText,
  FolderOpen,
  Hash,
  Link2,
  Loader2,
  Plus,
  Shield,
  User,
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

const CASE_STATUS_MAP: Record<
  CaseStatus,
  {
    label: string;
    variant: "default" | "secondary" | "outline" | "destructive";
  }
> = {
  [CaseStatus.open]: { label: "Open", variant: "default" },
  [CaseStatus.under_investigation]: {
    label: "Under Investigation",
    variant: "secondary",
  },
  [CaseStatus.closed]: { label: "Closed", variant: "outline" },
  [CaseStatus.chargeshed]: {
    label: "Charge Sheet Filed",
    variant: "secondary",
  },
};

const FIR_STATUS_MAP: Record<
  FirStatus,
  {
    label: string;
    variant: "default" | "secondary" | "outline" | "destructive";
  }
> = {
  [FirStatus.summary_ready]: { label: "Summary Ready", variant: "default" },
  [FirStatus.summarizing]: { label: "Summarizing", variant: "secondary" },
  [FirStatus.pending_summary]: { label: "Pending", variant: "outline" },
  [FirStatus.summary_failed]: { label: "Failed", variant: "destructive" },
};

const STATUS_OPTIONS: { value: CaseStatus; label: string }[] = [
  { value: CaseStatus.open, label: "Open" },
  { value: CaseStatus.under_investigation, label: "Under Investigation" },
  { value: CaseStatus.closed, label: "Closed" },
  { value: CaseStatus.chargeshed, label: "Charge Sheet Filed" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CaseDetail() {
  const { id } = useParams({ from: "/cases/$id" });
  const caseId = BigInt(id);

  const { data: caseData, isLoading: caseLoading } = useCaseById(caseId);
  const { data: allFirs } = useListFirs();
  const { mutateAsync: linkFir, isPending: linking } = useLinkFirToCase();
  const { mutateAsync: updateCase, isPending: updating } = useUpdateCase();

  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [selectedFirId, setSelectedFirId] = useState<string>("");

  const linkedFirIdSet = new Set(
    caseData?.firIds.map((fid) => fid.toString()) ?? [],
  );
  const linkedFirs =
    allFirs?.filter((f) => linkedFirIdSet.has(f.id.toString())) ?? [];
  const unlinkableFirs =
    allFirs?.filter((f) => !linkedFirIdSet.has(f.id.toString())) ?? [];

  async function handleLink() {
    if (!selectedFirId) return;
    try {
      await linkFir({ caseId, firId: BigInt(selectedFirId) });
      toast.success("FIR linked to case successfully.");
      setLinkDialogOpen(false);
      setSelectedFirId("");
    } catch {
      toast.error("Failed to link FIR.");
    }
  }

  async function handleStatusChange(newStatus: CaseStatus) {
    try {
      await updateCase({ id: caseId, status: newStatus });
      toast.success("Case status updated.");
    } catch {
      toast.error("Failed to update case status.");
    }
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (caseLoading) {
    return (
      <Layout>
        <div
          className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 space-y-5"
          data-ocid="case_detail.loading_state"
        >
          <Skeleton className="h-5 w-64" />
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
            <Card className="shadow-card">
              <CardHeader className="border-b bg-muted/30">
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-9 w-full" />
                ))}
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader className="border-b bg-muted/30">
                <Skeleton className="h-5 w-40" />
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  // ── Not found ──────────────────────────────────────────────────────────────
  if (!caseData) {
    return (
      <Layout>
        <div
          className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6"
          data-ocid="case_detail.not_found.error_state"
        >
          <Card className="shadow-card border-border">
            <CardContent className="flex flex-col items-center justify-center py-20 text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-destructive/10 border-2 border-destructive/20 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Case Not Found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  This case may have been removed or the ID is invalid.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                data-ocid="case_detail.back_to_cases.button"
              >
                <Link to="/cases">Back to Cases</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const statusMeta = CASE_STATUS_MAP[caseData.status];

  // ── Main ───────────────────────────────────────────────────────────────────
  return (
    <Layout>
      <div
        className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 space-y-5"
        data-ocid="case_detail.page"
      >
        {/* Breadcrumbs */}
        <nav
          className="flex items-center gap-1.5 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
          data-ocid="case_detail.breadcrumb.panel"
        >
          <Link
            to="/"
            className="hover:text-foreground transition-smooth"
            data-ocid="case_detail.breadcrumb_dashboard.link"
          >
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link
            to="/cases"
            className="hover:text-foreground transition-smooth"
            data-ocid="case_detail.breadcrumb_cases.link"
          >
            Cases
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-foreground font-medium truncate">
            {caseData.caseNumber}
          </span>
        </nav>

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-display font-bold text-2xl text-foreground">
                {caseData.caseNumber}
              </h1>
              <Badge variant={statusMeta.variant}>{statusMeta.label}</Badge>
            </div>
            <p className="text-muted-foreground text-sm mt-0.5">
              {caseData.title}
            </p>
          </div>

          {/* Status updater */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Update Status:
            </span>
            <Select
              value={caseData.status}
              onValueChange={(v) => handleStatusChange(v as CaseStatus)}
              disabled={updating}
            >
              <SelectTrigger
                className="w-48"
                data-ocid="case_detail.status.select"
              >
                {updating ? (
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Updating…
                  </span>
                ) : (
                  <SelectValue />
                )}
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start">
          {/* Left: Case info card */}
          <Card className="shadow-card border-border h-fit">
            <CardHeader className="pb-3 border-b bg-muted/30">
              <CardTitle className="font-display text-sm flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-primary" />
                Case Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {/* Case Number */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-7 h-7 rounded bg-primary/10 flex items-center justify-center shrink-0">
                  <Hash className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">
                    Case Number
                  </p>
                  <p className="font-display font-bold text-lg text-foreground leading-none">
                    {caseData.caseNumber}
                  </p>
                </div>
              </div>

              {/* Title */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-7 h-7 rounded bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">
                    Title
                  </p>
                  <p className="font-medium text-foreground">
                    {caseData.title}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-7 h-7 rounded bg-primary/10 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                    Status
                  </p>
                  <Badge variant={statusMeta.variant}>{statusMeta.label}</Badge>
                </div>
              </div>

              {/* Created date */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-7 h-7 rounded bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">
                    Date Created
                  </p>
                  <p className="font-medium text-foreground text-sm">
                    {fmtDate(caseData.createdDate)}
                  </p>
                </div>
              </div>

              {/* Created by */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-7 h-7 rounded bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">
                    Created By
                  </p>
                  <p
                    className="font-mono text-xs text-muted-foreground truncate"
                    title={caseData.createdBy.toString()}
                  >
                    {caseData.createdBy.toString().slice(0, 28)}…
                  </p>
                </div>
              </div>

              {/* FIRs count */}
              <div className="border-t pt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">
                  Linked FIRs
                </span>
                <Badge variant="outline" className="font-bold text-sm">
                  {caseData.firIds.length}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Right: Linked FIRs */}
          <Card className="shadow-card border-border">
            <CardHeader className="pb-3 border-b bg-muted/30">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="font-display text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Linked FIR Records
                  {caseData.firIds.length > 0 && (
                    <Badge variant="secondary" className="text-xs ml-1">
                      {caseData.firIds.length}
                    </Badge>
                  )}
                </CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setLinkDialogOpen(true)}
                  className="gap-1.5 shrink-0"
                  data-ocid="case_detail.link_fir.open_modal_button"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Link FIR
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {linkedFirs.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center py-16 text-center gap-3"
                  data-ocid="case_detail.firs.empty_state"
                >
                  <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center">
                    <Link2 className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      No FIRs Linked
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Link existing FIR records to this case.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setLinkDialogOpen(true)}
                    className="gap-1.5"
                    data-ocid="case_detail.link_fir_empty.open_modal_button"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Link FIR
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {linkedFirs.map((fir, idx) => {
                    const firMeta = FIR_STATUS_MAP[fir.status];
                    return (
                      <div
                        key={fir.id.toString()}
                        className="flex items-center justify-between px-5 py-3.5 gap-3 hover:bg-muted/30 transition-smooth"
                        data-ocid={`case_detail.fir_item.${idx + 1}`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                            <FileText className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <Link
                              to="/firs/$id"
                              params={{ id: fir.id.toString() }}
                              className="font-semibold text-primary hover:underline text-sm"
                              data-ocid={`case_detail.fir_link.${idx + 1}`}
                            >
                              {fir.firNumber}
                            </Link>
                            <p className="text-xs text-muted-foreground truncate mt-0.5">
                              {fir.complainantName}{" "}
                              <span className="text-border mx-1">·</span>
                              {fir.offenseType}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant={firMeta.variant} className="text-xs">
                            {firMeta.label}
                          </Badge>
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            data-ocid={`case_detail.fir_view.${idx + 1}`}
                          >
                            <Link
                              to="/firs/$id"
                              params={{ id: fir.id.toString() }}
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span className="sr-only">View FIR</span>
                            </Link>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Link FIR Dialog */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent data-ocid="case_detail.link_fir.dialog">
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              <Link2 className="w-4 h-4 text-primary" />
              Link FIR to Case
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
                Linking to case:{" "}
                <strong className="text-foreground">
                  {caseData.caseNumber}
                </strong>
              </p>
              <Select value={selectedFirId} onValueChange={setSelectedFirId}>
                <SelectTrigger data-ocid="case_detail.link_fir.select">
                  <SelectValue placeholder="Select an FIR to link…" />
                </SelectTrigger>
                <SelectContent>
                  {unlinkableFirs.length === 0 ? (
                    <div className="py-4 text-center text-sm text-muted-foreground">
                      No unlinked FIRs available
                    </div>
                  ) : (
                    unlinkableFirs.map((f) => (
                      <SelectItem key={f.id.toString()} value={f.id.toString()}>
                        <span className="font-medium">{f.firNumber}</span>
                        <span className="text-muted-foreground ml-2">
                          — {f.complainantName}
                        </span>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setLinkDialogOpen(false);
                setSelectedFirId("");
              }}
              data-ocid="case_detail.link_fir.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleLink}
              disabled={!selectedFirId || linking}
              data-ocid="case_detail.link_fir.confirm_button"
              className="gap-2"
            >
              {linking ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Link2 className="w-4 h-4" />
              )}
              {linking ? "Linking…" : "Link FIR"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
