const { loadRuntimeData } = require('../../helpers/dataLoader');
const { loginAsAdmin, logout } = require('../../helpers/auth');
const { digiteyesdataloaderSfdataloadererrorcasesHelpers } = require('../../helpers/digiteyesdataloaderSfdataloadererrorcases.js');
const { digiteyesdataloaderSfdataloadererrorcasesSelectors } = require('../../selectors/digiteyesdataloaderSfdataloadererrorcases.selectors.js');

async function closeSession(page) {
  await logout(page);
}

module.exports = {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyesdataloaderSfdataloadererrorcasesHelpers,
  digiteyesdataloaderSfdataloadererrorcasesSelectors
};
