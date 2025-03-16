// BasePage.js
const { getSelfHealingElement } = require('../utils/selfHealingUtils.js');
const locators = require('../locators/testing/loginPageLocators.js');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async getElement(locatorKey) {
    const locator = locators[locatorKey];
    console.log(locator);
    return await getSelfHealingElement(this.page, locator.primary, locator.fallbacks, 10000);
  }
}

module.exports = BasePage;
