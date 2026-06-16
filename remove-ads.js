const fs = require('fs');
const path = require('path');

const directories = [
    './category',
    './blog',
    '.'
];

let modifiedCount = 0;

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (fullPath !== 'node_modules' && fullPath !== '.git' && fullPath !== '.github') {
                // Ignore other subdirs
            }
        } else if (fullPath.endsWith('.html')) {
            patchFile(fullPath);
        }
    }
}

function patchFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // SAFE REMOVAL: Only remove the exact script tags for the ad networks
    // This prevents accidental greedy regex from eating the HTML
    
    // 1. Remove script tags pointing to known ad domains
    content = content.replace(/<script[^>]*src="https:\/\/[^"]*profitablecpmratenetwork\.com[^"]*"[^>]*><\/script>\s*/g, '');
    content = content.replace(/<script[^>]*src="https:\/\/[^"]*revolthem\.com[^"]*"[^>]*><\/script>\s*/g, '');
    content = content.replace(/<script[^>]*src="https:\/\/[^"]*highperformanceformat\.com[^"]*"[^>]*><\/script>\s*/g, '');
    
    // 2. Remove inline atOptions blocks safely (limit character span to prevent eating huge blocks)
    // Matches: <script> atOptions = { ... }; </script>
    content = content.replace(/<script>\s*atOptions\s*=\s*\{[^<]{0,500}\};\s*<\/script>\s*/g, '');
    content = content.replace(/<script type="text\/javascript">\s*atOptions\s*=\s*\{[^<]{0,500}\};\s*<\/script>\s*/g, '');

    // 3. Remove known HTML comments for ads
    content = content.replace(/<!-- Sticky Bottom Ad -->\s*/g, '');
    content = content.replace(/<!-- Adsterra SocialBar & Popunder -->\s*/g, '');
    content = content.replace(/<!-- Ad Leaderboard -->\s*/g, '');
    content = content.replace(/<!-- Sticky Skyscraper Ads \(Wide Screens Only\) -->\s*/g, '');

    // 4. Safely remove specific ad container divs only if they contain the exact ad networks or are empty
    // The safest way is to just let the above script removals happen, and leave the empty divs.
    // An empty `<div class="skyscraper"></div>` won't break the page layout, it just won't show anything.

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Cleaned ads from: ${filePath}`);
        modifiedCount++;
    }
}

directories.forEach(dir => walkDir(dir));
console.log(`Total files cleaned safely: ${modifiedCount}`);
