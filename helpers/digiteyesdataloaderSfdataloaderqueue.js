const { createDataLoaderModuleHelpers } = require('./digiteyesdataloaderCommon');
const { digiteyesdataloaderSfdataloaderqueueSelectors } = require('../selectors/digiteyesdataloaderSfdataloaderqueue.selectors');

module.exports = {
  digiteyesdataloaderSfdataloaderqueueHelpers: createDataLoaderModuleHelpers(digiteyesdataloaderSfdataloaderqueueSelectors)
};
