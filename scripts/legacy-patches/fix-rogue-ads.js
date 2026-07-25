const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    const results = [];
    for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) {
            if (f !== 'node_modules' && f !== '.git' && f !== '.wrangler') {
                results.push(...walkDir(full));
            }
        } else if (f.endsWith('.html')) {
            results.push(full);
        }
    }
    return results;
}

const files = walkDir('.');
let fixed = 0;

for (const file of files) {
    let c = fs.readFileSync(file, 'utf8');
    const orig = c;

    // 1. Remove ALL revolthem.com script tags and their container divs
    // Pattern: <div class="ad-container..."><div id="container-..."></div><script ... revolthem ...></script></div>
    c = c.replace(/<div[^>]*class="[^"]*ad-container[^"]*"[^>]*>\s*<div[^>]*id="container-[a-f0-9]+"[^>]*>\s*<\/div>\s*<script[^>]*revolthem[^>]*><\/script>\s*<\/div>/gi, '');

    // 2. Also strip any bare revolthem script tags not wrapped in the div
    c = c.replace(/<script[^>]*revolthem\.com[^>]*><\/script>\s*/gi, '');
    c = c.replace(/<script[^>]*pl\d+\.revolthem[^>]*><\/script>\s*/gi, '');

    // 3. Fix the main layout centering — replace the inline style on <main class="review-layout"...>
    // to ensure it always has margin: auto
    c = c.replace(
        /<main class="review-layout" style="([^"]*)"/gi,
        (match, style) => {
            // Add margin if not present
            if (!style.includes('margin')) {
                return `<main class="review-layout" style="${style}; margin: 80px auto 80px;"`;
            }
            return match;
        }
    );

    if (c !== orig) {
        fs.writeFileSync(file, c, 'utf8');
        console.log('Fixed: ' + file);
        fixed++;
    }
}
console.log('\nTotal files patched: ' + fixed);
