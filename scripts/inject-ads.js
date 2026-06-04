#!/usr/bin/env node
/**
 * inject-ads.js
 * -------------
 * 1. Finds every .html file in the repo (skips node_modules).
 * 2. Strips all known corrupted / duplicated ad fragments from the bottom.
 * 3. Ensures the canonical, correct ad blocks are present exactly once.
 *
 * CANONICAL AD BLOCKS (from index.html as source of truth):
 *  A) Skyscrapers  – injected right after <body>
 *  B) Leaderboard  – injected right before </main> (or before <footer> as fallback)
 *  C) Sticky Bottom Ad – injected right before closing </body>
 *  D) Social Bar   – injected last, right before </body>
 *
 * Profitablecpmratenetwork head scripts are also standardized in <head>.
 */

const fs   = require('fs');
const path = require('path');

// ─── AD TEMPLATES ──────────────────────────────────────────────────────────────

const SKYSCRAPERS = `<!-- Sticky Skyscraper Ads (Wide Screens Only) -->
    <div class="skyscraper skyscraper-left">
        <script>
          atOptions = {
            'key' : '13ca4044b4b6e65ef15f10d18752754e',
            'format' : 'iframe',
            'height' : 600,
            'width' : 160,
            'params' : {}
          };
        </script>
        <script src="https://www.highperformanceformat.com/13ca4044b4b6e65ef15f10d18752754e/invoke.js"></script>
    </div>
    <div class="skyscraper skyscraper-right">
        <script>
          atOptions = {
            'key' : '13ca4044b4b6e65ef15f10d18752754e',
            'format' : 'iframe',
            'height' : 600,
            'width' : 160,
            'params' : {}
          };
        </script>
        <script src="https://www.highperformanceformat.com/13ca4044b4b6e65ef15f10d18752754e/invoke.js"></script>
    </div>`;

const LEADERBOARD = `    <!-- Ad Leaderboard -->
    <div class="ad-container leaderboard">
        <script>atOptions = {'key':'40d623b6e8e7efa7651f8c6fbeb29bef','format':'iframe','height':90,'width':728,'params':{}};</script>
        <script src="https://www.highperformanceformat.com/40d623b6e8e7efa7651f8c6fbeb29bef/invoke.js"></script>
    </div>`;

const STICKY_BOTTOM = `    <!-- Sticky Bottom Ad -->
    <div id="sticky-bottom-ad">
        <div class="sticky-ad-inner">
            <script type="text/javascript">
                atOptions = {'key' : '90b220b63fa3e2eb3c163fec3b34a465', 'format' : 'iframe', 'height' : 50, 'width' : 320, 'params' : {}};
            </script>
            <script async type="text/javascript" src="https://revolthem.com/90b220b63fa3e2eb3c163fec3b34a465/invoke.js"></script>
        </div>
        <button onclick="document.getElementById('sticky-bottom-ad').style.display='none'" class="btn-close-ad">&times;</button>
    </div>`;

const SOCIAL_BAR = `    <!-- Adsterra SocialBar & Popunder -->
    <script async type="text/javascript" src="https://revolthem.com/ba/67/44/ba6744afc790009f7b04d7509a97ea2f.js"></script>`;

const HEAD_SCRIPTS = `    <script src="https://pl29414985.profitablecpmratenetwork.com/99/45/11/994511c440490953ceb331525d9f463f.js"></script>
    <script src="https://pl29414982.profitablecpmratenetwork.com/ba/67/44/ba6744afc790009f7b04d7509a97ea2f.js"></script>
    <script async="async" data-cfasync="false" src="https://pl29414983.profitablecpmratenetwork.com/a098db90df9a9b985c317d9ba01e155e/invoke.js"></script>`;

// ─── PATTERNS TO PURGE (regex, global) ─────────────────────────────────────────

const PURGE_PATTERNS = [
  // Old skyscraper blocks using revolthem domain
  /<!--\s*Sticky Skyscraper[^>]*-->\s*<div class="skyscraper[\s\S]*?<\/div>\s*<\/div>\s*<div class="skyscraper[\s\S]*?<\/div>\s*<\/div>/g,
  // Duplicate sticky bottom ad
  /<div id="sticky-bottom-ad">[\s\S]*?<\/div>\s*<\/div>/g,
  // Duplicate social bar / popunder lines (revolthem ba6744...)
  /<script[^>]*revolthem\.com\/ba\/67\/44\/ba6744[^>]*><\/script>/g,
  // Duplicate social bar / popunder (profitablecpm variant)
  /<script[^>]*profitablecpmratenetwork\.com\/ba\/67\/44[^>]*><\/script>/g,
  // Stale "Adsterra SocialBar & Popunder" comment + script combos
  /<!--\s*Adsterra SocialBar[^>]*-->\s*\n?\s*<script[^>]*revolthem[^>]*><\/script>/g,
  /<!--\s*Adsterra SocialBar[^>]*-->/g,
  // Old leaderboard using revolthem domain (40d623...)
  /<!--\s*Ad Leaderboard[^>]*-->\s*\n?\s*<div class="ad-container leaderboard">\s*\n?[\s\S]*?<script[^>]*revolthem[^>]*40d623[^>]*><\/script>\s*\n?\s*<\/div>/g,
  // Old leaderboard using highperformanceformat but without correct wrapper (catch orphan)
  // Orphaned sticky bottom close buttons floating outside the div
  /<button onclick="document\.getElementById\('sticky-bottom-ad'\)[^"]*" class="btn-close-ad">[^<]*<\/button>\s*\n?\s*<\/div>/g,
  // Stale head scripts from profitablecpm (will re-inject correctly)
  /<script src="https:\/\/pl29414985[^"]*"><\/script>\s*\n?\s*<script src="https:\/\/pl29414982[^"]*"><\/script>\s*\n?\s*<script[^>]*pl29414983[^>]*><\/script>/g,
];

// ─── HELPERS ───────────────────────────────────────────────────────────────────

function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'scripts', 'assets', 'css', 'js'].includes(entry.name)) continue;
      walk(full, results);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

function ensureOnce(html, marker, block, beforeMarker) {
  // Remove ALL existing occurrences of this block (identified by a unique substring)
  // Then inject it once at the correct position.
  const uniqueSlice = marker;
  // Count occurrences
  const count = (html.split(uniqueSlice)).length - 1;
  if (count > 1) {
    // Remove all but keep a placeholder to re-insert
    // We'll handle this by stripping and re-injecting
  }
  return html;
}

// ─── MAIN ──────────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');
const files = walk(ROOT);

console.log(`\n🔧 Ad Standardization Script`);
console.log(`   Found ${files.length} HTML files to process.\n`);

let totalModified = 0;

for (const file of files) {
  const rel = path.relative(ROOT, file);
  let html = fs.readFileSync(file, 'utf8');
  const original = html;

  // ── 1. PURGE all stale / duplicate ad fragments ──────────────────────────

  // Remove ALL skyscraper blocks (we'll re-inject the canonical one)
  // Match entire left+right skyscraper pair
  html = html.replace(/<!--\s*Sticky Skyscraper[\s\S]*?<\/div>\s*\n?\s*<\/div>\s*\n/g, '');

  // Remove ALL sticky bottom ad blocks
  html = html.replace(/<div id="sticky-bottom-ad">[\s\S]*?<\/div>\s*\n?\s*<\/div>/g, '');

  // Remove orphaned close buttons for sticky-bottom-ad
  html = html.replace(/<button onclick="document\.getElementById\('sticky-bottom-ad'\)[^"]*" class="btn-close-ad">[^<]*<\/button>\s*/g, '');

  // Remove orphaned closing divs that are left over (extra </div> right before </body>)
  // We detect them by finding sequences of </div> right before </body> that don't belong
  html = html.replace(/(\s*<\/div>\s*){2,}(?=\s*<\/body>)/g, '\n');

  // Remove ALL social bar / popunder scripts
  html = html.replace(/<script[^>]*revolthem\.com\/ba\/67\/44\/ba6744[^>]*><\/script>\s*/g, '');
  html = html.replace(/<script[^>]*profitablecpmratenetwork\.com\/ba\/67\/44[^>]*><\/script>\s*/g, '');
  html = html.replace(/<!--\s*Adsterra SocialBar[^>]*-->\s*/g, '');
  html = html.replace(/<!--\s*Adsterra SocialBar &amp; Popunder[^>]*-->\s*/g, '');

  // Remove ALL leaderboard ad divs
  html = html.replace(/<!--\s*Ad Leaderboard[^>]*-->\s*\n?\s*<div class="ad-container leaderboard">[\s\S]*?<\/div>/g, '');
  // Also catch ones without comments
  html = html.replace(/<div class="ad-container leaderboard">[\s\S]*?<\/div>/g, '');

  // Remove old head scripts from profitablecpm
  html = html.replace(/<script src="https:\/\/pl29414985[^"]*"><\/script>\s*\n?\s*<script src="https:\/\/pl29414982[^"]*"><\/script>\s*\n?\s*<script[^>]*pl29414983[^>]*><\/script>\s*/g, '');

  // ── 2. INJECT canonical ad blocks ────────────────────────────────────────

  // A) Head scripts — right before </head>
  if (!html.includes('pl29414985.profitablecpmratenetwork.com')) {
    html = html.replace('</head>', `${HEAD_SCRIPTS}\n</head>`);
  }

  // B) Skyscrapers — right after <body>
  html = html.replace(/<body>\s*\n?/, `<body>\n${SKYSCRAPERS}\n\n`);

  // C) Leaderboard — right before <main (any variant) or before <footer as fallback
  if (html.includes('<main')) {
    html = html.replace(/(<main[^>]*>)/, `${LEADERBOARD}\n\n    $1`);
  } else if (html.includes('<footer')) {
    html = html.replace(/(<footer[^>]*)/, `${LEADERBOARD}\n\n    $1`);
  }

  // D) Sticky bottom ad + social bar — right before </body>
  html = html.replace('</body>', `${STICKY_BOTTOM}\n\n${SOCIAL_BAR}\n</body>`);

  // ── 3. Fix duplicate QR widget fragments (keep just one) ─────────────────
  const qrMatches = html.match(/<div id="qr-widget"/g);
  if (qrMatches && qrMatches.length > 1) {
    // Remove all but first occurrence
    let found = 0;
    html = html.replace(/<div id="qr-widget"[\s\S]*?<\/div>\s*\n/g, (match) => {
      found++;
      return found === 1 ? match : '';
    });
  }

  // ── 4. Write if changed ──────────────────────────────────────────────────
  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    console.log(`   ✅ Fixed: ${rel}`);
    totalModified++;
  } else {
    console.log(`   ⏭️  No change: ${rel}`);
  }
}

console.log(`\n✅ Done. Modified ${totalModified} / ${files.length} files.\n`);
