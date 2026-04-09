const { test } = require('@playwright/test');
const {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyessettingsCountrysettingsHelpers,
  digiteyessettingsCountrysettingsSelectors
} = require('./_shared');

test("TC_01_To_verify_that_user_can_click_on_DigitEYES_Settings_from_sidebar_menu.", async ({ page }) => {
  const data = loadRuntimeData();
  test.info().annotations.push({
    type: 'source-aiq',
    description: "source-aiq/TestScripts/DigitEYESCampsCluster/DigitEYESSettings/CountrySettings/TC_01_To_verify_that_user_can_click_on_DigitEYES_Settings_from_sidebar_menu..ds"
  });

  await test.step('Login into Application', async () => {
    await loginAsAdmin(page, data);
  });

  await test.step('Select country and click on DigitEYES Settings', async () => {
    await digiteyessettingsCountrysettingsHelpers.openModule(page, data.visionSpringCountry);
  });

  await test.step('Logout from the application', async () => {
    await closeSession(page);
  });
});
