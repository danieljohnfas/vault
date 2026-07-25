const fs = require('fs');
const path = require('path');

const standardAdBlock = `
    <!-- Ad Leaderboard -->
    <div class="ad-container leaderboard" style="margin-top: 20px;">
        <script>atOptions = {'key':'40d623b6e8e7efa7651f8c6fbeb29bef','format':'iframe','height':90,'width':728,'params':{}};</script>
        <script src="https://www.highperformanceformat.com/40d623b6e8e7efa7651f8c6fbeb29bef/invoke.js"></script>
    </div>
`;

function processFile(filePath) {
    if (filePath.includes('extension') || filePath.includes('node_modules')) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // If no </nav>, skip (e.g. maybe some weird file)
    if (!content.includes('</nav>')) return;

    // Remove ALL existing leaderboard ad blocks
    // This regex looks for <!-- Ad Leaderboard --> followed by anything until </div>
    const regex = /\s*<!-- Ad Leaderboard -->[\s\S]*?<div class="ad-container leaderboard"[\s\S]*?<\/div>\s*/g;
    
    // Some pages might not have the "<!-- Ad Leaderboard -->" comment, so we should also strip standalone divs:
    const regexDivOnly = /\s*<div class="ad-container leaderboard"[\s\S]*?<\/div>\s*/g;

    content = content.replace(regex, '\n\n');
    content = content.replace(regexDivOnly, '\n\n');

    // Insert the standard ad block right after </nav>
    content = content.replace('</nav>', '</nav>' + standardAdBlock);

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
}

function walkSync(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkSync(fullPath);
        } else if (fullPath.endsWith('.html')) {
            processFile(fullPath);
        }
    }
}

walkSync(__dirname);
