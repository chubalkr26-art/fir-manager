import type { Principal } from "@icp-sdk/core/principal";
import type { CaseStatus, FirStatus, UserRole } from "./backend";

export type { CaseStatus, FirStatus, UserRole };
export type UserId = Principal;
export type Timestamp = bigint;
export type FirId = bigint;
export type CaseId = bigint;
export type SummaryId = bigint;
export type OffenseType = string;

export interface FirRecordView {
  id: FirId;
  firNumber: string;
  caseTitle: string;
  complainantName: string;
  dateOfIncident: Timestamp;
  offenseType: OffenseType;
  uploadDate: Timestamp;
  uploadedBy: UserId;
  documentFilename: string;
  status: FirStatus;
  caseId?: CaseId;
  document: import("./backend").ExternalBlob;
}

export interface CreateFirInput {
  firNumber: string;
  caseTitle: string;
  complainantName: string;
  dateOfIncident: Timestamp;
  offenseType: OffenseType;
  document: import("./backend").ExternalBlob;
  documentFilename: string;
  caseId?: CaseId;
}

export interface SummaryView {
  id: SummaryId;
  firId: FirId;
  summaryText: string;
  generatedDate: Timestamp;
  lastEditedBy?: UserId;
  lastEditedDate?: Timestamp;
}

export interface SaveSummaryInput {
  firId: FirId;
  summaryText: string;
}

export interface UpdateSummaryInput {
  id: SummaryId;
  summaryText: string;
}

export interface CaseView {
  id: CaseId;
  caseNumber: string;
  title: string;
  firIds: FirId[];
  status: CaseStatus;
  createdDate: Timestamp;
  createdBy: UserId;
}

export interface CreateCaseInput {
  caseNumber: string;
  title: string;
}

export interface LinkFirInput {
  caseId: CaseId;
  firId: FirId;
}

export interface UpdateFirStatusInput {
  id: FirId;
  status: FirStatus;
}

export interface UpdateCaseInput {
  id: CaseId;
  status?: CaseStatus;
  title?: string;
  caseNumber?: string;
}

export interface FirFilter {
  status?: FirStatus;
  toDate?: Timestamp;
  fromDate?: Timestamp;
  caseId?: CaseId;
}
