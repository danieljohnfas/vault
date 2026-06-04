const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const htmlFiles = walk('.').filter(f => f.endsWith('.html') && f !== './index.html' && !f.includes('node_modules'));

const headerCode = `<!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <a href="/" class="logo">
                <span class="logo-icon">💎</span> HentaiVault
            </a>
            <div class="search-bar">
                <div class="search-container">
                    <input type="text" id="searchInput" data-i18n="search_placeholder" placeholder="Search across 1,004+ sites..." autocomplete="off">
                    <div id="searchAutocomplete" class="search-autocomplete"></div>
                </div>
            </div>
            <button class="btn-search-mobile"`;

let fixedCount = 0;
htmlFiles.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    if (!content.includes('<nav class="navbar">') && content.includes('<button class="btn-search-mobile"')) {
        // Find the stray </div> right before <button class="btn-search-mobile"
        content = content.replace(/<\/div>\s*<button class="btn-search-mobile"/, headerCode);
        fs.writeFileSync(f, content);
        console.log('Fixed', f);
        fixedCount++;
    }
});

console.log(`Finished fixing ${fixedCount} files.`);
