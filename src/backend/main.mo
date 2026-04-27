import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import FirTypes "types/fir";
import SummaryTypes "types/summary";
import CaseTypes "types/cases";
import FirApi "mixins/fir-api";
import SummaryApi "mixins/summary-api";
import CasesApi "mixins/cases-api";

actor {
  // Authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage
  include MixinObjectStorage();

  // HTTP outcalls transform (required by IC)
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // FIR state
  let firs = List.empty<FirTypes.FirRecord>();
  var nextFirId : Nat = 0;
  let nextFirIdRef = { var val = nextFirId };

  // Summary state
  let summaries = List.empty<SummaryTypes.Summary>();
  var nextSummaryId : Nat = 0;
  let nextSummaryIdRef = { var val = nextSummaryId };

  // Cases state
  let cases = List.empty<CaseTypes.Case>();
  var nextCaseId : Nat = 0;
  let nextCaseIdRef = { var val = nextCaseId };

  // Include domain mixins
  include FirApi(accessControlState, firs, nextFirIdRef, transform);
  include SummaryApi(accessControlState, summaries, nextSummaryIdRef);
  include CasesApi(accessControlState, cases, firs, nextCaseIdRef);
};
