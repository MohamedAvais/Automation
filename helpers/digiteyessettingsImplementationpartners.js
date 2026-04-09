const {
  openSettingsModule,
  fillSearchField,
  setPageSize,
  expectPageSizeOptions,
  clickPagination,
  expectPaginationSummary
} = require('./digiteyessettingsCommon');
const { digiteyessettingsImplementationpartnersSelectors } = require('../selectors/digiteyessettingsImplementationpartners.selectors');

async function openModule(page, data) {
  await openSettingsModule(page, data, digiteyessettingsImplementationpartnersSelectors, 'Implementation Partners');
}

async function verifyPaginationFunctionality(page, data) {
  await openModule(page, data);
  await expectPageSizeOptions(page, digiteyessettingsImplementationpartnersSelectors, [
    'Show: 5',
    'Show: 10',
    'Show: 25',
    'Show: 50',
    'Show: 100'
  ]);

  await setPageSize(page, digiteyessettingsImplementationpartnersSelectors, 25);
  await setPageSize(page, digiteyessettingsImplementationpartnersSelectors, 5);
  await setPageSize(page, digiteyessettingsImplementationpartnersSelectors, 100);
  await setPageSize(page, digiteyessettingsImplementationpartnersSelectors, 50);
  await setPageSize(page, digiteyessettingsImplementationpartnersSelectors, 10);
}

async function verifyNextAndLastNavigation(page, data) {
  await openModule(page, data);
  await fillSearchField(
    page,
    digiteyessettingsImplementationpartnersSelectors.partnerNameField,
    'TesterQA11',
    'Partner Name'
  );
  await fillSearchField(
    page,
    digiteyessettingsImplementationpartnersSelectors.salesforceCodeField,
    '1234asdf',
    'Salesforce Code'
  );

  await setPageSize(page, digiteyessettingsImplementationpartnersSelectors, 5);
  await clickPagination(page, digiteyessettingsImplementationpartnersSelectors, 'next');
  await expectPaginationSummary(page, digiteyessettingsImplementationpartnersSelectors);
  await clickPagination(page, digiteyessettingsImplementationpartnersSelectors, 'last');
  await expectPaginationSummary(page, digiteyessettingsImplementationpartnersSelectors);
}

module.exports = {
  digiteyessettingsImplementationpartnersHelpers: {
    openModule,
    verifyPaginationFunctionality,
    verifyNextAndLastNavigation,
    selectors: digiteyessettingsImplementationpartnersSelectors
  }
};
