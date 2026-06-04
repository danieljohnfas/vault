const fs = require('fs');
const path = require('path');
const ROOT = '.';

const htmlFiles = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, e.name);
    const skip = ['node_modules','.git','.wrangler','.wrangler-state','scratch'];
    if (e.isDirectory() && !skip.includes(e.name)) walk(full);
    else if (e.isFile() && e.name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(ROOT);

const missing = new Set();
const checked = new Set();

for (const f of htmlFiles) {
  const content = fs.readFileSync(f, 'utf8');
  const dir = path.dirname(f);
  const refs = [...content.matchAll(/(?:href|src)=["']([^"'#]+)["']/g)]
    .map(m => m[1])
    .filter(r => !r.startsWith('http') && !r.startsWith('data:') && !r.startsWith('//') && !r.startsWith('mailto'));
  
  for (let ref of refs) {
    const clean = ref.split('?')[0].split('#')[0];
    if (!clean || clean === '/') continue;
    let resolved;
    if (clean.startsWith('/')) {
      resolved = path.join(ROOT, clean);
    } else {
      resolved = path.join(dir, clean);
    }
    if (checked.has(resolved)) continue;
    checked.add(resolved);
    if (!fs.existsSync(resolved)) {
      missing.add(clean + ' (in: ' + path.relative(ROOT, f) + ')');
    }
  }
}

if (missing.size === 0) {
  console.log('No missing local assets found!');
} else {
  console.log('MISSING ASSETS (' + missing.size + '):');
  for (const m of missing) console.log('  MISSING: ' + m);
}
