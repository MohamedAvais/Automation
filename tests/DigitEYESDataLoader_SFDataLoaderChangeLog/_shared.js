const { loadRuntimeData } = require('../../helpers/dataLoader');
const { loginAsAdmin, logout } = require('../../helpers/auth');
const { digiteyesdataloaderSfdataloaderchangelogHelpers } = require('../../helpers/digiteyesdataloaderSfdataloaderchangelog.js');
const { digiteyesdataloaderSfdataloaderchangelogSelectors } = require('../../selectors/digiteyesdataloaderSfdataloaderchangelog.selectors.js');

async function closeSession(page) {
  await logout(page);
}

module.exports = {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyesdataloaderSfdataloaderchangelogHelpers,
  digiteyesdataloaderSfdataloaderchangelogSelectors
};
