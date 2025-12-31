# Graph & Tree Analyzers

Sada webových nástrojů pro analýzu grafů a binárních stromů. Oba analyzery používají jednotný vizuální styl a běží přímo v prohlížeči bez nutnosti serveru.

---

## Graph Analyzer

Nástroj pro analýzu obecných grafů. Definujte graf pomocí jednoduchého textového formátu a získejte různé analytiky a maticové reprezentace.

### Funkce

*   **Definice grafu**: Definujte uzly a hrany s váhami a popisky.
*   **Maticové reprezentace**:
    *   Matice sousednosti
    *   Znaménková matice
    *   Laplaciánská matice
    *   Incidenční matice
    *   Matice délek
    *   Matice dosažitelnosti
*   **Vlastnosti grafu**:
    *   Ohodnocený, Orientovaný, Souvislý, Jednoduchý, atd.
*   **Statistický přehled**:
    *   Počet uzlů/hran, rozložení stupňů, hustota, průměr, poloměr, atd.
*   **Hledání cest**:
    *   Všechny nejkratší cesty (nevážené)
    *   Jednoduché cesty do zadané délky
*   **Průchod grafem**:
    *   BFS (do šířky) a DFS (do hloubky) z libovolného uzlu
*   **Analýza kostry**:
    *   Počet koster pomocí Laplaciánu
    *   Minimální/Maximální kostra pro vážené grafy
*   **Optimální cesty & metriky**:
    *   Nejkratší, nejdelší, nejbezpečnější a nejširší cesty (Moore, Dijkstra, Bellman-Ford)
*   **Síťový graf & CPM**:
    *   Kritická cesta, délka projektu a rezervy činností

### Jak používat

1.  Otevřete `public/graph_analyzer.html` v prohlížeči.
2.  Zadejte definici grafu do textového pole.
3.  Klikněte na "Analyzovat graf".
4.  Prozkoumejte sekce s vlastnostmi, maticemi a statistikami.

---

## Binary Tree Analyzer

Nástroj pro analýzu binárních stromů. Podporuje dva režimy: **Binary Search Tree (BST)** pro práci s číselnými hodnotami a **Binary Tree** pro obecné stromy zadané po úrovních (level-order).

### Funkce

*   **BST operace**:
    *   Vkládání a odebírání hodnot
    *   Vyhledávání hodnoty s vizualizací cesty
    *   Rozsahové dotazy (range query)
    *   DFS/BFS od libovolného uzlu
*   **Binary Tree (Level-Order)**:
    *   Zadání stromu ve formátu po úrovních
    *   Podpora prázdných uzlů (`u *;`)
    *   Vyhledávání uzlů podle identifikátoru
*   **Průchody stromem**:
    *   Pre-order, In-order, Post-order, Level-order
*   **Vizualizace**:
    *   Textová, po úrovních, Canvas grafická
*   **Statistiky**:
    *   Výška, počet uzlů, počet listů, vyvážení
*   **CPM pro stromy**:
    *   Kritická cesta na stromové struktuře

### Jak používat

1.  Otevřete `public/bst_analyzer.html` v prohlížeči.
2.  Vyberte režim (BST nebo Binary Tree).
3.  Pro BST: Zadejte hodnoty k vložení a klikněte "Vložit hodnoty", poté "Analyzovat BST".
4.  Pro Binary Tree: Zadejte strom ve formátu `u Uzel;` po řádcích a klikněte "Analyzovat Binary Tree".

---

## Spuštění testů

Playwright testy ověřují chování UI (včetně regresního testu výchozího grafu v `tests/default_graph_output.spec.js`).

1. Nainstalujte závislosti a prohlížeče (jednou): `npm install && npx playwright install`
2. Spusťte testy: `npx playwright test`
3. Spusťte konkrétní test: `npx playwright test tests/default_graph_output.spec.js`
