const { safeClick, safeExpectVisible, waitForAppToSettle } = require('./actions');
const { digiteyescampsManagecampsclusterHelpers } = require('./digiteyescampsManagecampscluster');
const { digiteyesreportingSummarysheetdataSelectors } = require('../selectors/digiteyesreportingSummarysheetdata.selectors');

async function openModule(page, data) {
  await digiteyescampsManagecampsclusterHelpers.selectLoginCountry(page, data.visionSpringCountry);
  await safeClick(page, digiteyesreportingSummarysheetdataSelectors.reportingMenuButton, 'DigitEYES Reporting');
  await waitForAppToSettle(page, 500);
  await safeClick(page, digiteyesreportingSummarysheetdataSelectors.summarySheetDataLink, 'Summary Sheet Data');
  await waitForAppToSettle(page, 1000);
}

async function verifySummarySheetDataPage(page) {
  await safeExpectVisible(page, digiteyesreportingSummarysheetdataSelectors.summaryHeading, 'Summary heading');
  await safeExpectVisible(page, digiteyesreportingSummarysheetdataSelectors.refreshButton, 'Refresh button');
  await safeExpectVisible(page, digiteyesreportingSummarysheetdataSelectors.dateFromField, 'Date From field');
  await safeExpectVisible(page, digiteyesreportingSummarysheetdataSelectors.dateToField, 'Date To field');
  await safeExpectVisible(page, digiteyesreportingSummarysheetdataSelectors.runReportButton, 'Run Report button');
  await safeExpectVisible(page, digiteyesreportingSummarysheetdataSelectors.exportXlsButton, 'Export Xls button');
  await safeExpectVisible(page, digiteyesreportingSummarysheetdataSelectors.countryLabel, 'Country label');
  await safeExpectVisible(page, digiteyesreportingSummarysheetdataSelectors.countryValueIndia, 'India country value');
  await safeExpectVisible(page, digiteyesreportingSummarysheetdataSelectors.assistantManagerLabel, 'Asst. Mgr. label');
}

module.exports = {
  digiteyesreportingSummarysheetdataHelpers: {
    openModule,
    verifySummarySheetDataPage,
    selectors: digiteyesreportingSummarysheetdataSelectors
  }
};
