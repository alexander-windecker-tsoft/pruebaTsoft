import { Page, Locator } from '@playwright/test';

export class PruebaTestPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly cartButton: Locator;
    readonly checkoutButton: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly confirmationMessage: Locator;
    readonly addToCartButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.cartButton = page.locator('.shopping_cart_link');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.confirmationMessage = page.locator('.complete-header');
        this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
    }

    async login(user: string, pass: string) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginButton.click();
    }

    async addRandomProducts(count: number) {
        // Wait for the products to be loaded
        await this.page.waitForSelector('button:has-text("Add to cart")');
        
        // Add the specified number of products
        for (let i = 0; i < count; i++) {
            const addButton = await this.page.locator('button:has-text("Add to cart")').first();
            await addButton.click();
        }
    }

    async completeCheckout(firstName: string, lastName: string, postalCode: string) {
        await this.cartButton.click();
        await this.checkoutButton.click();
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
        await this.continueButton.click();
        await this.finishButton.click();
    }
}
