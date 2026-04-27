import { c as createLucideIcon, f as useParams, r as reactExports, j as jsxRuntimeExports, S as Skeleton, B as Button, L as Link, g as Shield, d as ue } from "./index-BufztUaS.js";
import { p as useCaseById, u as useListFirs, q as useLinkFirToCase, r as useUpdateCase, L as Layout, b as Card, d as CardHeader, c as CardContent, C as CaseStatus, e as CardTitle, g as FolderOpen, f as FileText, F as FirStatus } from "./card-B86WRblc.js";
import { a as CircleAlert, C as ChevronRight, B as Badge } from "./badge-Ki6kV9Yp.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-BrIl48iy.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CtUgjwnd.js";
import { L as LoaderCircle, H as Hash, C as Calendar, U as User, E as ExternalLink } from "./user-Bac6MR9Q.js";
import "./index-DIu7TKBa.js";
import "./index-BknWjwAx.js";
import "./check-DnWy3pMJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
  ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
];
const Link2 = createLucideIcon("link-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
function fmtDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
const CASE_STATUS_MAP = {
  [CaseStatus.open]: { label: "Open", variant: "default" },
  [CaseStatus.under_investigation]: {
    label: "Under Investigation",
    variant: "secondary"
  },
  [CaseStatus.closed]: { label: "Closed", variant: "outline" },
  [CaseStatus.chargeshed]: {
    label: "Charge Sheet Filed",
    variant: "secondary"
  }
};
const FIR_STATUS_MAP = {
  [FirStatus.summary_ready]: { label: "Summary Ready", variant: "default" },
  [FirStatus.summarizing]: { label: "Summarizing", variant: "secondary" },
  [FirStatus.pending_summary]: { label: "Pending", variant: "outline" },
  [FirStatus.summary_failed]: { label: "Failed", variant: "destructive" }
};
const STATUS_OPTIONS = [
  { value: CaseStatus.open, label: "Open" },
  { value: CaseStatus.under_investigation, label: "Under Investigation" },
  { value: CaseStatus.closed, label: "Closed" },
  { value: CaseStatus.chargeshed, label: "Charge Sheet Filed" }
];
function CaseDetail() {
  const { id } = useParams({ from: "/cases/$id" });
  const caseId = BigInt(id);
  const { data: caseData, isLoading: caseLoading } = useCaseById(caseId);
  const { data: allFirs } = useListFirs();
  const { mutateAsync: linkFir, isPending: linking } = useLinkFirToCase();
  const { mutateAsync: updateCase, isPending: updating } = useUpdateCase();
  const [linkDialogOpen, setLinkDialogOpen] = reactExports.useState(false);
  const [selectedFirId, setSelectedFirId] = reactExports.useState("");
  const linkedFirIdSet = new Set(
    (caseData == null ? void 0 : caseData.firIds.map((fid) => fid.toString())) ?? []
  );
  const linkedFirs = (allFirs == null ? void 0 : allFirs.filter((f) => linkedFirIdSet.has(f.id.toString()))) ?? [];
  const unlinkableFirs = (allFirs == null ? void 0 : allFirs.filter((f) => !linkedFirIdSet.has(f.id.toString()))) ?? [];
  async function handleLink() {
    if (!selectedFirId) return;
    try {
      await linkFir({ caseId, firId: BigInt(selectedFirId) });
      ue.success("FIR linked to case successfully.");
      setLinkDialogOpen(false);
      setSelectedFirId("");
    } catch {
      ue.error("Failed to link FIR.");
    }
  }
  async function handleStatusChange(newStatus) {
    try {
      await updateCase({ id: caseId, status: newStatus });
      ue.success("Case status updated.");
    } catch {
      ue.error("Failed to update case status.");
    }
  }
  if (caseLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-screen-xl mx-auto px-4 sm:px-6 py-6 space-y-5",
        "data-ocid": "case_detail.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-64" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "border-b bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 space-y-4", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" }, i)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "border-b bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-40" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" }, i)) })
            ] })
          ] })
        ]
      }
    ) });
  }
  if (!caseData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "max-w-screen-xl mx-auto px-4 sm:px-6 py-6",
        "data-ocid": "case_detail.not_found.error_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center justify-center py-20 text-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-destructive/10 border-2 border-destructive/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-6 h-6 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Case Not Found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "This case may have been removed or the ID is invalid." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              "data-ocid": "case_detail.back_to_cases.button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cases", children: "Back to Cases" })
            }
          )
        ] }) })
      }
    ) });
  }
  const statusMeta = CASE_STATUS_MAP[caseData.status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-screen-xl mx-auto px-4 sm:px-6 py-6 space-y-5",
        "data-ocid": "case_detail.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "nav",
            {
              className: "flex items-center gap-1.5 text-sm text-muted-foreground",
              "aria-label": "Breadcrumb",
              "data-ocid": "case_detail.breadcrumb.panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/",
                    className: "hover:text-foreground transition-smooth",
                    "data-ocid": "case_detail.breadcrumb_dashboard.link",
                    children: "Dashboard"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/cases",
                    className: "hover:text-foreground transition-smooth",
                    "data-ocid": "case_detail.breadcrumb_cases.link",
                    children: "Cases"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate", children: caseData.caseNumber })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: caseData.caseNumber }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: statusMeta.variant, children: statusMeta.label })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: caseData.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground hidden sm:inline", children: "Update Status:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: caseData.status,
                  onValueChange: (v) => handleStatusChange(v),
                  disabled: updating,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "w-48",
                        "data-ocid": "case_detail.status.select",
                        children: updating ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }),
                          "Updating…"
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUS_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border-border h-fit", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 border-b bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-sm flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-4 h-4 text-primary" }),
                "Case Information"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 w-7 h-7 rounded bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-3.5 h-3.5 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-0.5", children: "Case Number" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-foreground leading-none", children: caseData.caseNumber })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 w-7 h-7 rounded bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-0.5", children: "Title" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: caseData.title })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 w-7 h-7 rounded bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1", children: "Status" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: statusMeta.variant, children: statusMeta.label })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 w-7 h-7 rounded bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-0.5", children: "Date Created" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: fmtDate(caseData.createdDate) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 w-7 h-7 rounded bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-0.5", children: "Created By" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "font-mono text-xs text-muted-foreground truncate",
                        title: caseData.createdBy.toString(),
                        children: [
                          caseData.createdBy.toString().slice(0, 28),
                          "…"
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t pt-3 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "Linked FIRs" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "font-bold text-sm", children: caseData.firIds.length })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 border-b bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-sm flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary" }),
                  "Linked FIR Records",
                  caseData.firIds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs ml-1", children: caseData.firIds.length })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    onClick: () => setLinkDialogOpen(true),
                    className: "gap-1.5 shrink-0",
                    "data-ocid": "case_detail.link_fir.open_modal_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                      "Link FIR"
                    ]
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: linkedFirs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center justify-center py-16 text-center gap-3",
                  "data-ocid": "case_detail.firs.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "w-5 h-5 text-muted-foreground" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "No FIRs Linked" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Link existing FIR records to this case." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        onClick: () => setLinkDialogOpen(true),
                        className: "gap-1.5",
                        "data-ocid": "case_detail.link_fir_empty.open_modal_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                          "Link FIR"
                        ]
                      }
                    )
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: linkedFirs.map((fir, idx) => {
                const firMeta = FIR_STATUS_MAP[fir.status];
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between px-5 py-3.5 gap-3 hover:bg-muted/30 transition-smooth",
                    "data-ocid": `case_detail.fir_item.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5 text-primary" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Link,
                            {
                              to: "/firs/$id",
                              params: { id: fir.id.toString() },
                              className: "font-semibold text-primary hover:underline text-sm",
                              "data-ocid": `case_detail.fir_link.${idx + 1}`,
                              children: fir.firNumber
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate mt-0.5", children: [
                            fir.complainantName,
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border mx-1", children: "·" }),
                            fir.offenseType
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: firMeta.variant, className: "text-xs", children: firMeta.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            asChild: true,
                            variant: "ghost",
                            size: "sm",
                            className: "h-7 w-7 p-0",
                            "data-ocid": `case_detail.fir_view.${idx + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              Link,
                              {
                                to: "/firs/$id",
                                params: { id: fir.id.toString() },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "View FIR" })
                                ]
                              }
                            )
                          }
                        )
                      ] })
                    ]
                  },
                  fir.id.toString()
                );
              }) }) })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: linkDialogOpen, onOpenChange: setLinkDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "case_detail.link_fir.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "w-4 h-4 text-primary" }),
        "Link FIR to Case"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide", children: [
          "Linking to case:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: caseData.caseNumber })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedFirId, onValueChange: setSelectedFirId, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "case_detail.link_fir.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select an FIR to link…" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: unlinkableFirs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-4 text-center text-sm text-muted-foreground", children: "No unlinked FIRs available" }) : unlinkableFirs.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: f.id.toString(), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: f.firNumber }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground ml-2", children: [
              "— ",
              f.complainantName
            ] })
          ] }, f.id.toString())) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => {
              setLinkDialogOpen(false);
              setSelectedFirId("");
            },
            "data-ocid": "case_detail.link_fir.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleLink,
            disabled: !selectedFirId || linking,
            "data-ocid": "case_detail.link_fir.confirm_button",
            className: "gap-2",
            children: [
              linking ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "w-4 h-4" }),
              linking ? "Linking…" : "Link FIR"
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  CaseDetail as default
};
