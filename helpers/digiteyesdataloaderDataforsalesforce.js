const { createDataLoaderModuleHelpers } = require('./digiteyesdataloaderCommon');
const { digiteyesdataloaderDataforsalesforceSelectors } = require('../selectors/digiteyesdataloaderDataforsalesforce.selectors');

module.exports = {
  digiteyesdataloaderDataforsalesforceHelpers: createDataLoaderModuleHelpers(digiteyesdataloaderDataforsalesforceSelectors)
};
