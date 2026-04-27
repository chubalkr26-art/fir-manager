import Common "common";

module {
  public type Summary = {
    id : Common.SummaryId;
    firId : Common.FirId;
    var summaryText : Text;
    generatedDate : Common.Timestamp;
    var lastEditedBy : ?Common.UserId;
    var lastEditedDate : ?Common.Timestamp;
  };

  // Shared (immutable) view of a Summary for API responses
  public type SummaryView = {
    id : Common.SummaryId;
    firId : Common.FirId;
    summaryText : Text;
    generatedDate : Common.Timestamp;
    lastEditedBy : ?Common.UserId;
    lastEditedDate : ?Common.Timestamp;
  };

  public type SaveSummaryInput = {
    firId : Common.FirId;
    summaryText : Text;
  };

  public type UpdateSummaryInput = {
    id : Common.SummaryId;
    summaryText : Text;
  };
};
