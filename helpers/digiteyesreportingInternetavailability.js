const {
  openReportingModule,
  fillFieldAndExpectValue,
  clearFieldAndExpectEmpty
} = require('./digiteyesreportingCommon');
const { digiteyesreportingInternetavailabilitySelectors } = require('../selectors/digiteyesreportingInternetavailability.selectors');

async function openModule(page, data) {
  await openReportingModule(page, data, digiteyesreportingInternetavailabilitySelectors, 'Internet Availability');
}

async function verifyDateFromPresence(page) {
  await fillFieldAndExpectValue(page, digiteyesreportingInternetavailabilitySelectors.dateFromField, '2026-03-02', 'Internet Availability Date From');
}

async function clearDateFrom(page, value) {
  await fillFieldAndExpectValue(page, digiteyesreportingInternetavailabilitySelectors.dateFromField, value, 'Internet Availability Date From');
  await clearFieldAndExpectEmpty(page, digiteyesreportingInternetavailabilitySelectors.dateFromField, 'Internet Availability Date From');
}

async function verifyDateToPresence(page) {
  await fillFieldAndExpectValue(page, digiteyesreportingInternetavailabilitySelectors.dateToField, '2026-03-02', 'Internet Availability Date To');
}

async function clearDateTo(page, value) {
  await fillFieldAndExpectValue(page, digiteyesreportingInternetavailabilitySelectors.dateToField, value, 'Internet Availability Date To');
  await clearFieldAndExpectEmpty(page, digiteyesreportingInternetavailabilitySelectors.dateToField, 'Internet Availability Date To');
}

module.exports = {
  digiteyesreportingInternetavailabilityHelpers: {
    openModule,
    verifyDateFromPresence,
    clearDateFrom,
    verifyDateToPresence,
    clearDateTo,
    selectors: digiteyesreportingInternetavailabilitySelectors
  }
};
