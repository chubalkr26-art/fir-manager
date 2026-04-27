import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type FirStatus = {
    #pending_summary;
    #summarizing;
    #summary_ready;
    #summary_failed;
  };

  public type OffenseType = Text;

  public type FirRecord = {
    id : Common.FirId;
    firNumber : Text;
    caseTitle : Text;
    complainantName : Text;
    dateOfIncident : Common.Timestamp;
    offenseType : OffenseType;
    uploadDate : Common.Timestamp;
    uploadedBy : Common.UserId;
    document : Storage.ExternalBlob;
    documentFilename : Text;
    var status : FirStatus;
    caseId : ?Common.CaseId;
  };

  // Shared (immutable) view of a FIR record for API responses
  public type FirRecordView = {
    id : Common.FirId;
    firNumber : Text;
    caseTitle : Text;
    complainantName : Text;
    dateOfIncident : Common.Timestamp;
    offenseType : OffenseType;
    uploadDate : Common.Timestamp;
    uploadedBy : Common.UserId;
    document : Storage.ExternalBlob;
    documentFilename : Text;
    status : FirStatus;
    caseId : ?Common.CaseId;
  };

  public type CreateFirInput = {
    firNumber : Text;
    caseTitle : Text;
    complainantName : Text;
    dateOfIncident : Common.Timestamp;
    offenseType : OffenseType;
    document : Storage.ExternalBlob;
    documentFilename : Text;
    caseId : ?Common.CaseId;
  };

  public type UpdateFirStatusInput = {
    id : Common.FirId;
    status : FirStatus;
  };

  public type FirFilter = {
    fromDate : ?Common.Timestamp;
    toDate : ?Common.Timestamp;
    status : ?FirStatus;
    caseId : ?Common.CaseId;
  };
};
