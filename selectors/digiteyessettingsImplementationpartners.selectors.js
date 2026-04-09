const digiteyessettingsImplementationpartnersSelectors = {
  settingsMenuButton: [
    { type: 'role', role: 'button', options: { name: /digiteyes\s*settings/i }, name: 'role:DigitEYES Settings' },
    { type: 'css', value: 'button[data-bs-target="#digiteyes-settings"]', name: 'css:settings-toggle' },
    { type: 'text', value: 'DigitEYES Settings', name: 'text:DigitEYES Settings' }
  ],
  moduleLink: [
    { type: 'role', role: 'link', options: { name: /implementation partners/i }, name: 'role:Implementation Partners' },
    { type: 'css', value: 'a[href="implementationpartners.php"]', name: 'css:implementationpartners.php' },
    { type: 'text', value: 'Implementation Partners', name: 'text:Implementation Partners' }
  ],
  pageMarker: [
    { type: 'css', value: '#datatable', name: 'css:#datatable' },
    { type: 'text', value: 'Implementation Partners', name: 'text:Implementation Partners' }
  ],
  partnerNameField: [
    { type: 'css', value: '#DE_CS_ipname', name: 'css:#DE_CS_ipname' }
  ],
  salesforceCodeField: [
    { type: 'css', value: '#DE_CS_sfcode', name: 'css:#DE_CS_sfcode' }
  ],
  pageSizeSelect: [
    { type: 'css', value: '#cmbpagesize', name: 'css:#cmbpagesize' },
    { type: 'css', value: 'select[name="cmbpagesize"]', name: 'css:select[name=cmbpagesize]' }
  ],
  paginationSummary: [
    { type: 'css', value: '#datatable thead:nth-of-type(2) tr th:first-child', name: 'css:datatable pagination summary' },
    { type: 'text', value: 'Showing:', name: 'text:Showing:' }
  ],
  pagination: {
    next: [
      { type: 'css', value: '#pn_2', name: 'css:#pn_2' },
      { type: 'css', value: 'a[id^="pn_"]', name: 'css:a[id^=pn_]' }
    ],
    last: [
      { type: 'css', value: '#pg_3', name: 'css:#pg_3' },
      { type: 'css', value: 'a[id^="pg_"]', name: 'css:a[id^=pg_]' }
    ]
  }
};

module.exports = {
  digiteyessettingsImplementationpartnersSelectors
};
