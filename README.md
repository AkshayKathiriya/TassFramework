# TaasFramework
## Installation
After cloning the repo, you need to run this command "npm install" on the project location terminal.

### Naming conventions:
1. Page Object Files and Classes
File Names: Use PascalCase for file names, ending with Page. Example: HomePage.js, LoginPage.js.

Class Names: Use PascalCase for class names, matching the file names. Example: class HomePage {}.

2. Functions and Variables
Functions: Use camelCase for function names, with descriptive names indicating their purpose. Example: navigateToHomePage(), login().

Variables: Use camelCase for variables, with clear and descriptive names. Example: const userNameInput = 'input[name="username"]'.

3. Test Files and Test Cases
Test Files: Use kebab-case for test file names, reflecting the functionality being tested. Example: home-page.test.js, login-functionality.test.js.

Test Cases: Use descriptive names for test case titles. Example: test('should navigate to home page successfully', async () => {}).

4. Data Folders and Files
Data Folders: Use kebab-case for folder names. Example: test-data, user-data.

Data Files: Use camelCase for data file names, ending with .json or .js. Example: userCredentials.json, testConfigurations.js.

5. Utility Files and Folders
Utility Folders: Use kebab-case for folder names. Example: utils, helpers.

Utility Files: Use camelCase for utility file names. Example: waitForElement.js, apiHelpers.js.
