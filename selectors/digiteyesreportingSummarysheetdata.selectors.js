const digiteyesreportingSummarysheetdataSelectors = {
  reportingMenuButton: [
    { type: 'role', role: 'button', options: { name: /digiteyes reporting/i }, name: 'role:DigitEYES Reporting' },
    { type: 'text', value: 'DigitEYES Reporting', name: 'text:DigitEYES Reporting' },
    { type: 'css', value: 'button[data-bs-target="#dereport-collapse"]', name: 'css:#dereport-collapse toggle' }
  ],
  summarySheetDataLink: [
    { type: 'role', role: 'link', options: { name: /summary sheet data/i }, name: 'role:Summary Sheet Data' },
    { type: 'css', value: 'a[href="report-summarysheetdata.php"]', name: 'css:report-summarysheetdata.php' },
    { type: 'text', value: 'Summary Sheet Data', name: 'text:Summary Sheet Data' }
  ],
  summaryHeading: [
    { type: 'role', role: 'heading', options: { name: /report:\s*summary data/i }, name: 'role:Report Summary Data heading' },
    { type: 'text', value: 'Report: Summary Data', name: 'text:Report: Summary Data' },
    { type: 'xpath', value: '//h3[contains(normalize-space(),"Report: Summary Data")]', name: 'xpath:Report Summary Data heading' }
  ],
  refreshButton: [
    { type: 'role', role: 'button', options: { name: /^refresh$/i }, name: 'role:Refresh' },
    { type: 'text', value: 'Refresh', name: 'text:Refresh' }
  ],
  dateFromField: [
    { type: 'text', value: 'Date From', name: 'text:Date From' },
    { type: 'xpath', value: '//*[contains(text(),"Date From")]', name: 'xpath:Date From text' }
  ],
  dateToField: [
    { type: 'text', value: 'Date To', name: 'text:Date To' },
    { type: 'xpath', value: '//*[contains(text(),"Date To")]', name: 'xpath:Date To text' }
  ],
  runReportButton: [
    { type: 'role', role: 'button', options: { name: /run report/i }, name: 'role:Run Report' },
    { type: 'text', value: 'Run Report', name: 'text:Run Report' }
  ],
  exportXlsButton: [
    { type: 'role', role: 'button', options: { name: /export xls/i }, name: 'role:Export Xls' },
    { type: 'text', value: 'Export Xls', name: 'text:Export Xls' }
  ],
  countryLabel: [
    { type: 'xpath', value: '//main//*[normalize-space()="Country"]', name: 'xpath:main Country' },
    { type: 'text', value: 'Country', name: 'text:Country' },
    { type: 'xpath', value: '//*[contains(text(),"Country")]', name: 'xpath:Country text' }
  ],
  countryValueIndia: [
    { type: 'xpath', value: '//main//*[normalize-space()="India"]', name: 'xpath:main India' },
    { type: 'text', value: 'India', name: 'text:India' },
    { type: 'xpath', value: '//*[normalize-space()="India"]', name: 'xpath:India' }
  ],
  assistantManagerLabel: [
    { type: 'xpath', value: '//main//*[contains(normalize-space(),"Asst. Mgr.")]', name: 'xpath:main Asst. Mgr.' },
    { type: 'text', value: 'Asst. Mgr.', name: 'text:Asst. Mgr.' },
    { type: 'xpath', value: '//*[contains(text(),"Asst. Mgr.")]', name: 'xpath:Asst. Mgr.' }
  ]
};

module.exports = {
  digiteyesreportingSummarysheetdataSelectors
};
