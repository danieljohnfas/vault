const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (fullPath !== 'node_modules' && fullPath !== '.git') {
                walkDir(fullPath);
            }
        } else if (fullPath.endsWith('.html')) {
            patchFile(fullPath);
        }
    }
}

function patchFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // The skyscrapers were injected right after <body> as:
    // <body>\n    <!-- Sticky Skyscraper Ads (Wide Screens Only) -->\n    <div class="skyscraper skyscraper-left">...</div>\n    <div class="skyscraper skyscraper-right">...</div>
    // We will extract them.
    const regex = /<!-- Sticky Skyscraper Ads \(Wide Screens Only\) -->[\s\S]*?<div class="skyscraper skyscraper-left">[\s\S]*?<\/div>\s*<div class="skyscraper skyscraper-right">[\s\S]*?<\/a>\s*<\/div>/;
    
    const match = content.match(regex);
    if (match) {
        const adsHtml = match[0];
        
        // Remove from current position (which is right after body)
        content = content.replace(regex, '');
        
        // Inject right before </body>
        // or before <!-- Scripts --> if it exists
        if (content.includes('<!-- Scripts -->')) {
            content = content.replace(/<!-- Scripts -->/, adsHtml + '\n\n    <!-- Scripts -->');
        } else {
            content = content.replace(/<\/body>/, adsHtml + '\n</body>');
        }
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Moved skyscrapers in: ${filePath}`);
    }
}

walkDir('.');
console.log('Finished moving skyscrapers.');
