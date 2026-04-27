import List "mo:core/List";
import Common "../types/common";
import CaseTypes "../types/cases";
import FirTypes "../types/fir";

module {
  public func create(
    cases : List.List<CaseTypes.Case>,
    nextId : Nat,
    input : CaseTypes.CreateCaseInput,
    caller : Common.UserId,
    createdDate : Common.Timestamp,
  ) : CaseTypes.Case {
    let c : CaseTypes.Case = {
      id = nextId;
      var caseNumber = input.caseNumber;
      var title = input.title;
      var firIds = [];
      var status = #open;
      createdDate = createdDate;
      createdBy = caller;
    };
    cases.add(c);
    c;
  };

  public func getById(
    cases : List.List<CaseTypes.Case>,
    id : Common.CaseId,
  ) : ?CaseTypes.Case {
    cases.find(func(c) { c.id == id });
  };

  public func listAll(
    cases : List.List<CaseTypes.Case>,
  ) : [CaseTypes.CaseView] {
    cases.map<CaseTypes.Case, CaseTypes.CaseView>(toView).toArray();
  };

  public func update(
    cases : List.List<CaseTypes.Case>,
    input : CaseTypes.UpdateCaseInput,
  ) : Bool {
    switch (cases.find(func(c) { c.id == input.id })) {
      case (?c) {
        switch (input.caseNumber) {
          case (?cn) { c.caseNumber := cn };
          case null {};
        };
        switch (input.title) {
          case (?t) { c.title := t };
          case null {};
        };
        switch (input.status) {
          case (?s) { c.status := s };
          case null {};
        };
        true;
      };
      case null { false };
    };
  };

  public func linkFir(
    cases : List.List<CaseTypes.Case>,
    firs : List.List<FirTypes.FirRecord>,
    input : CaseTypes.LinkFirInput,
  ) : Bool {
    switch (cases.find(func(c) { c.id == input.caseId })) {
      case (?c) {
        switch (firs.find(func(fir) { fir.id == input.firId })) {
          case null { false };
          case (?_fir) {
            let alreadyLinked = c.firIds.find(func(fid) { fid == input.firId });
            switch (alreadyLinked) {
              case (?_) { true };
              case null {
                c.firIds := c.firIds.concat([input.firId]);
                true;
              };
            };
          };
        };
      };
      case null { false };
    };
  };

  public func toView(c : CaseTypes.Case) : CaseTypes.CaseView {
    {
      id = c.id;
      caseNumber = c.caseNumber;
      title = c.title;
      firIds = c.firIds;
      status = c.status;
      createdDate = c.createdDate;
      createdBy = c.createdBy;
    };
  };
};
