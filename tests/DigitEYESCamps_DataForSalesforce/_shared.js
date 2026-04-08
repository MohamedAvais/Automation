const { loadRuntimeData } = require('../../helpers/dataLoader');
const { loginAsAdmin, logout } = require('../../helpers/auth');
const { digiteyescampsDataforsalesforceHelpers } = require('../../helpers/digiteyescampsDataforsalesforce.js');
const { digiteyescampsDataforsalesforceSelectors } = require('../../selectors/digiteyescampsDataforsalesforce.selectors.js');

async function closeSession(page) {
  await logout(page);
}

module.exports = {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyescampsDataforsalesforceHelpers,
  digiteyescampsDataforsalesforceSelectors
};
