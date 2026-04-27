import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import FirTypes "../types/fir";

module {
  public func create(
    firs : List.List<FirTypes.FirRecord>,
    nextId : Nat,
    input : FirTypes.CreateFirInput,
    caller : Common.UserId,
  ) : FirTypes.FirRecord {
    let fir : FirTypes.FirRecord = {
      id = nextId;
      firNumber = input.firNumber;
      caseTitle = input.caseTitle;
      complainantName = input.complainantName;
      dateOfIncident = input.dateOfIncident;
      offenseType = input.offenseType;
      uploadDate = Time.now();
      uploadedBy = caller;
      document = input.document;
      documentFilename = input.documentFilename;
      var status = #pending_summary;
      caseId = input.caseId;
    };
    firs.add(fir);
    fir;
  };

  public func getById(
    firs : List.List<FirTypes.FirRecord>,
    id : Common.FirId,
  ) : ?FirTypes.FirRecord {
    firs.find(func(fir) { fir.id == id });
  };

  public func listAll(
    firs : List.List<FirTypes.FirRecord>,
  ) : [FirTypes.FirRecordView] {
    firs.map<FirTypes.FirRecord, FirTypes.FirRecordView>(toView).toArray();
  };

  public func listFiltered(
    firs : List.List<FirTypes.FirRecord>,
    filter : FirTypes.FirFilter,
  ) : [FirTypes.FirRecordView] {
    firs.filter(func(fir) {
      let fromOk = switch (filter.fromDate) {
        case (?from) { fir.dateOfIncident >= from };
        case null { true };
      };
      let toOk = switch (filter.toDate) {
        case (?to) { fir.dateOfIncident <= to };
        case null { true };
      };
      let statusOk = switch (filter.status) {
        case (?s) { fir.status == s };
        case null { true };
      };
      let caseOk = switch (filter.caseId) {
        case (?cid) {
          switch (fir.caseId) {
            case (?fc) { fc == cid };
            case null { false };
          };
        };
        case null { true };
      };
      fromOk and toOk and statusOk and caseOk;
    }).map<FirTypes.FirRecord, FirTypes.FirRecordView>(toView).toArray();
  };

  public func updateStatus(
    firs : List.List<FirTypes.FirRecord>,
    input : FirTypes.UpdateFirStatusInput,
  ) : Bool {
    switch (firs.find(func(fir) { fir.id == input.id })) {
      case (?fir) {
        fir.status := input.status;
        true;
      };
      case null { false };
    };
  };

  public func delete(
    firs : List.List<FirTypes.FirRecord>,
    id : Common.FirId,
  ) : Bool {
    let before = firs.size();
    let filtered = firs.filter(func(fir) { fir.id != id });
    firs.clear();
    firs.append(filtered);
    firs.size() < before;
  };

  public func toView(fir : FirTypes.FirRecord) : FirTypes.FirRecordView {
    {
      id = fir.id;
      firNumber = fir.firNumber;
      caseTitle = fir.caseTitle;
      complainantName = fir.complainantName;
      dateOfIncident = fir.dateOfIncident;
      offenseType = fir.offenseType;
      uploadDate = fir.uploadDate;
      uploadedBy = fir.uploadedBy;
      document = fir.document;
      documentFilename = fir.documentFilename;
      status = fir.status;
      caseId = fir.caseId;
    };
  };
};
