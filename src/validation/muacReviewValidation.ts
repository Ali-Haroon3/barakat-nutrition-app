type ValidationSuccess = {
  ok: true;
  value: number;
};

type ValidationError = {
  ok: false;
  message: string;
  errors: string[];
};

export type MuacMeasurementValidationResult = ValidationSuccess | ValidationError;

export function validateAndBuildMuacMeasurement(
  rawMeasurement: string,
): MuacMeasurementValidationResult {
  const errors: string[] = [];
  const value = rawMeasurement.trim();
  let parsedValue: number | null = null;

  if (value.length === 0) {
    errors.push("MUAC measurement is required.");
  } else {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      errors.push("MUAC measurement must be a valid number.");
    } else if (parsed <= 0) {
      errors.push("MUAC measurement must be greater than 0.");
    } else {
      parsedValue = parsed;
    }
  }

  if (errors.length > 0) {
    return {
      ok: false,
      message: errors.join("\n"),
      errors,
    };
  }

  if (parsedValue === null) {
    return {
      ok: false,
      message: "MUAC measurement is invalid.",
      errors: ["MUAC measurement is invalid."],
    };
  }

  return {
    ok: true,
    value: parsedValue,
  };
}
