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
  setHairPhotoUri: (photoUri: string | null) => void;
  setHairIssue: (hairIssue: Assessment["hair"]["hairIssue"]) => void;
  setHairAssessment: (data: Assessment["hair"]) => void;
  setDangerSign: <K extends keyof Assessment["dangerSigns"]>(
    key: K,
    value: Assessment["dangerSigns"][K],
  ) => void;
  setDangerSigns: (data: Assessment["dangerSigns"]) => void;
  setDiagnosis: (data: Assessment["diagnosis"]) => void;

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

  setHairPhotoUri: (photoUri) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        hair: {
          ...state.assessment.hair,
          photoUri,
        },
      },
    })),

  setHairIssue: (hairIssue) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        hair: {
          ...state.assessment.hair,
          hairIssue,
        },
      },
    })),

  setHairAssessment: (data) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        hair: data,
      },
    })),

  setDangerSign: (key, value) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        dangerSigns: {
          ...state.assessment.dangerSigns,
          [key]: value,
        },
      },
    })),

  setDangerSigns: (data) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        dangerSigns: data,
      },
    })),

  setDiagnosis: (data) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        diagnosis: data,
      },
    })),

  resetAssessment: () =>
    set({
      assessment: emptyAssessment,
    }),
}));
