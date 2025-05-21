import { test, expect } from '@playwright/test';

test('Login en saucedemo.com', async ({ page }) => {
  // Navegar a la página
  await page.goto('https://www.saucedemo.com/');

  // Ingresar credenciales
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');

  // Hacer clic en el botón de login
  await page.click('[data-test="login-button"]');
  
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  
  const itemsContainer = await page.locator('#inventory_container .inventory_item').all()
  
  const randomIndex = Math.floor(Math.random() * itemsContainer.length);
  const randomItem = itemsContainer[randomIndex];
  
  const expectedPrice = await randomItem.locator('[data-test="inventory-item-price"]').innerText()
  const expectedName = await randomItem.locator('[data-test="inventory-item-name"]').innerText()
  const expectedDescription = await randomItem.locator('[data-test="inventory-item-desc"]').innerText()
  
  await randomItem.getByRole('button', { name: 'Add to cart'}).click()
  await page.locator('a.shopping_cart_link').click()
  
  expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible()
  
  const actualName = await page.locator('.inventory_item_name').innerText()
  const actualPrice = await page.locator('.inventory_item_price').innerText()
  const actualDescription = await page.locator('.inventory_item_desc').innerText()
  
  expect(actualName).toEqual(expectedName)
  expect(actualPrice).toEqual(expectedPrice) 
  expect(actualDescription).toEqual(expectedDescription)
  
  await page.locator('[data-test="checkout"]').click()

  await page.fill('[data-test="firstName"]', 'Juan')
  await page.fill('[data-test="lastName"]', 'Pérez')  
  await page.fill('[data-test="postalCode"]', '12345')
  await page.locator('[data-test="continue"]').click()

  await page.locator('[data-test="finish"]').click()

  expect(page.getByText('THANK YOU FOR YOUR ORDER')).toBeVisible()
  //await page.pause()

});