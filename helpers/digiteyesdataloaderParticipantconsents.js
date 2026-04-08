const { createDataLoaderModuleHelpers } = require('./digiteyesdataloaderCommon');
const { digiteyesdataloaderParticipantconsentsSelectors } = require('../selectors/digiteyesdataloaderParticipantconsents.selectors');

module.exports = {
  digiteyesdataloaderParticipantconsentsHelpers: createDataLoaderModuleHelpers(digiteyesdataloaderParticipantconsentsSelectors)
};
