const { loadRuntimeData } = require('../../helpers/dataLoader');
const { loginAsAdmin, logout } = require('../../helpers/auth');
const { digiteyessettingsCountrysettingsHelpers } = require('../../helpers/digiteyessettingsCountrysettings.js');
const { digiteyessettingsCountrysettingsSelectors } = require('../../selectors/digiteyessettingsCountrysettings.selectors.js');

async function closeSession(page) {
  await logout(page);
}

module.exports = {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyessettingsCountrysettingsHelpers,
  digiteyessettingsCountrysettingsSelectors
};
