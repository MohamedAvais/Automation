const { loadRuntimeData } = require('../../helpers/dataLoader');
const { loginAsAdmin, logout } = require('../../helpers/auth');
const { digiteyescampsParticipantsHelpers } = require('../../helpers/digiteyescampsParticipants.js');
const { digiteyescampsParticipantsSelectors } = require('../../selectors/digiteyescampsParticipants.selectors.js');

async function closeSession(page) {
  await logout(page);
}

module.exports = {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyescampsParticipantsHelpers,
  digiteyescampsParticipantsSelectors
};
