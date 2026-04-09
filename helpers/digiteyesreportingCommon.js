const { expect } = require('@playwright/test');
const { safeClick, safeExpectVisible, safeFill, waitForAppToSettle } = require('./actions');
const { resolveFirst } = require('./fallback');
const { digiteyescampsManagecampsclusterHelpers } = require('./digiteyescampsManagecampscluster');

const reportingMenuButton = [
  { type: 'role', role: 'button', options: { name: /digiteyes reporting/i }, name: 'role:DigitEYES Reporting' },
  { type: 'text', value: 'DigitEYES Reporting', name: 'text:DigitEYES Reporting' },
  { type: 'css', value: 'button[data-bs-target="#dereport-collapse"]', name: 'css:#dereport-collapse toggle' }
];

function normalizeText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

async function openReportingMenu(page, data, selectors) {
  await digiteyescampsManagecampsclusterHelpers.selectLoginCountry(page, data.visionSpringCountry);
  await safeClick(page, reportingMenuButton, 'DigitEYES Reporting');
  await waitForAppToSettle(page, 500);

  if (selectors.moduleLink) {
    await safeExpectVisible(page, selectors.moduleLink, 'Reporting module link');
  }
}

async function openReportingModule(page, data, selectors, moduleName) {
  await openReportingMenu(page, data, selectors);
  await safeClick(page, selectors.moduleLink, moduleName, { noWaitAfter: true });
  await waitForAppToSettle(page, 1000);

  if (selectors.pageMarker) {
    await safeExpectVisible(page, selectors.pageMarker, `${moduleName} page marker`);
  }
}

async function openSearchFilter(page, selectors) {
  await safeClick(page, selectors.searchFilterButton, 'Search / Filter');
  await waitForAppToSettle(page, 500);
  await safeExpectVisible(page, selectors.searchForm, 'Search filter form');
}

async function closeSearchFilter(page, selectors) {
  const { locator } = await resolveFirst(page, selectors.searchForm, { mustBeVisible: false });
  try {
    await safeClick(page, selectors.closeButton, 'Close search filter');
  } catch (error) {
    const fallbackCloseButton = locator.locator('.modal-footer button').last();
    await fallbackCloseButton.evaluate((element) => element.click());
    console.log('[CLICK] Close search filter -> form footer fallback');
  }
  await waitForAppToSettle(page, 500);
  await expect(locator).toBeHidden({ timeout: 10000 });
}

async function fillFieldAndExpectValue(page, fieldSelectors, value, label) {
  await safeFill(page, fieldSelectors, value, label);
  const { locator } = await resolveFirst(page, fieldSelectors);
  await expect(locator).toHaveValue(String(value), { timeout: 10000 });
}

async function clearFieldAndExpectEmpty(page, fieldSelectors, label) {
  const { locator } = await resolveFirst(page, fieldSelectors);
  await locator.fill('');
  await expect(locator).toHaveValue('', { timeout: 10000 });
  console.log(`[CLEAR] ${label}`);
}

async function applySearch(page, selectors) {
  await safeClick(page, selectors.applyButton, 'Apply search filter');
  await waitForAppToSettle(page, 1000);
}

async function resetSearch(page, selectors) {
  await safeClick(page, selectors.resetButton, 'Reset search filter');
  await waitForAppToSettle(page, 500);
}

async function expectTextVisible(page, text, label = text) {
  await expect(page.getByText(text, { exact: false }).first()).toBeVisible({ timeout: 15000 });
  console.log(`[ASSERT_TEXT_VISIBLE] ${label}`);
}

async function expectDropdownOptions(page, fieldSelectors, expectedOptions, label) {
  const { locator } = await resolveFirst(page, fieldSelectors);
  const optionTexts = (await locator.locator('option').allTextContents()).map(normalizeText);

  for (const option of expectedOptions) {
    expect(optionTexts).toContain(normalizeText(option));
  }

  console.log(`[ASSERT_OPTIONS] ${label} -> ${expectedOptions.join(', ')}`);
}

async function expectTableHeaders(page, headerSelector, expectedHeaders, label) {
  const actualHeaders = (await page.locator(headerSelector).allTextContents()).map(normalizeText).filter(Boolean);

  for (const header of expectedHeaders) {
    expect(actualHeaders).toContain(normalizeText(header));
  }

  console.log(`[ASSERT_HEADERS] ${label} -> ${expectedHeaders.join(', ')}`);
}

async function clickExportAndAssert(page, selectors) {
  const downloadSignal = page.waitForEvent('download', { timeout: 10000 }).then((download) => ({ kind: 'download', download }));
  const responseSignal = page.waitForResponse(
    (response) => response.url().includes('report-export') && response.ok(),
    { timeout: 10000 }
  ).then((response) => ({ kind: 'response', response }));
  const popupSignal = page.waitForEvent('popup', { timeout: 10000 }).then((popup) => ({ kind: 'popup', popup }));

  await safeClick(page, selectors.exportButton, 'Export');

  let signal;
  try {
    signal = await Promise.any([downloadSignal, responseSignal, popupSignal]);
  } catch (error) {
    signal = null;
  }

  if (signal?.kind === 'download') {
    expect(await signal.download.suggestedFilename()).not.toBe('');
    return;
  }

  if (signal?.kind === 'popup') {
    await signal.popup.waitForLoadState('domcontentloaded');
    expect(signal.popup.url()).toMatch(/report-export|export/i);
    await signal.popup.close();
    return;
  }

  if (signal?.kind === 'response') {
    expect(signal.response.url()).toMatch(/report-export/i);
    return;
  }

  throw new Error('Export action did not trigger a download, popup, or export response.');
}

module.exports = {
  reportingMenuButton,
  openReportingMenu,
  openReportingModule,
  openSearchFilter,
  closeSearchFilter,
  fillFieldAndExpectValue,
  clearFieldAndExpectEmpty,
  applySearch,
  resetSearch,
  expectTextVisible,
  expectDropdownOptions,
  expectTableHeaders,
  clickExportAndAssert
};