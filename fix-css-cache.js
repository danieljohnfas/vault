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

    // 1. Cache bust CSS
    c = c.replace(/href="([^"]*css\/style\.css)(?:\?v=\d+)?"/g, 'href="$1?v=4"');

    // 2. Fix the inline styles for review-layout
    // Force margin: 80px auto 80px;
    c = c.replace(
        /<main class="review-layout"[^>]*style="([^"]*)"/gi,
        (match, style) => {
            return `<main class="review-layout" style="max-width: 800px; margin: 80px auto 80px; padding: 0 24px 60px;"`;
        }
    );

    if (c !== orig) {
        fs.writeFileSync(file, c, 'utf8');
        console.log('Fixed: ' + file);
        fixed++;
    }
}
console.log('\nTotal files patched: ' + fixed);
