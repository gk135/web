# API Test Automation Project

## 🚀 Local Execution
### 0. Prerequisites
Before running the project, make sure you have the following installed:

- Node.js LTS 24.x
- npm (bundled with Node.js)

## Installation
1) Install project dependencies: `npm install`
2) Install Playwright browsers: `npx playwright install`

## Test Execution
1) Run the entire test suite with verbose logs: `npm run test`
2) Run predefined scenarios:  
`npm run test:complete-purchase `  
`npm run test:problem-user `  
`npm run test:sort-products `  
`npm run test:locked-out`  
3) (Optional) Generate and open an Allure report:  
 Generate: `npx allure generate ./allure-results --clean -o ./allure-report`   
 Open: `npx allure open ./allure-report`
