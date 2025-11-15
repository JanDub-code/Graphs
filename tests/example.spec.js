const { test, expect } = require('@playwright/test');
const { APP_URL } = require('./utils');

test('homepage has title and screenshot', async ({ page }) => {
  await page.goto(APP_URL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Graph Analyzer/);

  // Click the analyze button.
  await page.getByRole('button', { name: 'Analyzovat graf' }).click();

  // Take a screenshot of the entire page.
  await page.screenshot({ path: 'verification.png', fullPage: true });
});
