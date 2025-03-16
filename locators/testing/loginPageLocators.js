// locators.js
module.exports = {
    loginPageTitle: {
      primary: "//h2[contains(test(),'تسجيل الدخول')]",
      fallbacks: [
        '//div[@id="components"]//div//div//h2'
      ]
    },
    emailField: {
        primary: '//input[@type="text"]',
        fallbacks: [
          '//input[@data-identifier="zid-login-email-input"]'
        ]
      },
    // Define other elements similarly
  };
  