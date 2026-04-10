@echo off
echo RUN_START > run-headed-report.log
npm run allure:clean-results >> run-headed-report.log 2>&1
if errorlevel 1 (
  echo CLEAN_FAILED >> run-headed-report.log
  exit /b 1
)
.\node_modules\.bin\playwright test tests\DigitEYESCamps_DataForSalesforce --headed --workers=2 --reporter=allure-playwright >> run-headed-report.log 2>&1
if errorlevel 1 (
  echo PLAYWRIGHT_FAILED >> run-headed-report.log
  exit /b 1
)
npx allure generate allure-results --clean --single-file -o Result\Allure-DigitEYESCamps_DataForSalesforce-single >> run-headed-report.log 2>&1
if errorlevel 1 (
  echo ALLURE_GEN_FAILED >> run-headed-report.log
  exit /b 1
)
node scripts\customize-allure-report.js Result\Allure-DigitEYESCamps_DataForSalesforce-single >> run-headed-report.log 2>&1
if errorlevel 1 (
  echo CUSTOMIZE_FAILED >> run-headed-report.log
  exit /b 1
)
echo DONE >> run-headed-report.log
exit /b 0
