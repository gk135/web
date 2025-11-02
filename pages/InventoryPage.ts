const { I } = inject();
import assert from 'assert';

class InventoryPage {
    locators = {
        addToCartButtonGeneric: 'button[id^="add-to-cart"]',
        shoppingCartBadge: '.shopping_cart_badge',
        itemName: '.inventory_item_name',
        productSortDropdown: '[data-test="product-sort-container"]',
    };

    sortOptions = {
        nameAtoZ: 'Name (A to Z)',
    };

    async addAllItemsToCart() {
        const buttonsCount = await I.grabNumberOfVisibleElements(this.locators.addToCartButtonGeneric);

        for (let i = 0; i < buttonsCount; i++) {
            I.click(locate(this.locators.addToCartButtonGeneric).first());
            I.waitForElement(this.locators.shoppingCartBadge);
        }

        I.see(buttonsCount.toString(), this.locators.shoppingCartBadge);
    }

    clickItemByName(itemName: string) {
        I.click(locate(this.locators.itemName).withText(itemName));
        I.seeInCurrentUrl('/inventory-item.html');
    }

    sortProductsBy(sortOption: string) {
        I.selectOption(this.locators.productSortDropdown, sortOption);
    }

    async getProductNames(): Promise<string[]> {
        return await I.grabTextFromAll(this.locators.itemName);
    }

    async verifyProductsSortedAlphabetically() {
        const productNames = await this.getProductNames();
        const sortedNames = [...productNames].sort();

        for (let i = 0; i < productNames.length; i++) {
            assert.equal(productNames[i], sortedNames[i]);
        }
    }
}

export = InventoryPage;