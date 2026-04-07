const { loadRuntimeData } = require('../../helpers/dataLoader');
const { loginAsAdmin, logout } = require('../../helpers/auth');
const { digiteyesreportingWorkreportvsteamsHelpers } = require('../../helpers/digiteyesreportingWorkreportvsteams.js');
const { digiteyesreportingWorkreportvsteamsSelectors } = require('../../selectors/digiteyesreportingWorkreportvsteams.selectors.js');

async function closeSession(page) {
  await logout(page);
}

module.exports = {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyesreportingWorkreportvsteamsHelpers,
  digiteyesreportingWorkreportvsteamsSelectors
};
