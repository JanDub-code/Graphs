const { test, expect } = require('@playwright/test');
const path = require('path');

const BST_URL = `file://${path.resolve(__dirname, '..', 'bst_analyzer.html')}`;

test.describe('BST Analyzer Features', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BST_URL);
    });

    test('should insert values and display them', async ({ page }) => {
        await page.fill('#insertValues', '50, 30, 70, 20, 40, 60, 80');
        await page.click('button:has-text("Vložit hodnoty")');

        // Check stats
        await expect(page.locator('.stat-value').first()).toHaveText('7'); // Node count

        // Check visualization (text mode default)
        const vizText = await page.locator('#treeViz').innerText();
        expect(vizText).toContain('50');
        expect(vizText).toContain('30');
        expect(vizText).toContain('80');
    });

    test('should search for existing and non-existing values', async ({ page }) => {
        await page.fill('#insertValues', '50, 30, 70');
        await page.click('button:has-text("Vložit hodnoty")');

        // Search existing
        await page.fill('#searchValue', '30');
        await page.click('button:has-text("Vyhledat")');
        await expect(page.locator('#searchResult')).toContainText('✅ Hodnota 30 NALEZENA!');

        // Search non-existing
        await page.fill('#searchValue', '99');
        await page.click('button:has-text("Vyhledat")');
        await expect(page.locator('#searchResult')).toContainText('❌ Hodnota 99 NEBYLA nalezena');
    });

    test('should remove values correctly', async ({ page }) => {
        await page.fill('#insertValues', '50, 30, 70');
        await page.click('button:has-text("Vložit hodnoty")');

        await expect(page.locator('.stat-value').first()).toHaveText('3');

        await page.fill('#removeValues', '30');
        await page.click('button:has-text("Odebrat hodnoty")');

        await expect(page.locator('.stat-value').first()).toHaveText('2');

        // Verify 30 is gone
        await page.fill('#searchValue', '30');
        await page.click('button:has-text("Vyhledat")');
        await expect(page.locator('#searchResult')).toContainText('❌ Hodnota 30 NEBYLA nalezena');
    });

    test('should find values in range', async ({ page }) => {
        await page.fill('#insertValues', '10, 20, 30, 40, 50');
        await page.click('button:has-text("Vložit hodnoty")');

        await page.fill('#rangeMin', '20');
        await page.fill('#rangeMax', '40');
        await page.click('button:has-text("Hledat v rozsahu")');

        await expect(page.locator('#searchResult')).toContainText('Počet nalezených hodnot: 3');
        await expect(page.locator('#searchResult')).toContainText('20');
        await expect(page.locator('#searchResult')).toContainText('30');
        await expect(page.locator('#searchResult')).toContainText('40');
        await expect(page.locator('#searchResult')).not.toContainText('10');
        await expect(page.locator('#searchResult')).not.toContainText('50');
    });
});
