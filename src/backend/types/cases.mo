import Common "common";

module {
  public type CaseStatus = {
    #open;
    #under_investigation;
    #closed;
    #chargeshed;
  };

  public type Case = {
    id : Common.CaseId;
    var caseNumber : Text;
    var title : Text;
    var firIds : [Common.FirId];
    var status : CaseStatus;
    createdDate : Common.Timestamp;
    createdBy : Common.UserId;
  };

  // Shared (immutable) view of a Case for API responses
  public type CaseView = {
    id : Common.CaseId;
    caseNumber : Text;
    title : Text;
    firIds : [Common.FirId];
    status : CaseStatus;
    createdDate : Common.Timestamp;
    createdBy : Common.UserId;
  };

  public type CreateCaseInput = {
    caseNumber : Text;
    title : Text;
  };

  public type UpdateCaseInput = {
    id : Common.CaseId;
    caseNumber : ?Text;
    title : ?Text;
    status : ?CaseStatus;
  };

  public type LinkFirInput = {
    caseId : Common.CaseId;
    firId : Common.FirId;
  };
};
