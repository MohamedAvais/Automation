const {
  openSettingsMenu,
  openSettingsModule,
  openFirstRowConfigure
} = require('./digiteyessettingsCommon');
const { digiteyessettingsCountrysettingsSelectors } = require('../selectors/digiteyessettingsCountrysettings.selectors');

async function verifySettingsMenu(page, data) {
  await openSettingsMenu(page, data, digiteyessettingsCountrysettingsSelectors);
}

async function openModule(page, data) {
  await openSettingsModule(page, data, digiteyessettingsCountrysettingsSelectors, 'Country Settings');
}

async function verifyConfigureButton(page, data) {
  await openModule(page, data);
  await openFirstRowConfigure(page, digiteyessettingsCountrysettingsSelectors);
}

module.exports = {
  digiteyessettingsCountrysettingsHelpers: {
    verifySettingsMenu,
    openModule,
    verifyConfigureButton,
    selectors: digiteyessettingsCountrysettingsSelectors
  }
};
