import { r as reactExports, j as jsxRuntimeExports, B as Button, S as Skeleton, L as Link, d as ue } from "./index-BufztUaS.js";
import { a as useListCases, L as Layout, g as FolderOpen, C as CaseStatus, X, b as Card, c as CardContent, o as useCreateCase } from "./card-B86WRblc.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-BrIl48iy.js";
import { I as Input, L as Label } from "./label-D214ABXD.js";
import { C as CirclePlus } from "./circle-plus-C5SSdrLM.js";
import { S as Search } from "./search-CDlVDn-6.js";
import { m as motion, E as Eye } from "./proxy-BhpwpN_a.js";
import "./index-DIu7TKBa.js";
import "./index-BknWjwAx.js";
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function CaseStatusBadge({ status }) {
  const map = {
    [CaseStatus.open]: {
      label: "Open",
      cls: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300"
    },
    [CaseStatus.under_investigation]: {
      label: "Under Investigation",
      cls: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300"
    },
    [CaseStatus.closed]: {
      label: "Closed",
      cls: "bg-muted text-muted-foreground border-border"
    },
    [CaseStatus.chargeshed]: {
      label: "Chargesheet Filed",
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
function CreateCaseDialog({ open, onClose }) {
  const { mutate: createCase, isPending } = useCreateCase();
  const [caseNumber, setCaseNumber] = reactExports.useState("");
  const [title, setTitle] = reactExports.useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!caseNumber.trim() || !title.trim()) return;
    createCase(
      { caseNumber: caseNumber.trim(), title: title.trim() },
      {
        onSuccess: () => {
          ue.success(`Case ${caseNumber.trim()} created successfully.`);
          setCaseNumber("");
          setTitle("");
          onClose();
        },
        onError: () => ue.error("Failed to create case. Please try again.")
      }
    );
  }
  function handleClose() {
    setCaseNumber("");
    setTitle("");
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && handleClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "case_list.create.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-lg", children: "Create New Case" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "case-number", className: "text-sm font-medium", children: [
          "Case Number ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "case-number",
            placeholder: "e.g. CASE/2024/001",
            value: caseNumber,
            onChange: (e) => setCaseNumber(e.target.value),
            required: true,
            className: "h-9",
            "data-ocid": "case_list.case_number.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "case-title", className: "text-sm font-medium", children: [
          "Case Title ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "case-title",
            placeholder: "Brief description of the case",
            value: title,
            onChange: (e) => setTitle(e.target.value),
            required: true,
            className: "h-9",
            "data-ocid": "case_list.case_title.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: handleClose,
            "data-ocid": "case_list.create.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            size: "sm",
            disabled: isPending || !caseNumber.trim() || !title.trim(),
            "data-ocid": "case_list.create.confirm_button",
            children: isPending ? "Creating…" : "Create Case"
          }
        )
      ] })
    ] }),
    isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "output",
      {
        className: "sr-only",
        "data-ocid": "case_list.create.loading_state",
        children: "Creating case…"
      }
    )
  ] }) });
}
function CaseList() {
  const { data: cases = [], isLoading } = useListCases();
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const filtered = reactExports.useMemo(() => {
    return cases.filter((c) => {
      const matchSearch = !search || c.caseNumber.toLowerCase().includes(search.toLowerCase()) || c.title.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [cases, search, statusFilter]);
  const hasFilters = !!search || statusFilter !== "all";
  const statusGroups = [
    { key: CaseStatus.open, label: "Open" },
    { key: CaseStatus.under_investigation, label: "Investigating" },
    { key: CaseStatus.chargeshed, label: "Chargesheet" },
    { key: CaseStatus.closed, label: "Closed" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-screen-2xl mx-auto px-4 sm:px-6 py-8 space-y-6",
        "data-ocid": "case_list.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-6 h-6 text-primary" }),
                "Cases"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "All registered cases at Mokokchung Police Station" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => setDialogOpen(true),
                "data-ocid": "case_list.create_case.open_modal_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4 mr-1.5" }),
                  "Create Case"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm w-full sm:w-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Search case # or title…",
                  className: "pl-8 h-9 text-sm",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  "data-ocid": "case_list.search_input"
                }
              )
            ] }),
            !isLoading && cases.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              statusGroups.map((s) => {
                const count = cases.filter((c) => c.status === s.key).length;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setStatusFilter(
                      (prev) => prev === s.key ? "all" : s.key
                    ),
                    className: `px-3 py-1 rounded-full border text-xs font-medium transition-smooth ${statusFilter === s.key ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:bg-muted"}`,
                    "data-ocid": `case_list.filter.${s.key}`,
                    children: [
                      s.label,
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-0.5 font-bold", children: count })
                    ]
                  },
                  s.key
                );
              }),
              hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setSearch("");
                    setStatusFilter("all");
                  },
                  className: "px-2.5 py-1 rounded-full border text-xs font-medium bg-card text-muted-foreground border-border hover:bg-muted transition-smooth flex items-center gap-1",
                  "data-ocid": "case_list.clear_filters.button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
                    "Clear"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "border shadow-card overflow-hidden",
              "data-ocid": "case_list.table",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "p-6 space-y-3",
                  "data-ocid": "case_list.loading_state",
                  children: ["r1", "r2", "r3", "r4", "r5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-full" }, k))
                }
              ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "py-16 text-center",
                  "data-ocid": "case_list.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-10 h-10 text-muted-foreground/50 mx-auto mb-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No cases found" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: hasFilters ? "Try adjusting your search or filters" : "Create the first case to begin tracking investigations" }),
                    !hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        className: "mt-4",
                        size: "sm",
                        onClick: () => setDialogOpen(true),
                        "data-ocid": "case_list.empty_create.button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4 mr-1.5" }),
                          "Create Case"
                        ]
                      }
                    )
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b bg-muted/40", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap", children: "Case No." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Title" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Status" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden sm:table-cell", children: "FIRs Linked" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden md:table-cell", children: "Created" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Actions" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.tr,
                    {
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      transition: { duration: 0.2, delay: i * 0.025 },
                      className: "border-b hover:bg-muted/30 transition-smooth",
                      "data-ocid": `case_list.item.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs font-semibold text-primary whitespace-nowrap", children: c.caseNumber }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground max-w-[220px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate block", children: c.title }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CaseStatusBadge, { status: c.status }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-muted-foreground tabular-nums hidden sm:table-cell", children: c.firIds.length }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap hidden md:table-cell", children: formatDate(c.createdDate) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            asChild: true,
                            variant: "ghost",
                            size: "icon",
                            className: "h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10",
                            "data-ocid": `case_list.view_button.${i + 1}`,
                            "aria-label": "View case",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Link,
                              {
                                to: "/cases/$id",
                                params: { id: c.id.toString() },
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" })
                              }
                            )
                          }
                        ) }) })
                      ]
                    },
                    c.id.toString()
                  )) })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-t bg-muted/20 text-xs text-muted-foreground", children: [
                  "Showing ",
                  filtered.length,
                  " of ",
                  cases.length,
                  " cases"
                ] })
              ] }) })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateCaseDialog,
      {
        open: dialogOpen,
        onClose: () => setDialogOpen(false)
      }
    )
  ] });
}
export {
  CaseList as default
};
