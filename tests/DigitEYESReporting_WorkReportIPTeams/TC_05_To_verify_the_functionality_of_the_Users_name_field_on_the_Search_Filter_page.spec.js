const { test } = require('@playwright/test');
const {
  loadRuntimeData,
  loginAsAdmin,
  closeSession
} = require('./_shared');

test("TC_05_To_verify_the_functionality_of_the_Users_name_field_on_the_Search_Filter_page", async ({ page }) => {
  const data = loadRuntimeData();
  test.info().annotations.push({
    type: 'source-aiq',
    description: "source-aiq/TestScripts/DigitEYESCampsCluster/DigitEYESReporting/WorkReportIPTeams/TC_05_To_verify_the_functionality_of_the_Users_name_field_on_the_Search_Filter_page.ds"
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
