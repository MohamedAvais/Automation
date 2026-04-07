const { loadRuntimeData } = require('../../helpers/dataLoader');
const { loginAsAdmin, logout } = require('../../helpers/auth');
const { digiteyesreportingCamptrendsHelpers } = require('../../helpers/digiteyesreportingCamptrends.js');
const { digiteyesreportingCamptrendsSelectors } = require('../../selectors/digiteyesreportingCamptrends.selectors.js');

async function closeSession(page) {
  await logout(page);
}

module.exports = {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyesreportingCamptrendsHelpers,
  digiteyesreportingCamptrendsSelectors
};
