const path = require('path');
const { parentSuite, suite } = require('allure-js-commons');

function humanizeSuiteName(moduleFolderName) {
  return String(moduleFolderName || '')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function registerModuleSuite(test, moduleDirectory) {
  test.beforeEach(async () => {
    const moduleFolderName = path.basename(moduleDirectory);
    const moduleSuiteName = humanizeSuiteName(moduleFolderName);
    await parentSuite(moduleSuiteName);
    await suite(moduleSuiteName);
  });
}

module.exports = {
  humanizeSuiteName,
  registerModuleSuite
};