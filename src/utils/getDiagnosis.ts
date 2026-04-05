import { lhfaBoys } from "../data/lhfaBoys";
import { lhfaGirls } from "../data/lhfaGirls";
import type {
  Assessment,
  DiagnosisAssessment,
  HealthStatus,
  StuntingStatus,
  YesNoUnsure,
} from "../state_management/Assessment";
import { colors } from "../theme/theme";

export type HealthStatusPresentation = {
  label: HealthStatus;
  accentColor: string;
  actionText: string;
};

export type RecommendedAction = {
  label: string;
  accentColor: string;
  actionText: string;
};

export type DiagnosisResult = DiagnosisAssessment & {
  displayLabel: HealthStatus | "Stunted";
  accentColor: string;
  actionText: string;
};

const healthStatusPresentations: Record<
  HealthStatus,
  HealthStatusPresentation
> = {
  Healthy: {
    label: "Healthy",
    accentColor: "#00c203",
    actionText: "Provide caregiver guidance on good nutrition and hygiene.",
  },
  MAM: {
    label: "MAM",
    accentColor: "#f77c12",
    actionText:
      "Enroll in Outpatient Treatment (OTP); provide or arrange RUSF/RUTF and set a follow-up visit with the doctor’s guidance.",
  },
  SAM: {
    label: "SAM",
    accentColor: "#ff3232",
    actionText:
      "Urgent referral for inpatient or stabilization-center care (IPD).",
  },
};

export const recommendedChwActions = Object.values(healthStatusPresentations);

export function getRecommendedChwAction(
  healthStatus: HealthStatus,
): HealthStatusPresentation {
  return healthStatusPresentations[healthStatus];
}

export function getStuntingRecommendedAction(
  stuntingStatus: StuntingStatus,
): RecommendedAction | null {
  switch (stuntingStatus) {
    case "moderately-stunted":
      return {
        label: "Moderately stunted",
        accentColor: "#6AC0CA",
        actionText: "Placeholder action for moderately stunted children.",
      };
    case "severely-stunted":
      return {
        label: "Severely stunted",
        accentColor: "#6AC0CA",
        actionText: "Placeholder action for severely stunted children.",
      };
    case "not-stunted":
    case "unknown":
      return null;
  }
}

export function getHealthStatus(
  muacMeasurement: number | null,
  edemaDentRemain: YesNoUnsure | null,
): HealthStatus {
  if (edemaDentRemain === "yes") {
    return "SAM";
  }

  if (muacMeasurement === null) {
    return "Healthy";
  }

  if (muacMeasurement < 11.5) {
    return "SAM";
  }

  if (muacMeasurement < 12.5) {
    return "MAM";
  }

  return "Healthy";
}

export function getHeightForAgeZScore(
  ageMonths: number | null,
  heightCm: number | null,
  gender: Assessment["child"]["gender"],
): number | null {
  if (ageMonths === null || heightCm === null || gender === null) {
    return null;
  }

  if (!Number.isInteger(ageMonths) || ageMonths < 0 || ageMonths > 60) {
    return null;
  }

  const referenceTable = gender === "male" ? lhfaBoys : lhfaGirls;
  const reference = referenceTable[ageMonths];

  if (reference === undefined || reference.month !== ageMonths) {
    return null;
  }

  if (reference.l === 0) {
    return Math.log(heightCm / reference.m) / reference.s;
  } else {
    return (
      ((heightCm / reference.m) ** reference.l - 1) /
      (reference.l * reference.s)
    );
  }
}

export function getStuntingStatus(
  heightForAgeZScore: number | null,
): StuntingStatus {
  if (heightForAgeZScore === null) {
    return "unknown";
  }
  if (heightForAgeZScore < -3) {
    return "severely-stunted";
  }
  if (heightForAgeZScore < -2) {
    return "moderately-stunted";
  }
  return "not-stunted";
}

export function getStuntingStatusLabel(stuntingStatus: StuntingStatus): string {
  switch (stuntingStatus) {
    case "not-stunted":
      return "Not stunted";
    case "moderately-stunted":
      return "Moderately stunted";
    case "severely-stunted":
      return "Severely stunted";
    case "unknown":
      return "Unknonw stunted status";
  }
}

export function getDiagnosisResult(
  muacMeasurement: number | null,
  edemaDentRemain: YesNoUnsure | null,
  childAgeMonths: number | null,
  childHeightCm: number | null,
  childGender: Assessment["child"]["gender"],
): DiagnosisResult {
  const healthStatus = getHealthStatus(muacMeasurement, edemaDentRemain);
  const heightForAgeZScore = getHeightForAgeZScore(
    childAgeMonths,
    childHeightCm,
    childGender,
  );
  const stuntingStatus = getStuntingStatus(heightForAgeZScore);
  const presentation = healthStatusPresentations[healthStatus];
  const isHealthyButStunted =
    healthStatus === "Healthy" &&
    (stuntingStatus === "moderately-stunted" ||
      stuntingStatus === "severely-stunted");
  const displayLabel = isHealthyButStunted ? "Stunted" : healthStatus;
  const accentColor = isHealthyButStunted
    ? colors.status.info
    : presentation.accentColor;

  return {
    healthStatus,
    heightForAgeZScore,
    stuntingStatus,
    displayLabel,
    accentColor,
    actionText: presentation.actionText,
  };
}
