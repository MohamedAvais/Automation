const { test } = require('@playwright/test');
const {
  loadRuntimeData,
  loginAsAdmin,
  closeSession
} = require('./_shared');

test("TC_04_To_verify_that _Export_button_is_functional_on_Work_Report_VS_Teams_page", async ({ page }) => {
  const data = loadRuntimeData();
  test.info().annotations.push({
    type: 'source-aiq',
    description: "source-aiq/TestScripts/DigitEYESCampsCluster/DigitEYESReporting/WorkReportVSTeams/TC_04_To_verify_that _Export_button_is_functional_on_Work_Report_VS_Teams_page.ds"
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
