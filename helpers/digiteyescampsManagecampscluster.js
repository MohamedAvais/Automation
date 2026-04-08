const { expect } = require('@playwright/test');
const { safeClick, safeClickIfFound, safeExpectVisible, safeFill, waitForAppToSettle } = require('./actions');
const { resolveFirst } = require('./fallback');
const { commonSelectors } = require('../selectors/common.selectors');
const { digiteyescampsManagecampsclusterSelectors } = require('../selectors/digiteyescampsManagecampscluster.selectors');

async function selectLoginCountry(page, country = 'India') {
  if (country !== 'India') {
    throw new Error(`Login country helper currently supports India only. Received: ${country}`);
  }

  const countryVisible = await resolveFirst(page, commonSelectors.loginCountryIndia, {
    timeoutPerCandidate: 1500
  }).catch(() => null);

  if (!countryVisible) {
    const appSignIn = await safeClickIfFound(page, commonSelectors.appSignIn, 'App Sign In before country selection', {
      timeoutPerCandidate: 2000,
      actionTimeout: 5000
    });

    if (appSignIn.clicked) {
      await waitForAppToSettle(page, 2000);
    }
  }

  await safeClick(page, commonSelectors.loginCountryIndia, 'Login Country India', { timeoutPerCandidate: 5000 });
  await waitForAppToSettle(page, 1500);
}

async function verifyManageCampClusterLanding(page) {
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.campClusterHeading, 'Camp Cluster heading');
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.newCampClusterButton, 'New Camp Cluster button');
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.searchFilterButton, 'Search / Filter button');
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.exportButton, 'Export button');
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.refreshButton, 'Refresh button');
}

async function openModule(page, country = 'India') {
  await selectLoginCountry(page, country);
  await verifyManageCampClusterLanding(page);
}

async function openNewCampClusterForm(page) {
  await safeClick(page, digiteyescampsManagecampsclusterSelectors.newCampClusterButton, 'New Camp Cluster');
  await waitForAppToSettle(page, 1000);
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.countryField, 'Country field');
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.payerField, 'Payer field');
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.projectCodeField, 'Project code field');
}

async function selectDropdownValue(page, candidates, value, label) {
  const { locator, matchedBy } = await resolveFirst(page, candidates, { timeoutPerCandidate: 5000 });
  await locator.selectOption({ label: value }).catch(async () => {
    await locator.selectOption({ value }).catch(async () => {
      await locator.selectOption({ index: 1 });
    });
  });
  console.log(`[SELECT] ${label} -> ${matchedBy} -> ${value}`);
}

async function expectSelectedOption(page, candidates, expectedLabel, label) {
  const options = await getSelectOptions(page, candidates);
  const selectedOption = options.find((option) => option.selected);
  expect(selectedOption?.label || '', `${label} should have a selected value`).toContain(expectedLabel);
}

async function fillCreateCampClusterForm(page, data, options = {}) {
  const country = options.country || data.visionSpringCountry;
  const payer = options.payer || data.visionSpringPayer;
  const projectCode = options.projectCode || data.visionSpringProjectCode;
  const campName = options.campName || data.visionSpringCampName;

  if (country) {
    await selectDropdownValue(page, digiteyescampsManagecampsclusterSelectors.countryField, country, 'Country');
  }

  if (payer) {
    await selectDropdownValue(page, digiteyescampsManagecampsclusterSelectors.payerField, payer, 'Payer');
  }

  if (projectCode) {
    await selectDropdownValue(page, digiteyescampsManagecampsclusterSelectors.projectCodeField, projectCode, 'Project Code');
  }

  if (options.includeCampName !== false) {
    await safeFill(page, digiteyescampsManagecampsclusterSelectors.campNameField, campName, 'Camp Name');
  }
}

async function clickSave(page) {
  await safeClick(page, digiteyescampsManagecampsclusterSelectors.saveButton, 'Save');
  await waitForAppToSettle(page, 500);
}

async function fillFieldValue(page, candidates, value, label) {
  await safeFill(page, candidates, value, label);
}

async function expectFieldValue(page, candidates, expectedValue, label) {
  const { locator } = await resolveFirst(page, candidates, { timeoutPerCandidate: 5000 });
  await expect(locator, `${label} should retain the entered value`).toHaveValue(expectedValue);
}

async function expectFieldHasAttribute(page, candidates, attributeName, label) {
  const { locator } = await resolveFirst(page, candidates, { timeoutPerCandidate: 5000 });
  const hasAttribute = await locator.evaluate((element, attribute) => element.hasAttribute(attribute), attributeName);
  expect(hasAttribute, `${label} should expose ${attributeName}`).toBe(true);
}

async function fillAddressInformation(page, values = {}) {
  const addressValues = {
    country: values.country || 'India',
    location: values.location || '15130 Whittier Blvd',
    address: values.address || 'United States',
    city: values.city || 'Whittier',
    state: values.state || 'Andaman and Nicobar Islands'
  };

  await selectDropdownValue(page, digiteyescampsManagecampsclusterSelectors.countryField, addressValues.country, 'Country');
  await waitForAppToSettle(page, 1000);
  await fillFieldValue(page, digiteyescampsManagecampsclusterSelectors.locationField, addressValues.location, 'Location Name');
  await fillFieldValue(page, digiteyescampsManagecampsclusterSelectors.addressField, addressValues.address, 'Address');
  await fillFieldValue(page, digiteyescampsManagecampsclusterSelectors.cityField, addressValues.city, 'City');
  await selectDropdownValue(page, digiteyescampsManagecampsclusterSelectors.stateField, addressValues.state, 'State');
}

async function goToListingPage(page, pageNumber) {
  const pageLink = page.locator(`#pg_${pageNumber}`).first();
  await expect(pageLink, `Pagination link ${pageNumber} should be visible`).toBeVisible({ timeout: 5000 });
  await pageLink.click();
  await waitForAppToSettle(page, 1000);
}

async function getSelectOptions(page, candidates) {
  const { locator } = await resolveFirst(page, candidates, { timeoutPerCandidate: 5000 });
  return locator.evaluate((element) => Array.from(element.options).map((option) => ({
    label: option.label.trim(),
    value: option.value,
    selected: option.selected
  })));
}

async function expectDropdownOptions(page, candidates, expectedLabels, label) {
  const options = await getSelectOptions(page, candidates);
  const optionLabels = options.map((option) => option.label);

  for (const expectedLabel of expectedLabels) {
    expect(optionLabels, `${label} should include ${expectedLabel}`).toContain(expectedLabel);
  }
}

async function getListingHeaders(page) {
  const { locator } = await resolveFirst(page, digiteyescampsManagecampsclusterSelectors.listingTable, {
    timeoutPerCandidate: 5000
  });

  return locator.locator('thead tr').first().locator('th').evaluateAll((nodes) =>
    nodes
      .map((node) => node.textContent.replace(/\s+/g, ' ').trim())
      .filter(Boolean)
  );
}

async function expectListingHeaders(page, expectedHeaders) {
  const headers = await getListingHeaders(page);
  for (const expectedHeader of expectedHeaders) {
    expect(headers, `Listing headers should include ${expectedHeader}`).toContain(expectedHeader);
  }
}

async function expectListingTableHasRows(page) {
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.listingTable, 'Listing table');
  const rowCount = await getListingRowCount(page);
  expect(rowCount).toBeGreaterThan(0);
}

async function getListingRowCount(page) {
  const { locator } = await resolveFirst(page, digiteyescampsManagecampsclusterSelectors.listingTable, {
    timeoutPerCandidate: 5000
  });
  return locator.locator('tbody tr').count();
}

async function expectUniqueReferenceNumbers(page) {
  const { locator } = await resolveFirst(page, digiteyescampsManagecampsclusterSelectors.listingTable, {
    timeoutPerCandidate: 5000
  });
  const values = await locator.locator('tbody tr td:nth-child(2)').evaluateAll((nodes) =>
    nodes.map((node) => node.textContent.replace(/\s+/g, ' ').trim()).filter(Boolean)
  );
  const uniqueValues = new Set(values);

  expect(values.length).toBeGreaterThan(0);
  expect(uniqueValues.size).toBe(values.length);
}

async function setListingPageSize(page, valueLabel) {
  await selectDropdownValue(page, digiteyescampsManagecampsclusterSelectors.paginationPageSize, valueLabel, 'Page Size');
  await waitForAppToSettle(page, 1000);
}

async function expectPaginationOptions(page, expectedOptions) {
  await expectDropdownOptions(page, digiteyescampsManagecampsclusterSelectors.paginationPageSize, expectedOptions, 'Pagination page size');
}

async function refreshListing(page) {
  await safeClick(page, digiteyescampsManagecampsclusterSelectors.refreshButton, 'Refresh');
  await waitForAppToSettle(page, 1000);
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.listingTable, 'Listing table');
}

async function openSearchFilter(page) {
  await safeClick(page, digiteyescampsManagecampsclusterSelectors.searchFilterButton, 'Search / Filter');
  await waitForAppToSettle(page, 1000);
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.searchFilterForm, 'Search filter form');
}

async function verifySearchFilterFields(page) {
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.searchCountryLabel, 'Country label');
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.searchThemeLabel, 'Theme label');
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.searchPayerLabel, 'Payer label');
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.searchProjectCodeLabel, 'Project Code label');
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.searchDateFromLabel, 'Date From label');
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.searchDateToLabel, 'Date To label');
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.searchAssistantManagerLabel, 'Asst. Manager label');
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.searchProgramManagerLabel, 'Program Manager label');
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.searchOutreachInchargeLabel, 'Outreach Incharge label');
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.searchStatusLabel, 'Status label');
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.searchStatusNewOpen, 'New / Open status option');
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.searchStatusRunning, 'Running status option');
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.searchStatusClosed, 'Closed status option');
}

async function expectSearchCountryDefault(page, expectedCountry) {
  const options = await getSelectOptions(page, digiteyescampsManagecampsclusterSelectors.searchCountryField);
  const selectedOption = options.find((option) => option.selected);
  expect(selectedOption?.label || '').toContain(expectedCountry);
}

async function expectSearchThemeOptions(page, expectedLabels) {
  await expectDropdownOptions(page, digiteyescampsManagecampsclusterSelectors.searchThemeField, expectedLabels, 'Search Theme');
}

async function selectSearchPayer(page, value) {
  await selectDropdownValue(page, digiteyescampsManagecampsclusterSelectors.searchPayerField, value, 'Search Payer');
  await waitForAppToSettle(page, 1000);
}

async function expectSelectedSearchPayer(page, expectedValue) {
  const options = await getSelectOptions(page, digiteyescampsManagecampsclusterSelectors.searchPayerField);
  const selectedOption = options.find((option) => option.selected);
  expect(selectedOption?.label || '').toContain(expectedValue);
}

async function expectSearchProjectCodeOption(page, expectedValue) {
  const options = await getSelectOptions(page, digiteyescampsManagecampsclusterSelectors.searchProjectCodeField);
  const optionLabels = options.map((option) => option.label);
  const optionValues = options.map((option) => option.value);
  expect(optionLabels.join(' ')).toContain(expectedValue);
  expect(optionValues.join(' ')).toContain(expectedValue);
}

async function fillSearchAssistantManager(page, value) {
  await safeFill(page, digiteyescampsManagecampsclusterSelectors.searchAssistantManagerField, value, 'Search Asst. Manager');
}

async function expectSearchAssistantManagerValue(page, expectedValue) {
  const { locator } = await resolveFirst(page, digiteyescampsManagecampsclusterSelectors.searchAssistantManagerField, {
    timeoutPerCandidate: 5000
  });
  await expect(locator).toHaveValue(expectedValue);
}

async function resetSearchFilter(page) {
  await safeClick(page, digiteyescampsManagecampsclusterSelectors.searchResetButton, 'Reset');
  await waitForAppToSettle(page, 500);
}

async function fillSearchDateFrom(page, value) {
  await safeFill(page, digiteyescampsManagecampsclusterSelectors.searchDateFromField, value, 'Search Date From');
}

async function fillSearchDateTo(page, value) {
  await safeFill(page, digiteyescampsManagecampsclusterSelectors.searchDateToField, value, 'Search Date To');
}

async function expectSearchDateFromValue(page, expectedValue) {
  const { locator } = await resolveFirst(page, digiteyescampsManagecampsclusterSelectors.searchDateFromField, {
    timeoutPerCandidate: 5000
  });
  await expect(locator).toHaveValue(expectedValue);
}

async function expectSearchDateToValue(page, expectedValue) {
  const { locator } = await resolveFirst(page, digiteyescampsManagecampsclusterSelectors.searchDateToField, {
    timeoutPerCandidate: 5000
  });
  await expect(locator).toHaveValue(expectedValue);
}

async function applySearchFilter(page) {
  await safeClick(page, digiteyescampsManagecampsclusterSelectors.searchApplyButton, 'Apply');
  await waitForAppToSettle(page, 1000);
  await safeExpectVisible(page, digiteyescampsManagecampsclusterSelectors.listingTable, 'Listing table');
}

async function expectFieldValidationFailure(page, candidates, label) {
  const { locator } = await resolveFirst(page, candidates, { timeoutPerCandidate: 5000 });
  const validationState = await locator.evaluate((element) => ({
    required: Boolean(element.required),
    valid: element.checkValidity(),
    validationMessage: element.validationMessage || ''
  }));

  expect(validationState.required, `${label} should be required`).toBe(true);
  expect(validationState.valid, `${label} should be invalid`).toBe(false);
  expect(validationState.validationMessage, `${label} should expose a validation message`).not.toBe('');
}

module.exports = {
  digiteyescampsManagecampsclusterHelpers: {
    selectLoginCountry,
    verifyManageCampClusterLanding,
    openModule,
    openNewCampClusterForm,
    selectDropdownValue,
    fillCreateCampClusterForm,
    clickSave,
    fillFieldValue,
    expectFieldValue,
    expectSelectedOption,
    expectFieldHasAttribute,
    fillAddressInformation,
    getSelectOptions,
    expectDropdownOptions,
    expectListingHeaders,
    expectListingTableHasRows,
    getListingRowCount,
    expectUniqueReferenceNumbers,
    setListingPageSize,
    expectPaginationOptions,
    goToListingPage,
    refreshListing,
    openSearchFilter,
    verifySearchFilterFields,
    expectSearchCountryDefault,
    expectSearchThemeOptions,
    selectSearchPayer,
    expectSelectedSearchPayer,
    expectSearchProjectCodeOption,
    fillSearchAssistantManager,
    expectSearchAssistantManagerValue,
    fillSearchDateFrom,
    fillSearchDateTo,
    expectSearchDateFromValue,
    expectSearchDateToValue,
    applySearchFilter,
    resetSearchFilter,
    expectFieldValidationFailure,
    selectors: digiteyescampsManagecampsclusterSelectors
  }
};
