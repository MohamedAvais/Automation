const { loadRuntimeData } = require('../../helpers/dataLoader');
const { loginAsAdmin, logout } = require('../../helpers/auth');
const { digiteyesreportingSummarysheetdataHelpers } = require('../../helpers/digiteyesreportingSummarysheetdata.js');
const { digiteyesreportingSummarysheetdataSelectors } = require('../../selectors/digiteyesreportingSummarysheetdata.selectors.js');

async function closeSession(page) {
  await logout(page);
}

module.exports = {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyesreportingSummarysheetdataHelpers,
  digiteyesreportingSummarysheetdataSelectors
};
