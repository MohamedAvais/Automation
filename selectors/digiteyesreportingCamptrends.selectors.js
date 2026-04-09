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
  ]
};

module.exports = {
  digiteyesreportingCamptrendsSelectors
};
