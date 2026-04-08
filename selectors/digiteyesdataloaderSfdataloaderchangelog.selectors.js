const digiteyesdataloaderSfdataloaderchangelogSelectors = {
  moduleLabel: 'SF Data Loader Change Log',
  pageLabel: 'Salesforce Data Loader - Change Log heading',
  tableLabel: 'Salesforce Data Loader - Change Log listing table',
  dataLoaderMenu: [
    { type: 'role', role: 'link', options: { name: /digiteyes data loader/i }, name: 'role:DigitEYES Data Loader link' },
    { type: 'role', role: 'button', options: { name: /digiteyes data loader/i }, name: 'role:DigitEYES Data Loader button' },
    { type: 'text', value: 'DigitEYES Data Loader', name: 'text:DigitEYES Data Loader' }
  ],
  moduleLink: [
    { type: 'role', role: 'link', options: { name: /sf data loader\s*-\s*change log|salesforce data loader\s*-\s*change log/i }, name: 'role:Change Log link' },
    { type: 'text', value: 'SF Data Loader - Change Log', name: 'text:SF Data Loader - Change Log' },
    { type: 'text', value: 'Salesforce Data Loader - Change Log', name: 'text:Salesforce Data Loader - Change Log' },
    { type: 'xpath', value: '//a[contains(normalize-space(),"Change Log") and contains(normalize-space(),"Loader")]', name: 'xpath:Change Log link' }
  ],
  pageHeading: [
    { type: 'role', role: 'heading', options: { name: /salesforce data loader\s*-\s*change log|sf data loader\s*-\s*change log/i }, name: 'role:Change Log heading' },
    { type: 'text', value: 'Salesforce Data Loader - Change Log', name: 'text:Salesforce Data Loader - Change Log' },
    { type: 'text', value: 'SF Data Loader - Change Log', name: 'text:SF Data Loader - Change Log' },
    { type: 'xpath', value: '//h3[contains(normalize-space(),"Change Log")]', name: 'xpath:Change Log heading' }
  ],
  listingTable: [
    { type: 'css', value: '#datatable', name: 'css:#datatable' },
    { type: 'xpath', value: '//table[@id="datatable"]', name: 'xpath:#datatable' }
  ],
  searchFilterButton: [
    { type: 'role', role: 'button', options: { name: /search\s*\/\s*filter/i }, name: 'role:Search / Filter' },
    { type: 'css', value: '#btnSearch', name: 'css:#btnSearch' },
    { type: 'text', value: 'Search / Filter', name: 'text:Search / Filter' }
  ],
  refreshButton: [
    { type: 'role', role: 'button', options: { name: /^refresh$/i }, name: 'role:Refresh' },
    { type: 'text', value: 'Refresh', name: 'text:Refresh' }
  ],
  searchFilterModal: [
    { type: 'css', value: '#Modal_frmSearch', name: 'css:#Modal_frmSearch' },
    { type: 'css', value: '#frmSearch', name: 'css:#frmSearch' }
  ],
  searchLocationLabel: [
    { type: 'text', value: 'Location', name: 'text:Location' },
    { type: 'xpath', value: '//label[contains(normalize-space(),"Location")]', name: 'xpath:Location label' }
  ],
  searchLocationField: [
    { type: 'css', value: 'input[name="search_location"]', name: 'css:input[name=search_location]' },
    { type: 'css', value: '#search_location', name: 'css:#search_location' }
  ],
  searchApplyButton: [
    { type: 'role', role: 'button', options: { name: /^apply$/i }, name: 'role:Apply' },
    { type: 'text', value: 'Apply', name: 'text:Apply' },
    { type: 'xpath', value: '//form[@id="frmSearch"]//button[normalize-space()="Apply"]', name: 'xpath:Apply' }
  ],
  searchResetButton: [
    { type: 'role', role: 'button', options: { name: /^reset$/i }, name: 'role:Reset' },
    { type: 'text', value: 'Reset', name: 'text:Reset' },
    { type: 'xpath', value: '//form[@id="frmSearch"]//button[normalize-space()="Reset"]', name: 'xpath:Reset' }
  ],
  searchCloseButton: [
    { type: 'role', role: 'button', options: { name: /^close$/i }, name: 'role:Close' },
    { type: 'text', value: 'Close', name: 'text:Close' },
    { type: 'xpath', value: '//form[@id="frmSearch"]//button[normalize-space()="Close"]', name: 'xpath:Close' }
  ],
  pageSizeDropdown: [
    { type: 'css', value: '.dataTables_length select', name: 'css:.dataTables_length select' },
    { type: 'css', value: 'select[name="datatable_length"]', name: 'css:select[name=datatable_length]' },
    { type: 'css', value: 'main select', name: 'css:main select' },
    { type: 'xpath', value: '//select[.//option[contains(normalize-space(),"Show: 5")]]', name: 'xpath:Show records select' }
  ],
  searchTokenHeaders: ['Camp Information', 'Participant ID']
};

module.exports = {
  digiteyesdataloaderSfdataloaderchangelogSelectors
};
