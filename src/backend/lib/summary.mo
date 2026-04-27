import List "mo:core/List";
import Common "../types/common";
import SummaryTypes "../types/summary";

module {
  public func create(
    summaries : List.List<SummaryTypes.Summary>,
    nextId : Nat,
    input : SummaryTypes.SaveSummaryInput,
    generatedDate : Common.Timestamp,
  ) : SummaryTypes.Summary {
    let summary : SummaryTypes.Summary = {
      id = nextId;
      firId = input.firId;
      var summaryText = input.summaryText;
      generatedDate = generatedDate;
      var lastEditedBy = null;
      var lastEditedDate = null;
    };
    summaries.add(summary);
    summary;
  };

  public func getById(
    summaries : List.List<SummaryTypes.Summary>,
    id : Common.SummaryId,
  ) : ?SummaryTypes.Summary {
    summaries.find(func(s) { s.id == id });
  };

  public func getByFirId(
    summaries : List.List<SummaryTypes.Summary>,
    firId : Common.FirId,
  ) : ?SummaryTypes.Summary {
    summaries.find(func(s) { s.firId == firId });
  };

  public func listAll(
    summaries : List.List<SummaryTypes.Summary>,
  ) : [SummaryTypes.SummaryView] {
    summaries.map<SummaryTypes.Summary, SummaryTypes.SummaryView>(toView).toArray();
  };

  public func update(
    summaries : List.List<SummaryTypes.Summary>,
    input : SummaryTypes.UpdateSummaryInput,
    caller : Common.UserId,
    editedDate : Common.Timestamp,
  ) : Bool {
    switch (summaries.find(func(s) { s.id == input.id })) {
      case (?summary) {
        summary.summaryText := input.summaryText;
        summary.lastEditedBy := ?caller;
        summary.lastEditedDate := ?editedDate;
        true;
      };
      case null { false };
    };
  };

  public func toView(summary : SummaryTypes.Summary) : SummaryTypes.SummaryView {
    {
      id = summary.id;
      firId = summary.firId;
      summaryText = summary.summaryText;
      generatedDate = summary.generatedDate;
      lastEditedBy = summary.lastEditedBy;
      lastEditedDate = summary.lastEditedDate;
    };
  };
};
