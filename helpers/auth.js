const { safeClick, safeFill, safeExpectVisible, waitForAppToSettle } = require('./actions');
const { commonSelectors } = require('../selectors/common.selectors');
const { clickIfFound, resolveFirst } = require('./fallback');

function requireCredential(value, label) {
  if (String(value || '').trim()) {
    return value;
  }

  throw new Error(`${label} is required. Set it via environment variables before running Vision Spring tests.`);
}

async function isAnySelectorVisible(page, candidates, timeoutPerCandidate = 1500) {
  try {
    await resolveFirst(page, candidates, { timeoutPerCandidate });
    return true;
  } catch (error) {
    return false;
  }
}

async function loginWithMicrosoftFlow(page, data) {
  const username = requireCredential(data.Username_Admin, 'Vision Spring username/email');
  const password = requireCredential(data.Password_Admin, 'Vision Spring password');

  await safeFill(page, commonSelectors.loginUsername, username, 'Microsoft Email', { timeoutPerCandidate: 5000 });
  await safeClick(page, commonSelectors.signIn, 'Microsoft Next');
  await safeFill(page, commonSelectors.loginPassword, password, 'Microsoft Password', { timeoutPerCandidate: 5000 });
  await safeClick(page, commonSelectors.signIn, 'Microsoft Sign In');

  const staySignedIn = await clickIfFound(page, commonSelectors.staySignedInYes, {
    timeoutPerCandidate: 3000,
    actionTimeout: 5000
  });

  if (staySignedIn.clicked) {
    console.log(`[CLICK] Stay signed in -> ${staySignedIn.matchedBy}`);
  }

  await waitForAppToSettle(page, 1500);
}

async function loginWithLegacyForm(page, data) {
  const username = requireCredential(data.Username_Admin, 'Vision Spring username');
  const password = requireCredential(data.Password_Admin, 'Vision Spring password');

  await safeFill(page, commonSelectors.loginUsername, username, 'Username', { timeoutPerCandidate: 5000 });
  await safeFill(page, commonSelectors.loginPassword, password, 'Password', { timeoutPerCandidate: 5000 });
  await safeClick(page, commonSelectors.rememberMe, 'Remember Me').catch(() => {});
  await safeClick(page, commonSelectors.signIn, 'Sign In');
  await waitForAppToSettle(page, 1500);
}

async function loginAsAdmin(page, data) {
  let lastError;
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      await page.goto(data.URL, { waitUntil: 'domcontentloaded' });
      await waitForAppToSettle(page, 1000);
      break;
    } catch (error) {
      lastError = error;
      if (attempt < 5) {
        const delayMs = 1000 * attempt;
        console.log(`Navigation attempt ${attempt} failed, retrying in ${delayMs}ms...`);
        await page.waitForTimeout(delayMs);
      } else {
        throw lastError;
      }
    }
  }

  const isMicrosoftLogin = await isAnySelectorVisible(page, [
    { type: 'css', value: '#i0116', name: 'css:#i0116' },
    { type: 'css', value: 'input[name="loginfmt"]', name: 'css:input[name=loginfmt]' }
  ], 4000);

  if (isMicrosoftLogin) {
    await loginWithMicrosoftFlow(page, data);
  } else if (await isAnySelectorVisible(page, commonSelectors.loginReadyState, 4000)) {
    await loginWithLegacyForm(page, data);
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
    await waitForAppToSettle(page, 2500);

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
}

async function logout(page) {
  await waitForAppToSettle(page, 750);
  const logoutHref = await page.locator('a[href*="logout.php"]').first().getAttribute('href').catch(() => null);
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
    if (logoutHref) {
      await page.goto(new URL(logoutHref, page.url()).toString(), { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      return;
    }

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
