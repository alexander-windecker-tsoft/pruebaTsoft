import {test, expect} from '@playwright/test';

test('Login en tsoft.com', async ({ page }) => {
    await page.goto('https://www.mercadolibre.com.ar/');
    await expect(page).toHaveURL('https://www.mercadolibre.com.ar/');
    await page.locator('input[id="cb1-edit"]').fill('celular motorola g9');
    await page.keyboard.press('Enter');
    await expect(page.locator('//ol[contains(@class, \'ui-search-layout\')]')).toBeVisible();
    const titles = await page.locator('//ol[contains(@class, \'ui-search-layout\')]//li//h3').allInnerTexts()

    console.log('Los titulos son: ', titles);
    // Verificar que los titulos son visibles
    for (let title of titles) {
        console.log('El titulo es: ', title);
     }
    
    // await page.pause();
    // await expect(page.getByRole('link', { name: 'logotipo-tsoft' })).toBeVisible();
});
test('Localizadores 2', async ({page}) => {
    
    await page.goto('https://www.mercadolibre.com.ar/');
    await page.getByRole('link', { name: 'Ingresá', exact: true}).click();
    await page.pause();
}); 