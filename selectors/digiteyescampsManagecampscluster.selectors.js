const digiteyescampsManagecampsclusterSelectors = {
  campClusterHeading: [
    { type: 'role', role: 'heading', options: { name: /camp cluster/i }, name: 'role:Camp Cluster heading' },
    { type: 'text', value: 'Camp Cluster', name: 'text:Camp Cluster' },
    { type: 'css', value: 'header h3.m-0', name: 'css:header h3.m-0' },
    { type: 'xpath', value: '//header//h3[normalize-space()="Camp Cluster"]', name: 'xpath:Camp Cluster heading' }
  ],
  newCampClusterButton: [
    { type: 'role', role: 'button', options: { name: /new camp cluster/i }, name: 'role:New Camp Cluster' },
    { type: 'css', value: '#btnAdd', name: 'css:#btnAdd' },
    { type: 'xpath', value: '//button[@id="btnAdd"]', name: 'xpath:#btnAdd' }
  ],
  searchFilterButton: [
    { type: 'role', role: 'button', options: { name: /search\s*\/\s*filter/i }, name: 'role:Search / Filter' },
    { type: 'css', value: '#btnSearch', name: 'css:#btnSearch' },
    { type: 'xpath', value: '//button[@id="btnSearch"]', name: 'xpath:#btnSearch' }
  ],
  exportButton: [
    { type: 'role', role: 'button', options: { name: /^export$/i }, name: 'role:Export' },
    { type: 'text', value: 'Export', name: 'text:Export' }
  ],
  refreshButton: [
    { type: 'role', role: 'button', options: { name: /^refresh$/i }, name: 'role:Refresh' },
    { type: 'text', value: 'Refresh', name: 'text:Refresh' },
    { type: 'css', value: 'button[type="submit"]', name: 'css:button[type=submit]' }
  ],
  countryField: [
    { type: 'css', value: '#DE_Camp_countrycode', name: 'css:#DE_Camp_countrycode' },
    { type: 'css', value: 'select[name="DE_Camp_countrycode"]', name: 'css:select[name=DE_Camp_countrycode]' },
    { type: 'xpath', value: '//select[@id="DE_Camp_countrycode"]', name: 'xpath:#DE_Camp_countrycode' }
  ],
  payerField: [
    { type: 'css', value: '#DE_Camp_payercode', name: 'css:#DE_Camp_payercode' },
    { type: 'css', value: 'select[name="DE_Camp_payercode"]', name: 'css:select[name=DE_Camp_payercode]' },
    { type: 'xpath', value: '//select[@id="DE_Camp_payercode"]', name: 'xpath:#DE_Camp_payercode' }
  ],
  projectCodeField: [
    { type: 'css', value: '#DE_Camp_projectcode', name: 'css:#DE_Camp_projectcode' },
    { type: 'css', value: 'select[name="DE_Camp_projectcode"]', name: 'css:select[name=DE_Camp_projectcode]' },
    { type: 'xpath', value: '//select[@id="DE_Camp_projectcode"]', name: 'xpath:#DE_Camp_projectcode' }
  ],
  campNameField: [
    { type: 'css', value: '#DE_Camp_projectname', name: 'css:#DE_Camp_projectname' },
    { type: 'css', value: 'input[name="DE_Camp_projectname"]', name: 'css:input[name=DE_Camp_projectname]' },
    { type: 'xpath', value: '//input[@id="DE_Camp_projectname"]', name: 'xpath:#DE_Camp_projectname' }
  ],
  campThemeField: [
    { type: 'css', value: '#DE_Camp_camptheme', name: 'css:#DE_Camp_camptheme' },
    { type: 'css', value: 'select[name="DE_Camp_camptheme"]', name: 'css:select[name=DE_Camp_camptheme]' },
    { type: 'xpath', value: '//select[@id="DE_Camp_camptheme"]', name: 'xpath:#DE_Camp_camptheme' }
  ],
  locationField: [
    { type: 'css', value: '#DE_Camp_location', name: 'css:#DE_Camp_location' },
    { type: 'css', value: 'input[name="DE_Camp_location"]', name: 'css:input[name=DE_Camp_location]' },
    { type: 'xpath', value: '//input[@id="DE_Camp_location"]', name: 'xpath:#DE_Camp_location' }
  ],
  addressField: [
    { type: 'css', value: '#DE_Camp_address', name: 'css:#DE_Camp_address' },
    { type: 'css', value: 'input[name="DE_Camp_address"]', name: 'css:input[name=DE_Camp_address]' },
    { type: 'xpath', value: '//input[@id="DE_Camp_address"]', name: 'xpath:#DE_Camp_address' }
  ],
  cityField: [
    { type: 'css', value: '#DE_Camp_city', name: 'css:#DE_Camp_city' },
    { type: 'css', value: 'input[name="DE_Camp_city"]', name: 'css:input[name=DE_Camp_city]' },
    { type: 'xpath', value: '//input[@id="DE_Camp_city"]', name: 'xpath:#DE_Camp_city' }
  ],
  stateField: [
    { type: 'css', value: '#DE_Camp_state', name: 'css:#DE_Camp_state' },
    { type: 'css', value: 'select[name="DE_Camp_state"]', name: 'css:select[name=DE_Camp_state]' },
    { type: 'xpath', value: '//select[@id="DE_Camp_state"]', name: 'xpath:#DE_Camp_state' }
  ],
  endDateField: [
    { type: 'css', value: '#DE_Camp_enddate', name: 'css:#DE_Camp_enddate' },
    { type: 'css', value: 'input[name="DE_Camp_enddate"]', name: 'css:input[name=DE_Camp_enddate]' },
    { type: 'xpath', value: '//input[@id="DE_Camp_enddate"]', name: 'xpath:#DE_Camp_enddate' }
  ],
  conductedByField: [
    { type: 'css', value: '#DE_Camp_conductedby', name: 'css:#DE_Camp_conductedby' },
    { type: 'css', value: 'select[name="DE_Camp_conductedby"]', name: 'css:select[name=DE_Camp_conductedby]' },
    { type: 'xpath', value: '//select[@id="DE_Camp_conductedby"]', name: 'xpath:#DE_Camp_conductedby' }
  ],
  ipNameField: [
    { type: 'css', value: '#DE_Camp_ipid', name: 'css:#DE_Camp_ipid' },
    { type: 'css', value: 'select[name="DE_Camp_ipid"]', name: 'css:select[name=DE_Camp_ipid]' },
    { type: 'xpath', value: '//select[@id="DE_Camp_ipid"]', name: 'xpath:#DE_Camp_ipid' }
  ],
  ipTeamField: [
    { type: 'css', value: '#DE_Camp_ipteamid', name: 'css:#DE_Camp_ipteamid' },
    { type: 'css', value: 'select[name="DE_Camp_ipteamid"]', name: 'css:select[name=DE_Camp_ipteamid]' },
    { type: 'xpath', value: '//select[@id="DE_Camp_ipteamid"]', name: 'xpath:#DE_Camp_ipteamid' }
  ],
  campTypeField: [
    { type: 'css', value: '#DE_Camp_camptype', name: 'css:#DE_Camp_camptype' },
    { type: 'css', value: 'select[name="DE_Camp_camptype"]', name: 'css:select[name=DE_Camp_camptype]' },
    { type: 'xpath', value: '//select[@id="DE_Camp_camptype"]', name: 'xpath:#DE_Camp_camptype' }
  ],
  mobilePrefixField: [
    { type: 'css', value: '#DE_Camp_mobilenoprefix', name: 'css:#DE_Camp_mobilenoprefix' },
    { type: 'css', value: 'input[name="DE_Camp_mobilenoprefix"]', name: 'css:input[name=DE_Camp_mobilenoprefix]' },
    { type: 'xpath', value: '//input[@id="DE_Camp_mobilenoprefix"]', name: 'xpath:#DE_Camp_mobilenoprefix' }
  ],
  visionChartField: [
    { type: 'css', value: '#DE_Camp_visionchart', name: 'css:#DE_Camp_visionchart' },
    { type: 'css', value: 'select[name="DE_Camp_visionchart"]', name: 'css:select[name=DE_Camp_visionchart]' },
    { type: 'xpath', value: '//select[@id="DE_Camp_visionchart"]', name: 'xpath:#DE_Camp_visionchart' }
  ],
  secondGlassField: [
    { type: 'css', value: '#DE_Camp_secondglass', name: 'css:#DE_Camp_secondglass' },
    { type: 'css', value: 'select[name="DE_Camp_secondglass"]', name: 'css:select[name=DE_Camp_secondglass]' },
    { type: 'xpath', value: '//select[@id="DE_Camp_secondglass"]', name: 'xpath:#DE_Camp_secondglass' }
  ],
  manageSkuField: [
    { type: 'css', value: '#DE_Camp_managesku', name: 'css:#DE_Camp_managesku' },
    { type: 'css', value: 'select[name="DE_Camp_managesku"]', name: 'css:select[name=DE_Camp_managesku]' },
    { type: 'xpath', value: '//select[@id="DE_Camp_managesku"]', name: 'xpath:#DE_Camp_managesku' }
  ],
  schoolIdField: [
    { type: 'css', value: '#DE_Camp_schoolid', name: 'css:#DE_Camp_schoolid' },
    { type: 'css', value: 'input[name="DE_Camp_schoolid"]', name: 'css:input[name=DE_Camp_schoolid]' },
    { type: 'xpath', value: '//input[@id="DE_Camp_schoolid"]', name: 'xpath:#DE_Camp_schoolid' }
  ],
  latitudeField: [
    { type: 'css', value: '#DE_Camp_latitude', name: 'css:#DE_Camp_latitude' },
    { type: 'css', value: 'input[name="DE_Camp_latitude"]', name: 'css:input[name=DE_Camp_latitude]' },
    { type: 'xpath', value: '//input[@id="DE_Camp_latitude"]', name: 'xpath:#DE_Camp_latitude' }
  ],
  longitudeField: [
    { type: 'css', value: '#DE_Camp_longitude', name: 'css:#DE_Camp_longitude' },
    { type: 'css', value: 'input[name="DE_Camp_longitude"]', name: 'css:input[name=DE_Camp_longitude]' },
    { type: 'xpath', value: '//input[@id="DE_Camp_longitude"]', name: 'xpath:#DE_Camp_longitude' }
  ],
  listingTable: [
    { type: 'css', value: '#datatable', name: 'css:#datatable' },
    { type: 'xpath', value: '//table[@id="datatable"]', name: 'xpath:#datatable' }
  ],
  listingRows: [
    { type: 'css', value: '#datatable tbody tr', name: 'css:#datatable tbody tr' },
    { type: 'xpath', value: '//table[@id="datatable"]/tbody/tr', name: 'xpath:#datatable tbody tr' }
  ],
  paginationPageSize: [
    { type: 'css', value: '#cmbpagesize', name: 'css:#cmbpagesize' },
    { type: 'css', value: 'select[name="cmbpagesize"]', name: 'css:select[name=cmbpagesize]' },
    { type: 'xpath', value: '//select[@id="cmbpagesize"]', name: 'xpath:#cmbpagesize' }
  ],
  searchFilterForm: [
    { type: 'css', value: '#frmSearch', name: 'css:#frmSearch' },
    { type: 'xpath', value: '//form[@id="frmSearch"]', name: 'xpath:#frmSearch' }
  ],
  searchCountryField: [
    { type: 'css', value: '#search_countrycode', name: 'css:#search_countrycode' },
    { type: 'css', value: 'select[name="search_countrycode"]', name: 'css:select[name=search_countrycode]' }
  ],
  searchThemeField: [
    { type: 'css', value: '#search_theme', name: 'css:#search_theme' },
    { type: 'css', value: 'select[name="search_theme"]', name: 'css:select[name=search_theme]' }
  ],
  searchPayerField: [
    { type: 'css', value: '#search_payercode', name: 'css:#search_payercode' },
    { type: 'css', value: 'select[name="search_payercode"]', name: 'css:select[name=search_payercode]' }
  ],
  searchProjectCodeField: [
    { type: 'css', value: '#search_projectcode', name: 'css:#search_projectcode' },
    { type: 'css', value: 'select[name="search_projectcode"]', name: 'css:select[name=search_projectcode]' }
  ],
  searchAssistantManagerField: [
    { type: 'css', value: '#search_asstmanager', name: 'css:#search_asstmanager' },
    { type: 'css', value: 'input[name="search_asstmanager"]', name: 'css:input[name=search_asstmanager]' }
  ],
  searchDateFromField: [
    { type: 'css', value: '#search_datefrom', name: 'css:#search_datefrom' },
    { type: 'css', value: 'input[name="search_datefrom"]', name: 'css:input[name=search_datefrom]' }
  ],
  searchDateToField: [
    { type: 'css', value: '#search_dateto', name: 'css:#search_dateto' },
    { type: 'css', value: 'input[name="search_dateto"]', name: 'css:input[name=search_dateto]' }
  ],
  searchProgramManagerField: [
    { type: 'css', value: '#search_programmanager', name: 'css:#search_programmanager' },
    { type: 'css', value: 'input[name="search_programmanager"]', name: 'css:input[name=search_programmanager]' }
  ],
  searchOutreachInchargeField: [
    { type: 'css', value: '#search_outreachincharge', name: 'css:#search_outreachincharge' },
    { type: 'css', value: 'input[name="search_outreachincharge"]', name: 'css:input[name=search_outreachincharge]' }
  ],
  searchDateFromLabel: [
    { type: 'xpath', value: '//*[@id="frmSearch"]//*[normalize-space()="Date From"]', name: 'xpath:Date From label' },
    { type: 'text', value: 'Date From', name: 'text:Date From' }
  ],
  searchDateToLabel: [
    { type: 'xpath', value: '//*[@id="frmSearch"]//*[normalize-space()="Date To"]', name: 'xpath:Date To label' },
    { type: 'text', value: 'Date To', name: 'text:Date To' }
  ],
  searchCountryLabel: [
    { type: 'xpath', value: '//*[@id="frmSearch"]//*[normalize-space()="Country"]', name: 'xpath:Country label' },
    { type: 'text', value: 'Country', name: 'text:Country' }
  ],
  searchThemeLabel: [
    { type: 'xpath', value: '//*[@id="frmSearch"]//*[normalize-space()="Theme"]', name: 'xpath:Theme label' },
    { type: 'text', value: 'Theme', name: 'text:Theme' }
  ],
  searchPayerLabel: [
    { type: 'xpath', value: '//*[@id="frmSearch"]//*[normalize-space()="Payer"]', name: 'xpath:Payer label' },
    { type: 'text', value: 'Payer', name: 'text:Payer' }
  ],
  searchProjectCodeLabel: [
    { type: 'xpath', value: '//*[@id="frmSearch"]//*[normalize-space()="Project Code"]', name: 'xpath:Project Code label' },
    { type: 'text', value: 'Project Code', name: 'text:Project Code' }
  ],
  searchAssistantManagerLabel: [
    { type: 'xpath', value: '//*[@id="frmSearch"]//*[normalize-space()="Asst. Manager"]', name: 'xpath:Asst. Manager label' },
    { type: 'text', value: 'Asst. Manager', name: 'text:Asst. Manager' }
  ],
  searchProgramManagerLabel: [
    { type: 'xpath', value: '//*[@id="frmSearch"]//*[normalize-space()="Program Manager"]', name: 'xpath:Program Manager label' },
    { type: 'text', value: 'Program Manager', name: 'text:Program Manager' }
  ],
  searchOutreachInchargeLabel: [
    { type: 'xpath', value: '//*[@id="frmSearch"]//*[normalize-space()="Outreach Incharge"]', name: 'xpath:Outreach Incharge label' },
    { type: 'text', value: 'Outreach Incharge', name: 'text:Outreach Incharge' }
  ],
  searchStatusLabel: [
    { type: 'xpath', value: '//*[@id="frmSearch"]//*[normalize-space()="Status"]', name: 'xpath:Status label' },
    { type: 'text', value: 'Status', name: 'text:Status' }
  ],
  searchStatusNewOpen: [
    { type: 'xpath', value: '//*[@id="frmSearch"]//*[normalize-space()="New / Open"]', name: 'xpath:New / Open' },
    { type: 'text', value: 'New / Open', name: 'text:New / Open' }
  ],
  searchStatusRunning: [
    { type: 'xpath', value: '//*[@id="frmSearch"]//*[normalize-space()="Running"]', name: 'xpath:Running' },
    { type: 'text', value: 'Running', name: 'text:Running' }
  ],
  searchStatusClosed: [
    { type: 'xpath', value: '//*[@id="frmSearch"]//*[normalize-space()="Closed"]', name: 'xpath:Closed' },
    { type: 'text', value: 'Closed', name: 'text:Closed' }
  ],
  searchApplyButton: [
    { type: 'role', role: 'button', options: { name: /^apply$/i }, name: 'role:Apply' },
    { type: 'xpath', value: '//*[@id="frmSearch"]//button[contains(@class,"btn-primary")]', name: 'xpath:Apply button' }
  ],
  searchResetButton: [
    { type: 'role', role: 'button', options: { name: /^reset$/i }, name: 'role:Reset' },
    { type: 'xpath', value: '//*[@id="frmSearch"]//button[contains(@class,"btn-secondary")]', name: 'xpath:Reset button' }
  ],
  saveButton: [
    { type: 'role', role: 'button', options: { name: /^save$/i }, name: 'role:Save' },
    { type: 'css', value: '#btnsubmit', name: 'css:#btnsubmit' },
    { type: 'xpath', value: '//button[@id="btnsubmit"]', name: 'xpath:#btnsubmit' }
  ]
};

module.exports = {
  digiteyescampsManagecampsclusterSelectors
};
