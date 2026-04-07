const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const sourceRoot = path.join(repoRoot, 'source-aiq');
const testScriptsRoot = path.join(sourceRoot, 'TestScripts');
const testsRoot = path.join(repoRoot, 'tests');
const helpersRoot = path.join(repoRoot, 'helpers');
const selectorsRoot = path.join(repoRoot, 'selectors');
const dataRoot = path.join(repoRoot, 'data');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeIfMissing(filePath, content) {
  if (fs.existsSync(filePath)) {
    return false;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

function copyIfMissing(sourcePath, destinationPath) {
  if (fs.existsSync(destinationPath)) {
    return false;
  }

  fs.copyFileSync(sourcePath, destinationPath);
  return true;
}

function toSafeSegment(value) {
  return String(value || '')
    .replace(/\.ds$/i, '')
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/_+/g, '_');
}

function toCamelCase(value) {
  const parts = toSafeSegment(value).split('_').filter(Boolean);
  return parts
    .map((part, index) => {
      const normalized = part.toLowerCase();
      if (index === 0) {
        return normalized;
      }
      return normalized.charAt(0).toUpperCase() + normalized.slice(1);
    })
    .join('');
}

function normalizeRelative(filePath) {
  return path.relative(repoRoot, filePath).split(path.sep).join('/');
}

function findLeafModuleDirectories(currentDir, collected = []) {
  const entries = fs
    .readdirSync(currentDir, { withFileTypes: true })
    .filter((entry) => entry.name !== '.gitkeep');

  const dsFiles = entries.filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.ds'));
  if (dsFiles.length) {
    collected.push({
      dirPath: currentDir,
      sourceFiles: dsFiles
        .map((entry) => path.join(currentDir, entry.name))
        .sort((left, right) => left.localeCompare(right))
    });
    return collected;
  }

  entries
    .filter((entry) => entry.isDirectory())
    .sort((left, right) => left.name.localeCompare(right.name))
    .forEach((entry) => {
      findLeafModuleDirectories(path.join(currentDir, entry.name), collected);
    });

  return collected;
}

function getModuleInfo(dirPath) {
  const relativeParts = path.relative(testScriptsRoot, dirPath).split(path.sep).filter(Boolean);
  const moduleParts = relativeParts[0] === 'DigitEYESCampsCluster' ? relativeParts.slice(1) : relativeParts;
  const moduleName = moduleParts.map(toSafeSegment).join('_');
  const fileStem = toCamelCase(moduleName);

  return {
    moduleName,
    helperFileName: `${fileStem}.js`,
    selectorFileName: `${fileStem}.selectors.js`,
    helperExportName: `${fileStem}Helpers`,
    selectorExportName: `${fileStem}Selectors`
  };
}

function buildSharedTemplate(moduleInfo) {
  return `const { loadRuntimeData } = require('../../helpers/dataLoader');
const { loginAsAdmin, logout } = require('../../helpers/auth');
const { ${moduleInfo.helperExportName} } = require('../../helpers/${moduleInfo.helperFileName.replace(/\\/g, '/')}');
const { ${moduleInfo.selectorExportName} } = require('../../selectors/${moduleInfo.selectorFileName.replace(/\\/g, '/')}');

async function closeSession(page) {
  await logout(page);
}

module.exports = {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  ${moduleInfo.helperExportName},
  ${moduleInfo.selectorExportName}
};
`;
}

function buildHelperTemplate(moduleInfo) {
  return `const ${moduleInfo.selectorExportName} = {};

async function openModule(page) {
  return page;
}

module.exports = {
  ${moduleInfo.helperExportName}: {
    openModule,
    selectors: ${moduleInfo.selectorExportName}
  }
};
`;
}

function buildSelectorTemplate(moduleInfo) {
  return `const ${moduleInfo.selectorExportName} = {};

module.exports = {
  ${moduleInfo.selectorExportName}
};
`;
}

function buildSpecTemplate(sourceFilePath) {
  const sourceRelativePath = normalizeRelative(sourceFilePath);
  const sourceName = path.basename(sourceFilePath, '.ds');

  return `const { test } = require('@playwright/test');
const {
  loadRuntimeData,
  loginAsAdmin,
  closeSession
} = require('./_shared');

test(${JSON.stringify(sourceName)}, async ({ page }) => {
  const data = loadRuntimeData();
  test.info().annotations.push({
    type: 'source-aiq',
    description: ${JSON.stringify(sourceRelativePath)}
  });

  await test.step('Login into Application', async () => {
    await loginAsAdmin(page, data);
  });

  await test.step('Run converted flow', async () => {
  });

  await test.step('Logout from the application', async () => {
    await closeSession(page);
  });
});
`;
}

function copyCsvFiles() {
  ensureDir(dataRoot);

  const copiedFiles = [];
  const sourceCsvFiles = fs
    .readdirSync(sourceRoot, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.csv'))
    .map((entry) => path.join(sourceRoot, entry.name))
    .sort((left, right) => left.localeCompare(right));

  sourceCsvFiles.forEach((sourcePath) => {
    const destinationPath = path.join(dataRoot, path.basename(sourcePath));
    if (copyIfMissing(sourcePath, destinationPath)) {
      copiedFiles.push(normalizeRelative(destinationPath));
    }
  });

  return copiedFiles;
}

function main() {
  if (!fs.existsSync(testScriptsRoot)) {
    throw new Error(`Missing AIQ test script root: ${testScriptsRoot}`);
  }

  ensureDir(testsRoot);

  const createdModules = [];
  const createdHelpers = [];
  const createdSelectors = [];
  const createdSpecs = [];

  findLeafModuleDirectories(testScriptsRoot).forEach(({ dirPath, sourceFiles }) => {
    const moduleInfo = getModuleInfo(dirPath);
    const moduleDir = path.join(testsRoot, moduleInfo.moduleName);
    ensureDir(moduleDir);
    createdModules.push(normalizeRelative(moduleDir));

    writeIfMissing(path.join(moduleDir, '_shared.js'), buildSharedTemplate(moduleInfo));

    const helperPath = path.join(helpersRoot, moduleInfo.helperFileName);
    if (writeIfMissing(helperPath, buildHelperTemplate(moduleInfo))) {
      createdHelpers.push(normalizeRelative(helperPath));
    }

    const selectorPath = path.join(selectorsRoot, moduleInfo.selectorFileName);
    if (writeIfMissing(selectorPath, buildSelectorTemplate(moduleInfo))) {
      createdSelectors.push(normalizeRelative(selectorPath));
    }

    sourceFiles.forEach((sourceFilePath) => {
      const specName = `${toSafeSegment(path.basename(sourceFilePath, '.ds'))}.spec.js`;
      const specPath = path.join(moduleDir, specName);
      if (writeIfMissing(specPath, buildSpecTemplate(sourceFilePath))) {
        createdSpecs.push(normalizeRelative(specPath));
      }
    });
  });

  const copiedCsvFiles = copyCsvFiles();

  console.log(JSON.stringify({
    modules: createdModules.length,
    helperFiles: createdHelpers.length,
    selectorFiles: createdSelectors.length,
    specFiles: createdSpecs.length,
    copiedCsvFiles
  }, null, 2));
}

main();