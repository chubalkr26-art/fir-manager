import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import SummaryTypes "../types/summary";
import SummaryLib "../lib/summary";

mixin (
  accessControlState : AccessControl.AccessControlState,
  summaries : List.List<SummaryTypes.Summary>,
  nextSummaryId : { var val : Nat },
) {
  public shared ({ caller }) func saveSummary(input : SummaryTypes.SaveSummaryInput) : async SummaryTypes.SummaryView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = nextSummaryId.val;
    nextSummaryId.val += 1;
    let summary = SummaryLib.create(summaries, id, input, Time.now());
    SummaryLib.toView(summary);
  };

  public query ({ caller }) func getSummary(id : Common.SummaryId) : async ?SummaryTypes.SummaryView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (SummaryLib.getById(summaries, id)) {
      case (?s) { ?SummaryLib.toView(s) };
      case null { null };
    };
  };

  public query ({ caller }) func getSummaryByFirId(firId : Common.FirId) : async ?SummaryTypes.SummaryView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (SummaryLib.getByFirId(summaries, firId)) {
      case (?s) { ?SummaryLib.toView(s) };
      case null { null };
    };
  };

  public query ({ caller }) func listSummaries() : async [SummaryTypes.SummaryView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    SummaryLib.listAll(summaries);
  };

  public shared ({ caller }) func updateSummary(input : SummaryTypes.UpdateSummaryInput) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    SummaryLib.update(summaries, input, caller, Time.now());
  };
};
