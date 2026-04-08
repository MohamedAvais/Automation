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

async function isAnySelectorVisible(page, candidates, timeoutPerCandidate = 1500) {
  try {
    await resolveFirst(page, candidates, { timeoutPerCandidate });
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

async function detectLoginMode(page) {
  if (await isAnySelectorVisible(page, commonSelectors.microsoftLoginUsername, 1500)) {
    return 'microsoft-username';
  }

  if (await isAnySelectorVisible(page, commonSelectors.microsoftLoginPassword, 1500)) {
    return 'microsoft-password';
  }

  if (await isAnySelectorVisible(page, commonSelectors.staySignedInPrompt, 1000)) {
    return 'microsoft-stay-signed-in';
  }

  if (await isAnySelectorVisible(page, commonSelectors.legacyLoginUsername, 1500)) {
    return 'legacy';
  }

  if (await isAnySelectorVisible(page, commonSelectors.postLoginReady, 1500)) {
    return 'post-login';
  }

  return 'unknown';
}

async function submitMicrosoftStep(page, label) {
  const { locator, matchedBy } = await resolveFirst(page, commonSelectors.signIn, { timeoutPerCandidate: 5000 });

  for (let attempt = 0; attempt < 20; attempt++) {
    if (await locator.isEnabled().catch(() => false)) {
      try {
        await locator.click({ timeout: 5000 });
      } catch (error) {
        if (!isRecoverableNavigationError(error)) {
          throw error;
        }
      }
      console.log(`[CLICK] ${label} -> ${matchedBy}`);
      await waitForAppToSettle(page, 750);
      return;
    }

    await page.waitForTimeout(250);
  }

  await page.keyboard.press('Enter');
  console.log(`[PRESS] ${label} -> Enter fallback`);
  await waitForAppToSettle(page, 750);
}

async function loginWithMicrosoftFlow(page, data) {
  const username = requireCredential(data.Username_Admin, 'Vision Spring username/email');
  const password = requireCredential(data.Password_Admin, 'Vision Spring password');

  for (let step = 0; step < 4; step += 1) {
    const mode = await detectLoginMode(page);

    if (mode === 'microsoft-username') {
      await safeFill(page, commonSelectors.microsoftLoginUsername, username, 'Microsoft Email', { timeoutPerCandidate: 5000 });
      await submitMicrosoftStep(page, 'Microsoft Next');
      continue;
    }

    if (mode === 'microsoft-password') {
      await safeFill(page, commonSelectors.microsoftLoginPassword, password, 'Microsoft Password', { timeoutPerCandidate: 5000 });
      await submitMicrosoftStep(page, 'Microsoft Sign In');
      continue;
    }

    if (mode === 'microsoft-stay-signed-in') {
      await acceptStaySignedInIfPresent(page);
      continue;
    }

    if (mode === 'post-login') {
      await waitForAppToSettle(page, 1000);
      return;
    }

    break;
  }

  await acceptStaySignedInIfPresent(page);

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

      const initialMode = await detectLoginMode(page);

      if (initialMode.startsWith('microsoft')) {
        await loginWithMicrosoftFlow(page, data);
      } else if (initialMode === 'legacy') {
        await loginWithLegacyForm(page, data);
      } else if (initialMode !== 'post-login') {
        await acceptStaySignedInIfPresent(page);
      }

      const appSignIn = await clickIfFound(page, commonSelectors.appSignIn, {
        timeoutPerCandidate: 2500,
        actionTimeout: 5000
      });

      if (appSignIn.clicked) {
        console.log(`[CLICK] App Sign In -> ${appSignIn.matchedBy}`);
        await waitForAppToSettle(page, 1500);
      }

      try {
        await safeExpectVisible(page, commonSelectors.postLoginReady, 'Post-login ready state', { timeoutPerCandidate: 8000 });
      } catch (error) {
        await acceptStaySignedInIfPresent(page);
        await waitForAppToSettle(page, 2500);

        const bounceMode = await detectLoginMode(page);

        if (bounceMode.startsWith('microsoft')) {
          console.log('Detected return to Microsoft sign-in page, retrying login flow once.');
          await loginWithMicrosoftFlow(page, data);
        } else if (bounceMode === 'legacy') {
          console.log('Detected direct login form, retrying legacy login once.');
          await loginWithLegacyForm(page, data);
        }

        const retryAppSignIn = await clickIfFound(page, commonSelectors.appSignIn, {
          timeoutPerCandidate: 2000,
          actionTimeout: 5000
        });

        if (retryAppSignIn.clicked) {
          console.log(`[CLICK] App Sign In Retry -> ${retryAppSignIn.matchedBy}`);
          await waitForAppToSettle(page, 2000);
        }

        await safeExpectVisible(page, commonSelectors.postLoginReady, 'Post-login ready state', { timeoutPerCandidate: 8000 });
      }

      return;
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
