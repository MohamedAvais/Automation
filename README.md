# Vision Spring Playwright Automation

This repository is the current AIQ-to-Playwright conversion project for the Vision Spring application. It is no longer a File Processing proof of concept. The active work in this repo is converting Vision Spring AIQ modules into Playwright tests with shared helpers, centralized selectors, fallback locator handling, Allure reporting, and reusable conversion guidance for the remaining intake.

## Project Goal

Convert the Vision Spring AIQ automation assets under `source-aiq/` into maintainable Playwright coverage with:

- one Playwright module folder per AIQ module
- thin spec files with business-readable `test.step()` flow
- shared helper and selector layers
- centralized auth, fallback locator, and wait behavior
- reusable branded Allure reporting
- a pull-friendly handoff for the remaining module conversions

## Current Repository Structure

```text
tests/
  DigitEYESCamps_*/
  DigitEYESDataLoader_*/
  DigitEYESReporting_*/
  DigitEYESSettings_*/

helpers/
  actions.js
  auth.js
  dataLoader.js
  fallback.js
  digiteyes* module helpers

selectors/
  common selectors
  module selector files

source-aiq/
  TestScripts/
  UtilityFunctions/

data/
  JS_DPL_Camp_Cluster.csv

docs/
  conversion-framework.md
  team-project-setup-guide.md
  vision-spring-conversion-handoff.md

scripts/
  bootstrap-aiq-structure.js
  scaffold-module.js
  customize-allure-report.js
  normalize-allure-suites.js
  run-combined-client-report.js

Result/
  generated reports and shareable artifacts
```

## Current Module Inventory

The repo currently contains module folders for these Vision Spring families:

### DigitEYES Camps

- `DigitEYESCamps_DataForSalesforce`
- `DigitEYESCamps_ManageCampsCluster`
- `DigitEYESCamps_Participants`

### DigitEYES Data Loader

- `DigitEYESDataLoader_DataForSalesForce`
- `DigitEYESDataLoader_ParticipantConsents`
- `DigitEYESDataLoader_SFDataLoaderChangeLog`
- `DigitEYESDataLoader_SFDataLoaderErrorCases`
- `DigitEYESDataLoader_SFDataLoaderQueue`

### DigitEYES Reporting

- `DigitEYESReporting_CampTrends`
- `DigitEYESReporting_InternetAvailability`
- `DigitEYESReporting_PopinAvailability`
- `DigitEYESReporting_SummarySheetData`
- `DigitEYESReporting_WorkReportIPTeams`
- `DigitEYESReporting_WorkReportVSTeams`

### DigitEYES Settings

- `DigitEYESSettings_CountrySettings`
- `DigitEYESSettings_DESalesforceFieldMapping`
- `DigitEYESSettings_Hospitals`
- `DigitEYESSettings_ImplementationPartners`

## Current Status

This repo is actively mid-conversion, not a fresh scaffold anymore.

- Shared auth, fallback locator handling, Allure hierarchy, and reporting customization are already in place.
- The newly added source AIQ files under `source-aiq/TestScripts` are the current source-of-truth delta for remaining conversion work.
- Latest completed Reporting delta batches:
  - `DigitEYESReporting_CampTrends` expanded from 6 specs to 15 specs.
  - `DigitEYESReporting_WorkReportVSTeams` expanded from 9 specs to 18 specs.
- Latest validated module results from the current delta wave:
  - `tests/DigitEYESReporting_CampTrends` passed `15/15`.
  - `tests/DigitEYESReporting_WorkReportVSTeams` passed `18/18`.
- Latest clean family baseline before the current remaining Reporting intake wave:
  - `DigitEYESCamps`: `49/49` passed with `--workers=3`
  - `DigitEYESDataLoader`: `42/42` passed with `--workers=3`
  - `DigitEYESReporting`: `34/34` passed with `--workers=3`
  - `DigitEYESSettings`: `20/20` passed with `--workers=3`

For the most current module-by-module handoff and remaining conversion guidance, use [docs/vision-spring-conversion-handoff.md](docs/vision-spring-conversion-handoff.md).

## Install

```bash
npm install
npx playwright install
```

## Preferred Test Commands

Use direct Playwright commands for the active Vision Spring modules.

### Run everything

```bash
npm test
```

### Run one family

```bash
npx playwright test tests/DigitEYESReporting_* --workers=3
npx playwright test tests/DigitEYESSettings_* --workers=3
npx playwright test tests/DigitEYESDataLoader_* --workers=3
npx playwright test tests/DigitEYESCamps_* --workers=3
```

### Run one module

```bash
npx playwright test tests/DigitEYESReporting_CampTrends
npx playwright test tests/DigitEYESReporting_WorkReportVSTeams
```

### Run headed or debug

```bash
npm run test:headed
npm run test:debug
```

### Run one spec

```bash
npx playwright test tests/DigitEYESReporting_CampTrends/TC_01_To_verify_that_DigitEYES_Reporting_displays_the_Camps_Trend_button.spec.js --headed --debug
```

## Data and Authentication Behavior

- Runtime data is loaded through `helpers/dataLoader.js`.
- The current DPL file is `data/JS_DPL_Camp_Cluster.csv`.
- That file is not currently parseable as a normal CSV, so the framework falls back to the configured default runtime credentials and URL.
- Auth is centralized in `helpers/auth.js` and supports the working Microsoft-backed Vision Spring flow:
  - Microsoft username
  - Microsoft password
  - Stay signed in
  - app Office 365 Sign In
  - country picker
  - target module navigation
- Module `_shared.js` files intentionally use a no-op `closeSession(page)` to avoid shared-account logout collisions across parallel workers.

## Core Framework Rules Used In This Repo

### Shared fixes belong in helpers and selectors

If multiple specs show the same failure pattern, fix:

- `helpers/`
- `selectors/`

Do not patch each spec separately unless the behavior is truly one-off.

### Fallback locator strategy is required

`helpers/fallback.js` is the Playwright equivalent of AIQ fallback accessors.

Use candidate selector arrays in selector files instead of relying on a single brittle locator.

### Prefer visible form-scoped selectors when pages duplicate hidden DOM

Some Vision Spring pages leave hidden duplicate modal fields after Apply, Reset, or Close. When that happens:

- prefer visible form-scoped selectors first
- then keep the generic selector as a fallback

### Keep specs thin

Each spec should usually do only this:

1. load runtime data
2. login
3. call one helper-driven business verification
4. call the shared no-op logout

## Reporting Workflow

- Local and client-shareable reports are generated from `allure-results`.
- Shareable artifacts and report folders belong under `Result/`.
- Branded single-file Allure customization is handled by `scripts/customize-allure-report.js`.
- If a report needs correct suite grouping from existing result files, use `scripts/normalize-allure-suites.js` before generating the final artifact.
- Before generating a client-facing report, make sure `allure-results` contains:
  - `environment.properties`
  - `executor.json`
  - `categories.json`

## Conversion Commands

### Bootstrap scaffold from source AIQ structure

```bash
npm run scaffold:source-aiq
```

### Scaffold one module manually

```bash
npm run scaffold:module -- <ModuleName>
```

## Documentation

- [docs/conversion-framework.md](docs/conversion-framework.md)
  General conversion framework used by the team.
- [docs/team-project-setup-guide.md](docs/team-project-setup-guide.md)
  How to reuse this framework in another project.
- [docs/vision-spring-conversion-handoff.md](docs/vision-spring-conversion-handoff.md)
  Current Vision Spring-specific status, latest fixes, completed delta batches, and recommended next modules.

## Notes For Future Work

- Continue remaining delta conversion module by module against `source-aiq/TestScripts`.
- Prefer starting with the existing helper and selector surfaces already built for each family.
- For Reporting specifically, continue through shared `digiteyesreportingCommon.js` behavior rather than introducing module-specific one-off modal logic where the same fix can be centralized.
- Generated `Result/` artifacts should not be treated as source files for ongoing development work.
