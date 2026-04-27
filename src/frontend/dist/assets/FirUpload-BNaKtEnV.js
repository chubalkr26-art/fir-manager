import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as cn, e as useNavigate, B as Button, d as ue } from "./index-BufztUaS.js";
import { i as useCreateFir, a as useListCases, L as Layout, b as Card, d as CardHeader, e as CardTitle, c as CardContent, E as ExternalBlob, f as FileText, X } from "./card-B86WRblc.js";
import { C as ChevronRight, a as CircleAlert, B as Badge } from "./badge-Ki6kV9Yp.js";
import { P as Primitive, L as Label, I as Input } from "./label-D214ABXD.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CtUgjwnd.js";
import { U as Upload } from "./upload-BVHbWIvJ.js";
import { C as CircleCheck } from "./circle-check-DYlUl-5n.js";
import "./index-BknWjwAx.js";
import "./check-DnWy3pMJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
const OFFENSE_TYPES = [
  "Theft",
  "Burglary",
  "Robbery",
  "Assault",
  "Murder",
  "Kidnapping",
  "Fraud",
  "Cybercrime",
  "Domestic Violence",
  "Drug Offense",
  "Traffic Violation",
  "Land Dispute",
  "Missing Person",
  "Other"
];
const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/tiff"
];
const ACCEPTED_EXTENSIONS = ".pdf,.jpg,.jpeg,.png,.tif,.tiff";
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const STEPS = [
  { label: "FIR Details", icon: ClipboardList },
  { label: "Upload Document", icon: Upload },
  { label: "Confirmation", icon: CircleCheck }
];
function StepIndicator({ currentStep }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center justify-center gap-0 mb-8",
      "data-ocid": "fir_upload.step_indicator",
      children: STEPS.map((step, idx) => {
        const stepNum = idx + 1;
        const isComplete = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        const Icon = step.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-10 h-10 rounded-full border-2 flex items-center justify-center transition-smooth ${isComplete ? "bg-primary border-primary text-primary-foreground" : isActive ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground"}`,
                children: isComplete ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `mt-1.5 text-xs font-medium whitespace-nowrap ${isActive ? "text-primary" : isComplete ? "text-foreground" : "text-muted-foreground"}`,
                children: step.label
              }
            )
          ] }),
          idx < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-16 sm:w-24 h-0.5 mx-2 mb-5 transition-smooth ${stepNum < currentStep ? "bg-primary" : "bg-border"}`
            }
          )
        ] }, stepNum);
      })
    }
  );
}
function validateFile(file) {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return "Invalid file type. Please upload a PDF, JPG, PNG, or TIFF file.";
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `File is too large. Maximum size is ${MAX_FILE_SIZE_MB} MB.`;
  }
  return null;
}
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function Step1Form({ fields, errors, cases, onChange, onBlur }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "fir_upload.step1.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "firNumber", children: [
          "FIR Number ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "firNumber",
            placeholder: "e.g. FIR/2024/001",
            value: fields.firNumber,
            onChange: (e) => onChange({ firNumber: e.target.value }),
            onBlur: () => onBlur("firNumber"),
            "aria-invalid": !!errors.firNumber,
            "data-ocid": "fir_upload.fir_number.input"
          }
        ),
        errors.firNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-xs text-destructive flex items-center gap-1",
            "data-ocid": "fir_upload.fir_number.field_error",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
              errors.firNumber
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "dateOfIncident", children: [
          "Date of Incident ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "dateOfIncident",
            type: "date",
            value: fields.dateOfIncident,
            onChange: (e) => onChange({ dateOfIncident: e.target.value }),
            onBlur: () => onBlur("dateOfIncident"),
            "aria-invalid": !!errors.dateOfIncident,
            "data-ocid": "fir_upload.date.input"
          }
        ),
        errors.dateOfIncident && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-xs text-destructive flex items-center gap-1",
            "data-ocid": "fir_upload.date.field_error",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
              errors.dateOfIncident
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "complainantName", children: [
        "Complainant Name ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "complainantName",
          placeholder: "Full name of the complainant",
          value: fields.complainantName,
          onChange: (e) => onChange({ complainantName: e.target.value }),
          onBlur: () => onBlur("complainantName"),
          "aria-invalid": !!errors.complainantName,
          "data-ocid": "fir_upload.complainant.input"
        }
      ),
      errors.complainantName && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "p",
        {
          className: "text-xs text-destructive flex items-center gap-1",
          "data-ocid": "fir_upload.complainant.field_error",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
            errors.complainantName
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "caseTitle", children: [
        "Case Title ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "caseTitle",
          placeholder: "Brief description of the case",
          value: fields.caseTitle,
          onChange: (e) => onChange({ caseTitle: e.target.value }),
          onBlur: () => onBlur("caseTitle"),
          "aria-invalid": !!errors.caseTitle,
          "data-ocid": "fir_upload.case_title.input"
        }
      ),
      errors.caseTitle && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "p",
        {
          className: "text-xs text-destructive flex items-center gap-1",
          "data-ocid": "fir_upload.case_title.field_error",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
            errors.caseTitle
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        "Offense Type ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: fields.offenseType,
          onValueChange: (v) => onChange({ offenseType: v }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                "aria-invalid": !!errors.offenseType,
                "data-ocid": "fir_upload.offense_type.select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select offense type" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: OFFENSE_TYPES.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: type, children: type }, type)) })
          ]
        }
      ),
      errors.offenseType && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "p",
        {
          className: "text-xs text-destructive flex items-center gap-1",
          "data-ocid": "fir_upload.offense_type.field_error",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
            errors.offenseType
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        "Link to Case",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-normal", children: "(Optional)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: fields.selectedCaseId,
          onValueChange: (v) => onChange({ selectedCaseId: v }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "fir_upload.case_link.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select an existing case" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: cases.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__none__", disabled: true, children: "No cases available" }) : cases.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c.id.toString(), children: [
              c.caseNumber,
              " — ",
              c.title
            ] }, c.id.toString())) })
          ]
        }
      )
    ] })
  ] });
}
function Step2Upload({
  selectedFile,
  fileError,
  uploadProgress,
  onFileSelect,
  onFileClear
}) {
  const fileInputRef = reactExports.useRef(null);
  const [isDragOver, setIsDragOver] = reactExports.useState(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  };
  const handleFileChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) onFileSelect(file);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "fir_upload.step2.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: `w-full border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-smooth focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${isDragOver ? "border-primary bg-primary/5" : fileError ? "border-destructive bg-destructive/5" : selectedFile ? "border-primary/50 bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"}`,
          onDragOver: (e) => {
            e.preventDefault();
            setIsDragOver(true);
          },
          onDragLeave: () => setIsDragOver(false),
          onDrop: handleDrop,
          onClick: () => {
            var _a;
            return (_a = fileInputRef.current) == null ? void 0 : _a.click();
          },
          "aria-label": "Upload FIR document",
          "data-ocid": "fir_upload.dropzone",
          children: selectedFile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate max-w-[280px]", children: selectedFile.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: formatFileSize(selectedFile.size) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "mt-1 text-xs text-primary border-primary/30",
                  children: "Ready to upload"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  onFileClear();
                },
                className: "ml-2 w-7 h-7 rounded-full bg-muted hover:bg-muted/70 flex items-center justify-center transition-smooth shrink-0",
                "aria-label": "Remove selected file",
                "data-ocid": "fir_upload.remove_file.button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-xl bg-muted border border-border flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-6 h-6 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Drag & drop your FIR document here" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
                "or",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium underline-offset-2 hover:underline", children: "click to browse files" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Supported: PDF, JPG, PNG, TIFF · Maximum size:",
              " ",
              MAX_FILE_SIZE_MB,
              " MB"
            ] })
          ] })
        }
      ),
      fileError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive",
          "data-ocid": "fir_upload.file.error_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fileError })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: fileInputRef,
          type: "file",
          accept: ACCEPTED_EXTENSIONS,
          className: "hidden",
          onChange: handleFileChange,
          "data-ocid": "fir_upload.upload_button"
        }
      )
    ] }),
    uploadProgress > 0 && uploadProgress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "space-y-1.5",
        "data-ocid": "fir_upload.progress.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading document…" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              uploadProgress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: uploadProgress, className: "h-2" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/50 border border-border p-4 space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground uppercase tracking-wide", children: "Accepted File Types" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: ["PDF", "JPG / JPEG", "PNG", "TIFF"].map((fmt) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs font-mono", children: fmt }, fmt)) })
    ] })
  ] });
}
function Step3Confirmation({
  fields,
  selectedFile,
  caseName,
  isPending
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "fir_upload.step3.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 px-4 py-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "FIR Details" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: [
        { label: "FIR Number", value: fields.firNumber },
        { label: "Case Title", value: fields.caseTitle },
        { label: "Complainant", value: fields.complainantName },
        { label: "Date of Incident", value: fields.dateOfIncident },
        { label: "Offense Type", value: fields.offenseType },
        ...caseName ? [{ label: "Linked Case", value: caseName }] : []
      ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground w-36 shrink-0", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: value })
      ] }, label)) })
    ] }),
    selectedFile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 px-4 py-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Document" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: selectedFile.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatFileSize(selectedFile.size) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-lg bg-accent/10 border border-accent/20 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-accent shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: "Please review the details above before submitting. Once submitted, the FIR will be registered in the system and available for review." })
    ] }),
    isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 text-sm text-muted-foreground",
        "data-ocid": "fir_upload.submit.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading FIR document and registering record…" })
        ]
      }
    )
  ] });
}
function FirUpload() {
  const navigate = useNavigate();
  const { mutateAsync: createFir, isPending } = useCreateFir();
  const { data: cases } = useListCases();
  const [currentStep, setCurrentStep] = reactExports.useState(1);
  const [fields, setFields] = reactExports.useState({
    firNumber: "",
    caseTitle: "",
    complainantName: "",
    dateOfIncident: "",
    offenseType: "",
    selectedCaseId: ""
  });
  const [step1Errors, setStep1Errors] = reactExports.useState({});
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [fileError, setFileError] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  function validateStep1Field(field, value) {
    if (field === "firNumber" && !value.trim())
      return "FIR Number is required.";
    if (field === "caseTitle" && !value.trim())
      return "Case Title is required.";
    if (field === "complainantName" && !value.trim())
      return "Complainant Name is required.";
    if (field === "dateOfIncident" && !value)
      return "Date of Incident is required.";
    if (field === "offenseType" && !value) return "Offense Type is required.";
    return void 0;
  }
  function handleStep1Blur(field) {
    const value = fields[field];
    const error = validateStep1Field(field, value);
    setStep1Errors((prev) => ({ ...prev, [field]: error }));
  }
  function validateStep1() {
    const newErrors = {};
    const fieldKeys = [
      "firNumber",
      "caseTitle",
      "complainantName",
      "dateOfIncident",
      "offenseType"
    ];
    for (const key of fieldKeys) {
      const error = validateStep1Field(
        key,
        fields[key]
      );
      if (error) newErrors[key] = error;
    }
    setStep1Errors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  function handleFileSelect(file) {
    const error = validateFile(file);
    if (error) {
      setFileError(error);
      setSelectedFile(null);
    } else {
      setFileError(null);
      setSelectedFile(file);
    }
  }
  function handleFileClear() {
    setSelectedFile(null);
    setFileError(null);
    setUploadProgress(0);
  }
  function handleNext() {
    if (currentStep === 1) {
      if (!validateStep1()) return;
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedFile) {
        setFileError("Please select a document to upload.");
        return;
      }
      setCurrentStep(3);
    }
  }
  function handleBack() {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }
  async function handleSubmit() {
    if (!selectedFile) {
      ue.error("No document selected.");
      return;
    }
    try {
      setUploadProgress(5);
      const bytes = new Uint8Array(await selectedFile.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });
      const date = BigInt(new Date(fields.dateOfIncident).getTime()) * 1000000n;
      await createFir({
        firNumber: fields.firNumber.trim(),
        caseTitle: fields.caseTitle.trim(),
        complainantName: fields.complainantName.trim(),
        dateOfIncident: date,
        offenseType: fields.offenseType,
        document: blob,
        documentFilename: selectedFile.name,
        caseId: fields.selectedCaseId ? BigInt(fields.selectedCaseId) : void 0
      });
      setUploadProgress(100);
      ue.success("FIR registered successfully.");
      navigate({ to: "/firs" });
    } catch (err) {
      console.error(err);
      setUploadProgress(0);
      ue.error("Failed to upload FIR. Please try again.");
    }
  }
  const caseList = cases ?? [];
  const linkedCase = fields.selectedCaseId ? caseList.find((c) => c.id.toString() === fields.selectedCaseId) : void 0;
  const linkedCaseName = linkedCase ? `${linkedCase.caseNumber} — ${linkedCase.title}` : null;
  const stepTitles = [
    { title: "FIR Details", subtitle: "Enter the information about the FIR" },
    { title: "Upload Document", subtitle: "Attach the official FIR document" },
    {
      title: "Review & Submit",
      subtitle: "Confirm details before registering"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto px-4 sm:px-6 py-8",
      "data-ocid": "fir_upload.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Register New FIR" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Upload and register a First Information Report in the system" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { currentStep }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-elevated border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "border-b border-border bg-muted/20 rounded-t-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold", children: currentStep }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold text-foreground", children: stepTitles[currentStep - 1].title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: stepTitles[currentStep - 1].subtitle })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 pb-6", children: [
            currentStep === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Step1Form,
              {
                fields,
                errors: step1Errors,
                cases: caseList,
                onChange: (updates) => setFields((prev) => ({ ...prev, ...updates })),
                onBlur: handleStep1Blur
              }
            ),
            currentStep === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Step2Upload,
              {
                selectedFile,
                fileError,
                uploadProgress,
                onFileSelect: handleFileSelect,
                onFileClear: handleFileClear
              }
            ),
            currentStep === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Step3Confirmation,
              {
                fields,
                selectedFile,
                caseName: linkedCaseName,
                isPending
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: currentStep > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: handleBack,
              disabled: isPending,
              className: "gap-1.5",
              "data-ocid": "fir_upload.back.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                "Back"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              onClick: () => navigate({ to: "/firs" }),
              className: "gap-1.5 text-muted-foreground",
              "data-ocid": "fir_upload.cancel.cancel_button",
              children: "Cancel"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "Step ",
              currentStep,
              " of ",
              STEPS.length
            ] }),
            currentStep < 3 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: handleNext,
                className: "gap-1.5",
                "data-ocid": "fir_upload.next.button",
                children: [
                  "Next",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: handleSubmit,
                disabled: isPending,
                className: "gap-1.5",
                "data-ocid": "fir_upload.submit.submit_button",
                children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" }),
                  "Uploading…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                  "Submit FIR"
                ] })
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
export {
  FirUpload as default
};
