/**
 * SEASONAL THEME SYSTEM + LIGHT/DARK MODE
 * Drop-in JavaScript for instant seasonal decorations
 * 
 * Usage:
 * 1. Include seasonal-theme.css
 * 2. Include this script
 * 3. Add decoration containers to HTML (see seasonal-theme.html)
 * 4. Call: initTheme(); initSeason();
 */

// ========== SEASON CONFIGURATION ==========
const SEASONS = {
    christmas: {
        dates: [[12, 1], [1, 6]],
        emoji: '🎄',
        name: 'Christmas'
    },
    winter: {
        dates: [[1, 7], [2, 29]], // includes leap year
        emoji: '❄️',
        name: 'Winter'
    },
    spring: {
        dates: [[3, 1], [5, 31]],
        emoji: '🌸',
        name: 'Spring'
    },
    summer: {
        dates: [[6, 1], [8, 31]],
        emoji: '☀️',
        name: 'Summer'
    },
    autumn: {
        dates: [[9, 1], [11, 30]],
        emoji: '🍂',
        name: 'Autumn'
    },
    halloween: {
        dates: [[10, 20], [11, 2]],
        emoji: '🎃',
        name: 'Halloween',
        priority: true
    },
    valentine: {
        dates: [[2, 10], [2, 16]],
        emoji: '💕',
        name: 'Valentine',
        priority: true
    }
};

// ========== THEME (LIGHT/DARK) ==========
function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update toggle button if exists
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        toggle.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ========== SEASON DETECTION ==========
function detectSeason() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    // Priority holidays first (halloween, valentine)
    for (const [name, cfg] of Object.entries(SEASONS)) {
        if (!cfg.priority) continue;
        const [[sm, sd], [em, ed]] = cfg.dates;
        if ((month > sm || (month === sm && day >= sd)) &&
            (month < em || (month === em && day <= ed))) {
            return name;
        }
    }

    // Regular seasons
    for (const [name, cfg] of Object.entries(SEASONS)) {
        if (cfg.priority) continue;
        const [[sm, sd], [em, ed]] = cfg.dates;
        // Handle year wrap (christmas Dec-Jan)
        if (sm > em) {
            if (month > sm || (month === sm && day >= sd) ||
                month < em || (month === em && day <= ed)) {
                return name;
            }
        } else {
            if ((month > sm || (month === sm && day >= sd)) &&
                (month < em || (month === em && day <= ed))) {
                return name;
            }
        }
    }
    return 'spring'; // fallback
}

// ========== APPLY SEASON ==========
function applySeason(season) {
    // Remove existing season classes
    document.body.className = document.body.className
        .replace(/season-\w+/g, '')
        .trim();

    // Add new season class
    document.body.classList.add('season-' + season);

    // Update picker if exists
    updateSeasonPicker(season);
}

function updateSeasonPicker(activeSeason) {
    document.querySelectorAll('.season-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.season === activeSeason);
    });
}

// ========== PRERENDER DECORATIONS ==========
function prerenderDecorations() {
    // Christmas lights
    const christmasContainer = document.getElementById('decoChristmas');
    if (christmasContainer) {
        const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
        for (let i = 0; i < 30; i++) {
            const light = document.createElement('div');
            light.className = 'light ' + colors[i % colors.length];
            light.style.cssText = `left:${i * 3.3}%;animation-delay:${Math.random() * 2}s`;
            christmasContainer.appendChild(light);
        }
    }

    // Winter snowflakes
    const winterContainer = document.getElementById('decoWinter');
    if (winterContainer) {
        const chars = ['❄', '❅', '❆', '✻', '✼', '❉'];
        for (let i = 0; i < 50; i++) {
            const el = document.createElement('div');
            el.className = 'snowflake';
            el.textContent = chars[Math.floor(Math.random() * chars.length)];
            el.style.cssText = `left:${Math.random() * 100}%;font-size:${Math.random() * 1 + 0.5}em;animation-duration:${Math.random() * 5 + 5}s;animation-delay:${Math.random() * 10}s;opacity:${Math.random() * 0.5 + 0.5}`;
            winterContainer.appendChild(el);
        }
    }

    // Spring sakura
    const springContainer = document.getElementById('decoSpring');
    if (springContainer) {
        for (let i = 0; i < 40; i++) {
            const el = document.createElement('div');
            el.className = 'petal';
            el.style.cssText = `left:${Math.random() * 100}%;animation-duration:${Math.random() * 6 + 6}s;animation-delay:${Math.random() * 10}s;opacity:${Math.random() * 0.5 + 0.5}`;
            springContainer.appendChild(el);
        }
    }

    // Summer bubbles
    const summerContainer = document.getElementById('decoSummer');
    if (summerContainer) {
        for (let i = 0; i < 25; i++) {
            const el = document.createElement('div');
            el.className = 'bubble';
            const size = Math.random() * 30 + 10;
            el.style.cssText = `left:${Math.random() * 100}%;width:${size}px;height:${size}px;animation-duration:${Math.random() * 8 + 6}s;animation-delay:${Math.random() * 10}s`;
            summerContainer.appendChild(el);
        }
    }

    // Autumn leaves
    const autumnContainer = document.getElementById('decoAutumn');
    if (autumnContainer) {
        const leaves = ['🍂', '🍁', '🍃', '🌰'];
        for (let i = 0; i < 35; i++) {
            const el = document.createElement('div');
            el.className = 'leaf';
            el.textContent = leaves[Math.floor(Math.random() * leaves.length)];
            el.style.cssText = `left:${Math.random() * 100}%;animation-duration:${Math.random() * 8 + 6}s;animation-delay:${Math.random() * 10}s;opacity:${Math.random() * 0.5 + 0.5}`;
            autumnContainer.appendChild(el);
        }
    }

    // Halloween
    const halloweenContainer = document.getElementById('decoHalloween');
    if (halloweenContainer) {
        // Bats
        for (let i = 0; i < 15; i++) {
            const el = document.createElement('div');
            el.className = 'bat';
            el.textContent = '🦇';
            el.style.cssText = `left:${Math.random() * 80}%;top:${Math.random() * 60}%;animation-duration:${Math.random() * 4 + 4}s;animation-delay:${Math.random() * 3}s`;
            halloweenContainer.appendChild(el);
        }
        // Pumpkins
        const positions = [
            { bottom: '20px', left: '20px' },
            { bottom: '20px', right: '20px' },
            { top: '100px', left: '20px' },
            { top: '100px', right: '20px' }
        ];
        positions.forEach(pos => {
            const el = document.createElement('div');
            el.className = 'pumpkin';
            el.textContent = '🎃';
            Object.assign(el.style, pos);
            el.style.animationDelay = Math.random() * 2 + 's';
            halloweenContainer.appendChild(el);
        });
    }

    // Valentine hearts
    const valentineContainer = document.getElementById('decoValentine');
    if (valentineContainer) {
        const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘'];
        for (let i = 0; i < 40; i++) {
            const el = document.createElement('div');
            el.className = 'heart';
            el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            el.style.cssText = `left:${Math.random() * 100}%;font-size:${Math.random() * 1.5 + 0.8}em;animation-duration:${Math.random() * 5 + 5}s;animation-delay:${Math.random() * 10}s`;
            valentineContainer.appendChild(el);
        }
    }
}

// ========== SEASON PICKER ==========
function toggleSeasonPicker() {
    const picker = document.getElementById('seasonPicker');
    const toggle = document.getElementById('seasonPickerToggle');
    if (!picker) return;

    picker.classList.toggle('collapsed');

    // Update toggle arrow
    if (toggle) {
        toggle.textContent = picker.classList.contains('collapsed') ? '▼' : '▲';
    }
}

function initSeasonPickerMobile() {
    const picker = document.getElementById('seasonPicker');
    if (!picker) return;

    // Check if mobile (same breakpoint as CSS)
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (isMobile) {
        // Start collapsed on mobile
        picker.classList.add('collapsed');
    } else {
        // Start expanded on desktop
        picker.classList.remove('collapsed');
    }

    // Listen for resize changes
    window.matchMedia('(max-width: 768px)').addEventListener('change', (e) => {
        if (e.matches) {
            picker.classList.add('collapsed');
        } else {
            picker.classList.remove('collapsed');
        }
    });
}

function initSeasonPicker() {
    initSeasonPickerMobile();

    document.querySelectorAll('.season-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const season = btn.dataset.season;
            if (season === 'auto') {
                applySeason(detectSeason());
                updateSeasonPicker('auto');
            } else {
                applySeason(season);
            }
        });
    });
}

// ========== INITIALIZATION ==========
function initSeason() {
    prerenderDecorations();
    applySeason(detectSeason());
}

// Auto-init when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSeason();
    initSeasonPicker();
});

// Export for manual use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SEASONS,
        initTheme,
        toggleTheme,
        applyTheme,
        detectSeason,
        applySeason,
        initSeason,
        prerenderDecorations,
        toggleSeasonPicker
    };
}
