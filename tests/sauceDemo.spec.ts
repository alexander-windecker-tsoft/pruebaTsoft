import { test, expect } from '@playwright/test';
import { PruebaTestPage } from './page/pruebaTestPage';

test.describe('Sauce Demo Shopping Flow', () => {
    let pruebaTestPage: PruebaTestPage;

    test.beforeEach(async ({ page }) => {
        pruebaTestPage = new PruebaTestPage(page);
        await page.goto('https://www.saucedemo.com/');
    });

    test('Complete shopping flow', async ({page}) => {
        // Login
        await pruebaTestPage.login('standard_user', 'secret_sauce');

        // Add 3 random products to cart
        await pruebaTestPage.addRandomProducts(3);

        // Complete checkout process
        await pruebaTestPage.completeCheckout('Alexander', 'Windecker', '1745');

        // Verify confirmation message
        await expect(pruebaTestPage.confirmationMessage).toHaveText('Thank you for your order!');
        
        await page.pause()
        
    });
});
