#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_FILE = path.join(ROOT, 'js', 'data.js');

function readDataJs() {
  const raw = fs.readFileSync(DATA_FILE, 'utf8').replace(/\r/g, '');
  const match = raw.match(/const\s+sitesData\s*=\s*([\s\S]*?\]);/);
  if (!match) throw new Error('Could not parse sitesData from data.js');
  const json = match[1].replace(/,\s*([\]}])/g, '$1');
  return JSON.parse(json).length;
}

const count = readDataJs();
const formattedCount = count.toLocaleString() + '+';
console.log(`\n🔄 Updating HTML files with global count: ${formattedCount}\n`);

// Regex replacements
const replacements = [
  // Footer text
  {
    pattern: /<p class="footer-stats">Tracking.*?<\/p>/g,
    replace: `<p class="footer-stats">Tracking <strong>${formattedCount}</strong> active adult platforms globally.</p>`
  },
  // SEO Title (Index only)
  {
    pattern: /<title>HentaiVault — .*? Best Doujin Sites &amp; Hentai Streaming 2026<\/title>/g,
    replace: `<title>HentaiVault — ${formattedCount} Best Doujin Sites &amp; Hentai Streaming 2026</title>`
  },
  // Meta description (Index only)
  {
    pattern: /<meta name="description" content="Discover .*? of the best/g,
    replace: `<meta name="description" content="Discover ${formattedCount} of the best`
  },
  // Search bar placeholder
  {
    pattern: /placeholder="Search across .*? sites\.\.\."/g,
    replace: `placeholder="Search across ${formattedCount} sites..."`
  }
];

function walk(dir) {
  const list = fs.readdirSync(dir);
  for (let file of list) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('.git') && !file.includes('node_modules')) {
        walk(file);
      }
    } else {
      if (file.endsWith('.html')) {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;
        
        // Ensure footer-stats paragraph exists; if not, inject it before </footer> or near copyright.
        // Actually, we need to inject it if it doesn't exist, but standardization scripts can be tricky.
        // Let's just do text replacements for now, and rely on standard UI structure.
        
        for (let r of replacements) {
          if (r.pattern.test(content)) {
            content = content.replace(r.pattern, r.replace);
            modified = true;
          }
        }
        
        // Fallback for injecting footer stat if it doesn't exist yet
        if (!content.includes('footer-stats') && content.includes('<div class="footer-bottom">')) {
           content = content.replace(
             '<div class="footer-bottom">', 
             `<div class="footer-bottom">\n        <p class="footer-stats" style="margin-bottom: 8px; color: var(--text-muted); font-size: 0.9rem;">Tracking <strong>${formattedCount}</strong> active adult platforms globally.</p>`
           );
           modified = true;
        }

        // Fallback for search placeholder if it was different
        if (content.includes('placeholder="Search') && !content.includes(`Search across ${formattedCount} sites`)) {
           content = content.replace(/placeholder="Search.*?"/g, `placeholder="Search across ${formattedCount} sites..."`);
           modified = true;
        }

        if (modified) {
          fs.writeFileSync(file, content, 'utf8');
          console.log(`   ✅ Updated ${path.relative(ROOT, file)}`);
        }
      } else if (file.endsWith('i18n.js')) {
        // Update the translation strings in js/i18n.js
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;
        
        const i18nRegex = /search_placeholder:\s*["'].*?(?:\d+).*?["']/g;
        // Since different languages have different phrasing, we just look for numbers like 500+ or 900+ and replace them
        // A safer way is to replace \d+\+ with the new formattedCount.
        
        if (/\d+\+/.test(content)) {
          content = content.replace(/\b\d+\+/g, formattedCount);
          modified = true;
        }

        if (modified) {
          fs.writeFileSync(file, content, 'utf8');
          console.log(`   ✅ Updated ${path.relative(ROOT, file)} (i18n translations)`);
        }
      }
    }
  }
}

walk(ROOT);
console.log('\nDone.');
