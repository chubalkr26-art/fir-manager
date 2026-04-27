import { c as createLucideIcon, j as jsxRuntimeExports, B as Button, L as Link, S as Skeleton } from "./index-BufztUaS.js";
import { u as useListFirs, a as useListCases, F as FirStatus, C as CaseStatus, L as Layout, b as Card, c as CardContent, d as CardHeader, e as CardTitle, f as FileText, g as FolderOpen } from "./card-B86WRblc.js";
import { C as CirclePlus } from "./circle-plus-C5SSdrLM.js";
import { U as Upload } from "./upload-BVHbWIvJ.js";
import { m as motion, E as Eye } from "./proxy-BhpwpN_a.js";
import { C as CircleCheck } from "./circle-check-DYlUl-5n.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$1);
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
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function FirStatusBadge({ status }) {
  const map = {
    [FirStatus.pending_summary]: {
      label: "Pending",
      cls: "bg-muted text-muted-foreground border-border"
    },
    [FirStatus.summarizing]: {
      label: "Summarizing",
      cls: "bg-primary/10 text-primary border-primary/30"
    },
    [FirStatus.summary_ready]: {
      label: "Ready",
      cls: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
    },
    [FirStatus.summary_failed]: {
      label: "Failed",
      cls: "bg-accent/10 text-accent border-accent/30"
    }
  };
  const { label, cls } = map[status] ?? { label: String(status), cls: "" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${cls}`,
      children: label
    }
  );
}
function CaseStatusBadge({ status }) {
  const map = {
    [CaseStatus.open]: {
      label: "Open",
      cls: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300"
    },
    [CaseStatus.under_investigation]: {
      label: "Investigating",
      cls: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300"
    },
    [CaseStatus.closed]: {
      label: "Closed",
      cls: "bg-muted text-muted-foreground border-border"
    },
    [CaseStatus.chargeshed]: {
      label: "Chargesheet",
      cls: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300"
    }
  };
  const { label, cls } = map[status] ?? { label: String(status), cls: "" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${cls}`,
      children: label
    }
  );
}
function StatCard({
  label,
  value,
  icon,
  sub,
  highlight,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay: index * 0.07 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: `border shadow-card ${highlight ? "border-primary/40 bg-primary/5" : ""}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-3xl font-display font-bold leading-none ${highlight ? "text-primary" : "text-foreground"}`,
                  children: value
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: sub })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${highlight ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`,
                children: icon
              }
            )
          ] }) })
        }
      )
    }
  );
}
function RecentFirsTable({ firs }) {
  if (firs.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "py-12 text-center text-sm text-muted-foreground",
        "data-ocid": "dashboard.recent_firs.empty_state",
        children: "No FIR records yet. Upload the first FIR to get started."
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b bg-muted/40", children: ["FIR No.", "Title", "Complainant", "Date", "Status", ""].map(
      (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: `text-left px-4 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide ${h === "Complainant" ? "hidden md:table-cell" : ""} ${h === "Date" ? "hidden lg:table-cell" : ""}`,
          children: h
        },
        h
      )
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: firs.map((fir, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b hover:bg-muted/30 transition-smooth",
        "data-ocid": `dashboard.recent_firs.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs font-semibold text-primary", children: fir.firNumber }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground max-w-[160px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate block", children: fir.caseTitle }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden md:table-cell", children: fir.complainantName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap hidden lg:table-cell", children: formatDate(fir.dateOfIncident) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FirStatusBadge, { status: fir.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "ghost",
              size: "icon",
              className: "h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10",
              "aria-label": "View FIR",
              "data-ocid": `dashboard.recent_firs.link.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/firs/$id", params: { id: fir.id.toString() }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }) })
            }
          ) })
        ]
      },
      fir.id.toString()
    )) })
  ] }) });
}
function RecentCasesTable({ cases }) {
  if (cases.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "py-12 text-center text-sm text-muted-foreground",
        "data-ocid": "dashboard.recent_cases.empty_state",
        children: "No cases registered yet. Create a case to begin tracking."
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b bg-muted/40", children: ["Case No.", "Title", "FIRs", "Status", ""].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "th",
      {
        className: `text-left px-4 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide ${h === "FIRs" ? "text-right hidden sm:table-cell" : ""}`,
        children: h
      },
      h
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: cases.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b hover:bg-muted/30 transition-smooth",
        "data-ocid": `dashboard.recent_cases.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs font-semibold text-primary", children: c.caseNumber }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground max-w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate block", children: c.title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-muted-foreground tabular-nums hidden sm:table-cell", children: c.firIds.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CaseStatusBadge, { status: c.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "ghost",
              size: "icon",
              className: "h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10",
              "aria-label": "View case",
              "data-ocid": `dashboard.recent_cases.link.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cases/$id", params: { id: c.id.toString() }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }) })
            }
          ) })
        ]
      },
      c.id.toString()
    )) })
  ] }) });
}
function Dashboard() {
  const { data: firs = [], isLoading: firsLoading } = useListFirs();
  const { data: cases = [], isLoading: casesLoading } = useListCases();
  const totalFirs = firs.length;
  const firsPending = firs.filter(
    (f) => f.status === FirStatus.pending_summary
  ).length;
  const casesOpen = cases.filter(
    (c) => c.status === CaseStatus.open || c.status === CaseStatus.under_investigation
  ).length;
  const casesClosed = cases.filter(
    (c) => c.status === CaseStatus.closed
  ).length;
  const recentFirs = [...firs].sort((a, b) => Number(b.uploadDate - a.uploadDate)).slice(0, 5);
  const recentCases = [...cases].sort((a, b) => Number(b.createdDate - a.createdDate)).slice(0, 5);
  const stats = [
    {
      label: "Total FIRs",
      value: totalFirs,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5" }),
      sub: "All registered FIRs",
      index: 0
    },
    {
      label: "Pending Summary",
      value: firsPending,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5" }),
      sub: "Awaiting summarization",
      highlight: firsPending > 0,
      index: 1
    },
    {
      label: "Cases Open",
      value: casesOpen,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5" }),
      sub: "Active investigations",
      highlight: casesOpen > 0,
      index: 2
    },
    {
      label: "Cases Closed",
      value: casesClosed,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }),
      sub: "Resolved cases",
      index: 3
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-screen-2xl mx-auto px-4 sm:px-6 py-8 space-y-8",
      "data-ocid": "dashboard.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Mokokchung Police Station — Case Management Overview" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                size: "sm",
                "data-ocid": "dashboard.create_case.button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cases", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4 mr-1.5" }),
                  "Create Case"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", "data-ocid": "dashboard.upload_fir.button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/firs/upload", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 mr-1.5" }),
              "Upload FIR"
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
            "data-ocid": "dashboard.stats.section",
            children: firsLoading || casesLoading ? ["s1", "s2", "s3", "s4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" })
            ] }) }, k)) : stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { ...s }, s.label))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.35, delay: 0.28 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Card,
                {
                  className: "border shadow-card",
                  "data-ocid": "dashboard.recent_firs.card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "px-4 py-3 border-b bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display font-semibold flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary" }),
                        "Recent FIR Records"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          asChild: true,
                          variant: "ghost",
                          size: "sm",
                          className: "text-xs h-7",
                          "data-ocid": "dashboard.view_all_firs.link",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/firs", children: "View All" })
                        }
                      )
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: firsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: ["f1", "f2", "f3", "f4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RecentFirsTable, { firs: recentFirs }) })
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.35, delay: 0.35 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Card,
                {
                  className: "border shadow-card",
                  "data-ocid": "dashboard.recent_cases.card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "px-4 py-3 border-b bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display font-semibold flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-4 h-4 text-primary" }),
                        "Recent Cases"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          asChild: true,
                          variant: "ghost",
                          size: "sm",
                          className: "text-xs h-7",
                          "data-ocid": "dashboard.view_all_cases.link",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cases", children: "View All" })
                        }
                      )
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: casesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: ["c1", "c2", "c3", "c4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RecentCasesTable, { cases: recentCases }) })
                  ]
                }
              )
            }
          )
        ] })
      ]
    }
  ) });
}
export {
  Dashboard as default
};
