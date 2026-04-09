const { safeClick, safeExpectVisible, waitForAppToSettle } = require('./actions');
const { resolveFirst } = require('./fallback');
const { commonSelectors } = require('../selectors/common.selectors');
const { digiteyessettingsCountrysettingsSelectors } = require('../selectors/digiteyessettingsCountrysettings.selectors');
const { digiteyescampsManagecampsclusterHelpers } = require('./digiteyescampsManagecampscluster');

async function openModule(page, country = 'India') {
  await digiteyescampsManagecampsclusterHelpers.selectLoginCountry(page, country);
  await safeClick(page, commonSelectors.digiteyesSettingsButton, 'DigitEYES Settings');
  await waitForAppToSettle(page, 1000);
}

async function selectCountrySettings(page) {
  await safeClick(page, digiteyessettingsCountrysettingsSelectors.countrySettingsLink, 'Country Settings');
  await waitForAppToSettle(page, 1500);
}

async function verifyCountrySettingsPageLoaded(page) {
  await safeExpectVisible(page, digiteyessettingsCountrysettingsSelectors.pageHeading, 'Country Settings page heading', {
    timeoutPerCandidate: 8000
  });
}

async function verifyConfigureButtonAccessible(page) {
  await safeExpectVisible(page, digiteyessettingsCountrysettingsSelectors.configureButton, 'Configure button', {
    timeoutPerCandidate: 5000
  });
}

async function clickConfigureButton(page) {
  await safeClick(page, digiteyessettingsCountrysettingsSelectors.configureButton, 'Configure button');
  await waitForAppToSettle(page, 1000);
}

module.exports = {
  digiteyessettingsCountrysettingsHelpers: {
    openModule,
    selectCountrySettings,
    verifyCountrySettingsPageLoaded,
    verifyConfigureButtonAccessible,
    clickConfigureButton,
    selectors: digiteyessettingsCountrysettingsSelectors
  }
};
