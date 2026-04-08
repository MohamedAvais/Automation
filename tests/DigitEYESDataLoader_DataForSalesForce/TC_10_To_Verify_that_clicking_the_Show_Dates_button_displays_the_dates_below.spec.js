const { test } = require('@playwright/test');
const {
  loadRuntimeData,
  loginAsAdmin,
  closeSession
} = require('./_shared');

test("TC_10_To_Verify_that_clicking_the_Show_Dates_button_displays_the_dates_below", async ({ page }) => {
  const data = loadRuntimeData();
  test.info().annotations.push({
    type: 'source-aiq',
    description: "source-aiq/TestScripts/DigitEYESCampsCluster/DigitEYESDataLoader/DataForSalesForce/TC_10_To_Verify_that_clicking_the_Show_Dates_button_displays_the_dates_below.ds"
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
