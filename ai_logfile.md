# Project Overview

- React Native / Expo app for a child malnutrition assessment workflow.
- Main flow:
  1. Home
  2. Parent/child information
  3. MUAC instruction -> camera -> review
  4. Edema instruction -> camera -> review
  5. Hair/skin instruction -> camera -> review
  6. 7 danger-sign yes/no screens
  7. Final diagnosis / referral screen
- State is stored in Zustand until `Finish Assessment`, which resets the store and returns to `/home`.
- Tech stack:
  - Expo Router
  - React Native
  - Zustand
  - `expo-camera`
  - `expo-video`

# Architecture / Structure

- Routes: `src/app`
- Reusable UI components: `src/components`
- Zustand model/store:
  - `src/state_management/Assessment.ts`
  - `src/state_management/AssessmentFunctions.ts`
  - `src/state_management/EmptyAssessment.ts`
- Validation helpers: `src/validation`
- Diagnosis/business logic: `src/utils/getDiagnosis.ts`
- WHO height-for-age reference data:
  - `src/data/lhfaBoys.ts`
  - `src/data/lhfaGirls.ts`
  - `src/data/lhfaTypes.ts`

- Diagnosis flow architecture:
  - `diagnosis_results.tsx` computes diagnosis from current assessment inputs using `getDiagnosisResult(...)`
  - It then persists `assessment.diagnosis` via `setDiagnosis(...)`
  - UI currently renders from the freshly computed `diagnosis` object, not from a second read of `assessment.diagnosis`

# Key Decisions

- Explicit route files under `src/app` are preferred over heavy config-driven routing.
- Validation/parsing stays in UI-layer validation helpers instead of inside Zustand actions.
- Reusable screen components are preferred over large config maps.
- Parent address is structured:
  - `parent.address.streetAddress`
  - `parent.address.city`
  - `parent.address.province`
  - `parent.address.country`
- Address validation is group-based:
  - all blank is allowed
  - if any field is filled, all become required

- Current diagnosis model is split into:
  - `healthStatus`: `"Healthy" | "MAM" | "SAM"`
  - `heightForAgeZScore`: `number | null`
  - `stuntingStatus`: `"not-stunted" | "moderately-stunted" | "severely-stunted" | "unknown"`
- `assessment.diagnosis` is persisted in Zustand; this is the current computed diagnosis section.

- Health status logic:
  - edema `yes` => `SAM`
  - else MUAC `< 11.5` => `SAM`
  - else MUAC `< 12.5` => `MAM`
  - else => `Healthy`

- Stunting logic:
  - HAZ is computed from WHO LMS tables (`L`, `M`, `S`) using local sex-specific data arrays for months `0..60`
  - Whole-month age is required for intake validation
  - If age/height/gender is missing, age is non-integer, or age is outside `0..60`, HAZ returns `null`
  - Stunting thresholds:
    - `HAZ >= -2` => `not-stunted`
    - `-3 <= HAZ < -2` => `moderately-stunted`
    - `HAZ < -3` => `severely-stunted`

- Display-only diagnosis override:
  - if `healthStatus === "Healthy"` and `stuntingStatus` is moderate or severe
  - diagnosis box shows `Stunted` instead of `Healthy`
  - diagnosis box background uses light blue (`colors.status.info`)
  - persisted `healthStatus` remains `Healthy`

- Diagnosis UI decisions:
  - Colored diagnosis box shows:
    - child name
    - display label (`Healthy` / `MAM` / `SAM` / display-only `Stunted`)
    - human-readable stunting line
  - Lower `Recommended CHW Action` section:
    - always shows one row for `healthStatus`
    - conditionally appends a second row for moderate/severe stunting
    - stunting action copy is placeholder for now

# Current State

- Implemented routes include:
  - `src/app/home.tsx`
  - `src/app/parent_child_information.tsx`
  - `src/app/muac_*`
  - `src/app/edema_*`
  - `src/app/hair_skin_*`
  - `src/app/danger_signs/*`
  - `src/app/diagnosis_results.tsx`

- Parent/child form:
  - popup validation only (`Alert.alert`)
  - `age` must be a whole number `>= 0`
  - `gender` is required
  - `height` and `weight` remain optional

- Current Zustand data model includes:
  - `parent`
  - `child`
  - `muac`
  - `edema`
  - `hair`
  - `dangerSigns`
  - `diagnosis`

- Diagnosis screen currently:
  - computes diagnosis from MUAC + edema + age + height + gender
  - persists `assessment.diagnosis`
  - shows only one health-status CHW action row plus an optional second stunting row
  - uses placeholder text for moderate/severe stunting recommendations

- Old diagnosis helper was replaced:
  - previous `src/utils/getMuacClassification.ts` is no longer the active logic
  - active helper is `src/utils/getDiagnosis.ts`

# Known Issues / Open Problems

- Hair/skin review and danger signs are still not part of diagnosis logic.
- Stunting-specific recommended action text is still placeholder copy.
- `diagnosis_results.tsx` still contains debug `console.log(...)` calls.
- `getStuntingStatusLabel()` contains a typo for the unknown state:
  - `"Unknonw stunted status"`
- `recommendedChwActions` is still exported from `getDiagnosis.ts` but is no longer used by the diagnosis screen.
- `src/app/PlaceHolderScreen.tsx` still exists.
- No test files are currently present in `src`, even though several diagnosis/validation changes would benefit from tests.
- The app still stores captured media locally as URIs in Zustand; end-of-flow upload/persistence is not implemented.

# Next Steps

- Replace placeholder stunting recommendation text with final copy.
- Remove diagnosis-screen debug logs.
- Fix the unknown stunting label typo.
- Clean up unused exports / temporary routes if no longer needed.
- Implement end-of-flow upload/persistence strategy (likely Supabase).

# Constraints / Preferences

- User preferences:
  - pragmatic minimal changes
  - reusable screen components over heavy abstraction/config maps
  - popup validation (`Alert.alert`) instead of inline validation styling
  - explicit route files are acceptable
- Prefer existing theme colors from `src/theme/theme.ts`.
- Avoid unnecessary dependencies and redundant styling.
- Keep project logs concise and optimized for fast AI handoff.
