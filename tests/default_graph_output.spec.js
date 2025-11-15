const { test, expect } = require('@playwright/test');
const { APP_URL } = require('./utils');

const DEFAULT_INPUT = `u A;
u B;
h A > B 1 :h1;
u C;
h B > C 1 :h2;
u D;
h A > D 2 :h3;
u E;
h A < E 2 :h4;
h B < E 3 :h5;
h C > E 3 :h6;
h D > E 4 :h8;
u F;
h C > F 4 :h7;
h E > F 5 :h9;
u G;
h D < G 5 :h10;
h E > G 6 :h11;
u H;
h H > E 6 :h12;
h F > H 7 :h13;
h G < H 7 :h14;`;

const EXPECTED_SNIPPETS = [
  '📊 Základní statistiky',
  'Počet uzlů: 8',
  'Počet hran: 14',
  'Počet komponent: 1',
  '📊 Kompletní statistický přehled',
  '📈 Základní metriky',
  'Uzly: 8',
  'Hrany: 14',
  'Komponenty: 1',
  'Izolované uzly: 0',
  'Smyčky: 0',
  'Hustota grafu: 50.00%',
  '📏 Nejkratší a nejdelší hrana',
  'Nejkratší: A → B (váha: 1)',
  'Nejdelší: F → H (váha: 7)',
  '⚖️ Statistiky vah hran',
  'Min váha: 1',
  'Max váha: 7',
  'Průměrná váha: 4.00',
  'Distribuce: 1: 2×, 2: 2×, 3: 2×, 4: 2×, 5: 2×, 6: 2×, 7: 2×',
  '🎯 Stupně uzlů',
  'Min: 3',
  'Max: 7',
  'Průměr: 3.50',
  'Medián: 3',
  'IN-degree:',
  'Min: 1 | Max: 3 | Ø 1.75',
  'OUT-degree:',
  'Min: 1 | Max: 4 | Ø 1.75',
  'Distribuce:',
  '3: 7×, 7: 1×',
  '🔗 Hrany',
  'Orientované: 14',
  'Neorientované: 0',
  'S vahami: 14',
  'Násobné hrany: 0 skupin (0 hran)',
  'Smyčky: 0',
  '🌳 Komponenty',
  'Největší: 8 uzlů',
  'Nejmenší: 8 uzlů',
  'Velikosti: 8',
  '📏 Průměr a poloměr',
  'Průměr grafu: 21',
  'Poloměr grafu: 11',
  'Centrální uzly: C, H',
  'Periferní uzly: G',
  '🏆 TOP uzly (nejvyšší stupeň)',
  '1. E (7)',
  '2. A (3)',
  '3. B (3)',
  '4. C (3)',
  '5. D (3)',
  '6. F (3)',
  '7. G (3)',
  '8. H (3)',
  '📉 Histogram stupňů',
  '💡 Vysvětlení pojmů:',
  'Seznam uzlů a hran',
  'Uzel Ain: 1 | out: 2 | celkem: 3',
  'Uzel Bin: 2 | out: 1 | celkem: 3',
  'Uzel Ein: 3 | out: 4 | celkem: 7',
  'Uzel Hin: 1 | out: 2 | celkem: 3',
  'A → B (h=1) [h1]',
  'B → C (h=1) [h2]',
  'A ← E (h=2) [h4]',
  'E → G (h=6) [h11]',
  'G ← H (h=7) [h14]',
  'Matice sousednosti',
  'Binární verze (0/1)',
  'Znaménková matice',
  'Laplaciánská matice (L = D - A)',
  'Multiplicita hran',
  'Druhá a třetí mocnina matice sousednosti (počet sledů délky N)',
  'Libovolná mocnina matice sousednosti',
  'Suma všech procházek (∑ A¹ + A² + ... + Aᵏ)',
  'Matice incidence',
  '� Matice incidence:',
  'Dosažitelnost (transitivní uzávěr)',
  'BFS Vrstvy (Breadth-First Search Layers)',
  'Všechny nejkratší cesty (neohodnocené)',
  'Jednoduché cesty U→V do délky K',
  'Sousedé podle směru',
  'Matice délek',
  'Nejkratší cesty (Floyd-Warshall)',
  'Tabulka incidentních hran',
  'Seznam sousedů',
  'Víceásobné hrany',
  'Graf neobsahuje žádné víceásobné hrany.',
  'Vlastnosti grafu',
  'Ohodnocený: ano',
  'Orientace: orientovaný',
  'Souvislý: ano',
  'Silně souvislý: ano',
  'Prostý: ano',
  'Jednoduchý: ano',
  'Multigraf: ne',
  'Diskrétní: ne',
  'Konečný: ano',
  'Symetrizovaný: ne',
  'Úplný: ne',
  'Regulární: ne',
  'Bipartitní: ne',
  'Rovinný: ano',
  'Výsledek pro BFS od E:',
  'Pořadí navštívených uzlů: E → A → B → C → D → F → G → H',
  'Dosažitelných uzlů: 8',
  'Výsledky analýzy kostry grafu:',
  'Počet koster: 4',
  'Minimální kostra (váha: 21):',
  'A - B (váha: 1)',
  'B - C (váha: 1)',
  'A - D (váha: 2)',
  'A - E (váha: 2)',
  'C - F (váha: 4)',
  'D - G (váha: 5)',
  'H - E (váha: 6)',
];

const normalizeText = (value) => value.replace(/\s+/g, ' ').trim();

test.describe('Graph Analyzer default sample regression', () => {
  test('renders the baseline report for the bundled example graph', async ({ page }) => {
    await page.goto(APP_URL);

    await page.fill('#graphInput', DEFAULT_INPUT);
    await page.getByRole('button', { name: 'Analyzovat graf' }).click();
    await expect(page.locator('#counters')).toBeVisible();

    await page.locator('#statisticsSection button').click();
    await page.fill('#startNode', 'E');
    await page.getByRole('button', { name: 'Spustit' }).click();
    await expect(page.locator('#exploreResult')).toBeVisible();

    await page.getByRole('button', { name: 'Analyzovat kostru grafu' }).click();
    await expect(page.locator('#spanningTreeResult')).toBeVisible();

    const pageText = await page.locator('body').innerText();
    const normalizedPageText = normalizeText(pageText);

    for (const snippet of EXPECTED_SNIPPETS) {
      expect(normalizedPageText).toContain(normalizeText(snippet));
    }
  });
});
