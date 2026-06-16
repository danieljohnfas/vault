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
    
    // Remove individual ad scripts
    content = content.replace(/<script[^>]*src="https:\/\/(pl\d+\.)?profitablecpmratenetwork\.com[^>]*><\/script>\s*/g, '');
    content = content.replace(/<script[^>]*src="https:\/\/revolthem\.com[^>]*><\/script>\s*/g, '');
    content = content.replace(/<script[^>]*src="https:\/\/www\.highperformanceformat\.com[^>]*><\/script>\s*/g, '');
    
    // Remove ad containers (leaderboard, native banners)
    content = content.replace(/<div class="ad-container.*?>[\s\S]*?<\/div>\s*<\/div>/g, ''); // Nested divs sometimes
    content = content.replace(/<div class="ad-container.*?>[\s\S]*?<\/div>\s*/g, '');
    
    // Remove Skyscrapers
    content = content.replace(/<!-- Sticky Skyscraper Ads.*?-->\s*/g, '');
    content = content.replace(/<div class="skyscraper.*?>[\s\S]*?<\/div>\s*/g, '');
    
    // Remove Sticky Bottom Ad
    content = content.replace(/<!-- Sticky Bottom Ad -->\s*/g, '');
    content = content.replace(/<div id="sticky-bottom-ad">[\s\S]*?<\/div>\s*<\/div>\s*/g, ''); // it has an inner div
    content = content.replace(/<div id="sticky-bottom-ad">[\s\S]*?<\/div>\s*/g, ''); 
    
    // Remove Adsterra comments
    content = content.replace(/<!-- Adsterra.*?-->\s*/g, '');
    
    // General cleanup for lingering atOptions scripts
    content = content.replace(/<script>\s*atOptions\s*=\s*\{[\s\S]*?\};\s*<\/script>\s*/g, '');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Cleaned ads from: ${filePath}`);
        modifiedCount++;
    }
}

directories.forEach(dir => walkDir(dir));
console.log(`Total files cleaned: ${modifiedCount}`);
