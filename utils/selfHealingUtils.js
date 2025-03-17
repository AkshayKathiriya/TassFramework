// selfHealingUtils.js
//const {expect} = require('@playwright/test');

async function getSelfHealingElement(page, primarySelector, fallbackSelectors = [], timeout = 15000) {
    try {
      //await expect(page.primarySelector).toBeVisible({ timeout: 10000 });
      //const element = primarySelector;
      await page.locator(primarySelector).isVisible({ timeout: 5000 });
      const element = page.locator(primarySelector);
      console.log(element);
      return element;
    } catch (primaryError) {
      console.warn(`Primary selector "${primarySelector}" not found. Checking fallbacks...`);
    }
  
    for (const selector of fallbackSelectors) {
      try {
        await page.locator(selector).isVisible({ timeout: 5000 });
        const element = page.locator(primarySelector);
        console.info(`Recovered element using fallback selector "${selector}"`);
        return element;
      } catch (fallbackError) {
        console.debug(`Fallback selector "${selector}" failed.`);
      }
    }
  
    throw new Error(`Element not found after trying primary selector "${primarySelector}" and fallbacks ${fallbackSelectors.join(', ')}`);
  }
  
  module.exports = { getSelfHealingElement };
  