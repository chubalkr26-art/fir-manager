import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CaseStatus, FirStatus, createActor } from "./backend";
import type {
  CaseId,
  CreateCaseInput,
  CreateFirInput,
  FirFilter,
  FirId,
  LinkFirInput,
  SaveSummaryInput,
  SummaryId,
  UpdateCaseInput,
  UpdateFirStatusInput,
  UpdateSummaryInput,
} from "./types";

export { FirStatus, CaseStatus };

// ─── Actor Hook ─────────────────────────────────────────────────────────────

function useBackendActor() {
  return useActor(createActor);
}

// ─── FIR Hooks ──────────────────────────────────────────────────────────────

export function useListFirs() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["firs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listFirs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useListFirsFiltered(filter: FirFilter) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["firs", "filtered", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listFirsFiltered(filter);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFirById(id: FirId | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["firs", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getFir(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useCreateFir() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateFirInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createFir(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["firs"] });
    },
  });
}

export function useUpdateFirStatus() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateFirStatusInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateFirStatus(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["firs"] });
    },
  });
}

export function useDeleteFir() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: FirId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteFir(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["firs"] });
    },
  });
}

// ─── Summary Hooks ──────────────────────────────────────────────────────────

export function useListSummaries() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["summaries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSummaries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSummaryByFirId(firId: FirId | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["summaries", "fir", firId?.toString()],
    queryFn: async () => {
      if (!actor || firId === null) return null;
      return actor.getSummaryByFirId(firId);
    },
    enabled: !!actor && !isFetching && firId !== null,
  });
}

export function useSummaryById(id: SummaryId | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["summaries", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getSummary(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useSaveSummary() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: SaveSummaryInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveSummary(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["summaries"] });
    },
  });
}

export function useUpdateSummary() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateSummaryInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateSummary(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["summaries"] });
    },
  });
}

export function useTriggerSummarization() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (firId: FirId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.triggerFirSummarization(firId);
    },
    onSuccess: (_data, firId) => {
      queryClient.invalidateQueries({ queryKey: ["firs"] });
      queryClient.invalidateQueries({
        queryKey: ["summaries", "fir", firId.toString()],
      });
    },
  });
}

// ─── Cases Hooks ─────────────────────────────────────────────────────────────

export function useListCases() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["cases"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCases();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCaseById(id: CaseId | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["cases", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getCase(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useCreateCase() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateCaseInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createCase(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    },
  });
}

export function useUpdateCase() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateCaseInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateCase(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    },
  });
}

export function useLinkFirToCase() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: LinkFirInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.linkFirToCase(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      queryClient.invalidateQueries({ queryKey: ["firs"] });
    },
  });
}

// ─── Auth / Role Hooks ───────────────────────────────────────────────────────

export function useCallerRole() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["callerRole"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
