// clickWithRetry.js
//const { chromium } = require('playwright');

async function clickWithRetry(page, clickSelector, stopSelector, retries = 3, delay = 5000) {
    let attempt = 0;
    while (attempt < retries) {
        
            await clickSelector.click();
            await page.waitForTimeout(delay);
            
            // Check for the stopSelector visibility
            if (await stopSelector.isVisible()) {
                console.log(`${stopSelector} is visible. Stopping retries.`);
                break;
            }
            attempt++;
            console.log(`Retrying click on ${clickSelector} (${attempt}/${retries})`);
            if (attempt < retries) {
                await page.waitForTimeout(delay); // Wait before retrying
            }
        }
    }

module.exports = clickWithRetry;
