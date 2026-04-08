const { createDataLoaderModuleHelpers } = require('./digiteyesdataloaderCommon');
const { digiteyesdataloaderSfdataloaderchangelogSelectors } = require('../selectors/digiteyesdataloaderSfdataloaderchangelog.selectors');

module.exports = {
  digiteyesdataloaderSfdataloaderchangelogHelpers: createDataLoaderModuleHelpers(digiteyesdataloaderSfdataloaderchangelogSelectors)
};
