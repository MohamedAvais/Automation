const { loadRuntimeData } = require('../../helpers/dataLoader');
const { loginAsAdmin, logout } = require('../../helpers/auth');
const { digiteyesreportingInternetavailabilityHelpers } = require('../../helpers/digiteyesreportingInternetavailability.js');
const { digiteyesreportingInternetavailabilitySelectors } = require('../../selectors/digiteyesreportingInternetavailability.selectors.js');

async function closeSession(page) {
  await logout(page);
}

module.exports = {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyesreportingInternetavailabilityHelpers,
  digiteyesreportingInternetavailabilitySelectors
};
