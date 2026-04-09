const digiteyessettingsCountrysettingsSelectors = {
  settingsMenuButton: [
    { type: 'role', role: 'button', options: { name: /digiteyes\s*settings/i }, name: 'role:DigitEYES Settings' },
    { type: 'css', value: 'button[data-bs-target="#digiteyes-settings"]', name: 'css:settings-toggle' },
    { type: 'text', value: 'DigitEYES Settings', name: 'text:DigitEYES Settings' }
  ],
  moduleLink: [
    { type: 'role', role: 'link', options: { name: /country settings/i }, name: 'role:Country Settings' },
    { type: 'css', value: 'a[href="countrysettings.php"]', name: 'css:countrysettings.php' },
    { type: 'text', value: 'Country Settings', name: 'text:Country Settings' }
  ],
  pageMarker: [
    { type: 'role', role: 'heading', options: { name: /country settings/i }, name: 'role:Country Settings heading' },
    { type: 'css', value: 'header h3.m-0', name: 'css:header h3.m-0' }
  ],
  configureIcon: [
    { type: 'css', value: '#datatable tbody tr:first-child i.fa.fa-cogs', name: 'css:first row fa-cogs' },
    { type: 'css', value: 'i.fa.fa-cogs', name: 'css:any fa-cogs' }
  ]
};

module.exports = {
  digiteyessettingsCountrysettingsSelectors
};
