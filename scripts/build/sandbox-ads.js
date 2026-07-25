const fs = require('fs');
const path = require('path');

// Matches the entire block of <script>atOptions = ...</script> and the following invoke.js script
const adRegex = /<script>\s*atOptions\s*=\s*{\s*'key'\s*:\s*'([a-f0-9]+)',\s*'format'\s*:\s*'iframe',\s*'height'\s*:\s*(\d+),\s*'width'\s*:\s*(\d+),\s*'params'\s*:\s*{}\s*};\s*<\/script>\s*<script src="[^"]+"><\/script>/g;

function processFile(filePath) {
    if (filePath.includes('node_modules') || filePath.includes('extension')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(adRegex, (match, key, height, width) => {
        return `<iframe src="/ads/banner.html?key=${key}&w=${width}&h=${height}" width="${width}" height="${height}" frameborder="0" scrolling="no" sandbox="allow-scripts allow-popups allow-same-origin"></iframe>`;
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Sandboxed ads in ${filePath}`);
    }
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

// Start from the root directory
walkSync(path.join(__dirname, '../../'));
console.log('✅ Finished sandboxing ads.');
