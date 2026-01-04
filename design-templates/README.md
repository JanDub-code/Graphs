# 🎨 Seasonal Theme System

Drop-in seasonal decorations + light/dark mode for any web project.

## Files

| File | Description |
|------|-------------|
| `seasonal-theme.css` | All CSS styles for decorations & themes |
| `seasonal-theme.js` | JavaScript for season detection & rendering |
| `seasonal-theme.html` | Demo/example page |

## Quick Start

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="seasonal-theme.css">
</head>
<body>
    <!-- Theme Toggle -->
    <button class="theme-toggle" id="themeToggle" onclick="toggleTheme()">🌙</button>

    <!-- Decoration Containers (REQUIRED) -->
    <div class="deco deco-christmas" id="decoChristmas"></div>
    <div class="deco deco-winter" id="decoWinter"></div>
    <div class="deco deco-spring" id="decoSpring"></div>
    <div class="deco deco-summer" id="decoSummer"></div>
    <div class="deco deco-autumn" id="decoAutumn"></div>
    <div class="deco deco-halloween" id="decoHalloween"></div>
    <div class="deco deco-valentine" id="decoValentine"></div>

    <!-- Your content here -->
    <div style="position: relative; z-index: 10;">
        <h1>My App</h1>
    </div>

    <script src="seasonal-theme.js"></script>
</body>
</html>
```

## Seasons

| Season | Dates | Decoration |
|--------|-------|------------|
| 🎄 Christmas | Dec 1 - Jan 6 | Glowing lights |
| ❄️ Winter | Jan 7 - Feb 28 | Falling snowflakes |
| 💕 Valentine | Feb 10 - Feb 16 | Falling hearts (priority) |
| 🌸 Spring | Mar 1 - May 31 | Sakura petals |
| ☀️ Summer | Jun 1 - Aug 31 | Rising bubbles |
| 🍂 Autumn | Sep 1 - Nov 30 | Falling leaves |
| 🎃 Halloween | Oct 20 - Nov 2 | Bats & pumpkins (priority) |

**Priority seasons** (Halloween, Valentine) override regular seasons when dates overlap.

## Features

- ⚡ **Instant switching (0ms)** - all decorations pre-rendered at page load
- 🌓 **Light/Dark mode** - with localStorage persistence & system preference detection
- 🎨 **CSS variables** - easy color theming
- 🚀 **GPU accelerated** - `will-change: transform` for smooth animations
- 📦 **No dependencies** - pure vanilla JS/CSS

## UX note: avoid theme flash

- Set the `data-theme` attribute (and a matching `background-color`) in an inline `<script>` placed before CSS to stop the white→dark flash.
- Persist the last theme in `localStorage` (or a lightweight cookie if you prefer shared scope across subdomains). First page visit may flash once; subsequent loads should not.
- If a landing/main page does not expose theme switching, consider keeping it single-theme to avoid any flicker altogether.

## CSS Variables

Customize colors by overriding these variables:

```css
:root {
    --bg-primary: #ffffff;
    --bg-secondary: #f5f5f5;
    --text-primary: #1a1a1a;
    --text-secondary: #666666;
    --border-color: #e0e0e0;
    --shadow-color: rgba(0, 0, 0, 0.1);
    --accent-color: #3b82f6;
}
```

## JavaScript API

```javascript
// Theme
initTheme();           // Auto-detect & apply theme
toggleTheme();         // Switch light/dark
applyTheme('dark');    // Force specific theme

// Season
initSeason();          // Auto-detect & apply with decorations
detectSeason();        // Returns current season name
applySeason('summer'); // Force specific season
prerenderDecorations(); // Manually render decorations
```

## Optional: Season Picker

Add this for a preview picker (great for demos):

```html
<div class="season-picker">
    <div class="season-picker-title">Season</div>
    <button class="season-btn" data-season="christmas">🎄</button>
    <button class="season-btn" data-season="winter">❄️</button>
    <button class="season-btn" data-season="valentine">💕</button>
    <button class="season-btn" data-season="spring">🌸</button>
    <button class="season-btn" data-season="summer">☀️</button>
    <button class="season-btn" data-season="autumn">🍂</button>
    <button class="season-btn" data-season="halloween">🎃</button>
    <button class="season-btn" data-season="auto">🔄</button>
</div>
```

## Important: Z-Index

Make sure your main content has `position: relative; z-index: 10;` or higher to stay above decorations.

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).
