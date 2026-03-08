import { create } from "zustand";
import { Assessment } from "./Assessment";
import { emptyAssessment } from "./EmptyAssessment";

interface AssessmentStore {
  assessment: Assessment;

  setChildAssessment1: (data: {
    parent: Assessment["parent"];
    child: Assessment["child"];
  }) => void;
  setMuacAssessment: (data: Assessment["muac"]) => void;
  setEdemaAssessment: (data: Assessment["edema"]) => void;
  setHairAssessment: (data: Assessment["hair"]) => void;
  setDangerSigns: (data: Assessment["dangerSigns"]) => void;

  resetAssessment: () => void;
}

export const useAssessmentStore = create<AssessmentStore>((set) => ({
  assessment: emptyAssessment,

  setChildAssessment1: (data) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        parent: data.parent,
        child: data.child,
      },
    })),

  setMuacAssessment: (data) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        muac: data,
      },
    })),

  setEdemaAssessment: (data) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        edema: data,
      },
    })),

  setHairAssessment: (data) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        hair: data,
      },
    })),

  setDangerSigns: (data) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        dangerSigns: data,
      },
    })),

  resetAssessment: () =>
    set({
      assessment: emptyAssessment,
    }),
}));
