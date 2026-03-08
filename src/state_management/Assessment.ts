export type YesNo = "yes" | "no";
export type YesNoUnsure = "yes" | "no" | "unsure";

export interface ParentInformation {
  name: string;
  phone: string;
  address: string;
  whatsappOptIn: boolean;
}

export interface ChildInformation {
  name: string;
  age: number | null;
  weight: number | null;
  height: number | null;
  gender: "male" | "female" | null;
}

export interface MuacAssessment {
  photoUri: string | null;
  measurement: number | null;
}

export interface EdemaAssessment {
  videoUri: string | null;
  dentRemain: YesNoUnsure | null;
}

export interface HairAssessment {
  photoUri: string | null;
  hairIssue: YesNoUnsure | null;
}

export interface DangerSigns {
  eatingLess: YesNo | null;
  unusuallySleepy: YesNo | null;
  dehydrated: YesNo | null;
  fever: YesNo | null;
  breathingDifficulty: YesNo | null;
  skinInfection: YesNo | null;
  diarrheaVomiting: YesNo | null;
}

export interface Assessment {
  parent: ParentInformation;
  child: ChildInformation;
  muac: MuacAssessment;
  edema: EdemaAssessment;
  hair: HairAssessment;
  dangerSigns: DangerSigns;
}
