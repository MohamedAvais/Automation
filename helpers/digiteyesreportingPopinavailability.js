const {
  openReportingModule,
  fillFieldAndExpectValue
} = require('./digiteyesreportingCommon');
const { digiteyesreportingPopinavailabilitySelectors } = require('../selectors/digiteyesreportingPopinavailability.selectors');

async function openModule(page, data) {
  await openReportingModule(page, data, digiteyesreportingPopinavailabilitySelectors, 'Popins Availability');
}

async function verifyDateFromPresence(page) {
  await fillFieldAndExpectValue(page, digiteyesreportingPopinavailabilitySelectors.dateFromField, '2026-03-02', 'Popins Availability Date From');
}

async function verifyDateToPresence(page) {
  await fillFieldAndExpectValue(page, digiteyesreportingPopinavailabilitySelectors.dateToField, '2026-03-02', 'Popins Availability Date To');
}

module.exports = {
  digiteyesreportingPopinavailabilityHelpers: {
    openModule,
    verifyDateFromPresence,
    verifyDateToPresence,
    selectors: digiteyesreportingPopinavailabilitySelectors
  }
};
