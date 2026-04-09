const digiteyesreportingPopinavailabilitySelectors = {
  moduleLink: [
    { type: 'role', role: 'link', options: { name: /popins availability/i }, name: 'role:Popins Availability' },
    { type: 'css', value: 'a[href="report-popins.php"]', name: 'css:report-popins.php' },
    { type: 'text', value: 'Popins Availability', name: 'text:Popins Availability' }
  ],
  pageMarker: [
    { type: 'text', value: 'Report: Popins Availability', name: 'text:Report: Popins Availability' },
    { type: 'css', value: '#search_datefrom', name: 'css:#search_datefrom' },
    { type: 'css', value: '#search_dateto', name: 'css:#search_dateto' }
  ],
  dateFromField: [
    { type: 'css', value: '#search_datefrom', name: 'css:#search_datefrom' }
  ],
  dateToField: [
    { type: 'css', value: '#search_dateto', name: 'css:#search_dateto' }
  ]
};

module.exports = {
  digiteyesreportingPopinavailabilitySelectors
};
