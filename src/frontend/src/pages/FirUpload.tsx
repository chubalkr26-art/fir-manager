import { useCreateFir, useListCases } from "@/api";
import { ExternalBlob } from "@/backend";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ─── Constants ──────────────────────────────────────────────────────────────

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
  "Other",
];

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/tiff",
];
const ACCEPTED_EXTENSIONS = ".pdf,.jpg,.jpeg,.png,.tif,.tiff";
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// ─── Step Indicator ─────────────────────────────────────────────────────────

interface StepIndicatorProps {
  currentStep: number;
}

const STEPS = [
  { label: "FIR Details", icon: ClipboardList },
  { label: "Upload Document", icon: Upload },
  { label: "Confirmation", icon: CheckCircle2 },
];

function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div
      className="flex items-center justify-center gap-0 mb-8"
      data-ocid="fir_upload.step_indicator"
    >
      {STEPS.map((step, idx) => {
        const stepNum = idx + 1;
        const isComplete = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        const Icon = step.icon;

        return (
          <div key={stepNum} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-smooth ${
                  isComplete
                    ? "bg-primary border-primary text-primary-foreground"
                    : isActive
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground"
                }`}
              >
                {isComplete ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <span
                className={`mt-1.5 text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? "text-primary"
                    : isComplete
                      ? "text-foreground"
                      : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 transition-smooth ${
                  stepNum < currentStep ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── File Validation ─────────────────────────────────────────────────────────

function validateFile(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return "Invalid file type. Please upload a PDF, JPG, PNG, or TIFF file.";
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `File is too large. Maximum size is ${MAX_FILE_SIZE_MB} MB.`;
  }
  return null;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── Step 1: FIR Metadata ────────────────────────────────────────────────────

interface Step1Fields {
  firNumber: string;
  caseTitle: string;
  complainantName: string;
  dateOfIncident: string;
  offenseType: string;
  selectedCaseId: string;
}

interface Step1Errors {
  firNumber?: string;
  caseTitle?: string;
  complainantName?: string;
  dateOfIncident?: string;
  offenseType?: string;
}

interface Step1Props {
  fields: Step1Fields;
  errors: Step1Errors;
  cases: Array<{ id: bigint; caseNumber: string; title: string }>;
  onChange: (updates: Partial<Step1Fields>) => void;
  onBlur: (field: keyof Step1Errors) => void;
}

function Step1Form({ fields, errors, cases, onChange, onBlur }: Step1Props) {
  return (
    <div className="space-y-5" data-ocid="fir_upload.step1.panel">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="firNumber">
            FIR Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firNumber"
            placeholder="e.g. FIR/2024/001"
            value={fields.firNumber}
            onChange={(e) => onChange({ firNumber: e.target.value })}
            onBlur={() => onBlur("firNumber")}
            aria-invalid={!!errors.firNumber}
            data-ocid="fir_upload.fir_number.input"
          />
          {errors.firNumber && (
            <p
              className="text-xs text-destructive flex items-center gap-1"
              data-ocid="fir_upload.fir_number.field_error"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.firNumber}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="dateOfIncident">
            Date of Incident <span className="text-destructive">*</span>
          </Label>
          <Input
            id="dateOfIncident"
            type="date"
            value={fields.dateOfIncident}
            onChange={(e) => onChange({ dateOfIncident: e.target.value })}
            onBlur={() => onBlur("dateOfIncident")}
            aria-invalid={!!errors.dateOfIncident}
            data-ocid="fir_upload.date.input"
          />
          {errors.dateOfIncident && (
            <p
              className="text-xs text-destructive flex items-center gap-1"
              data-ocid="fir_upload.date.field_error"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.dateOfIncident}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="complainantName">
          Complainant Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="complainantName"
          placeholder="Full name of the complainant"
          value={fields.complainantName}
          onChange={(e) => onChange({ complainantName: e.target.value })}
          onBlur={() => onBlur("complainantName")}
          aria-invalid={!!errors.complainantName}
          data-ocid="fir_upload.complainant.input"
        />
        {errors.complainantName && (
          <p
            className="text-xs text-destructive flex items-center gap-1"
            data-ocid="fir_upload.complainant.field_error"
          >
            <AlertCircle className="w-3 h-3" />
            {errors.complainantName}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="caseTitle">
          Case Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="caseTitle"
          placeholder="Brief description of the case"
          value={fields.caseTitle}
          onChange={(e) => onChange({ caseTitle: e.target.value })}
          onBlur={() => onBlur("caseTitle")}
          aria-invalid={!!errors.caseTitle}
          data-ocid="fir_upload.case_title.input"
        />
        {errors.caseTitle && (
          <p
            className="text-xs text-destructive flex items-center gap-1"
            data-ocid="fir_upload.case_title.field_error"
          >
            <AlertCircle className="w-3 h-3" />
            {errors.caseTitle}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>
          Offense Type <span className="text-destructive">*</span>
        </Label>
        <Select
          value={fields.offenseType}
          onValueChange={(v) => onChange({ offenseType: v })}
        >
          <SelectTrigger
            aria-invalid={!!errors.offenseType}
            data-ocid="fir_upload.offense_type.select"
          >
            <SelectValue placeholder="Select offense type" />
          </SelectTrigger>
          <SelectContent>
            {OFFENSE_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.offenseType && (
          <p
            className="text-xs text-destructive flex items-center gap-1"
            data-ocid="fir_upload.offense_type.field_error"
          >
            <AlertCircle className="w-3 h-3" />
            {errors.offenseType}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>
          Link to Case{" "}
          <span className="text-muted-foreground text-xs font-normal">
            (Optional)
          </span>
        </Label>
        <Select
          value={fields.selectedCaseId}
          onValueChange={(v) => onChange({ selectedCaseId: v })}
        >
          <SelectTrigger data-ocid="fir_upload.case_link.select">
            <SelectValue placeholder="Select an existing case" />
          </SelectTrigger>
          <SelectContent>
            {cases.length === 0 ? (
              <SelectItem value="__none__" disabled>
                No cases available
              </SelectItem>
            ) : (
              cases.map((c) => (
                <SelectItem key={c.id.toString()} value={c.id.toString()}>
                  {c.caseNumber} — {c.title}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// ─── Step 2: Document Upload ──────────────────────────────────────────────────

interface Step2Props {
  selectedFile: File | null;
  fileError: string | null;
  uploadProgress: number;
  onFileSelect: (file: File) => void;
  onFileClear: () => void;
}

function Step2Upload({
  selectedFile,
  fileError,
  uploadProgress,
  onFileSelect,
  onFileClear,
}: Step2Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div className="space-y-4" data-ocid="fir_upload.step2.panel">
      <div className="space-y-2">
        <button
          type="button"
          className={`w-full border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-smooth focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
            isDragOver
              ? "border-primary bg-primary/5"
              : fileError
                ? "border-destructive bg-destructive/5"
                : selectedFile
                  ? "border-primary/50 bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/30"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          aria-label="Upload FIR document"
          data-ocid="fir_upload.dropzone"
        >
          {selectedFile ? (
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left min-w-0">
                <p className="font-medium text-foreground truncate max-w-[280px]">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </p>
                <Badge
                  variant="outline"
                  className="mt-1 text-xs text-primary border-primary/30"
                >
                  Ready to upload
                </Badge>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileClear();
                }}
                className="ml-2 w-7 h-7 rounded-full bg-muted hover:bg-muted/70 flex items-center justify-center transition-smooth shrink-0"
                aria-label="Remove selected file"
                data-ocid="fir_upload.remove_file.button"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-xl bg-muted border border-border flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Drag & drop your FIR document here
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  or{" "}
                  <span className="text-primary font-medium underline-offset-2 hover:underline">
                    click to browse files
                  </span>
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Supported: PDF, JPG, PNG, TIFF · Maximum size:{" "}
                {MAX_FILE_SIZE_MB} MB
              </p>
            </div>
          )}
        </button>

        {fileError && (
          <div
            className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive"
            data-ocid="fir_upload.file.error_state"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{fileError}</span>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          className="hidden"
          onChange={handleFileChange}
          data-ocid="fir_upload.upload_button"
        />
      </div>

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div
          className="space-y-1.5"
          data-ocid="fir_upload.progress.loading_state"
        >
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Uploading document…</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      <div className="rounded-lg bg-muted/50 border border-border p-4 space-y-1.5">
        <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
          Accepted File Types
        </p>
        <div className="flex flex-wrap gap-1.5">
          {["PDF", "JPG / JPEG", "PNG", "TIFF"].map((fmt) => (
            <Badge key={fmt} variant="secondary" className="text-xs font-mono">
              {fmt}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Step 3: Confirmation ─────────────────────────────────────────────────────

interface Step3Props {
  fields: Step1Fields;
  selectedFile: File | null;
  caseName: string | null;
  isPending: boolean;
}

function Step3Confirmation({
  fields,
  selectedFile,
  caseName,
  isPending,
}: Step3Props) {
  return (
    <div className="space-y-5" data-ocid="fir_upload.step3.panel">
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="bg-muted/40 px-4 py-3 border-b border-border">
          <p className="text-sm font-semibold text-foreground">FIR Details</p>
        </div>
        <div className="divide-y divide-border">
          {[
            { label: "FIR Number", value: fields.firNumber },
            { label: "Case Title", value: fields.caseTitle },
            { label: "Complainant", value: fields.complainantName },
            { label: "Date of Incident", value: fields.dateOfIncident },
            { label: "Offense Type", value: fields.offenseType },
            ...(caseName ? [{ label: "Linked Case", value: caseName }] : []),
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start gap-4 px-4 py-3">
              <span className="text-sm text-muted-foreground w-36 shrink-0">
                {label}
              </span>
              <span className="text-sm font-medium text-foreground">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {selectedFile && (
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="bg-muted/40 px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-foreground">Document</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-start gap-3 rounded-lg bg-accent/10 border border-accent/20 px-4 py-3">
        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <p className="text-sm text-foreground">
          Please review the details above before submitting. Once submitted, the
          FIR will be registered in the system and available for review.
        </p>
      </div>

      {isPending && (
        <div
          className="flex items-center gap-2 text-sm text-muted-foreground"
          data-ocid="fir_upload.submit.loading_state"
        >
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>Uploading FIR document and registering record…</span>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FirUpload() {
  const navigate = useNavigate();
  const { mutateAsync: createFir, isPending } = useCreateFir();
  const { data: cases } = useListCases();

  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 fields
  const [fields, setFields] = useState<Step1Fields>({
    firNumber: "",
    caseTitle: "",
    complainantName: "",
    dateOfIncident: "",
    offenseType: "",
    selectedCaseId: "",
  });
  const [step1Errors, setStep1Errors] = useState<Step1Errors>({});

  // Step 2 file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // ── Validation ──────────────────────────────────────────────────────────────

  function validateStep1Field(
    field: keyof Step1Errors,
    value: string,
  ): string | undefined {
    if (field === "firNumber" && !value.trim())
      return "FIR Number is required.";
    if (field === "caseTitle" && !value.trim())
      return "Case Title is required.";
    if (field === "complainantName" && !value.trim())
      return "Complainant Name is required.";
    if (field === "dateOfIncident" && !value)
      return "Date of Incident is required.";
    if (field === "offenseType" && !value) return "Offense Type is required.";
    return undefined;
  }

  function handleStep1Blur(field: keyof Step1Errors) {
    const value = fields[field as keyof Step1Fields];
    const error = validateStep1Field(field, value as string);
    setStep1Errors((prev) => ({ ...prev, [field]: error }));
  }

  function validateStep1(): boolean {
    const newErrors: Step1Errors = {};
    const fieldKeys: Array<keyof Step1Errors> = [
      "firNumber",
      "caseTitle",
      "complainantName",
      "dateOfIncident",
      "offenseType",
    ];
    for (const key of fieldKeys) {
      const error = validateStep1Field(
        key,
        fields[key as keyof Step1Fields] as string,
      );
      if (error) newErrors[key] = error;
    }
    setStep1Errors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ── File Handling ────────────────────────────────────────────────────────────

  function handleFileSelect(file: File) {
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

  // ── Navigation ───────────────────────────────────────────────────────────────

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

  // ── Submit ───────────────────────────────────────────────────────────────────

  async function handleSubmit() {
    if (!selectedFile) {
      toast.error("No document selected.");
      return;
    }
    try {
      setUploadProgress(5);
      const bytes = new Uint8Array(await selectedFile.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });
      const date =
        BigInt(new Date(fields.dateOfIncident).getTime()) * 1_000_000n;

      await createFir({
        firNumber: fields.firNumber.trim(),
        caseTitle: fields.caseTitle.trim(),
        complainantName: fields.complainantName.trim(),
        dateOfIncident: date,
        offenseType: fields.offenseType,
        document: blob,
        documentFilename: selectedFile.name,
        caseId: fields.selectedCaseId
          ? BigInt(fields.selectedCaseId)
          : undefined,
      });

      setUploadProgress(100);
      toast.success("FIR registered successfully.");
      navigate({ to: "/firs" });
    } catch (err) {
      console.error(err);
      setUploadProgress(0);
      toast.error("Failed to upload FIR. Please try again.");
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────────

  const caseList = (cases ?? []) as Array<{
    id: bigint;
    caseNumber: string;
    title: string;
  }>;

  const linkedCase = fields.selectedCaseId
    ? caseList.find((c) => c.id.toString() === fields.selectedCaseId)
    : undefined;
  const linkedCaseName = linkedCase
    ? `${linkedCase.caseNumber} — ${linkedCase.title}`
    : null;

  const stepTitles = [
    { title: "FIR Details", subtitle: "Enter the information about the FIR" },
    { title: "Upload Document", subtitle: "Attach the official FIR document" },
    {
      title: "Review & Submit",
      subtitle: "Confirm details before registering",
    },
  ];

  return (
    <Layout>
      <div
        className="max-w-2xl mx-auto px-4 sm:px-6 py-8"
        data-ocid="fir_upload.page"
      >
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Register New FIR
          </h1>
          <p className="text-muted-foreground mt-1">
            Upload and register a First Information Report in the system
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Step Card */}
        <Card className="shadow-elevated border-border">
          <CardHeader className="border-b border-border bg-muted/20 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                {currentStep}
              </div>
              <div>
                <CardTitle className="text-base font-semibold text-foreground">
                  {stepTitles[currentStep - 1].title}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stepTitles[currentStep - 1].subtitle}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 pb-6">
            {currentStep === 1 && (
              <Step1Form
                fields={fields}
                errors={step1Errors}
                cases={caseList}
                onChange={(updates) =>
                  setFields((prev) => ({ ...prev, ...updates }))
                }
                onBlur={handleStep1Blur}
              />
            )}
            {currentStep === 2 && (
              <Step2Upload
                selectedFile={selectedFile}
                fileError={fileError}
                uploadProgress={uploadProgress}
                onFileSelect={handleFileSelect}
                onFileClear={handleFileClear}
              />
            )}
            {currentStep === 3 && (
              <Step3Confirmation
                fields={fields}
                selectedFile={selectedFile}
                caseName={linkedCaseName}
                isPending={isPending}
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-5">
          <div>
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={isPending}
                className="gap-1.5"
                data-ocid="fir_upload.back.button"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            ) : (
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate({ to: "/firs" })}
                className="gap-1.5 text-muted-foreground"
                data-ocid="fir_upload.cancel.cancel_button"
              >
                Cancel
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Step {currentStep} of {STEPS.length}
            </span>
            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="gap-1.5"
                data-ocid="fir_upload.next.button"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isPending}
                className="gap-1.5"
                data-ocid="fir_upload.submit.submit_button"
              >
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Uploading…
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Submit FIR
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
