const fs = require('fs');
const path = require('path');

const TOP_BANNER = `\n    <!-- Adsterra Placeholder: Top Banner -->\n    <div id="ad-top" style="width: 728px; height: 90px; margin: 0 auto; overflow: hidden; display: flex; justify-content: center; max-width: 100%;"></div>\n`;
const BANNER_468 = `\n    <!-- Adsterra Placeholder: 468x60 -->\n    <div id="ad-hero" style="width: 468px; height: 60px; margin: 30px auto; overflow: hidden; display: flex; justify-content: center; max-width: 100%;"></div>\n`;
const BANNER_160_300 = `\n    <!-- Adsterra Placeholder: 160x300 -->\n    <div id="ad-sidebar" style="width: 160px; height: 300px; margin: 20px auto; overflow: hidden; display: flex; justify-content: center; max-width: 100%;"></div>\n`;

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

const ROOT  = path.resolve(__dirname, '..');
const files = walk(ROOT);

let totalModified = 0;

for (const file of files) {
  const rel = path.relative(ROOT, file);
  let html = fs.readFileSync(file, 'utf8');
  const original = html;

  // 1. Top Banner (Right after <body>)
  if (!html.includes('id="ad-top"')) {
    html = html.replace(/(<body[^>]*>)\s*\n?/, `$1${TOP_BANNER}`);
  }

  // 2. Banner 468x60 (Below Hero)
  if (html.includes('class="hero"') && !html.includes('id="ad-hero"')) {
    html = html.replace(/\s*(<\/header>)/, `\n$1${BANNER_468}`);
  }

  // 3. Banner 160x300 (Bottom of Sidebar)
  if (html.includes('class="sidebar"') && !html.includes('id="ad-sidebar"')) {
    html = html.replace(/\s*(<\/aside>)/, `\n${BANNER_160_300}$1`);
  }
  
  // Make sure ads.js is loaded at the bottom before </body>
  if (!html.includes('ads.js')) {
    // Determine path depth
    const depth = rel.split(path.sep).length - 1;
    let prefix = '/';
    // Actually, root relative is fine for cloudflare
    html = html.replace(/(<\/body>)/, `    <script src="/js/ads.js" defer></script>\n$1`);
  }

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    totalModified++;
  }
}

console.log(`✅ Injected placeholders into ${totalModified} / ${files.length} HTML files.`);
