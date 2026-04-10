const digiteyesreportingWorkreportvsteamsSelectors = {
  moduleLink: [
    { type: 'role', role: 'link', options: { name: /work report - vs teams/i }, name: 'role:Work Report - VS Teams' },
    { type: 'css', value: 'a[href="report.php"]', name: 'css:report.php' },
    { type: 'text', value: 'Work Report - VS Teams', name: 'text:Work Report - VS Teams' }
  ],
  pageMarker: [
    { type: 'css', value: '#btnSearch', name: 'css:#btnSearch' },
    { type: 'text', value: 'Search / Filter', name: 'text:Search / Filter' },
    { type: 'css', value: '#datatable', name: 'css:#datatable' }
  ],
  searchFilterButton: [
    { type: 'css', value: '#btnSearch', name: 'css:#btnSearch' },
    { type: 'role', role: 'button', options: { name: /search\s*\/\s*filter/i }, name: 'role:Search / Filter' }
  ],
  searchForm: [
    { type: 'css', value: '#frmSearch', name: 'css:#frmSearch' }
  ],
  countryField: [
    { type: 'css', value: '#frmSearch:visible #search_countrycode', name: 'css:#frmSearch:visible #search_countrycode' },
    { type: 'css', value: '#search_countrycode', name: 'css:#search_countrycode' },
    { type: 'css', value: 'select[name="search_countrycode"]', name: 'css:select[name=search_countrycode]' }
  ],
  projectCodeField: [
    { type: 'css', value: '#frmSearch:visible #search_projectcode', name: 'css:#frmSearch:visible #search_projectcode' },
    { type: 'css', value: '#search_projectcode', name: 'css:#search_projectcode' },
    { type: 'css', value: 'input[name="search_projectcode"]', name: 'css:input[name=search_projectcode]' }
  ],
  assistantManagerField: [
    { type: 'css', value: '#frmSearch:visible #search_asstmanager', name: 'css:#frmSearch:visible #search_asstmanager' },
    { type: 'css', value: '#search_asstmanager', name: 'css:#search_asstmanager' }
  ],
  userEmailField: [
    { type: 'css', value: '#frmSearch:visible #search_useremailid', name: 'css:#frmSearch:visible #search_useremailid' },
    { type: 'css', value: '#search_useremailid', name: 'css:#search_useremailid' }
  ],
  outreachInchargeField: [
    { type: 'css', value: '#frmSearch:visible #search_outreachincharge', name: 'css:#frmSearch:visible #search_outreachincharge' },
    { type: 'css', value: '#search_outreachincharge', name: 'css:#search_outreachincharge' }
  ],
  dateFromField: [
    { type: 'css', value: '#frmSearch:visible #search_datefrom', name: 'css:#frmSearch:visible #search_datefrom' },
    { type: 'css', value: '#search_datefrom', name: 'css:#search_datefrom' }
  ],
  dateToField: [
    { type: 'css', value: '#frmSearch:visible #search_dateto', name: 'css:#frmSearch:visible #search_dateto' },
    { type: 'css', value: '#search_dateto', name: 'css:#search_dateto' }
  ],
  applyButton: [
    { type: 'css', value: '#frmSearch .modal-footer .btn.btn-sm.btn-primary', name: 'css:Apply button' },
    { type: 'role', role: 'button', options: { name: /^apply$/i }, name: 'role:Apply' }
  ],
  resetButton: [
    { type: 'css', value: '#frmSearch .modal-footer .btn.btn-sm.btn-secondary', name: 'css:Reset button' },
    { type: 'role', role: 'button', options: { name: /^reset$/i }, name: 'role:Reset' }
  ],
  closeButton: [
    { type: 'css', value: '#frmSearch .modal-footer button:has-text("Close"):visible', name: 'css:Close button' },
    { type: 'role', role: 'button', options: { name: /^close$/i }, name: 'role:Close' }
  ],
  exportButton: [
    { type: 'css', value: 'button:has-text("Export")', name: 'css:Export button' },
    { type: 'role', role: 'button', options: { name: /^export$/i }, name: 'role:Export' },
    { type: 'text', value: 'Export', name: 'text:Export' }
  ],
  noRecordsText: [
    { type: 'text', value: '(0) Records Found.', name: 'text:(0) Records Found.' }
  ],
  tableHeaderCells: '#datatable thead th'
};

module.exports = {
  digiteyesreportingWorkreportvsteamsSelectors
};
