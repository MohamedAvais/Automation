const {
  openSettingsModule,
  clickPagination,
  expectPaginationSummary,
  setPageSize,
  openSearchFilter,
  fillSearchField,
  selectDropdownValue,
  clickApplySearch,
  openAddForm,
  fillHospitalForm,
  openFirstRowEdit,
  closeForm,
  setCheckbox,
  clickSyncAndAssertToast,
  clickSave,
  expectHeaderCountAtLeast,
  clickFirstSortableHeader
} = require('./digiteyessettingsCommon');
const { expect } = require('@playwright/test');
const { safeExpectVisible, safeClickIfFound } = require('./actions');
const { digiteyessettingsHospitalsSelectors } = require('../selectors/digiteyessettingsHospitals.selectors');

function uniqueSuffix() {
  return Date.now().toString().slice(-6);
}

async function openModule(page, data) {
  await openSettingsModule(page, data, digiteyessettingsHospitalsSelectors, 'Hospitals');
}

async function verifyHospitalsLink(page, data) {
  await openModule(page, data);
}

async function verifyNextAndLastPagination(page, data) {
  await openModule(page, data);
  await clickPagination(page, digiteyessettingsHospitalsSelectors, 'next');
  await expectPaginationSummary(page, digiteyessettingsHospitalsSelectors);
  await clickPagination(page, digiteyessettingsHospitalsSelectors, 'last');
  await expectPaginationSummary(page, digiteyessettingsHospitalsSelectors);
}

async function verifyPreviousAndFirstPagination(page, data) {
  await openModule(page, data);
  await clickPagination(page, digiteyessettingsHospitalsSelectors, 'next');

  const previousClicked = await safeClickIfFound(
    page,
    digiteyessettingsHospitalsSelectors.pagination.previous,
    'Pagination previous'
  );

  if (!previousClicked.clicked) {
    await clickPagination(page, digiteyessettingsHospitalsSelectors, 'previous');
  }

  await expectPaginationSummary(page, digiteyessettingsHospitalsSelectors);

  const firstClicked = await safeClickIfFound(
    page,
    digiteyessettingsHospitalsSelectors.pagination.first,
    'Pagination first'
  );

  if (!firstClicked.clicked) {
    await safeClickIfFound(page, digiteyessettingsHospitalsSelectors.pagination.previous, 'Pagination previous fallback');
  }

  await expectPaginationSummary(page, digiteyessettingsHospitalsSelectors);
}

async function verifyPageSizePagination(page, data) {
  await openModule(page, data);
  await setPageSize(page, digiteyessettingsHospitalsSelectors, 5);
  await expectPaginationSummary(page, digiteyessettingsHospitalsSelectors);
  await setPageSize(page, digiteyessettingsHospitalsSelectors, 10);
  await expectPaginationSummary(page, digiteyessettingsHospitalsSelectors);
  await setPageSize(page, digiteyessettingsHospitalsSelectors, 25);
  await expectPaginationSummary(page, digiteyessettingsHospitalsSelectors);
}

async function verifyTableHeaders(page, data) {
  await openModule(page, data);
  await expectHeaderCountAtLeast(page, digiteyessettingsHospitalsSelectors, 7);
}

async function verifyIsActiveYesOption(page, data) {
  await openModule(page, data);
  await openSearchFilter(page, digiteyessettingsHospitalsSelectors);
  await selectDropdownValue(page, digiteyessettingsHospitalsSelectors.searchIsActiveField, 'Yes', 'Is Active');
}

async function verifyApplySearch(page, data) {
  await openModule(page, data);
  await openSearchFilter(page, digiteyessettingsHospitalsSelectors);
  await clickApplySearch(page, digiteyessettingsHospitalsSelectors);
  await safeExpectVisible(page, digiteyessettingsHospitalsSelectors.pageMarker, 'Hospitals listing after apply');
}

async function verifyAddHospitalForm(page, data) {
  await openModule(page, data);
  await openAddForm(page, digiteyessettingsHospitalsSelectors);

  const suffix = uniqueSuffix();
  await fillHospitalForm(page, digiteyessettingsHospitalsSelectors, {
    name: `Auto Hospital ${suffix}`,
    address: `Address ${suffix}`,
    city: 'Ajmer',
    country: 'India',
    state: 'Rajasthan',
    sfid: `SF${suffix}`
  });

  await closeForm(page, digiteyessettingsHospitalsSelectors);
}

async function verifyEditHospital(page, data) {
  await openModule(page, data);
  await openFirstRowEdit(page, digiteyessettingsHospitalsSelectors);
  await fillSearchField(page, digiteyessettingsHospitalsSelectors.stateField, 'UpdatedState', 'Edit State');
  await closeForm(page, digiteyessettingsHospitalsSelectors);
}

async function verifyEditCloseButton(page, data) {
  await openModule(page, data);
  await openFirstRowEdit(page, digiteyessettingsHospitalsSelectors);

  const visibleCloseButtons = page.locator('button:visible', { hasText: /close/i });
  await expect(visibleCloseButtons.first()).toBeVisible({ timeout: 10000 });

  await closeForm(page, digiteyessettingsHospitalsSelectors);
}

async function verifyColumnSorting(page, data) {
  await openModule(page, data);
  await clickFirstSortableHeader(page, digiteyessettingsHospitalsSelectors);
  await clickFirstSortableHeader(page, digiteyessettingsHospitalsSelectors);
  await safeExpectVisible(page, digiteyessettingsHospitalsSelectors.pageMarker, 'Hospitals table after sorting');
}

async function verifyInactivateHospital(page, data) {
  await openModule(page, data);
  await openFirstRowEdit(page, digiteyessettingsHospitalsSelectors);
  await setCheckbox(page, digiteyessettingsHospitalsSelectors.isActiveCheckbox, false, 'Is Active');
  await setCheckbox(page, digiteyessettingsHospitalsSelectors.isActiveCheckbox, true, 'Is Active revert');
  await closeForm(page, digiteyessettingsHospitalsSelectors);
}

async function verifySyncFromSalesforce(page, data) {
  await openModule(page, data);
  await clickSyncAndAssertToast(page, digiteyessettingsHospitalsSelectors);
}

module.exports = {
  digiteyessettingsHospitalsHelpers: {
    openModule,
    verifyHospitalsLink,
    verifyNextAndLastPagination,
    verifyPreviousAndFirstPagination,
    verifyPageSizePagination,
    verifyTableHeaders,
    verifyIsActiveYesOption,
    verifyApplySearch,
    verifyAddHospitalForm,
    verifyEditHospital,
    verifyEditCloseButton,
    verifyColumnSorting,
    verifyInactivateHospital,
    verifySyncFromSalesforce,
    selectors: digiteyessettingsHospitalsSelectors
  }
};
