import { Assessment } from "./Assessment";

export const emptyAssessment: Assessment = {
  parent: {
    name: "",
    phone: "",
    address: "",
    whatsappOptIn: false,
  },

  child: {
    name: "",
    age: null,
    weight: null,
    height: null,
    gender: null,
  },

  muac: {
    photoUri: null,
    measurement: null,
  },

  edema: {
    videoUri: null,
    dentRemain: null,
  },

  hair: {
    photoUri: null,
    hairIssue: null,
  },

  dangerSigns: {
    eatingLess: null,
    unusuallySleepy: null,
    dehydrated: null,
    fever: null,
    breathingDifficulty: null,
    skinInfection: null,
    diarrheaVomiting: null,
  },
};
