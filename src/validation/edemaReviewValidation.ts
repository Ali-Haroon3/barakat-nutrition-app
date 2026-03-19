import { YesNoUnsure } from "../state_management/Assessment";

type ValidationSuccess = {
  ok: true;
  value: YesNoUnsure;
};

type ValidationError = {
  ok: false;
  message: string;
  errors: string[];
};

export type EdemaReviewValidationResult = ValidationSuccess | ValidationError;

export function validateAndBuildEdemaDentRemain(
  value: YesNoUnsure | null,
): EdemaReviewValidationResult {
  if (value === null) {
    const message = "Please select Yes, No, or Unsure.";

    return {
      ok: false,
      message,
      errors: [message],
    };
  }

  return {
    ok: true,
    value,
  };
}
