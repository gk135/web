Feature('Sauce Demo - Web Automation Tests');

Scenario('Scenario_1: Add all items, remove third item, and complete purchase', async ({
                                                                                           I,
                                                                                           loginPage,
                                                                                           inventoryPage,
                                                                                           cartPage,
                                                                                           checkoutPage
                                                                                       }) => {
    loginPage.loginAsStandardUser();
    I.see('Products', '.title');

    await inventoryPage.addAllItemsToCart();

    cartPage.goToCart();

    const remainingItems = await cartPage.removeThirdItemAndVerify();

    checkoutPage.startCheckout();
    checkoutPage.fillCustomerInformation('John', 'Doe', '12345');

    const thirdItemName = 'Sauce Labs Bolt T-Shirt';
    await checkoutPage.verifyCheckoutOverview(remainingItems, thirdItemName);

    checkoutPage.completePurchase();
    checkoutPage.verifyOrderConfirmation();
});

Scenario('Scenario_2: Login as problem_user, find item, add to cart, and validate', async ({
                                                                                               I,
                                                                                               loginPage,
                                                                                               inventoryPage,
                                                                                               itemDetailsPage,
                                                                                               cartPage
                                                                                           }) => {
    const itemName = 'Sauce Labs Backpack';

    loginPage.loginAsProblemUser();
    I.see('Products', '.title');

    inventoryPage.clickItemByName(itemName);
    itemDetailsPage.addToCart();

    cartPage.goToCart();
    await cartPage.verifyItemInCart(itemName);
});

Scenario('Scenario_3: Login as standard_user and validate product sorting', async ({
                                                                                       I,
                                                                                       loginPage,
                                                                                       inventoryPage
                                                                                   }) => {
    loginPage.loginAsStandardUser();
    I.see('Products', '.title');

    inventoryPage.sortProductsBy(inventoryPage.sortOptions.nameAtoZ);
    await inventoryPage.verifyProductsSortedAlphabetically();
});

Scenario('Scenario_4: Attempt to login as locked_out_user and validate failure', async ({
                                                                                            loginPage
                                                                                        }) => {
    loginPage.loginAsLockedOutUser();
    await loginPage.verifyLoginFailed();
});