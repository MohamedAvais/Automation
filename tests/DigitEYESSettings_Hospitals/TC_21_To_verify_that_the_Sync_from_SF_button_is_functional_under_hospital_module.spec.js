const { test } = require('@playwright/test');
const {
  loadRuntimeData,
  loginAsAdmin,
  closeSession
} = require('./_shared');

test("TC_21_To_verify_that_the_Sync_from_SF_button_is_functional_under_hospital_module", async ({ page }) => {
  const data = loadRuntimeData();
  test.info().annotations.push({
    type: 'source-aiq',
    description: "source-aiq/TestScripts/DigitEYESCampsCluster/DigitEYESSettings/Hospitals/TC_21_To_verify_that_the_Sync_from_SF_button_is_functional_under_hospital_module.ds"
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
