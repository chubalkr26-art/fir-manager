import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Common "../types/common";
import FirTypes "../types/fir";
import FirLib "../lib/fir";

mixin (
  accessControlState : AccessControl.AccessControlState,
  firs : List.List<FirTypes.FirRecord>,
  nextFirId : { var val : Nat },
  transform : OutCall.Transform,
) {
  public shared ({ caller }) func createFir(input : FirTypes.CreateFirInput) : async FirTypes.FirRecordView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only police personnel can create FIR records");
    };
    let id = nextFirId.val;
    nextFirId.val += 1;
    let fir = FirLib.create(firs, id, input, caller);
    FirLib.toView(fir);
  };

  public query ({ caller }) func getFir(id : Common.FirId) : async ?FirTypes.FirRecordView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (FirLib.getById(firs, id)) {
      case (?fir) { ?FirLib.toView(fir) };
      case null { null };
    };
  };

  public query ({ caller }) func listFirs() : async [FirTypes.FirRecordView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    FirLib.listAll(firs);
  };

  public query ({ caller }) func listFirsFiltered(filter : FirTypes.FirFilter) : async [FirTypes.FirRecordView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    FirLib.listFiltered(firs, filter);
  };

  public shared ({ caller }) func updateFirStatus(input : FirTypes.UpdateFirStatusInput) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    FirLib.updateStatus(firs, input);
  };

  public shared ({ caller }) func deleteFir(id : Common.FirId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    FirLib.delete(firs, id);
  };

  public shared ({ caller }) func triggerFirSummarization(firId : Common.FirId) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (FirLib.getById(firs, firId)) {
      case null { Runtime.trap("FIR not found") };
      case (?fir) {
        // Mark as summarizing
        ignore FirLib.updateStatus(firs, { id = firId; status = #summarizing });
        // Build prompt text from FIR metadata
        let prompt = "Summarize this FIR (First Information Report) for police records. " #
          "FIR Number: " # fir.firNumber # ". " #
          "Case Title: " # fir.caseTitle # ". " #
          "Complainant: " # fir.complainantName # ". " #
          "Offense Type: " # fir.offenseType # ". " #
          "Please provide a concise professional summary suitable for police documentation.";
        let requestBody = "{\"model\":\"gpt-3.5-turbo\",\"messages\":[{\"role\":\"user\",\"content\":\"" # prompt # "\"}],\"max_tokens\":500}";
        let result = try {
          await OutCall.httpPostRequest(
            "https://api.openai.com/v1/chat/completions",
            [{ name = "Content-Type"; value = "application/json" }, { name = "Authorization"; value = "Bearer REPLACE_WITH_API_KEY" }],
            requestBody,
            transform,
          );
        } catch (_e) {
          ignore FirLib.updateStatus(firs, { id = firId; status = #summary_failed });
          Runtime.trap("Summarization failed");
        };
        ignore FirLib.updateStatus(firs, { id = firId; status = #summary_ready });
        result;
      };
    };
  };
};
