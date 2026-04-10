const { safeClick, safeFill, safeExpectVisible, waitForAppToSettle } = require('./actions');
const { commonSelectors } = require('../selectors/common.selectors');
const { clickIfFound, resolveFirst } = require('./fallback');

function requireCredential(value, label) {
  if (String(value || '').trim()) {
    return value;
  }

  throw new Error(`${label} is required. Set it via environment variables before running Vision Spring tests.`);
}

function isRecoverableNavigationError(error) {
  const message = String(error && error.message ? error.message : error);
  return message.includes('ERR_ABORTED')
    || message.includes('frame was detached')
    || message.includes('waiting for scheduled navigations to finish')
    || message.includes('Target page, context or browser has been closed');
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

function isMicrosoftUrl(url) {
  return url.includes('login.microsoftonline.com') || url.includes('aadcdn.ms') || url.includes('msauth');
}

function isAppUrl(url) {
  return url.includes('dealphacloud') || url.includes('visionspring');
}

async function isAnySelectorVisible(page, candidates, timeoutPerCandidate = 1500) {
  try {
    await resolveFirst(page, candidates, { timeoutPerCandidate });
    return true;
  } catch (error) {
    return false;
  }
}

async function isLocatorVisible(locator, timeout = 1200) {
  try {
    await locator.first().waitFor({ state: 'visible', timeout });
    return true;
  } catch (error) {
    return false;
  }
}

async function acceptStaySignedInIfPresent(page) {
  const promptVisible = await isAnySelectorVisible(page, commonSelectors.staySignedInPrompt, 1000);
  if (!promptVisible) {
    return false;
  }

  const staySignedIn = await clickIfFound(page, commonSelectors.staySignedInYes, {
    timeoutPerCandidate: 1500,
    actionTimeout: 5000
  });

  if (staySignedIn.clicked) {
    console.log(`[CLICK] Stay signed in -> ${staySignedIn.matchedBy}`);
    await waitForAppToSettle(page, 1000);
    return true;
  }

  return false;
}

async function detectMicrosoftState(page) {
  if (await isAnySelectorVisible(page, commonSelectors.staySignedInPrompt, 800)) {
    return 'microsoft-stay-signed-in';
  }

  if (
    await isLocatorVisible(page.getByRole('heading', { name: /enter password/i }), 700)
    || await isLocatorVisible(page.getByPlaceholder('Password'), 700)
    || await isLocatorVisible(page.getByText(/forgot my password/i), 700)
  ) {
    return 'microsoft-password';
  }

  if (await isLocatorVisible(page.getByPlaceholder('Email, phone, or Skype'), 700)) {
    return 'microsoft-username';
  }

  return 'microsoft-transition';
}

async function detectAppState(page) {
  if (await isAnySelectorVisible(page, commonSelectors.countryPicker, 800)) {
    return 'country-picker';
  }

  if (await isAnySelectorVisible(page, commonSelectors.appReady, 800)) {
    return 'app-ready';
  }

  if (await isAnySelectorVisible(page, commonSelectors.appSignIn, 800)) {
    return 'app-office365-interstitial';
  }

  if (await isAnySelectorVisible(page, commonSelectors.legacyLoginUsername, 800)) {
    return 'legacy-direct-login';
  }

  return 'app-transition';
}

async function waitForAuthTransition(page, timeoutMs = 6000) {
  const startedAt = Date.now();

  while ((Date.now() - startedAt) < timeoutMs) {
    if (!page || page.isClosed()) {
      return 'page-closed';
    }

    const state = await detectAuthState(page);
    if (!['unknown', 'microsoft-transition', 'app-transition'].includes(state)) {
      return state;
    }

    await page.waitForTimeout(250).catch(() => null);
  }

  return detectAuthState(page);
}

async function detectAuthState(page) {
  if (!page || page.isClosed()) {
    return 'page-closed';
  }

  const currentUrl = page.url().toLowerCase();

  if (isMicrosoftUrl(currentUrl)) {
    return detectMicrosoftState(page);
  }

  if (isAppUrl(currentUrl)) {
    return detectAppState(page);
  }

  if (await isLocatorVisible(page.getByPlaceholder('Email, phone, or Skype'), 500)) {
    return 'microsoft-username';
  }

  if (await isAnySelectorVisible(page, commonSelectors.countryPicker, 500)) {
    return 'country-picker';
  }

  return 'unknown';
}

async function recoverUnknownAuthState(page) {
  if (!page || page.isClosed()) {
    return false;
  }

  if (await acceptStaySignedInIfPresent(page)) {
    return true;
  }

  await waitForAppToSettle(page, 1500);

  if (await isAnySelectorVisible(page, commonSelectors.appSignIn, 1200)) {
    await handleAppOffice365Interstitial(page);
    return true;
  }

  return false;
}

async function submitMicrosoftStep(page, label) {
  const { locator, matchedBy } = await resolveFirst(page, commonSelectors.signIn, { timeoutPerCandidate: 5000 });

  for (let attempt = 0; attempt < 20; attempt++) {
    if (await locator.isEnabled().catch(() => false)) {
      try {
        await locator.click({ timeout: 5000, noWaitAfter: true });
      } catch (error) {
        if (!isRecoverableNavigationError(error)) {
          throw error;
        }
      }
      console.log(`[CLICK] ${label} -> ${matchedBy}`);
      await waitForAuthTransition(page, 5000).catch(() => null);
      return;
    }

    await page.waitForTimeout(250);
  }

  await page.keyboard.press('Enter');
  console.log(`[PRESS] ${label} -> Enter fallback`);
  await waitForAuthTransition(page, 5000).catch(() => null);
}

async function fillMicrosoftField(page, candidates, value, label) {
  const { locator, matchedBy } = await resolveFirst(page, candidates, { timeoutPerCandidate: 5000 });
  await locator.click({ timeout: 5000 }).catch(() => null);
  await locator.fill('');
  await locator.fill(String(value));

  let fieldValue = await locator.inputValue().catch(() => '');
  if (fieldValue !== String(value)) {
    await locator.press('Control+A').catch(() => null);
    await locator.press('Delete').catch(() => null);
    await locator.pressSequentially(String(value));
    fieldValue = await locator.inputValue().catch(() => '');
  }

  if (fieldValue !== String(value)) {
    throw new Error(`${label} field did not retain the expected value after fill. Matched by: ${matchedBy}`);
  }

  console.log(`[FILL] ${label} -> ${matchedBy} -> ${value}`);
}

async function fillMicrosoftLocator(locator, value, label) {
  const field = locator.first();
  await field.waitFor({ state: 'visible', timeout: 5000 });
  await field.click({ timeout: 5000 }).catch(() => null);
  await field.fill('');
  await field.fill(String(value));

  let fieldValue = await field.inputValue().catch(() => '');
  if (fieldValue !== String(value)) {
    await field.press('Control+A').catch(() => null);
    await field.press('Delete').catch(() => null);
    await field.pressSequentially(String(value));
    fieldValue = await field.inputValue().catch(() => '');
  }

  if (fieldValue !== String(value)) {
    throw new Error(`${label} field did not retain the expected value after direct fill.`);
  }

  console.log(`[FILL] ${label} -> direct locator -> ${value}`);
}

async function handleMicrosoftEmail(page, data) {
  const username = requireCredential(data.Username_Admin, 'Vision Spring username/email');
  await fillMicrosoftLocator(page.getByPlaceholder('Email, phone, or Skype'), username, 'Microsoft Email');
  await submitMicrosoftStep(page, 'Microsoft Next');
}

async function handleMicrosoftPassword(page, data) {
  const password = requireCredential(data.Password_Admin, 'Vision Spring password');
  const passwordField = page.getByPlaceholder('Password').first();
  if (await isLocatorVisible(passwordField, 1000)) {
    await fillMicrosoftLocator(passwordField, password, 'Microsoft Password');
  } else {
    await fillMicrosoftField(page, commonSelectors.microsoftLoginPassword, password, 'Microsoft Password');
  }
  await submitMicrosoftStep(page, 'Microsoft Sign In');
}

async function handleAppOffice365Interstitial(page) {
  const appSignIn = await clickIfFound(page, commonSelectors.appSignIn, {
    timeoutPerCandidate: 2500,
    actionTimeout: 5000
  });

  if (!appSignIn.clicked) {
    throw new Error('App Office 365 sign-in interstitial was detected but no matching control could be clicked.');
  }

  console.log(`[CLICK] App Sign In -> ${appSignIn.matchedBy}`);
  await waitForAppToSettle(page, 1500);
}

async function loginWithLegacyForm(page, data) {
  const username = requireCredential(data.Username_Admin, 'Vision Spring username');
  const password = requireCredential(data.Password_Admin, 'Vision Spring password');

  await safeFill(page, commonSelectors.legacyLoginUsername, username, 'Username', { timeoutPerCandidate: 5000 });
  await safeFill(page, commonSelectors.legacyLoginPassword, password, 'Password', { timeoutPerCandidate: 5000 });
  await safeClick(page, commonSelectors.rememberMe, 'Remember Me').catch(() => {});
  await safeClick(page, commonSelectors.signIn, 'Sign In');
  await waitForAppToSettle(page, 1500);
}

async function loginAsAdmin(page, data) {
  let lastError;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      let unknownStateCount = 0;
      let navigationError;

      for (let navAttempt = 1; navAttempt <= 5; navAttempt += 1) {
        try {
          await page.goto(data.URL, { waitUntil: 'domcontentloaded' });
          await waitForAppToSettle(page, 1000);
          navigationError = null;
          break;
        } catch (error) {
          navigationError = error;
          if (navAttempt < 5) {
            const delayMs = 1000 * navAttempt;
            console.log(`Navigation attempt ${navAttempt} failed, retrying in ${delayMs}ms...`);
            await sleep(delayMs);
          }
        }
      }

      if (navigationError) {
        throw navigationError;
      }

      for (let step = 0; step < 12; step += 1) {
        const state = await detectAuthState(page);
        console.log(`[AUTH] state -> ${state}`);

        if (state === 'page-closed') {
          throw new Error('Authentication page was closed unexpectedly during login.');
        }

        if (state === 'country-picker' || state === 'app-ready') {
          await safeExpectVisible(page, commonSelectors.postLoginReady, 'Post-login ready state', { timeoutPerCandidate: 8000 });
          return;
        }

        if (state === 'microsoft-stay-signed-in') {
          await acceptStaySignedInIfPresent(page);
          continue;
        }

        if (state === 'microsoft-username') {
          await handleMicrosoftEmail(page, data);
          continue;
        }

        if (state === 'microsoft-password') {
          await handleMicrosoftPassword(page, data);
          continue;
        }

        if (state === 'app-office365-interstitial') {
          await handleAppOffice365Interstitial(page);
          continue;
        }

        if (state === 'legacy-direct-login') {
          await loginWithLegacyForm(page, data);
          continue;
        }

        if (state === 'microsoft-transition' || state === 'app-transition') {
          unknownStateCount = 0;
          await waitForAuthTransition(page, 4000);
          continue;
        }

        unknownStateCount += 1;

        if (await recoverUnknownAuthState(page)) {
          unknownStateCount = 0;
          continue;
        }

        if (unknownStateCount >= 3) {
          throw new Error(`Authentication flow became stuck in an unknown state at ${page.url()}`);
        }

        await waitForAppToSettle(page, 1000);
      }

      throw new Error(`Unable to reach authenticated application state. Final state: ${await detectAuthState(page)}`);
    } catch (error) {
      lastError = error;
      if (attempt < 2) {
        console.log(`Login attempt ${attempt} failed, retrying from the base URL.`);
        await page.goto(data.URL, { waitUntil: 'domcontentloaded' }).catch(() => null);
        await waitForAppToSettle(page, 1000).catch(() => null);
      }
    }
  }

  throw lastError;
}

async function logout(page) {
  await waitForAppToSettle(page, 750);
  const logoutHref = await page.locator('a[href*="logout.php"]').first().getAttribute('href').catch(() => null);

  if (logoutHref) {
    try {
      await page.goto(new URL(logoutHref, page.url()).toString(), { waitUntil: 'domcontentloaded' });
    } catch (error) {
      const message = String(error && error.message ? error.message : error);
      if (!message.includes('ERR_ABORTED') && !message.includes('frame was detached')) {
        throw error;
      }
    }
    await page.waitForTimeout(1500);
    return;
  }

  const explicitLogoutControls = [
    page.getByRole('button', { name: /log out|logout/i }).first(),
    page.getByText(/^logout$/i).first(),
    page.locator('button').filter({ hasText: /logout/i }).first()
  ];

  for (const locator of explicitLogoutControls) {
    if (await locator.count()) {
      try {
        await locator.click({ timeout: 5000, force: true });
        await page.waitForTimeout(1500);
        return;
      } catch (error) {
        console.log(`Direct logout control click failed: ${error.message}`);
      }
    }
  }

  const directLogout = await clickIfFound(page, commonSelectors.logout, { timeoutPerCandidate: 1500, actionTimeout: 5000 });

  if (!directLogout.clicked) {
    await safeClick(page, commonSelectors.userProfile, 'User Profile');
    await page.waitForTimeout(500);
    await safeClick(page, commonSelectors.logout, 'Logout');
  } else {
    console.log(`[CLICK] Logout -> ${directLogout.matchedBy}`);
  }

  await page.waitForTimeout(1500);
}

module.exports = {
  loginAsAdmin,
  logout
};
