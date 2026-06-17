const fs = require('fs');
const path = require('path');

function walk(dir, results = []) {
  const SKIP = ['node_modules', '.git', 'scripts', 'assets', 'css', 'js', '.wrangler', '.github', 'migrations', 'bot'];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP.includes(entry.name)) continue;
      walk(full, results);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const files = walk('.');
for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  const orig = html;
  
  // Super aggressive strip of all skyscraper blocks (empty or not)
  html = html.replace(/\s*<!-- Sticky Skyscraper[\s\S]*?<div class="skyscraper skyscraper-right">[\s\S]*?<\/div>\s*\n?/g, '\n');
  
  // Clean up any other duplicate empty divs
  html = html.replace(/\s*<div class="skyscraper skyscraper-left">\s*<\/div>\s*<div class="skyscraper skyscraper-right">\s*<\/div>/g, '');

  if (html !== orig) {
    fs.writeFileSync(file, html, 'utf8');
    console.log('Cleaned: ' + file);
  }
}
