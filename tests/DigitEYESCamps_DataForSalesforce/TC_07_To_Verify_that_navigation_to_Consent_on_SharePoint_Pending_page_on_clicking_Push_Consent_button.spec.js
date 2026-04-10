const { test } = require('@playwright/test');
const {
  loadRuntimeData,
  loginAsAdmin,
  closeSession,
  digiteyescampsDataforsalesforceHelpers
} = require('./_shared');

test("TC_07_To_Verify_that_navigation_to_Consent_on_SharePoint_Pending_page_on_clicking_Push_Consent_button", async ({ page }) => {
  const data = loadRuntimeData();
  test.info().annotations.push({
    type: 'source-aiq',
    description: "source-aiq/TestScripts/DigitEYESCampsCluster/DigitEYESCamps/DataForSalesforce/TC_07_To_Verify_that_navigation_to_Consent_on_SharePoint_Pending_page_on_clicking_Push_Consent_button.ds"
  });

  await test.step('Login into Application', async () => {
    await loginAsAdmin(page, data);
  });

  await test.step('Open Data for Salesforce and verify the push consent navigation workflow', async () => {
    await digiteyescampsDataforsalesforceHelpers.openModule(page, data.visionSpringCountry);
    await digiteyescampsDataforsalesforceHelpers.clickPushConsent(page);
    await digiteyescampsDataforsalesforceHelpers.expectConsentOnSharePointPendingPage(page);
  });

  await test.step('Logout from the application', async () => {
    await closeSession(page);
  });
});
