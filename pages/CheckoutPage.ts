const { I } = inject();

class CheckoutPage {
    locators = {
        firstNameField: '#first-name',
        lastNameField: '#last-name',
        postalCodeField: '#postal-code',
        continueButton: '#continue',
        finishButton: '#finish',
        completeHeader: '.complete-header',
        completeText: '.complete-text',
        cartItem: '.cart_item',
    };

    startCheckout() {
        I.click('#checkout');
        I.seeInCurrentUrl('/checkout-step-one.html');
    }

    fillCustomerInformation(firstName: string, lastName: string, postalCode: string) {
        I.fillField(this.locators.firstNameField, firstName);
        I.fillField(this.locators.lastNameField, lastName);
        I.fillField(this.locators.postalCodeField, postalCode);
        I.click(this.locators.continueButton);
        I.seeInCurrentUrl('/checkout-step-two.html');
    }

    async verifyCheckoutOverview(expectedItems: string[], notExpectedItem: string) {
        for (const item of expectedItems) {
            I.see(item, this.locators.cartItem);
        }
        I.dontSee(notExpectedItem, this.locators.cartItem);

        const itemsCount = await I.grabNumberOfVisibleElements(this.locators.cartItem);
        const assert = require('assert');
        assert.equal(itemsCount, expectedItems.length);
    }

    completePurchase() {
        I.click(this.locators.finishButton);
        I.waitForElement(this.locators.completeHeader);
        I.seeInCurrentUrl('/checkout-complete.html');
    }

    verifyOrderConfirmation() {
        I.see('Thank you for your order!', this.locators.completeHeader);
        I.see('Your order has been dispatched', this.locators.completeText);
    }
}

export = CheckoutPage;