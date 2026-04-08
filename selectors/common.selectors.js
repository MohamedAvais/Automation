const commonSelectors = {
  loginUsername: [
    { type: 'label', value: 'Username', name: 'label:Username' },
    { type: 'css', value: '#i0116', name: 'css:#i0116' },
    { type: 'css', value: 'input[name="loginfmt"]', name: 'css:input[name=loginfmt]' },
    { type: 'css', value: '#username', name: 'css:#username' },
    { type: 'css', value: 'input[name="username"]', name: 'css:input[name=username]' },
    { type: 'xpath', value: '//*[@id="username"]', name: 'xpath:username' }
  ],
  loginPassword: [
    { type: 'label', value: 'Password', name: 'label:Password' },
    { type: 'css', value: '#i0118', name: 'css:#i0118' },
    { type: 'css', value: 'input[name="passwd"]', name: 'css:input[name=passwd]' },
    { type: 'css', value: '#password', name: 'css:#password' },
    { type: 'css', value: 'input[name="password"]', name: 'css:input[name=password]' },
    { type: 'xpath', value: '//*[@id="password"]', name: 'xpath:password' }
  ],
  rememberMe: [
    { type: 'css', value: '#rememberMe', name: 'css:#rememberMe' },
    { type: 'role', role: 'button', options: { name: /remember/i }, name: 'role:Remember' },
    { type: 'xpath', value: '//button[@id="rememberMe"]', name: 'xpath:rememberMe' }
  ],
  signIn: [
    { type: 'css', value: '#idSIButton9', name: 'css:#idSIButton9' },
    { type: 'role', role: 'button', options: { name: /sign in/i }, name: 'role:Sign In' },
    { type: 'role', role: 'button', options: { name: /next/i }, name: 'role:Next' },
    { type: 'css', value: 'button[name="login"]', name: 'css:button[name=login]' },
    { type: 'css', value: 'input[value="Sign in"]', name: 'css:input[value=Sign in]' },
    { type: 'css', value: 'input[value="Next"]', name: 'css:input[value=Next]' },
    { type: 'xpath', value: '//button[@name="login"]', name: 'xpath:button login' }
  ],
  staySignedInYes: [
    { type: 'role', role: 'button', options: { name: /^yes$/i }, name: 'role:Yes' },
    { type: 'css', value: '#idSIButton9', name: 'css:#idSIButton9' },
    { type: 'css', value: 'input[value="Yes"]', name: 'css:input[value=Yes]' }
  ],
  appSignIn: [
    { type: 'role', role: 'button', options: { name: /sign-?in with office 365/i }, name: 'role:Office 365 Sign In' },
    { type: 'text', value: 'Sign-in with Office 365', name: 'text:Sign-in with Office 365' },
    { type: 'role', role: 'button', options: { name: /^sign in$/i }, name: 'role:App Sign In' },
    { type: 'css', value: 'button.btn.btn-primary.btn-sm.full-width.m-b', name: 'css:app sign in button' },
    { type: 'xpath', value: '//button[contains(@class,"full-width") and normalize-space()="Sign in"]', name: 'xpath:app sign in' }
  ],
  loginCountryIndia: [
    { type: 'css', value: '#divLoginCountry label[for="btnLoginCountryIND"]', name: 'css:#divLoginCountry India label' },
    { type: 'xpath', value: '//*[@id="divLoginCountry"]//*[@for="btnLoginCountryIND"]', name: 'xpath:divLoginCountry India label' },
    { type: 'label', value: 'India', name: 'label:India' },
    { type: 'text', value: 'India', name: 'text:India' },
    { type: 'xpath', value: '//*[@for="btnLoginCountryIND"]', name: 'xpath:country India label' }
  ],
  loginReadyState: [
    { type: 'css', value: '#i0116', name: 'css:#i0116' },
    { type: 'css', value: 'input[name="loginfmt"]', name: 'css:input[name=loginfmt]' },
    { type: 'css', value: '#username', name: 'css:#username' }
  ],
  postLoginReady: [
    { type: 'text', value: 'Sign-in with Office 365', name: 'text:Sign-in with Office 365' },
    { type: 'css', value: '#divLoginCountry', name: 'css:#divLoginCountry' },
    { type: 'label', value: 'India', name: 'label:India' },
    { type: 'text', value: 'India', name: 'text:India' },
    { type: 'text', value: 'Management', name: 'text:Management' },
    { type: 'css', value: 'button.btn.btn-primary.btn-sm.full-width.m-b', name: 'css:app sign in button' }
  ],
  managementLanding: [
    { type: 'text', value: 'Management', name: 'text:Management' },
    { type: 'text', value: 'Admin CSR', name: 'text:Admin CSR' },
    { type: 'xpath', value: '//*[@id="root"]//p[contains(@class,"font-semibold")]', name: 'xpath:management landing' }
  ],
  userProfile: [
    { type: 'css', value: 'header span[class*="rounded-full"]', name: 'css:user profile badge' },
    { type: 'xpath', value: '//*[contains(@class,"rounded-full") and contains(@class,"bg-")]', name: 'xpath:user profile badge' }
  ],
  logout: [
    { type: 'role', role: 'link', options: { name: /log out|logout/i }, name: 'role:Logout link' },
    { type: 'role', role: 'button', options: { name: /log out|logout/i }, name: 'role:Logout button' },
    { type: 'role', role: 'menuitem', options: { name: /log out|logout/i }, name: 'role:Logout menuitem' },
    { type: 'text', value: 'Log out', name: 'text:Log out' },
    { type: 'text', value: 'Logout', name: 'text:Logout' },
    { type: 'xpath', value: '//*[contains(@class,"text-destructive-foreground") and .//*[name()="svg"]]', name: 'xpath:logout destructive item' },
    { type: 'xpath', value: '//div[contains(@class,"cursor-pointer") and .//*[name()="svg"]]', name: 'xpath:logout div with icon' }
  ]
};

module.exports = { commonSelectors };
