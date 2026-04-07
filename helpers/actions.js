const { expect } = require('@playwright/test');
const { clickWithFallback, clickIfFound, fillWithFallback, expectVisibleWithFallback, resolveFirst } = require('./fallback');

async function waitForAppToSettle(page, pauseMs = 750) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(pauseMs);
}

async function safeClick(page, candidates, label, options = {}) {
  const matchedBy = await clickWithFallback(page, candidates, options);
  console.log(`[CLICK] ${label} -> ${matchedBy}`);
  return matchedBy;
}

async function safeClickIfFound(page, candidates, label, options = {}) {
  const result = await clickIfFound(page, candidates, options);
  if (result.clicked) {
    console.log(`[CLICK_IF_FOUND] ${label} -> ${result.matchedBy}`);
  } else {
    console.log(`[CLICK_IF_FOUND] ${label} -> not found`);
  }
  return result;
}

async function safeFill(page, candidates, value, label, options = {}) {
  const matchedBy = await fillWithFallback(page, candidates, value, options);
  console.log(`[FILL] ${label} -> ${matchedBy} -> ${value}`);
  return matchedBy;
}

async function safeExpectVisible(page, candidates, label, options = {}) {
  const matchedBy = await expectVisibleWithFallback(page, candidates, options);
  console.log(`[ASSERT_VISIBLE] ${label} -> ${matchedBy}`);
  return matchedBy;
}

async function safeExpectText(page, candidates, expectedText, label, options = {}) {
  const { locator, matchedBy } = await resolveFirst(page, candidates, options);
  await expect(locator).toContainText(expectedText, { timeout: options.expectTimeout ?? 15000 });
  console.log(`[ASSERT_TEXT] ${label} -> ${matchedBy} -> ${expectedText}`);
  return matchedBy;
}

module.exports = {
  waitForAppToSettle,
  safeClick,
  safeClickIfFound,
  safeFill,
  safeExpectVisible,
  safeExpectText
};
