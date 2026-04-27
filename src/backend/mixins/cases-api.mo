import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import CaseTypes "../types/cases";
import FirTypes "../types/fir";
import CasesLib "../lib/cases";

mixin (
  accessControlState : AccessControl.AccessControlState,
  cases : List.List<CaseTypes.Case>,
  firs : List.List<FirTypes.FirRecord>,
  nextCaseId : { var val : Nat },
) {
  public shared ({ caller }) func createCase(input : CaseTypes.CreateCaseInput) : async CaseTypes.CaseView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = nextCaseId.val;
    nextCaseId.val += 1;
    let c = CasesLib.create(cases, id, input, caller, Time.now());
    CasesLib.toView(c);
  };

  public query ({ caller }) func getCase(id : Common.CaseId) : async ?CaseTypes.CaseView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (CasesLib.getById(cases, id)) {
      case (?c) { ?CasesLib.toView(c) };
      case null { null };
    };
  };

  public query ({ caller }) func listCases() : async [CaseTypes.CaseView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CasesLib.listAll(cases);
  };

  public shared ({ caller }) func updateCase(input : CaseTypes.UpdateCaseInput) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CasesLib.update(cases, input);
  };

  public shared ({ caller }) func linkFirToCase(input : CaseTypes.LinkFirInput) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CasesLib.linkFir(cases, firs, input);
  };
};
