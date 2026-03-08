import { Assessment } from "../state_management/Assessment";

type RawChildAssessment1Input = {
  parentName: string;
  phone: string;
  address: string;
  whatsappOptIn: boolean;
  childName: string;
  age: string;
  weight: string;
  height: string;
  gender: "male" | "female" | null;
};

type ChildAssessment1Payload = {
  parent: Assessment["parent"];
  child: Assessment["child"];
};

type ValidationSuccess = {
  ok: true;
  value: ChildAssessment1Payload;
};

type ValidationError = {
  ok: false;
  message: string;
  errors: string[];
};

export type ChildAssessment1ValidationResult =
  | ValidationSuccess
  | ValidationError;

function parsePositiveNumber(
  raw: string,
  fieldLabel: string,
  errors: string[],
): number | null {
  const value = raw.trim();

  if (value.length === 0) {
    errors.push(`${fieldLabel} is required.`);
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    errors.push(`${fieldLabel} must be a valid number.`);
    return null;
  }

  if (parsed <= 0) {
    errors.push(`${fieldLabel} must be greater than 0.`);
    return null;
  }

  return parsed;
}

export function validateAndBuildChildAssessment1(
  input: RawChildAssessment1Input,
): ChildAssessment1ValidationResult {
  const errors: string[] = [];

  const parentName = input.parentName.trim();
  const phone = input.phone.trim();
  const address = input.address.trim();
  const childName = input.childName.trim();

  if (!parentName) errors.push("Parent name is required.");
  if (!phone) errors.push("Phone is required.");
  if (!address) errors.push("Address is required.");
  if (!childName) errors.push("Child name is required.");

  const age = parsePositiveNumber(input.age, "Age", errors);
  const weight = parsePositiveNumber(input.weight, "Weight", errors);
  const height = parsePositiveNumber(input.height, "Height", errors);

  if (input.gender === null) {
    errors.push("Gender is required.");
  }

  if (errors.length > 0) {
    return {
      ok: false,
      message: errors.join("\n"),
      errors,
    };
  }

  return {
    ok: true,
    value: {
      parent: {
        name: parentName,
        phone,
        address,
        whatsappOptIn: input.whatsappOptIn,
      },
      child: {
        name: childName,
        age,
        weight,
        height,
        gender: input.gender,
      },
    },
  };
}
