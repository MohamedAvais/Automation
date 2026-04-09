const {
  openReportingMenu,
  openReportingModule,
  openSearchFilter,
  expectDropdownOptions,
  fillFieldAndExpectValue
} = require('./digiteyesreportingCommon');
const { digiteyesreportingCamptrendsSelectors } = require('../selectors/digiteyesreportingCamptrends.selectors');

async function verifyMenu(page, data) {
  await openReportingMenu(page, data, digiteyesreportingCamptrendsSelectors);
}

async function openModule(page, data) {
  await openReportingModule(page, data, digiteyesreportingCamptrendsSelectors, 'Camp Trends');
}

async function verifySearchFilter(page) {
  await openSearchFilter(page, digiteyesreportingCamptrendsSelectors);
}

async function verifyThemeDropdown(page) {
  await openSearchFilter(page, digiteyesreportingCamptrendsSelectors);
  await expectDropdownOptions(
    page,
    digiteyesreportingCamptrendsSelectors.themeField,
    ['S2E', 'S2L', 'S2S', 'Other than S2E, S2L, S2S'],
    'Camp Trends theme dropdown'
  );
}

async function verifyPayerDropdown(page) {
  await openSearchFilter(page, digiteyesreportingCamptrendsSelectors);
  await expectDropdownOptions(page, digiteyesreportingCamptrendsSelectors.payerField, ['Ajmer Sharif'], 'Camp Trends payer dropdown');
}

async function verifyDateFrom(page, value) {
  await openSearchFilter(page, digiteyesreportingCamptrendsSelectors);
  await fillFieldAndExpectValue(page, digiteyesreportingCamptrendsSelectors.dateFromField, value, 'Camp Trends Date From');
}

async function verifyDateTo(page, value) {
  await openSearchFilter(page, digiteyesreportingCamptrendsSelectors);
  await fillFieldAndExpectValue(page, digiteyesreportingCamptrendsSelectors.dateToField, value, 'Camp Trends Date To');
}

module.exports = {
  digiteyesreportingCamptrendsHelpers: {
    verifyMenu,
    openModule,
    verifySearchFilter,
    verifyThemeDropdown,
    verifyPayerDropdown,
    verifyDateFrom,
    verifyDateTo,
    selectors: digiteyesreportingCamptrendsSelectors
  }
};
