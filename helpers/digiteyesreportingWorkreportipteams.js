const {
  openReportingModule,
  openSearchFilter,
  closeSearchFilter,
  fillFieldAndExpectValue,
  clearFieldAndExpectEmpty,
  applySearch,
  resetSearch,
  expectTableHeaders
} = require('./digiteyesreportingCommon');
const { digiteyesreportingWorkreportipteamsSelectors } = require('../selectors/digiteyesreportingWorkreportipteams.selectors');

async function openModule(page, data) {
  await openReportingModule(page, data, digiteyesreportingWorkreportipteamsSelectors, 'Work Report - IP Teams');
}

async function verifyModulePage(page) {
  await expectTableHeaders(
    page,
    digiteyesreportingWorkreportipteamsSelectors.tableHeaderCells,
    ['Reg. Date', 'Camp Ref.', 'Location', 'IP Name', 'IP Team', '#Regs'],
    'Work Report - IP Teams headers'
  );
}

async function verifyUserNameField(page, value) {
  await openSearchFilter(page, digiteyesreportingWorkreportipteamsSelectors);
  await fillFieldAndExpectValue(page, digiteyesreportingWorkreportipteamsSelectors.userNameField, value, 'User Name');
  await applySearch(page, digiteyesreportingWorkreportipteamsSelectors);
}

async function verifyReset(page, value) {
  await openSearchFilter(page, digiteyesreportingWorkreportipteamsSelectors);
  await fillFieldAndExpectValue(page, digiteyesreportingWorkreportipteamsSelectors.userNameField, value, 'User Name');
  await resetSearch(page, digiteyesreportingWorkreportipteamsSelectors);
  await clearFieldAndExpectEmpty(page, digiteyesreportingWorkreportipteamsSelectors.userNameField, 'User Name');
}

async function closeSearch(page) {
  await openSearchFilter(page, digiteyesreportingWorkreportipteamsSelectors);
  await closeSearchFilter(page, digiteyesreportingWorkreportipteamsSelectors);
}

async function verifyDateFrom(page, value) {
  await openSearchFilter(page, digiteyesreportingWorkreportipteamsSelectors);
  await fillFieldAndExpectValue(page, digiteyesreportingWorkreportipteamsSelectors.dateFromField, value, 'Date From');
  await applySearch(page, digiteyesreportingWorkreportipteamsSelectors);
}

async function verifyDateTo(page, value) {
  await openSearchFilter(page, digiteyesreportingWorkreportipteamsSelectors);
  await fillFieldAndExpectValue(page, digiteyesreportingWorkreportipteamsSelectors.dateToField, value, 'Date To');
  await applySearch(page, digiteyesreportingWorkreportipteamsSelectors);
}

async function clearDateTo(page, value) {
  await openSearchFilter(page, digiteyesreportingWorkreportipteamsSelectors);
  await fillFieldAndExpectValue(page, digiteyesreportingWorkreportipteamsSelectors.dateToField, value, 'Date To');
  await resetSearch(page, digiteyesreportingWorkreportipteamsSelectors);
  await clearFieldAndExpectEmpty(page, digiteyesreportingWorkreportipteamsSelectors.dateToField, 'Date To');
}

async function verifyRegistrationHeaders(page) {
  await expectTableHeaders(
    page,
    digiteyesreportingWorkreportipteamsSelectors.tableHeaderCells,
    ['Email ID', '#Camps', '#Participant'],
    'Registration headers'
  );
}

module.exports = {
  digiteyesreportingWorkreportipteamsHelpers: {
    openModule,
    verifyModulePage,
    verifyUserNameField,
    verifyReset,
    closeSearch,
    verifyDateFrom,
    verifyDateTo,
    clearDateTo,
    verifyRegistrationHeaders,
    selectors: digiteyesreportingWorkreportipteamsSelectors
  }
};
