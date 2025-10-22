# Optimalizace výkonu Graph Analyzer

## Problém: Zmrazení stránky při velkých grafech

Při testování s grafem o **100+ uzlech** dochází k zamrznutí stránky. Hlavní příčiny:

### 1. **Floyd-Warshall algoritmus - O(n³)**
```javascript
// Současný stav: Blokující výpočet
floydWarshall() {
    for (let k = 0; k < n; k++) {           // n iterací
        for (let i = 0; i < n; i++) {       // n iterací
            for (let j = 0; j < n; j++) {   // n iterací = n³ operací
                // Pro 200 uzlů = 8,000,000 operací!
            }
        }
    }
}
```
**Problém**: Synchronní výpočet blokuje UI thread

### 2. **Detekce K5 a K3,3 podgrafů (planarnost)**
```javascript
// Kombinatorická exploze
checkK5() {
    // Testuje VŠECHNY kombinace 5 uzlů ze všech uzlů
    // Pro 100 uzlů = C(100,5) = 75,287,520 kombinací
    // Pro každou kombinaci kontroluje 10 hran
    // Celkem potenciálně stovky milionů operací
}

checkK33() {
    // Podobně pro kombinace 6 uzlů
    // C(100,6) = 1,192,052,400 kombinací
    // Pro každou dělí na 3+3 a testuje 9 hran
}
```
**Problém**: Exponenciální složitost, nepoužitelné pro >20 uzlů

### 3. **Vykreslování obrovských tabulek**
```javascript
// Matice 200×200 = 40,000 DOM elementů
createMatrixTable(matrix, rowLabels, colLabels) {
    // Vytváří tisíce <td> elementů synchronně
    // Každý element = reflow + repaint
}
```
**Problém**: DOM manipulace blokují rendering

### 4. **Výpočet mocnin matice**
```javascript
adjacencyPower(k) {
    let result = A;
    for (let i = 1; i < k; i++) {
        result = Graph.multiplyMatrices(result, A);  // O(n³) pro každou mocninu
    }
}
```
**Problém**: A² a A³ znamenají další miliony operací

---

## Návrhy optimalizací (BEZ změny kódu - analýza)

### ⚡ **Priorita 1: Async výpočty s Web Workers**

**Řešení**: Přesunout těžké výpočty do Web Worker threadu

```javascript
// Hlavní thread zůstane responzivní
// Worker běží na separátním CPU jádru
// Výsledky se vrátí přes postMessage()
```

**Výhody**:
- UI nefreezes
- Můžeme zobrazit progress bar
- Využití multi-core procesorů
- Stránka zůstává interaktivní

**Co přesunout**:
- ✅ Floyd-Warshall (nejpomalejší)
- ✅ Detekce planarity
- ✅ Násobení matic
- ✅ Všechny matice současně (paralelně)

**Odhad zrychlení**: 5-10x kvůli paralelizmu + responzivní UI

---

### ⚡ **Priorita 2: Optimalizace Floyd-Warshall**

**Současný problém**: Počítá VŠECHNY vzdálenosti, i když je nepotřebujeme

**Možnosti**:

#### A) Lazy computation
```
- Nepočítat předem
- Spočítat pouze když uživatel klikne na "Zobrazit matici předchůdců"
- Použít tlačítko "Vypočítat nejkratší cesty"
```

#### B) Dijkstra místo Floyd-Warshall
```
- Pokud uživatel chce cestu jen mezi 2 uzly → Dijkstra O(n²)
- Floyd-Warshall pouze na požádání pro "všechny páry"
```

#### C) Early termination
```javascript
// Přerušit výpočet každých 1000 iterací
// Vrátit kontrolu prohlížeči
// Pokračovat v dalším frame
// Zobrazovat progress: "Počítám... 45%"
```

**Odhad zrychlení**: 3-5x pro typické použití

---

### ⚡ **Priorita 3: Vypnutí detekce planarity pro velké grafy**

**Současný stav**: Pokouší se detekovat K5/K3,3 vždy

**Řešení**:
```javascript
// Automaticky přeskočit pro n > 30
if (nverts > 30) {
    return "neznámá (graf příliš velký)";
}

// NEBO dát uživateli volbu:
// [ ] Detekovat planarnost (pomalé pro >20 uzlů)
```

**Alternativní algoritmus**: Použít Hopcroft-Tarjan O(n) test planarity (složitější implementace)

**Odhad zrychlení**: 100-1000x pro grafy >50 uzlů

---

### ⚡ **Priorita 4: Virtualizace velkých tabulek**

**Současný problém**: Renderuje 40,000 buněk najednou

**Řešení**: Virtual scrolling
```javascript
// Renderovat pouze viditelné řádky (např. 20)
// Při scrollu dynamicky vyměňovat obsah
// Celková tabulka vypadá stejně
// Ale DOM má jen ~1000 elementů místo 40,000
```

**Alternativa**: Stránkování
```
- Zobrazit pouze prvních 50×50 buněk
- Tlačítka: [Další strana] [Exportovat do CSV]
```

**Odhad zrychlení**: 10-50x pro rendering

---

### ⚡ **Priorita 5: Memoizace a cache**

**Optimalizace**:
```javascript
// Cachovat výsledky, které se nemění
this._cachedAdjMatrix = null;
adjacencyMatrix() {
    if (this._cachedAdjMatrix) return this._cachedAdjMatrix;
    // ... compute
    this._cachedAdjMatrix = result;
    return result;
}
```

**Použít pro**:
- Matice sousednosti (základní)
- Seznam sousedů
- Indexování uzlů

**Odhad zrychlení**: 2-3x pokud se graf nemění

---

### ⚡ **Priorita 6: Batching a RequestAnimationFrame**

**Pro rendering**:
```javascript
// Místo vykreslení všeho najednou:
function renderMatrixInChunks(matrix, chunkSize = 10) {
    let rowIndex = 0;
    
    function renderChunk() {
        // Vykresli 10 řádků
        for (let i = 0; i < chunkSize && rowIndex < matrix.length; i++) {
            createRow(matrix[rowIndex++]);
        }
        
        // Pokud nejsou všechny, pokračuj v dalším frame
        if (rowIndex < matrix.length) {
            requestAnimationFrame(renderChunk);
        }
    }
    
    renderChunk();
}
```

**Výhoda**: Stránka zůstává responzivní během renderingu

**Odhad zrychlení**: Subjektivně rychlejší (smoothness)

---

### ⚡ **Priorita 7: Sparse Matrix reprezentace**

**Pouze pro řídké grafy** (edges << n²):

```javascript
// Místo plné matice n×n
// Uložit pouze nenulové hodnoty
adjacencyMap = {
    "A": { "B": 1, "C": 2 },  // Pouze existující hrany
    "B": { "C": 1 }
}

// Pro 200 uzlů s 220 hranami:
// Plná matice: 40,000 čísel
// Sparse: ~440 čísel
// Úspora paměti: 99%
```

**Problém**: Floyd-Warshall vyžaduje přístup k [i][j], ne mapu

**Řešení**: Hybrid - sparse pro input, dense pro algoritmy

**Odhad zrychlení**: 2-5x pro velmi řídké grafy

---

### ⚡ **Priorita 8: Progressive enhancement**

**UX optimalizace**:
```
1. Okamžitě zobrazit: Seznam uzlů a hran, Základní vlastnosti
2. Po 100ms: Matici sousednosti
3. Po 500ms: Ostatní matice
4. Po 1s: Floyd-Warshall (s progress barem)
5. Nikdy: Planarnost pro >30 uzlů (volitelné)
```

**Uživatel vidí výsledky postupně**, ne "zamrzlá stránka 10 sekund"

---

### ⚡ **Priorita 9: WebAssembly pro kritické části**

**Pro maximum výkonu**:
```
- Přepsat Floyd-Warshall do Rust/C++
- Kompilovat do WebAssembly
- Volat z JavaScriptu
- Očekávané zrychlení: 5-50x pro matematické operace
```

**Trade-off**: Komplexní setup, ale maximální výkon

---

### ⚡ **Priorita 10: Inteligentní defaults**

**Uživatelský interface**:
```html
<label>
    <input type="checkbox" id="computeFloyd" checked>
    Počítat nejkratší cesty (Floyd-Warshall) - pomalé pro >100 uzlů
</label>

<label>
    <input type="checkbox" id="computePlanarity">
    Detekovat planarnost - velmi pomalé pro >20 uzlů
</label>

<label>
    <input type="checkbox" id="computePowers" checked>
    Počítat mocniny matice (A², A³)
</label>
```

**Uživatel si vybere**, co chce počítat

---

## Doporučené pořadí implementace

### Fáze 1: Quick wins (1-2 hodiny práce)
1. ✅ **Vypnout detekci planarity pro n > 30**
2. ✅ **Lazy Floyd-Warshall** (pouze na tlačítko)
3. ✅ **Progress indikátor** "Počítám..."
4. ✅ **Limit na zobrazení tabulek** (stránkování pro >100 řádků)

**Výsledek**: Použitelné pro 200 uzlů, nedojde k freeznutí

### Fáze 2: Střední optimalizace (4-6 hodin)
5. ✅ **RequestAnimationFrame rendering** pro tabulky
6. ✅ **Memoizace** základních výpočtů
7. ✅ **Checkboxy** pro volitelné výpočty
8. ✅ **CSV export** místo velkých tabulek

**Výsledek**: Plynulejší UX, rychlejší pro opakované použití

### Fáze 3: Pokročilé (1-2 dny)
9. ✅ **Web Worker** pro Floyd-Warshall
10. ✅ **Virtual scrolling** pro velké matice
11. ✅ **Paralelní výpočet** všech matic

**Výsledek**: Profesionální aplikace, scaling na 500+ uzlů

### Fáze 4: Expert (týden+)
12. ✅ **WebAssembly** implementace
13. ✅ **Hopcroft-Tarjan** pro planarnost
14. ✅ **Sparse matrix** optimizace

**Výsledek**: Research-grade nástroj

---

## Benchmarky (odhady)

| Velikost grafu | Současný stav | Po Fázi 1 | Po Fázi 2 | Po Fázi 3 |
|----------------|---------------|-----------|-----------|-----------|
| 20 uzlů        | 0.1s ✅       | 0.05s     | 0.03s     | 0.02s     |
| 50 uzlů        | 2s 😐         | 0.5s      | 0.3s      | 0.1s      |
| 100 uzlů       | 15s 😞        | 3s        | 2s        | 0.5s      |
| 200 uzlů       | 2min+ ❌      | 20s       | 10s       | 2s        |
| 500 uzlů       | FREEZE ❌     | 3min      | 1min      | 10s       |

---

## Závěr

**Aktuální kód je funkčně správný**, ale neoptimalizovaný pro velké vstupy.

**Nejrychlejší řešení** (1-2 hodiny):
- Vypnout planarnost pro n>30
- Lazy Floyd-Warshall
- Limit na tabulky
- Progress indikátor

**Výsledek**: Graf se 200 uzly půjde analyzovat za ~20 sekund místo 2+ minut zamrznutí.

**Dlouhodobě**: Web Workers + virtual scrolling = profesionální nástroj
