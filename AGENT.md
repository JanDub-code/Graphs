# Zásady vývoje projektu Graph Analyzer

## Hlavní princip: Žádné runtime dependencies

Tento projekt je navržen jako **statická webová aplikace** bez závislostí (dependencies) v runtime. Projekt používá pouze:

- ✅ **Čistý JavaScript** (vanilla JavaScript, ES6+)
- ✅ **HTML5**
- ✅ **CSS3**

## Proč žádné dependencies?

### 1. Jednoduchost deploymentu
- Aplikace lze nasadit na **jakýkoliv CDN** nebo statický hosting
- Není potřeba server, Node.js runtime ani build proces
- Stačí nahrát HTML soubor a je hotovo

### 2. Bezpečnost
- Žádné externí knihovny = žádné bezpečnostní zranitelnosti z třetích stran
- Žádné problémy s aktualizacemi dependencies
- Plná kontrola nad kódem

### 3. Rychlost a výkon
- Žádné stahování externích knihoven
- Celá aplikace v jednom souboru
- Okamžité načtení (kromě síťové latence)

### 4. Dlouhodobá udržitelnost
- Kód neza starává s verzemi knihoven
- Funguje i za roky bez úprav
- Nezávislost na npm ecosystem

## Pravidla pro vývoj

### ✅ POVOLENO:

1. **Testovací dependencies** v `package.json`
   - Playwright, Jest, nebo jiné testovací frameworky
   - Tyto dependencies jsou pouze pro vývoj a testování
   - Nepotřebují se pro běh aplikace

2. **Moderní JavaScript funkce**
   - ES6+ syntaxe (arrow functions, classes, async/await)
   - Web APIs (fetch, localStorage, Canvas, atd.)
   - Vše, co běží nativně v moderních prohlížečích

3. **CSS funkce**
   - Flexbox, Grid, CSS Variables
   - Animace a transitions
   - Vše nativní v CSS3

### ❌ ZAKÁZÁNO:

1. **Runtime dependencies**
   - ❌ React, Vue, Angular
   - ❌ jQuery, Lodash
   - ❌ Chart.js, D3.js
   - ❌ Jakékoliv jiné knihovny, které by se načítaly při běhu aplikace

2. **Build systémy vyžadující runtime**
   - ❌ Webpack, Rollup, Parcel (pokud vytvářejí dependencies)
   - ❌ TypeScript (pokud vyžaduje compilation před použitím)
   - ❌ Sass/Less (pokud vyžadují preprocessing)

3. **Externí CDN zdroje v HTML**
   - ❌ `<script src="https://cdn.example.com/library.js">`
   - ❌ `<link href="https://cdn.example.com/style.css">`
   - Vše musí být inline v souboru

## Deployment

### Podporované platformy:

1. **GitHub Pages**
   ```bash
   # Stačí pushnut HTML soubor do gh-pages branch
   git push origin main:gh-pages
   ```

2. **Netlify**
   ```bash
   # Drop HTML soubor do Netlify nebo propojit Git repo
   # Žádná konfigurace není potřeba
   ```

3. **Vercel**
   ```bash
   # Jednoduchý deploy bez konfigurace
   vercel deploy
   ```

4. **Cloudflare Pages**
   ```bash
   # Nahrát soubor nebo propojit repo
   # Build command: (prázdné)
   # Output directory: . (root)
   ```

5. **AWS S3 + CloudFront**
   ```bash
   # Nahrát do S3 bucket s static website hosting
   aws s3 cp graph_analyzer.html s3://bucket-name/
   ```

6. **Jakýkoliv web hosting**
   - Prostě nahrajte HTML soubor přes FTP/SFTP
   - Funguje všude, kde běží web server

## Struktura projektu

```
/
├── graph_analyzer.html     # Hlavní aplikace (vše v jednom souboru)
├── package.json            # Pouze test dependencies
├── tests/                  # Testy (Playwright)
├── AGENT.md               # Tento dokument
└── README.md              # Dokumentace projektu
```

## Testování

Testovací dependencies jsou povoleny a doporučeny:

```json
{
  "dependencies": {
    "@playwright/test": "^1.56.1"
  }
}
```

Pro spuštění testů:
```bash
npm install              # Nainstaluje test dependencies
npx playwright test      # Spustí testy
```

**Důležité:** Node modules nejsou potřeba pro běh aplikace, pouze pro testování během vývoje.

## Přidávání nových funkcí

Při přidávání nových funkcí se vždy ptejte:

1. **Lze to implementovat v čistém JavaScriptu?** → Většinou ANO
2. **Potřebuji knihovnu pro tuto funkci?** → Většinou NE, zkuste to napsat sami
3. **Je to opravdu nutné?** → Pokud ANO, zvažte minimální implementaci

### Příklady implementace bez dependencies:

#### Místo jQuery:
```javascript
// ❌ jQuery
$('#element').addClass('active');

// ✅ Vanilla JS
document.getElementById('element').classList.add('active');
```

#### Místo Chart.js:
```javascript
// ✅ Canvas API přímo
const ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();
```

#### Místo Lodash:
```javascript
// ✅ Native array methods
const unique = [...new Set(array)];
const sorted = array.sort((a, b) => a - b);
```

## Shrnutí

🎯 **Cíl projektu:** Udržet aplikaci jako jednoduchý, self-contained HTML soubor, který lze spustit kdekoli bez instalace nebo build procesu.

✨ **Výhoda:** Maximální přenositelnost, minimální komplexita, dlouhodobá udržitelnost.

🚀 **Deployment:** Nahrát HTML soubor na CDN/hosting a hotovo!

---

**Pamatujte:** Když váháte, zda přidat dependency, odpověď je téměř vždy **NE**. Moderní prohlížeče mají všechny potřebné API vestavěné.
