const digiteyescampsDataforsalesforceSelectors = {
  dataForSalesforceLink: [
    { type: 'role', role: 'link', options: { name: /data for salesforce/i }, name: 'role:Data for Salesforce' },
    { type: 'css', value: 'a[href="manage-camps-patients-salesforce.php"]', name: 'css:manage-camps-patients-salesforce.php' },
    { type: 'text', value: 'Data for Salesforce', name: 'text:Data for Salesforce' }
  ],
  pageHeading: [
    { type: 'role', role: 'heading', options: { name: /data for salesforce/i }, name: 'role:Data for Salesforce heading' },
    { type: 'text', value: 'Data for Salesforce', name: 'text:Data for Salesforce' },
    { type: 'xpath', value: '//header//h3[normalize-space()="Data for Salesforce"]', name: 'xpath:Data for Salesforce heading' }
  ],
  refreshButton: [
    { type: 'role', role: 'button', options: { name: /^refresh$/i }, name: 'role:Refresh' },
    { type: 'text', value: 'Refresh', name: 'text:Refresh' },
    { type: 'css', value: 'header button.btn.btn-info.btn-sm', name: 'css:header refresh button' }
  ],
  listingTable: [
    { type: 'css', value: '#datatable', name: 'css:#datatable' },
    { type: 'xpath', value: '//table[@id="datatable"]', name: 'xpath:#datatable' }
  ],
  viewSummaryReportButton: [
    { type: 'css', value: '.btnViewSummaryReport', name: 'css:.btnViewSummaryReport' },
    { type: 'role', role: 'button', options: { name: /view summary report/i }, name: 'role:View Summary Report' },
    { type: 'text', value: 'View Summary Report', name: 'text:View Summary Report' }
  ],
  viewSummaryReportHeading: [
    { type: 'css', value: '#lblDetailsTitle', name: 'css:#lblDetailsTitle' },
    { type: 'role', role: 'heading', options: { name: /view summary report/i }, name: 'role:View Summary Report heading' },
    { type: 'text', value: 'View Summary Report', name: 'text:View Summary Report heading' }
  ],
  viewSummaryReportTitle: [
    { type: 'text', value: 'Vision Access Programs - Daily Outreach Summary Report', name: 'text:Daily Outreach Summary Report' },
    { type: 'xpath', value: '//*[@id="divDetailsContent"]//*[contains(normalize-space(),"Vision Access Programs - Daily Outreach Summary Report")]', name: 'xpath:Daily Outreach Summary Report' }
  ],
  markDataImportedButton: [
    { type: 'css', value: '.btnMarkDownloaded', name: 'css:.btnMarkDownloaded' },
    { type: 'role', role: 'button', options: { name: /mark data imported to salesforce/i }, name: 'role:Mark Data Imported to Salesforce' },
    { type: 'text', value: 'Mark Data Imported to Salesforce', name: 'text:Mark Data Imported to Salesforce' }
  ],
  downloadXlsButton: [
    { type: 'css', value: '.btnDownloadXLS', name: 'css:.btnDownloadXLS' },
    { type: 'role', role: 'button', options: { name: /^xls$/i }, name: 'role:XLS' },
    { type: 'text', value: 'XLS', name: 'text:XLS' }
  ],
  downloadCsvButton: [
    { type: 'css', value: '.btnDownloadCSV', name: 'css:.btnDownloadCSV' },
    { type: 'role', role: 'button', options: { name: /^csv$/i }, name: 'role:CSV' },
    { type: 'text', value: 'CSV', name: 'text:CSV' }
  ],
  showDatesButton: [
    { type: 'role', role: 'button', options: { name: /show dates/i }, name: 'role:Show Dates' },
    { type: 'xpath', value: '//table[@id="datatable"]//button[normalize-space()="Show Dates"]', name: 'xpath:Show Dates' },
    { type: 'text', value: 'Show Dates', name: 'text:Show Dates' }
  ],
  pushGeoToSalesforceButton: [
    { type: 'role', role: 'button', options: { name: /push geo to salesforce/i }, name: 'role:Push GEO to Salesforce' },
    { type: 'css', value: '.btnPushGEOToSalesforce', name: 'css:.btnPushGEOToSalesforce' },
    { type: 'text', value: 'Push GEO to Salesforce', name: 'text:Push GEO to Salesforce' }
  ],
  pushConsentButton: [
    { type: 'role', role: 'button', options: { name: /push consent/i }, name: 'role:Push Consent' },
    { type: 'css', value: 'button.btn-sm.btn-secondary', name: 'css:Push Consent button' },
    { type: 'text', value: 'Push Consent', name: 'text:Push Consent' }
  ],
  consentOnSharePointPendingHeading: [
    { type: 'role', role: 'heading', options: { name: /consent on sharepoint pending/i }, name: 'role:Consent on SharePoint Pending heading' },
    { type: 'text', value: 'Consent on SharePoint Pending', name: 'text:Consent on SharePoint Pending' },
    { type: 'xpath', value: '//header//h3[normalize-space()="Consent on SharePoint Pending"]', name: 'xpath:Consent on SharePoint Pending' }
  ],
  geoPushErrorMessage: [
    { type: 'css', value: '.alert.alert-danger, .alert-danger, #toast-container .toast-message', name: 'css:GEO error message' },
    { type: 'text', value: 'External ID', name: 'text:External ID' },
    { type: 'text', value: 'error', name: 'text:error' }
  ]
};

module.exports = {
  digiteyescampsDataforsalesforceSelectors
};
