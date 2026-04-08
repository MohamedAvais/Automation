const { loadRuntimeData } = require('../../helpers/dataLoader');
const { loginAsAdmin, logout } = require('../../helpers/auth');
const { digiteyesdataloaderSfdataloaderqueueHelpers } = require('../../helpers/digiteyesdataloaderSfdataloaderqueue.js');
const { digiteyesdataloaderSfdataloaderqueueSelectors } = require('../../selectors/digiteyesdataloaderSfdataloaderqueue.selectors.js');

async function closeSession(page) {
  await logout(page);
}

module.exports = {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyesdataloaderSfdataloaderqueueHelpers,
  digiteyesdataloaderSfdataloaderqueueSelectors
};
