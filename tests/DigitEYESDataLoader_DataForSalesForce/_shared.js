const { loadRuntimeData } = require('../../helpers/dataLoader');
const { loginAsAdmin, logout } = require('../../helpers/auth');
const { digiteyesdataloaderDataforsalesforceHelpers } = require('../../helpers/digiteyesdataloaderDataforsalesforce.js');
const { digiteyesdataloaderDataforsalesforceSelectors } = require('../../selectors/digiteyesdataloaderDataforsalesforce.selectors.js');

async function closeSession(page) {
  await logout(page);
}

module.exports = {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyesdataloaderDataforsalesforceHelpers,
  digiteyesdataloaderDataforsalesforceSelectors
};
