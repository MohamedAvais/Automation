const { expect } = require('@playwright/test');

function toLocator(page, candidate) {
  switch (candidate.type) {
    case 'role':
      return page.getByRole(candidate.role, candidate.options || {});
    case 'text':
      return page.getByText(candidate.value, candidate.options || {});
    case 'placeholder':
      return page.getByPlaceholder(candidate.value, candidate.options || {});
    case 'label':
      return page.getByLabel(candidate.value, candidate.options || {});
    case 'css':
      return page.locator(candidate.value);
    case 'xpath':
      return page.locator(`xpath=${candidate.value}`);
    case 'testid':
      return page.getByTestId(candidate.value);
    case 'nth':
      return page.locator(candidate.selector).nth(candidate.index);
    case 'custom':
      return candidate.factory(page);
    default:
      throw new Error(`Unsupported locator candidate type: ${candidate.type}`);
  }
}

async function resolveFirst(page, candidates, options = {}) {
  const timeoutPerCandidate = options.timeoutPerCandidate ?? 2000;
  const mustBeVisible = options.mustBeVisible ?? true;
  const errors = [];

  for (const candidate of candidates) {
    try {
      const locator = toLocator(page, candidate).first();
      if (mustBeVisible) {
        await locator.waitFor({ state: 'visible', timeout: timeoutPerCandidate });
      } else {
        await expect(locator).toHaveCount(1, { timeout: timeoutPerCandidate });
      }
      return {
        locator,
        matchedBy: candidate.name || `${candidate.type}:${candidate.value || candidate.selector || 'custom'}`
      };
    } catch (error) {
      errors.push(`${candidate.name || candidate.type}: ${error.message}`);
    }
  }

  throw new Error(`No locator matched. Selectors tried: ${JSON.stringify(candidates.map((c) => c.name || c.value || c.selector || c.type))}\nDetails:\n${errors.join('\n')}`);
}

async function clickWithFallback(page, candidates, options = {}) {
  const { locator, matchedBy } = await resolveFirst(page, candidates, options);
  await locator.click({ timeout: options.actionTimeout ?? 10000 });
  return matchedBy;
}

async function clickIfFound(page, candidates, options = {}) {
  try {
    const matchedBy = await clickWithFallback(page, candidates, options);
    return { clicked: true, matchedBy };
  } catch (error) {
    return { clicked: false, error };
  }
}

async function fillWithFallback(page, candidates, value, options = {}) {
  const { locator, matchedBy } = await resolveFirst(page, candidates, options);
  await locator.fill('');
  await locator.fill(String(value));
  return matchedBy;
}

async function expectVisibleWithFallback(page, candidates, options = {}) {
  const { locator, matchedBy } = await resolveFirst(page, candidates, options);
  await expect(locator).toBeVisible({ timeout: options.expectTimeout ?? 10000 });
  return matchedBy;
}

module.exports = {
  resolveFirst,
  clickWithFallback,
  clickIfFound,
  fillWithFallback,
  expectVisibleWithFallback
};
