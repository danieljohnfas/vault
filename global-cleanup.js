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

    // 1. Update stale counts
    content = content.replace(/1,004\+ sites/g, '1,903+ sites');
    content = content.replace(/966\+ curated sites/g, '1,903+ curated sites');

    // 2. Remove Discord invite link
    content = content.replace(/<a[^>]*href="https:\/\/discord\.gg\/your_discord_invite_here"[^>]*>[\s\S]*?<\/a>\s*/g, '');

    // 3. Remove empty ad containers
    content = content.replace(/<div class="skyscraper skyscraper-left">\s*<\/div>\s*/g, '');
    content = content.replace(/<div class="skyscraper skyscraper-right">\s*<\/div>\s*/g, '');
    content = content.replace(/<div class="ad-container leaderboard">\s*<\/div>\s*/g, '');
    content = content.replace(/<div class="ad-container sidebar-ad">\s*<\/div>\s*/g, '');
    content = content.replace(/<div class="ad-container sidebar-ad sidebar-ad-secondary">\s*<\/div>\s*/g, '');
    content = content.replace(/<div class="ad-container mobile-rect">\s*<\/div>\s*/g, '');
    
    // Sticky bottom empty ad
    content = content.replace(/<div id="sticky-bottom-ad">\s*<div class="sticky-ad-inner">\s*<\/div>\s*<button[^>]*>&times;<\/button>\s*<\/div>\s*/g, '');

    // Native banner empty ad
    content = content.replace(/<div class="ad-container native-banner"[^>]*>\s*<div id="container-[^"]*"><\/div>\s*<\/div>\s*/g, '');

    // Mobile 300 empty ad
    content = content.replace(/<div[^>]*class="mobile-ad-300"[^>]*>\s*<script>atOptions[^<]*<\/script>\s*<\/div>\s*/g, '');

    // 4. Remove fake/dead ad scripts
    content = content.replace(/<script[^>]*src="https:\/\/[^"]*profitableratecpm\.com[^"]*"[^>]*><\/script>\s*/g, '');
    
    // 5. Clean up stray closing divs before scripts/footer
    // Pattern: </div> \n </div> \n <!-- Scripts -->
    content = content.replace(/(?:<\/div>\s*){1,2}(?=<!-- Scripts -->)/g, '');
    
    // 6. Clean dead comments
    content = content.replace(/<!-- Adsterra SocialBar & Popunder -->\s*/g, '');
    content = content.replace(/<!-- Adsterra Popunder -->\s*/g, '');
    content = content.replace(/<!-- Deferred Adsterra Scripts -->\s*/g, '');
    content = content.replace(/<!--\s*<script type="text\/javascript"\s*src="\/\/pl[^"]*"><\/script>\s*-->\s*/g, '');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Cleaned: ${filePath}`);
        modifiedCount++;
    }
}

directories.forEach(dir => walkDir(dir));
console.log(`Total files cleaned globally: ${modifiedCount}`);
