const digiteyessettingsHospitalsSelectors = {
  settingsMenuButton: [
    { type: 'role', role: 'button', options: { name: /digiteyes\s*settings/i }, name: 'role:DigitEYES Settings' },
    { type: 'css', value: 'button[data-bs-target="#digiteyes-settings"]', name: 'css:settings-toggle' },
    { type: 'text', value: 'DigitEYES Settings', name: 'text:DigitEYES Settings' }
  ],
  moduleLink: [
    { type: 'role', role: 'link', options: { name: /hospitals/i }, name: 'role:Hospitals' },
    { type: 'css', value: 'a[href="hospitals.php"]', name: 'css:hospitals.php' },
    { type: 'text', value: 'Hospitals', name: 'text:Hospitals' }
  ],
  pageMarker: [
    { type: 'role', role: 'heading', options: { name: /hospitals/i }, name: 'role:Hospitals heading' },
    { type: 'css', value: '#datatable', name: 'css:#datatable' }
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
    ],
    previous: [
      { type: 'css', value: '#pp_2', name: 'css:#pp_2' },
      { type: 'css', value: 'a[id^="pp_"]', name: 'css:a[id^=pp_]' }
    ],
    first: [
      { type: 'css', value: '#pp_1', name: 'css:#pp_1' },
      { type: 'css', value: 'a[id^="pp_"]', name: 'css:a[id^=pp_]' }
    ]
  },
  tableHeaders: [
    { type: 'css', value: '#datatable thead:nth-of-type(1) tr th', name: 'css:datatable headers' }
  ],
  firstSortableHeader: [
    { type: 'css', value: '#datatable thead:nth-of-type(1) tr th:nth-child(2) span img', name: 'css:first sortable img' },
    { type: 'css', value: '#datatable thead:nth-of-type(1) tr th span img', name: 'css:any sortable img' }
  ],
  searchFilterButton: [
    { type: 'css', value: '#btnSearch', name: 'css:#btnSearch' },
    { type: 'role', role: 'button', options: { name: /search\s*\/\s*filter/i }, name: 'role:Search / Filter' }
  ],
  searchNameField: [
    { type: 'css', value: '#search_name', name: 'css:#search_name' }
  ],
  searchStateField: [
    { type: 'css', value: '#search_state', name: 'css:#search_state' }
  ],
  searchCountryField: [
    { type: 'css', value: '#search_country', name: 'css:#search_country' }
  ],
  searchIsActiveField: [
    { type: 'css', value: '#search_isactive', name: 'css:#search_isactive' }
  ],
  applyButton: [
    { type: 'css', value: '#frmSearch button[type="submit"]', name: 'css:frmSearch submit' },
    { type: 'role', role: 'button', options: { name: /apply/i }, name: 'role:Apply' }
  ],
  addButton: [
    { type: 'css', value: '#btnAdd', name: 'css:#btnAdd' },
    { type: 'role', role: 'button', options: { name: /add|new hospital/i }, name: 'role:Add/New Hospital' }
  ],
  editIcon: [
    { type: 'css', value: '#datatable tbody tr:first-child i.fa.fa-pencil', name: 'css:first row fa-pencil' },
    { type: 'css', value: 'i.fa.fa-pencil', name: 'css:any fa-pencil' }
  ],
  formCloseButton: [
    { type: 'role', role: 'button', options: { name: /^close$/i }, name: 'role:Close button' },
    { type: 'text', value: 'Close', name: 'text:Close' }
  ],
  topCloseButton: [
    { type: 'text', value: '× Close', name: 'text:× Close' }
  ],
  hospitalNameField: [
    { type: 'css', value: '#hospitalname', name: 'css:#hospitalname' }
  ],
  addressField: [
    { type: 'css', value: '#address', name: 'css:#address' }
  ],
  cityField: [
    { type: 'css', value: '#city', name: 'css:#city' }
  ],
  countryField: [
    { type: 'css', value: '#country', name: 'css:#country' }
  ],
  stateField: [
    { type: 'css', value: '#state', name: 'css:#state' }
  ],
  sfidField: [
    { type: 'css', value: '#sfid', name: 'css:#sfid' }
  ],
  isActiveCheckbox: [
    { type: 'css', value: '#isactive', name: 'css:#isactive' }
  ],
  saveButton: [
    { type: 'css', value: 'button[name="btnsubmit"]', name: 'css:button[name=btnsubmit]' },
    { type: 'role', role: 'button', options: { name: /save/i }, name: 'role:Save' }
  ],
  syncButton: [
    { type: 'css', value: '#btnSyncFromSF', name: 'css:#btnSyncFromSF' },
    { type: 'role', role: 'button', options: { name: /sync from sf/i }, name: 'role:Sync from SF' }
  ],
  processingToast: [
    { type: 'text', value: 'Processing.... Please wait...', name: 'text:processing toast' },
    { type: 'css', value: '#toast-container .toast-message', name: 'css:toast message' }
  ]
};

module.exports = {
  digiteyessettingsHospitalsSelectors
};
