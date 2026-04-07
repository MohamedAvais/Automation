const { loadRuntimeData } = require('../../helpers/dataLoader');
const { loginAsAdmin, logout } = require('../../helpers/auth');
const { digiteyescampsManagecampsclusterHelpers } = require('../../helpers/digiteyescampsManagecampscluster.js');
const { digiteyescampsManagecampsclusterSelectors } = require('../../selectors/digiteyescampsManagecampscluster.selectors.js');

async function closeSession(page) {
  await logout(page);
}

module.exports = {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyescampsManagecampsclusterHelpers,
  digiteyescampsManagecampsclusterSelectors
};
