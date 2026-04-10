Write-Host "START_RUN"
npm run allure:clean-results
if ($LASTEXITCODE -ne 0) { Write-Host "CLEAN_FAILED"; exit $LASTEXITCODE }
.\node_modules\.bin\playwright test tests\DigitEYESCamps_DataForSalesforce --workers=1 --headed --reporter=allure-playwright
if ($LASTEXITCODE -ne 0) { Write-Host "PLAYWRIGHT_FAILED"; exit $LASTEXITCODE }
npx allure generate allure-results --clean --single-file -o Result\Allure-DigitEYESCamps_DataForSalesforce-single
if ($LASTEXITCODE -ne 0) { Write-Host "ALLURE_GENERATE_FAILED"; exit $LASTEXITCODE }
node scripts\customize-allure-report.js Result\Allure-DigitEYESCamps_DataForSalesforce-single
if ($LASTEXITCODE -ne 0) { Write-Host "CUSTOMIZE_FAILED"; exit $LASTEXITCODE }
Write-Host "DONE"
