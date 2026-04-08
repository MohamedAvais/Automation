const { loadRuntimeData } = require('../../helpers/dataLoader');
const { loginAsAdmin, logout } = require('../../helpers/auth');
const { digiteyessettingsDesalesforcefieldmappingHelpers } = require('../../helpers/digiteyessettingsDesalesforcefieldmapping.js');
const { digiteyessettingsDesalesforcefieldmappingSelectors } = require('../../selectors/digiteyessettingsDesalesforcefieldmapping.selectors.js');

async function closeSession(page) {
  await logout(page);
}

module.exports = {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyessettingsDesalesforcefieldmappingHelpers,
  digiteyessettingsDesalesforcefieldmappingSelectors
};
