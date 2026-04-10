# Vision Spring Conversion Handoff

This document captures the latest working conversion logic for this repository so the remaining AIQ intake can be converted after pulling the project without depending on chat memory.

## Current Position

- Source-of-truth intake delta is the newly added files under source-aiq/TestScripts.
- Module-by-module delta conversion is in progress.
- Latest completed delta batches:
  - DigitEYESReporting_CampTrends expanded from 6 specs to 15 specs.
  - DigitEYESReporting_WorkReportVSTeams expanded from 9 specs to 18 specs.
- Latest clean family validation before the new delta batches:
  - DigitEYESCamps: 49/49 passed with 3 workers.
  - DigitEYESDataLoader: 42/42 passed with 3 workers.
  - DigitEYESReporting: 34/34 passed with 3 workers.
  - DigitEYESSettings: 20/20 passed with 3 workers.

## Shared Logic To Reuse

### Auth and session handling

- Use helpers/auth.js through each module _shared.js. Do not duplicate login logic per module.
- The working login path is Microsoft username -> Microsoft password -> Stay signed in -> app Office 365 Sign In -> country picker -> module navigation.
- closeSession(page) is intentionally a no-op in module _shared.js files to avoid shared-account logout collisions across workers.

### Locator strategy

- Prefer candidate selector arrays plus helpers/fallback.js.
- resolveFirst now checks multiple matched elements instead of assuming the first match is the correct visible one.
- If a page leaves duplicate hidden fields in the DOM after modal interactions, prefer visible form-scoped selectors first.

### Reporting helper rules

- Keep shared Reporting behavior in helpers/digiteyesreportingCommon.js instead of patching individual specs.
- openSearchFilter must tolerate hidden or delayed modals and retry against a visible #frmSearch.
- applySearch should prefer the visible modal footer Apply button when generic candidates are intercepted.
- Header assertions should poll briefly until table headers are populated.

## Latest Reporting Module Lessons

### Camp Trends

- Shared implementation files:
  - helpers/digiteyesreportingCamptrends.js
  - selectors/digiteyesreportingCamptrends.selectors.js
- Current converted delta cases added in this batch:
  - TC_03, TC_05, TC_06, TC_07, TC_08, TC_10, TC_11, TC_14, TC_15
- Live-validated defaults used for conversion:
  - Country defaults to India.
  - Theme defaults to -- All Themes --.
  - Payer defaults to -- Select Payer --.
  - Date From and Date To default empty.
- Reliable behavior used for assertions:
  - Applying payer Ajmer Sharif changes the chart and preserves the selected payer when the filter is reopened.
  - Chart legend toggles can be verified by canvas image change instead of brittle text assumptions.
- Latest validation:
  - tests/DigitEYESReporting_CampTrends passed 15/15.

### Work Report VS Teams

- Shared implementation files:
  - helpers/digiteyesreportingWorkreportvsteams.js
  - selectors/digiteyesreportingWorkreportvsteams.selectors.js
- Current converted delta cases added in this batch:
  - TC_02, TC_07, TC_08, TC_09, TC_12, TC_15, TC_16, TC_17, TC_18
- Live-validated defaults used for conversion:
  - Country defaults to India.
  - Project Code, Assistant Manager, User Email, Outreach Incharge, Date From, and Date To default empty.
- Live-validated headers used for assertions:
  - Top headers: Reg. Date, Camp Ref., Location, Outreach Incharge, Asst. Manager, #Regs.
  - Registration section headers: Email ID, #Camps, #Participant.
- Important regression lesson:
  - After Apply, the page can leave hidden duplicate filter inputs in the DOM.
  - Fix this with visible form-scoped selectors in selectors/digiteyesreportingWorkreportvsteams.selectors.js.
  - For date-only AIQ cases, do not add a reopen-and-reassert step after Apply if the source script only verifies set-and-apply behavior.
- Latest validation:
  - tests/DigitEYESReporting_WorkReportVSTeams passed 18/18.

## Recommended Conversion Workflow For Remaining Modules

1. Compare the source AIQ folder to the converted tests folder and identify the exact missing script names first.
2. Read the existing module helper and selector files before adding specs.
3. Extend the shared module helper and selectors first; keep spec files thin.
4. Reuse the existing test pattern:
   - login step
   - one business-readable verification step
   - no-op logout step
5. If a failure pattern appears in more than one spec, fix helpers or selectors instead of spec-by-spec workarounds.
6. After adding a batch, run the module alone before widening to family runs.

## Practical Rules For Remaining Conversions

- Prefer real page defaults and live-validated behavior over guessed assertions.
- For AIQ scripts that only verify field functionality, it is enough to verify fill/select plus Apply or Reset behavior. Do not invent stronger assertions than the source requires.
- For tables with grouped headers, assert the expected header labels are present rather than depending on exact layout positions unless the AIQ case truly requires position.
- For search modals, always assume hidden duplicate nodes may remain in the DOM after Apply, Reset, or Close.

## Best Next Targets

- Continue Reporting next with DigitEYESReporting_WorkReportIPTeams, because it already shares the same reportingCommon helper surface.
- After that, Internet Availability and Popins Availability should be easier because the shared Reporting modal and header logic is already hardened.
