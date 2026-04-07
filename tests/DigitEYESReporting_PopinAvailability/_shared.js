const { loadRuntimeData } = require('../../helpers/dataLoader');
const { loginAsAdmin, logout } = require('../../helpers/auth');
const { digiteyesreportingPopinavailabilityHelpers } = require('../../helpers/digiteyesreportingPopinavailability.js');
const { digiteyesreportingPopinavailabilitySelectors } = require('../../selectors/digiteyesreportingPopinavailability.selectors.js');

async function closeSession(page) {
  await logout(page);
}

module.exports = {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyesreportingPopinavailabilityHelpers,
  digiteyesreportingPopinavailabilitySelectors
};
