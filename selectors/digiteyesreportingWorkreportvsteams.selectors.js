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
  assistantManagerField: [
    { type: 'css', value: '#search_asstmanager', name: 'css:#search_asstmanager' }
  ],
  userEmailField: [
    { type: 'css', value: '#search_useremailid', name: 'css:#search_useremailid' }
  ],
  outreachInchargeField: [
    { type: 'css', value: '#search_outreachincharge', name: 'css:#search_outreachincharge' }
  ],
  applyButton: [
    { type: 'css', value: '#frmSearch .modal-footer .btn.btn-sm.btn-primary', name: 'css:Apply button' },
    { type: 'role', role: 'button', options: { name: /^apply$/i }, name: 'role:Apply' }
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
  ]
};

module.exports = {
  digiteyesreportingWorkreportvsteamsSelectors
};
