import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, f as useParams, L as Link, S as Skeleton, B as Button, g as Shield, r as reactExports, d as ue } from "./index-BufztUaS.js";
import { j as useFirById, k as useSummaryByFirId, L as Layout, g as FolderOpen, b as Card, d as CardHeader, c as CardContent, e as CardTitle, f as FileText, l as useTriggerSummarization, m as useUpdateSummary, n as useSaveSummary, F as FirStatus, X } from "./card-B86WRblc.js";
import { C as ChevronRight, a as CircleAlert, B as Badge } from "./badge-Ki6kV9Yp.js";
import { H as Hash, U as User, C as Calendar, E as ExternalLink, L as LoaderCircle } from "./user-Bac6MR9Q.js";
import { C as Check } from "./check-DnWy3pMJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ]
];
const Clipboard = createLucideIcon("clipboard", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function fmtDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function fmtDateTime(ts) {
  return new Date(Number(ts) / 1e6).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function firStatusMeta(status) {
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
function FirInfoPanel({ fir }) {
  const docUrl = fir.document.getDirectURL();
  const { label, variant } = firStatusMeta(fir.status);
  const fields = [
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-3.5 h-3.5 text-primary" }),
      label: "FIR Number",
      value: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg text-foreground leading-none", children: fir.firNumber })
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 text-primary" }),
      label: "Case Title",
      value: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: fir.caseTitle })
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-primary" }),
      label: "Complainant",
      value: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: fir.complainantName })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border-border h-fit", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 border-b bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-sm flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary" }),
        "FIR Details"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant, children: label })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 space-y-4", children: [
      fields.map(({ icon, label: fieldLabel, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 w-7 h-7 rounded bg-primary/10 flex items-center justify-center shrink-0", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-0.5", children: fieldLabel }),
          value
        ] })
      ] }, fieldLabel)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 w-7 h-7 rounded bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1", children: "Offense Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs font-medium", children: fir.offenseType })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 pt-1", children: [
        { label: "Date of Incident", value: fmtDate(fir.dateOfIncident) },
        { label: "Upload Date", value: fmtDate(fir.uploadDate) }
      ].map(({ label: dateLabel, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-md p-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-2.5 h-2.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground uppercase tracking-wider font-semibold", children: dateLabel })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-foreground", children: value })
      ] }, dateLabel)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1", children: "Uploaded By" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "font-mono text-xs text-muted-foreground truncate",
            title: fir.uploadedBy.toString(),
            children: [
              fir.uploadedBy.toString().slice(0, 28),
              "…"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t pt-3 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider font-semibold", children: "Document" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-muted/40 rounded-md px-3 py-2.5 border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground truncate min-w-0 flex-1", children: fir.documentFilename })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              size: "sm",
              className: "flex-1 gap-1.5 text-xs",
              "data-ocid": "fir_detail.view_document.button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: docUrl, target: "_blank", rel: "noopener noreferrer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
                "View"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              size: "sm",
              className: "flex-1 gap-1.5 text-xs",
              "data-ocid": "fir_detail.download_document.button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: docUrl, download: fir.documentFilename, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3" }),
                "Download"
              ] })
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function SummaryPanel({
  fir,
  summary,
  isLoadingSummary
}) {
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [editText, setEditText] = reactExports.useState("");
  const [copied, setCopied] = reactExports.useState(false);
  const triggerSummarization = useTriggerSummarization();
  const updateSummary = useUpdateSummary();
  const saveSummary = useSaveSummary();
  const isSummarizing = fir.status === FirStatus.summarizing;
  const isSummaryReady = fir.status === FirStatus.summary_ready;
  const isSummaryFailed = fir.status === FirStatus.summary_failed;
  function startEdit() {
    setEditText((summary == null ? void 0 : summary.summaryText) ?? "");
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
          summaryText: editText
        });
      } else {
        await saveSummary.mutateAsync({ firId: fir.id, summaryText: editText });
      }
      setIsEditing(false);
      ue.success("Summary saved successfully");
    } catch {
      ue.error("Failed to save summary");
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
      (summary == null ? void 0 : summary.summaryText) ?? "",
      "",
      `Generated       : ${summary ? fmtDateTime(summary.generatedDate) : ""}`,
      (summary == null ? void 0 : summary.lastEditedDate) ? `Last Edited     : ${fmtDateTime(summary.lastEditedDate)}` : ""
    ].filter(Boolean).join("\n");
    await navigator.clipboard.writeText(formattedText);
    setCopied(true);
    ue.success("Summary copied — ready to paste in MS Word");
    setTimeout(() => setCopied(false), 2e3);
  }
  async function handleGenerateSummary() {
    try {
      await triggerSummarization.mutateAsync(fir.id);
      ue.info("AI summarization started — this may take a moment");
    } catch {
      ue.error("Failed to start summarization");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border-border flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 border-b bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-sm flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-accent" }),
      "AI-Generated Summary"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 flex flex-col gap-4 flex-1", children: isLoadingSummary ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "space-y-3 py-2",
        "data-ocid": "fir_detail.summary.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" })
        ]
      }
    ) : isSummarizing ? (
      /* Summarizing state */
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center gap-5 py-12 text-center",
          "data-ocid": "fir_detail.summarizing.loading_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-7 h-7 text-primary animate-spin" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "AI Summarization in Progress" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm", children: "The system is analyzing the FIR document. This typically takes 30–60 seconds. Refresh to check the status." })
            ] })
          ]
        }
      )
    ) : isSummaryFailed ? (
      /* Failed state */
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center gap-5 py-10 text-center",
          "data-ocid": "fir_detail.summary.error_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-destructive/10 border-2 border-destructive/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-6 h-6 text-destructive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Summarization Failed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm", children: "The AI could not process this document. Retry or enter the summary manually." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: handleGenerateSummary,
                  disabled: triggerSummarization.isPending,
                  "data-ocid": "fir_detail.retry_summary.button",
                  className: "gap-1.5",
                  children: [
                    triggerSummarization.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
                    "Retry"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "secondary",
                  onClick: () => {
                    setEditText("");
                    setIsEditing(true);
                  },
                  "data-ocid": "fir_detail.manual_summary.button",
                  className: "gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-3.5 h-3.5" }),
                    "Enter Manually"
                  ]
                }
              )
            ] })
          ]
        }
      )
    ) : isEditing ? (
      /* Edit mode */
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col gap-3",
          "data-ocid": "fir_detail.edit_summary.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: editText,
                  onChange: (e) => setEditText(e.target.value),
                  placeholder: "Enter the FIR summary here…",
                  className: "min-h-[300px] resize-none font-body text-sm leading-relaxed pr-20",
                  "data-ocid": "fir_detail.summary.textarea",
                  autoFocus: true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute bottom-3 right-3 text-xs text-muted-foreground pointer-events-none", children: [
                editText.length,
                " chars"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: handleSave,
                  disabled: updateSummary.isPending || saveSummary.isPending || !editText.trim(),
                  className: "flex-1 gap-2",
                  "data-ocid": "fir_detail.save_summary.save_button",
                  children: [
                    updateSummary.isPending || saveSummary.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                    "Save Summary"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  onClick: cancelEdit,
                  className: "gap-2",
                  "data-ocid": "fir_detail.cancel_edit.cancel_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
                    "Cancel"
                  ]
                }
              )
            ] })
          ]
        }
      )
    ) : isSummaryReady && summary ? (
      /* Ready — read-only view */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-muted/40 border border-border rounded-md p-4 font-body text-sm leading-relaxed text-foreground whitespace-pre-wrap min-h-[200px]",
            "data-ocid": "fir_detail.summary_text.panel",
            children: summary.summaryText
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground border-t pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Generated:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground font-medium", children: fmtDateTime(summary.generatedDate) })
          ] }),
          summary.lastEditedDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Last edited:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground font-medium", children: fmtDateTime(summary.lastEditedDate) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              onClick: handleCopy,
              className: "w-full gap-2.5 text-sm font-bold tracking-wide h-12",
              "data-ocid": "fir_detail.copy_summary.primary_button",
              children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-5 h-5" }),
                "Copied to Clipboard!"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-5 h-5" }),
                "Copy Summary to Clipboard"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: startEdit,
              className: "w-full gap-2",
              "data-ocid": "fir_detail.edit_summary.edit_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4" }),
                "Edit Summary"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: handleGenerateSummary,
              disabled: triggerSummarization.isPending,
              className: "w-full gap-2 text-muted-foreground hover:text-foreground",
              "data-ocid": "fir_detail.regenerate_summary.button",
              children: [
                triggerSummarization.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
                "Re-generate with AI"
              ]
            }
          )
        ] })
      ] })
    ) : (
      /* No summary + pending */
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center gap-5 py-12 text-center",
          "data-ocid": "fir_detail.no_summary.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted border-2 border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clipboard, { className: "w-6 h-6 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No Summary Yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Generate an AI-powered summary of the FIR, or write one manually." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: handleGenerateSummary,
                  disabled: triggerSummarization.isPending,
                  className: "gap-2",
                  "data-ocid": "fir_detail.generate_summary.button",
                  children: [
                    triggerSummarization.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                    "Generate Summary"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  onClick: () => {
                    setEditText("");
                    setIsEditing(true);
                  },
                  className: "gap-2",
                  "data-ocid": "fir_detail.manual_summary.button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4" }),
                    "Enter Manually"
                  ]
                }
              )
            ] })
          ]
        }
      )
    ) })
  ] });
}
function FirDetail() {
  const { id } = useParams({ from: "/firs/$id" });
  const firId = BigInt(id);
  const { data: fir, isLoading: firLoading } = useFirById(firId);
  const { data: summary, isLoading: summaryLoading } = useSummaryByFirId(firId);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-screen-xl mx-auto px-4 sm:px-6 py-6 space-y-5",
      "data-ocid": "fir_detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "nav",
          {
            className: "flex items-center gap-1.5 text-sm text-muted-foreground",
            "aria-label": "Breadcrumb",
            "data-ocid": "fir_detail.breadcrumb.panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/",
                  className: "hover:text-foreground transition-smooth",
                  "data-ocid": "fir_detail.breadcrumb_dashboard.link",
                  children: "Dashboard"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/firs",
                  className: "hover:text-foreground transition-smooth",
                  "data-ocid": "fir_detail.breadcrumb_firs.link",
                  children: "FIR Records"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate", children: firLoading ? "Loading…" : fir ? `FIR #${fir.firNumber}` : `FIR #${id}` })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: firLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-48" }) : fir ? `FIR ${fir.firNumber}` : "FIR Not Found" }),
            fir && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: fir.caseTitle })
          ] }),
          (fir == null ? void 0 : fir.caseId) != null && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              size: "sm",
              className: "gap-1.5 shrink-0",
              "data-ocid": "fir_detail.view_case.button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cases/$id", params: { id: String(fir.caseId) }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-3.5 h-3.5" }),
                "View Case"
              ] })
            }
          )
        ] }),
        firLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6",
            "data-ocid": "fir_detail.loading_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "border-b bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 space-y-4", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" }, i)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "border-b bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-36" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 space-y-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i)) })
              ] })
            ]
          }
        ) : !fir ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "shadow-card border-border",
            "data-ocid": "fir_detail.not_found.error_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center justify-center py-20 text-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-destructive/10 border-2 border-destructive/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-6 h-6 text-destructive" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "FIR Record Not Found" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "This FIR may have been removed or the ID is invalid." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  variant: "outline",
                  "data-ocid": "fir_detail.back_to_firs.button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/firs", children: "Back to FIR Records" })
                }
              )
            ] })
          }
        ) : (
          /* Two-panel layout */
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FirInfoPanel, { fir }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SummaryPanel,
              {
                fir,
                summary: summary ?? null,
                isLoadingSummary: summaryLoading
              }
            )
          ] })
        )
      ]
    }
  ) });
}
export {
  FirDetail as default
};
