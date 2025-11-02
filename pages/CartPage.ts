const { I } = inject();

class CartPage {
    locators = {
        cartItem: '.cart_item',
        cartItemName: '.inventory_item_name',
        removeButtonGeneric: 'button[id^="remove"]',
    };

    async getCartItemNames(): Promise<string[]> {
        return await I.grabTextFromAll(this.locators.cartItemName);
    }

    async removeThirdItemAndVerify(): Promise<string[]> {
        const itemsBefore = await this.getCartItemNames();
        const thirdItemName = itemsBefore[2];

        I.click(locate(this.locators.removeButtonGeneric).at(3));
        I.dontSee(thirdItemName, this.locators.cartItem);

        return await this.getCartItemNames();
    }

    async verifyItemInCart(itemName: string) {
        I.see(itemName, this.locators.cartItemName);
    }

    goToCart() {
        I.click('.shopping_cart_link');
        I.seeInCurrentUrl('/cart.html');
    }
}

export = CartPage;