import { Assessment } from "../state_management/Assessment";

type RawChildAssessment1Input = {
  parentName: string;
  phone: string;
  streetAddress: string;
  city: string;
  province: string;
  country: string;
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

function parseRequiredWholeNumber(
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

  if (!Number.isInteger(parsed)) {
    errors.push(`${fieldLabel} must be a whole number.`);
    return null;
  }

  if (parsed < 0) {
    errors.push(`${fieldLabel} must be 0 or greater.`);
    return null;
  }

  return parsed;
}

function parseOptionalPositiveNumber(
  raw: string,
  fieldLabel: string,
  errors: string[],
): number | null {
  const value = raw.trim();

  if (value.length === 0) {
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
  const streetAddress = input.streetAddress.trim();
  const city = input.city.trim();
  const province = input.province.trim();
  const country = input.country.trim();
  const childName = input.childName.trim();

  if (!parentName) errors.push("Parent name is required.");
  if (!phone) errors.push("Phone is required.");
  if (!childName) errors.push("Child name is required.");

  const hasAnyAddressField =
    streetAddress.length > 0 ||
    city.length > 0 ||
    province.length > 0 ||
    country.length > 0;

  if (hasAnyAddressField) {
    if (!streetAddress) errors.push("Street address is required.");
    if (!city) errors.push("City is required.");
    if (!province) errors.push("Province is required.");
    if (!country) errors.push("Country is required.");
  }

  const age = parseRequiredWholeNumber(input.age, "Age", errors);
  const weight = parseOptionalPositiveNumber(input.weight, "Weight", errors);
  const height = parseOptionalPositiveNumber(input.height, "Height", errors);

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
        address: {
          streetAddress,
          city,
          province,
          country,
        },
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
