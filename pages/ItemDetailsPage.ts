const { I } = inject();

class ItemDetailsPage {
    locators = {
        addToCartButton: 'button[id^="add-to-cart"]',
    };

    addToCart() {
        I.click(this.locators.addToCartButton);
    }
}

export = ItemDetailsPage;