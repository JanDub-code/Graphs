const { test, expect } = require('@playwright/test');
const path = require('path');

const GRAPH_URL = `file://${path.resolve(__dirname, '..', 'graph_analyzer.html')}`;
const BST_URL = `file://${path.resolve(__dirname, '..', 'bst_analyzer.html')}`;

test.describe('Performance Tests (500+ nodes)', () => {
    test.setTimeout(60000); // Allow 60s for heavy tests

    test('Graph Analyzer: Should handle 500 nodes and 1000 edges', async ({ page }) => {
        await page.goto(GRAPH_URL);

        // Generate large graph
        const nodeCount = 500;
        const edgeCount = 1000;
        let graphInput = '';

        for (let i = 0; i < nodeCount; i++) {
            graphInput += `u N${i};\n`;
        }

        for (let i = 0; i < edgeCount; i++) {
            const u = Math.floor(Math.random() * nodeCount);
            const v = Math.floor(Math.random() * nodeCount);
            graphInput += `h N${u} > N${v};\n`;
        }

        // Measure input time
        const start = Date.now();

        // Use evaluate to set value directly to avoid typing delay
        await page.evaluate((input) => {
            document.getElementById('graphInput').value = input;
        }, graphInput);

        await page.click('#parseBtn');

        // Wait for stats to appear
        await expect(page.locator('#nodeCount')).toHaveText(String(nodeCount));

        const end = Date.now();
        const duration = end - start;
        console.log(`Graph Analysis (500 nodes, 1000 edges) took ${duration}ms`);

        // Ensure it's reasonably fast (e.g., under 5 seconds for parsing and basic stats)
        expect(duration).toBeLessThan(5000);
    });

    test('BST Analyzer: Should handle inserting 500 nodes', async ({ page }) => {
        await page.goto(BST_URL);

        // Generate 500 unique random numbers
        const values = new Set();
        while (values.size < 500) {
            values.add(Math.floor(Math.random() * 10000));
        }
        const inputStr = Array.from(values).join(', ');

        const start = Date.now();

        await page.evaluate((input) => {
            document.getElementById('insertValues').value = input;
        }, inputStr);

        await page.click('button:has-text("Vložit hodnoty")');

        // Check if all nodes are inserted
        await expect(page.locator('.stat-value').first()).toHaveText('500');

        const end = Date.now();
        const duration = end - start;
        console.log(`BST Insertion (500 nodes) took ${duration}ms`);

        expect(duration).toBeLessThan(5000);
    });
});
