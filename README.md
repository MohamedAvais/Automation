# File Processing Playwright POC

This package is a Playwright proof of concept created from the uploaded AIQ **FileProcessing** module, the related **Utility Functions**, and the provided **IM_DPL1.csv** file.

## What is included

- `tests/FileProcessing`  
  Fourteen Playwright tests matching the fourteen AIQ File Processing scripts.
- `helpers`  
  Reusable helpers for:
  - CSV data loading
  - fallback locator resolution
  - common web actions
  - login
  - imREmit navigation
  - File Processing page interactions
- `selectors`  
  Centralized selectors with fallback locator arrays
- `data/IM_DPL1.csv`  
  The uploaded DPL copied into the package
- `docs/migration-notes.md`  
  Conversion notes, assumptions, and historical pain points handled

## Install

```bash
npm install
npx playwright install
```

## Run all File Processing tests

```bash
npm test
```

## Run only the File Processing module

```bash
npm run test:file-processing
```

## Run in headed mode

```bash
npm run test:headed
```

## Debug one test

```bash
npx playwright test tests/FileProcessing/TS_01_To_verify_File_Processing_button.spec.js --headed --debug
```

## Important design choices

### 1. No global setup login
This project intentionally logs in **inside each test flow** through reusable helpers instead of relying on one shared session.  
That matches the project history where login/session reuse caused confusion, stuck login flows, and different tests may need different usernames.

### 2. Fallback locators are preserved
The helper `helpers/fallback.js` tries locators in sequence and records which locator worked.  
This is the Playwright equivalent of AIQ fallback accessors.

### 3. Business readability is preserved
The tests use `test.step()` so the English business flow stays visible in the test files and HTML report.

### 4. Slow application support
The helpers use:
- safe page waits
- visible checks
- retry-friendly actions
- controlled waits only where needed

## Data source behavior

By default, the first row in `data/IM_DPL1.csv` is loaded.  
You can override important values through environment variables defined in `.env.example`.

## Mapping notes

- AIQ "include" steps were converted into explicit reusable helper calls.
- AIQ fallback accessors were converted into arrays of candidate Playwright locators.
- AIQ waits were replaced with safer Playwright waits wherever possible, while preserving a few short stabilizing waits where the original flow relied on them.
- Tests remain readable and are not over-abstracted.

## Known assumptions

- The selectors reflect the uploaded AIQ locators and the UI shape implied by those locators.
- Some AIQ absolute XPaths are fragile by nature; they are retained only as late fallbacks.
- The DPL file supplied contains one data row, so the POC currently uses that row by default.
- Some values in AIQ were hard-coded and remain hard-coded unless they were clearly suitable as configurable overrides.

## Recommended next step

Use this package against the real environment, note any selector drift, and then scale the same pattern to the remaining modules.

## Team Conversion Framework

This repository now includes a reusable conversion framework for other team members.

Framework documentation:

- [docs/conversion-framework.md](docs/conversion-framework.md)
- [docs/team-project-setup-guide.md](docs/team-project-setup-guide.md)

Starter scaffold command:

```bash
npm run scaffold:module -- <ModuleName>
```

Example:

```bash
npm run scaffold:module -- PaymentTracking
```

This creates a module test folder with starter `_shared.js` and smoke spec files so the team can follow the same structure used for File Processing and Customer Module Management.
