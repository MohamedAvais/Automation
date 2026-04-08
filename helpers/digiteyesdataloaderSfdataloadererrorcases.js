const { createDataLoaderModuleHelpers } = require('./digiteyesdataloaderCommon');
const { digiteyesdataloaderSfdataloadererrorcasesSelectors } = require('../selectors/digiteyesdataloaderSfdataloadererrorcases.selectors');

module.exports = {
  digiteyesdataloaderSfdataloadererrorcasesHelpers: createDataLoaderModuleHelpers(digiteyesdataloaderSfdataloadererrorcasesSelectors)
};
