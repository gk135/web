/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file');
type LoginPage = typeof import('./tests/pages/LoginPage');
type InventoryPage = typeof import('./tests/pages/InventoryPage');
type ItemDetailsPage = typeof import('./tests/pages/ItemDetailsPage');
type CartPage = typeof import('./tests/pages/CartPage');
type CheckoutPage = typeof import('./tests/pages/CheckoutPage');

declare namespace CodeceptJS {
  interface SupportObject { 
    I: I;
    current: any;
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    itemDetailsPage: ItemDetailsPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
  }
  interface Methods extends Playwright {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
