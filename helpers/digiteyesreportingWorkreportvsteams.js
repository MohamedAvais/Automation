const {
  openReportingMenu,
  openReportingModule,
  openSearchFilter,
  closeSearchFilter,
  fillFieldAndExpectValue,
  applySearch,
  expectTextVisible,
  clickExportAndAssert
} = require('./digiteyesreportingCommon');
const { digiteyesreportingWorkreportvsteamsSelectors } = require('../selectors/digiteyesreportingWorkreportvsteams.selectors');

async function verifyMenu(page, data) {
  await openReportingMenu(page, data, digiteyesreportingWorkreportvsteamsSelectors);
}

async function openModule(page, data) {
  await openReportingModule(page, data, digiteyesreportingWorkreportvsteamsSelectors, 'Work Report - VS Teams');
}

async function verifyModulePage(page) {
  await expectTextVisible(page, 'Search / Filter', 'VS Teams page');
}

async function verifySearchFilter(page) {
  await openSearchFilter(page, digiteyesreportingWorkreportvsteamsSelectors);
}

async function closeSearch(page) {
  await closeSearchFilter(page, digiteyesreportingWorkreportvsteamsSelectors);
}

async function filterByAssistantManager(page, value) {
  await openSearchFilter(page, digiteyesreportingWorkreportvsteamsSelectors);
  await fillFieldAndExpectValue(page, digiteyesreportingWorkreportvsteamsSelectors.assistantManagerField, value, 'Assistant Manager');
  await applySearch(page, digiteyesreportingWorkreportvsteamsSelectors);
}

async function filterByInvalidAssistantManager(page, value) {
  await openSearchFilter(page, digiteyesreportingWorkreportvsteamsSelectors);
  await fillFieldAndExpectValue(page, digiteyesreportingWorkreportvsteamsSelectors.assistantManagerField, value, 'Invalid Assistant Manager');
  await applySearch(page, digiteyesreportingWorkreportvsteamsSelectors);
  await expectTextVisible(page, '(0) Records Found.', 'No records found');
}

async function filterByUserEmail(page, value) {
  await openSearchFilter(page, digiteyesreportingWorkreportvsteamsSelectors);
  await fillFieldAndExpectValue(page, digiteyesreportingWorkreportvsteamsSelectors.userEmailField, value, 'User Email');
  await applySearch(page, digiteyesreportingWorkreportvsteamsSelectors);
  await expectTextVisible(page, value, 'User Email result');
}

async function filterByOutreachIncharge(page, value) {
  await openSearchFilter(page, digiteyesreportingWorkreportvsteamsSelectors);
  await fillFieldAndExpectValue(page, digiteyesreportingWorkreportvsteamsSelectors.outreachInchargeField, value, 'Outreach Incharge');
  await applySearch(page, digiteyesreportingWorkreportvsteamsSelectors);
  await expectTextVisible(page, value, 'Outreach Incharge result');
}

async function exportReport(page) {
  await clickExportAndAssert(page, digiteyesreportingWorkreportvsteamsSelectors);
}

module.exports = {
  digiteyesreportingWorkreportvsteamsHelpers: {
    verifyMenu,
    openModule,
    verifyModulePage,
    verifySearchFilter,
    closeSearch,
    filterByAssistantManager,
    filterByInvalidAssistantManager,
    filterByUserEmail,
    filterByOutreachIncharge,
    exportReport,
    selectors: digiteyesreportingWorkreportvsteamsSelectors
  }
};
