const digiteyesreportingWorkreportipteamsSelectors = {
  moduleLink: [
    { type: 'role', role: 'link', options: { name: /work report - ip teams/i }, name: 'role:Work Report - IP Teams' },
    { type: 'css', value: 'a[href="workreport-ip.php"]', name: 'css:workreport-ip.php' },
    { type: 'text', value: 'Work Report - IP Teams', name: 'text:Work Report - IP Teams' }
  ],
  pageMarker: [
    { type: 'css', value: '#btnSearch', name: 'css:#btnSearch' },
    { type: 'css', value: '#datatable', name: 'css:#datatable' }
  ],
  searchFilterButton: [
    { type: 'css', value: '#btnSearch', name: 'css:#btnSearch' },
    { type: 'role', role: 'button', options: { name: /search\s*\/\s*filter/i }, name: 'role:Search / Filter' }
  ],
  searchForm: [
    { type: 'css', value: '#frmSearch', name: 'css:#frmSearch' }
  ],
  userNameField: [
    { type: 'css', value: '#search_username', name: 'css:#search_username' }
  ],
  dateFromField: [
    { type: 'css', value: '#search_datefrom', name: 'css:#search_datefrom' }
  ],
  dateToField: [
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
  tableHeaderCells: '#datatable thead th'
};

module.exports = {
  digiteyesreportingWorkreportipteamsSelectors
};
