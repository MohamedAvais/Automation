const { loadRuntimeData } = require('../../helpers/dataLoader');
const { loginAsAdmin, logout } = require('../../helpers/auth');
const { digiteyessettingsHospitalsHelpers } = require('../../helpers/digiteyessettingsHospitals.js');
const { digiteyessettingsHospitalsSelectors } = require('../../selectors/digiteyessettingsHospitals.selectors.js');

async function closeSession(page) {
  await logout(page);
}

module.exports = {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyessettingsHospitalsHelpers,
  digiteyessettingsHospitalsSelectors
};
