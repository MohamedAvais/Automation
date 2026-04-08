const { loadRuntimeData } = require('../../helpers/dataLoader');
const { loginAsAdmin, logout } = require('../../helpers/auth');
const { digiteyesreportingWorkreportipteamsHelpers } = require('../../helpers/digiteyesreportingWorkreportipteams.js');
const { digiteyesreportingWorkreportipteamsSelectors } = require('../../selectors/digiteyesreportingWorkreportipteams.selectors.js');

async function closeSession(page) {
  await logout(page);
}

module.exports = {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyesreportingWorkreportipteamsHelpers,
  digiteyesreportingWorkreportipteamsSelectors
};
