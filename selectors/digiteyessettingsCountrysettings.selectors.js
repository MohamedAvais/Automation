const digiteyessettingsCountrysettingsSelectors = {
  countrySettingsLink: [
    { type: 'text', value: 'Country Settings', name: 'text:Country Settings' },
    { type: 'css', value: 'a[href*="countrysettings.php"]', name: 'css:Country Settings link' },
    { type: 'xpath', value: '//*[@id="digiteyes-settings"]//a[contains(text(), "Country Settings")]', name: 'xpath:Country Settings link' },
    { type: 'xpath', value: '//div[@id="digiteyes-settings"]//ul//li[2]/a', name: 'xpath:Country Settings li[2]' }
  ],
  pageHeading: [
    { type: 'text', value: 'Country Settings', name: 'text:Country Settings heading' },
    { type: 'css', value: 'header h3', name: 'css:header h3' },
    { type: 'xpath', value: '//header/div[1]/h3', name: 'xpath:header h3' }
  ],
  configureButton: [
    { type: 'css', value: 'button[title="Configure"]', name: 'css:Configure button' },
    { type: 'xpath', value: '//button[@title="Configure"]', name: 'xpath:Configure button' },
    { type: 'xpath', value: '//table[@id="datatable"]//tbody//tr[1]//td[3]//button', name: 'xpath:Configure button first row' },
    { type: 'xpath', value: '//button[contains(@class, "btn-info")]//i[@class="fa fa-cogs"]', name: 'xpath:Configure cogs icon' }
  ]
};

module.exports = {
  digiteyessettingsCountrysettingsSelectors
};
