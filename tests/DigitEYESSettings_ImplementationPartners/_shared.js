const { loadRuntimeData } = require('../../helpers/dataLoader');
const { loginAsAdmin, logout } = require('../../helpers/auth');
const { digiteyessettingsImplementationpartnersHelpers } = require('../../helpers/digiteyessettingsImplementationpartners.js');
const { digiteyessettingsImplementationpartnersSelectors } = require('../../selectors/digiteyessettingsImplementationpartners.selectors.js');

async function closeSession(page) {
  await logout(page);
}

module.exports = {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyessettingsImplementationpartnersHelpers,
  digiteyessettingsImplementationpartnersSelectors
};
