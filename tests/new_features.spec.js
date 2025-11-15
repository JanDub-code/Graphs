const { test, expect } = require('@playwright/test');
const { APP_URL } = require('./utils');

test.describe('Graph Analyzer New Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
  });

  test('should perform BFS and display results', async ({ page }) => {
    await page.fill('#graphInput', 'u A; u B; u C; h A - B; h B - C;');
    await page.click('#parseBtn');

    // Wait for the graph exploration and spanning tree sections to be visible
    await expect(page.locator('h2:has-text("Prohledávání grafu")')).toBeVisible();
    await expect(page.locator('h2:has-text("Kostra grafu")')).toBeVisible();

    await page.selectOption('#traversalAlgo', 'bfs');
    await page.fill('#startNode', 'A');
    await page.click('#runTraversal');

    await expect(page.locator('#exploreResult')).toBeVisible();
    await expect(page.locator('#exploreResult')).toContainText('Výsledek pro BFS od A:');
    await expect(page.locator('#exploreResult')).toContainText('Pořadí navštívených uzlů: A → B → C');
    await expect(page.locator('#exploreResult')).toContainText('Dosažitelných uzlů: 3');
  });

  test('should perform DFS and display results', async ({ page }) => {
    await page.fill('#graphInput', 'u A; u B; u C; h A - B; h B - C;');
    await page.click('#parseBtn');

    // Wait for the graph exploration and spanning tree sections to be visible
    await expect(page.locator('h2:has-text("Prohledávání grafu")')).toBeVisible();
    await expect(page.locator('h2:has-text("Kostra grafu")')).toBeVisible();

    await page.selectOption('#traversalAlgo', 'dfs');
    await page.fill('#startNode', 'A');
    await page.click('#runTraversal');

    await expect(page.locator('#exploreResult')).toBeVisible();
    await expect(page.locator('#exploreResult')).toContainText('Výsledek pro DFS od A:');
    await expect(page.locator('#exploreResult')).toContainText('Pořadí navštívených uzlů: A → B → C');
    await expect(page.locator('#exploreResult')).toContainText('Dosažitelných uzlů: 3');
  });

  test('should calculate and display spanning tree analytics', async ({ page }) => {
    await page.fill('#graphInput', 'u A; u B; u C; h A - B 1; h B - C 2; h A - C 3;');
    await page.click('#parseBtn');

    // Wait for the graph exploration and spanning tree sections to be visible
    await expect(page.locator('h2:has-text("Prohledávání grafu")')).toBeVisible();
    await expect(page.locator('h2:has-text("Kostra grafu")')).toBeVisible();

    await page.click('#runSpanningTree');

    await expect(page.locator('#spanningTreeResult')).toBeVisible();
    await expect(page.locator('#spanningTreeResult')).toContainText('Výsledky analýzy kostry grafu:');
    await expect(page.locator('#spanningTreeResult')).toContainText('Počet koster: 3');
    await expect(page.locator('#spanningTreeResult')).toContainText('Minimální kostra (váha: 3):');
    await expect(page.locator('#spanningTreeResult')).toContainText('A - B (váha: 1)');
    await expect(page.locator('#spanningTreeResult')).toContainText('B - C (váha: 2)');
  });
});
