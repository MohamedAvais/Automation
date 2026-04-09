const {
  openSettingsModule,
  clickFirstSortableHeader,
  clickRefresh
} = require('./digiteyessettingsCommon');
const { safeExpectVisible } = require('./actions');
const { digiteyessettingsDesalesforcefieldmappingSelectors } = require('../selectors/digiteyessettingsDesalesforcefieldmapping.selectors');

async function openModule(page, data) {
  await openSettingsModule(page, data, digiteyessettingsDesalesforcefieldmappingSelectors, 'DE Salesforce Field Mapping');
}

async function verifyRefreshButton(page, data) {
  await openModule(page, data);
  await clickFirstSortableHeader(page, digiteyessettingsDesalesforcefieldmappingSelectors);
  await clickRefresh(page, digiteyessettingsDesalesforcefieldmappingSelectors);
  await safeExpectVisible(page, digiteyessettingsDesalesforcefieldmappingSelectors.pageMarker, 'DE Salesforce Field Mapping table');
}

module.exports = {
  digiteyessettingsDesalesforcefieldmappingHelpers: {
    openModule,
    verifyRefreshButton,
    selectors: digiteyessettingsDesalesforcefieldmappingSelectors
  }
};
