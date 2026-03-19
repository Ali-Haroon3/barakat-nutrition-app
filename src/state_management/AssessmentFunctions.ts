import { create } from "zustand";
import { Assessment } from "./Assessment";
import { emptyAssessment } from "./EmptyAssessment";

interface AssessmentStore {
  assessment: Assessment;

  setChildAssessment1: (data: {
    parent: Assessment["parent"];
    child: Assessment["child"];
  }) => void;
  setMuacPhotoUri: (photoUri: string | null) => void;
  setMuacMeasurement: (measurement: number | null) => void;
  setEdemaVideoUri: (videoUri: string | null) => void;
  setEdemaDentRemain: (dentRemain: Assessment["edema"]["dentRemain"]) => void;
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

  setMuacPhotoUri: (photoUri) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        muac: {
          ...state.assessment.muac,
          photoUri,
        },
      },
    })),

  setMuacMeasurement: (measurement) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        muac: {
          ...state.assessment.muac,
          measurement,
        },
      },
    })),

  setEdemaVideoUri: (videoUri) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        edema: {
          ...state.assessment.edema,
          videoUri,
        },
      },
    })),

  setEdemaDentRemain: (dentRemain) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        edema: {
          ...state.assessment.edema,
          dentRemain,
        },
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
