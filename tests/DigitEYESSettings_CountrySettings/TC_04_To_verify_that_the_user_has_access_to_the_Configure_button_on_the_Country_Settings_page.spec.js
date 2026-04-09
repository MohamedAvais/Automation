const { test } = require('@playwright/test');
const {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyessettingsCountrysettingsHelpers
} = require('./_shared');

test("TC_04_To_verify_that_the_user_has_access_to_the_Configure_button_on_the_Country_Settings_page", async ({ page }) => {
  const data = loadRuntimeData();
  test.info().annotations.push({
    type: 'source-aiq',
    description: "source-aiq/TestScripts/DigitEYESCampsCluster/DigitEYESSettings/CountrySettings/TC_04_To_verify_that_the_user_has_access_to_the_Configure_button_on_the_Country_Settings_page.ds"
  });

  await test.step('Login into Application', async () => {
    await loginAsAdmin(page, data);
  });

  await test.step('Open DigitEYES Settings', async () => {
    await digiteyessettingsCountrysettingsHelpers.openModule(page, data.visionSpringCountry);
  });

  await test.step('Navigate to Country Settings page', async () => {
    await digiteyessettingsCountrysettingsHelpers.selectCountrySettings(page);
    await digiteyessettingsCountrysettingsHelpers.verifyCountrySettingsPageLoaded(page);
  });

  await test.step('Verify Configure button is accessible and clickable', async () => {
    await digiteyessettingsCountrysettingsHelpers.verifyConfigureButtonAccessible(page);
    await digiteyessettingsCountrysettingsHelpers.clickConfigureButton(page);
  });

  await test.step('Logout from the application', async () => {
    await closeSession(page);
  });
});
