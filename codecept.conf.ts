import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
setHeadlessWhen(process.env.HEADLESS);

setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
    tests: './tests/**/*_test.ts',
    output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://www.saucedemo.com',
      show: false,
      waitForNavigation: 'load',
      waitForTimeout: 5000,
    }
  },
    include: {
        I: './steps_file',
        loginPage: './pages/LoginPage.ts',
        inventoryPage: './pages/InventoryPage.ts',
        itemDetailsPage: './pages/ItemDetailsPage.ts',
        cartPage: './pages/CartPage.ts',
        checkoutPage: './pages/CheckoutPage.ts',
    },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    allure: {
      enabled: true,
      require: 'allure-codeceptjs',
      outputDir: 'allure-results'  // Changed from 'output'
    },
    htmlReporter: {
      enabled: true
    },
    retryFailedStep: {
      enabled: true
    },
    eachElement: {
      enabled: true
    }
  },
  name: 'nexontis'
}