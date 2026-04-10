const digiteyesreportingCamptrendsSelectors = {
  moduleLink: [
    { type: 'role', role: 'link', options: { name: /camp trends/i }, name: 'role:Camp Trends' },
    { type: 'css', value: 'a[href="camptrends.php"]', name: 'css:camptrends.php' },
    { type: 'text', value: 'Camp Trends', name: 'text:Camp Trends' }
  ],
  pageMarker: [
    { type: 'css', value: '#btnSearch', name: 'css:#btnSearch' },
    { type: 'role', role: 'button', options: { name: /search\s*\/\s*filter/i }, name: 'role:Search / Filter' }
  ],
  searchFilterButton: [
    { type: 'css', value: '#btnSearch', name: 'css:#btnSearch' },
    { type: 'role', role: 'button', options: { name: /search\s*\/\s*filter/i }, name: 'role:Search / Filter' }
  ],
  searchForm: [
    { type: 'css', value: '#frmSearch', name: 'css:#frmSearch' }
  ],
  countryField: [
    { type: 'css', value: '#search_countrycode', name: 'css:#search_countrycode' },
    { type: 'css', value: 'select[name="search_countrycode"]', name: 'css:select[name=search_countrycode]' }
  ],
  themeField: [
    { type: 'css', value: '#search_theme', name: 'css:#search_theme' }
  ],
  payerField: [
    { type: 'css', value: '#search_payercode', name: 'css:#search_payercode' }
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
  chartCanvas: [
    { type: 'css', value: '#Widget_Chart', name: 'css:#Widget_Chart' }
  ]
};

module.exports = {
  digiteyesreportingCamptrendsSelectors
};
