const { loadRuntimeData } = require('../../helpers/dataLoader');
const { loginAsAdmin, logout } = require('../../helpers/auth');
const { digiteyesdataloaderParticipantconsentsHelpers } = require('../../helpers/digiteyesdataloaderParticipantconsents.js');
const { digiteyesdataloaderParticipantconsentsSelectors } = require('../../selectors/digiteyesdataloaderParticipantconsents.selectors.js');

async function closeSession(page) {
  await logout(page);
}

module.exports = {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyesdataloaderParticipantconsentsHelpers,
  digiteyesdataloaderParticipantconsentsSelectors
};
