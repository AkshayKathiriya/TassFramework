// fixtures.js
const { test: base } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Extend base test with the fixture
const test = base.extend({
  testData: async ({}, use, testInfo) => {
    const configFilePath = path.resolve(__dirname, '../playwright.config.js');
    const config = require(configFilePath);
    const project = config.projects.find(proj => proj.name === testInfo.project.name);

    let combinedData = {};
    for (const dataFilePath of project.testData) {
      const absolutePath = path.resolve(__dirname,'../', dataFilePath);
      const data = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
      combinedData = { ...combinedData, ...data };
    }


      //const testDataPath = path.resolve(__dirname, '../', config.testData);
      //const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));

    // Pass the test data to the test case
    await use(combinedData);
  },
});

module.exports = {
  test,
};
