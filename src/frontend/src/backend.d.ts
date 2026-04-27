import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface CreateCaseInput {
    title: string;
    caseNumber: string;
}
export interface FirRecordView {
    id: FirId;
    status: FirStatus;
    offenseType: OffenseType;
    complainantName: string;
    document: ExternalBlob;
    caseId?: CaseId;
    firNumber: string;
    uploadDate: Timestamp;
    documentFilename: string;
    caseTitle: string;
    uploadedBy: UserId;
    dateOfIncident: Timestamp;
}
export interface UpdateFirStatusInput {
    id: FirId;
    status: FirStatus;
}
export interface SaveSummaryInput {
    firId: FirId;
    summaryText: string;
}
export interface LinkFirInput {
    firId: FirId;
    caseId: CaseId;
}
export type FirId = bigint;
export interface UpdateCaseInput {
    id: CaseId;
    status?: CaseStatus;
    title?: string;
    caseNumber?: string;
}
export type OffenseType = string;
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type SummaryId = bigint;
export interface UpdateSummaryInput {
    id: SummaryId;
    summaryText: string;
}
export interface CreateFirInput {
    offenseType: OffenseType;
    complainantName: string;
    document: ExternalBlob;
    caseId?: CaseId;
    firNumber: string;
    documentFilename: string;
    caseTitle: string;
    dateOfIncident: Timestamp;
}
export interface CaseView {
    id: CaseId;
    status: CaseStatus;
    title: string;
    caseNumber: string;
    createdBy: UserId;
    createdDate: Timestamp;
    firIds: Array<FirId>;
}
export interface SummaryView {
    id: SummaryId;
    firId: FirId;
    lastEditedDate?: Timestamp;
    summaryText: string;
    lastEditedBy?: UserId;
    generatedDate: Timestamp;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type UserId = Principal;
export type CaseId = bigint;
export interface FirFilter {
    status?: FirStatus;
    toDate?: Timestamp;
    fromDate?: Timestamp;
    caseId?: CaseId;
}
export enum CaseStatus {
    closed = "closed",
    open = "open",
    under_investigation = "under_investigation",
    chargeshed = "chargeshed"
}
export enum FirStatus {
    summarizing = "summarizing",
    summary_ready = "summary_ready",
    summary_failed = "summary_failed",
    pending_summary = "pending_summary"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCase(input: CreateCaseInput): Promise<CaseView>;
    createFir(input: CreateFirInput): Promise<FirRecordView>;
    deleteFir(id: FirId): Promise<boolean>;
    getCallerUserRole(): Promise<UserRole>;
    getCase(id: CaseId): Promise<CaseView | null>;
    getFir(id: FirId): Promise<FirRecordView | null>;
    getSummary(id: SummaryId): Promise<SummaryView | null>;
    getSummaryByFirId(firId: FirId): Promise<SummaryView | null>;
    isCallerAdmin(): Promise<boolean>;
    linkFirToCase(input: LinkFirInput): Promise<boolean>;
    listCases(): Promise<Array<CaseView>>;
    listFirs(): Promise<Array<FirRecordView>>;
    listFirsFiltered(filter: FirFilter): Promise<Array<FirRecordView>>;
    listSummaries(): Promise<Array<SummaryView>>;
    saveSummary(input: SaveSummaryInput): Promise<SummaryView>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    triggerFirSummarization(firId: FirId): Promise<string>;
    updateCase(input: UpdateCaseInput): Promise<boolean>;
    updateFirStatus(input: UpdateFirStatusInput): Promise<boolean>;
    updateSummary(input: UpdateSummaryInput): Promise<boolean>;
}
