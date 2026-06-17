#!/usr/bin/env node
/**
 * inject-ads.js
 * -------------
 * Replaces all old Adsterra/PureVPN ads with the correct, Revolthem-based
 * Adsterra codes and adds new ad units across the site.
 */

const fs   = require('fs');
const path = require('path');

// ─── ADSTERRA AD TEMPLATES ──────────────────────────────────────────────────

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
        <script src="https://revolthem.com/13ca4044b4b6e65ef15f10d18752754e/invoke.js"></script>
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
        <script src="https://revolthem.com/13ca4044b4b6e65ef15f10d18752754e/invoke.js"></script>
    </div>`;

const TOP_BANNER = `    <!-- Adsterra Top Banner (728x90 desktop / 320x50 mobile) -->
    <div class="ad-top-banner" style="text-align:center; margin: 8px auto 0; max-width:100%; overflow:hidden;">
        <div class="ad-728" style="display:none;">
            <script>
              atOptions = {
                'key' : '40d623b6e8e7efa7651f8c6fbeb29bef',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
              };
            </script>
            <script src="https://revolthem.com/40d623b6e8e7efa7651f8c6fbeb29bef/invoke.js"></script>
        </div>
        <div class="ad-320" style="display:none;">
            <script>
              atOptions = {
                'key' : '90b220b63fa3e2eb3c163fec3b34a465',
                'format' : 'iframe',
                'height' : 50,
                'width' : 320,
                'params' : {}
              };
            </script>
            <script src="https://revolthem.com/90b220b63fa3e2eb3c163fec3b34a465/invoke.js"></script>
        </div>
    </div>
    <style>
        @media (min-width: 729px) { .ad-top-banner .ad-728 { display:block !important; } }
        @media (max-width: 728px) { .ad-top-banner .ad-320 { display:block !important; } }
    </style>`;

const STICKY_BOTTOM = `    <!-- Adsterra Sticky Bottom Banner (320x50) -->
    <div id="sticky-bottom-ad" style="position:fixed; bottom:0; left:50%; transform:translateX(-50%); z-index:9999; text-align:center;">
        <div class="sticky-ad-inner">
            <script>
              atOptions = {
                'key' : '90b220b63fa3e2eb3c163fec3b34a465',
                'format' : 'iframe',
                'height' : 50,
                'width' : 320,
                'params' : {}
              };
            </script>
            <script src="https://revolthem.com/90b220b63fa3e2eb3c163fec3b34a465/invoke.js"></script>
        </div>
        <button onclick="document.getElementById('sticky-bottom-ad').style.display='none'" class="btn-close-ad" style="position:absolute;top:-10px;right:0;background:#333;color:#fff;border:none;border-radius:50%;width:20px;height:20px;font-size:12px;cursor:pointer;line-height:20px;">&times;</button>
    </div>`;

const SOCIAL_BAR = `    <!-- Adsterra SocialBar & Popunder -->
    <script src="https://revolthem.com/ba/67/44/ba6744afc790009f7b04d7509a97ea2f.js"></script>
    <script src="https://revolthem.com/99/45/11/994511c440490953ceb331525d9f463f.js"></script>`;

const NATIVE_BANNER = `    <!-- Adsterra Native Banner -->
    <div style="text-align:center; margin: 40px auto; max-width: 800px; overflow: hidden;">
        <script async="async" data-cfasync="false" src="https://revolthem.com/a098db90df9a9b985c317d9ba01e155e/invoke.js"></script>
        <div id="container-a098db90df9a9b985c317d9ba01e155e"></div>
    </div>`;

const BANNER_468 = `    <!-- Adsterra Banner 468x60 -->
    <div style="text-align:center; margin: 30px auto; max-width:100%; overflow:hidden;">
        <script>
          atOptions = {
            'key' : '4179d9cf3a579f7778ba7a09f693ca35',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
          };
        </script>
        <script src="https://revolthem.com/4179d9cf3a579f7778ba7a09f693ca35/invoke.js"></script>
    </div>`;

const BANNER_160_300 = `    <!-- Adsterra Banner 160x300 -->
    <div style="text-align:center; margin: 20px auto; overflow:hidden;">
        <script>
          atOptions = {
            'key' : 'f09dcac8f1df551ed650e4aee0028622',
            'format' : 'iframe',
            'height' : 300,
            'width' : 160,
            'params' : {}
          };
        </script>
        <script src="https://revolthem.com/f09dcac8f1df551ed650e4aee0028622/invoke.js"></script>
    </div>`;

const SMARTLINK_BUTTON = `                <a href="https://revolthem.com/a0qetz6sq?key=df2ad4ccf03e4eb012e77d7ffe6be738" class="btn-primary" style="background: linear-gradient(135deg, #f1c40f, #f39c12); color: #000; border: none; font-weight: 800;" target="_blank" rel="noopener noreferrer">
                    <span class="btn-icon">🎁</span> Bonus Vault
                </a>`;

const IN_CONTENT_300_250 = `            <!-- Adsterra 300x250 In-Content -->
            <div style="margin: 40px auto; text-align:center; overflow:hidden;">
                <script>
                  atOptions = {
                    'key' : '384264be4aaafb8eb28962829e409253',
                    'format' : 'iframe',
                    'height' : 250,
                    'width' : 300,
                    'params' : {}
                  };
                </script>
                <script src="https://revolthem.com/384264be4aaafb8eb28962829e409253/invoke.js"></script>
            </div>`;


// ─── HELPERS ─────────────────────────────────────────────────────────────────

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

// ─── MAIN ────────────────────────────────────────────────────────────────────

const ROOT  = path.resolve(__dirname, '..');
const files = walk(ROOT);

console.log('\n🔧 Adsterra Ad Standardisation Script (Revolthem Update)');
console.log(`   Found ${files.length} HTML files to process.\n`);

let totalModified = 0;

for (const file of files) {
  const rel = path.relative(ROOT, file);
  let html = fs.readFileSync(file, 'utf8');
  const original = html;

  // ── 1. STRIP OLD ADS ──────────────────────────────────────────────────────
  
  // Strip the old HighPerformanceFormat injection shells
  html = html.replace(/\s*<!-- Adsterra Top Banner[\s\S]*?<\/style>\s*\n?/g, '\n');
  html = html.replace(/\s*<!-- Sticky Skyscraper[\s\S]*?<\/div>\s*\n?\s*<\/div>\s*\n?/g, '\n');
  html = html.replace(/\s*<!-- Adsterra Sticky Bottom Banner[\s\S]*?<\/div>\s*\n?(?=\s*(<!-- Adsterra SocialBar|<\/body>))/g, '\n');
  html = html.replace(/<!-- Adsterra SocialBar[^>]*-->\s*\n?\s*<script[^>]*>[\s\S]*?<\/script>\s*\n?/g, '');
  html = html.replace(/<!-- Adsterra SocialBar[^>]*-->\s*\n?/g, '');
  html = html.replace(/<script[^>]*highperformanceformat[\s\S]*?<\/script>\s*\n?/g, '');
  
  // Strip previous versions of Revolthem (if any existed before this run)
  html = html.replace(/\s*<!-- Adsterra Native Banner[\s\S]*?container-a098db90df9a9b985c317d9ba01e155e[\s\S]*?<\/div>\s*\n?/g, '\n');
  html = html.replace(/\s*<!-- Adsterra Banner 468x60[\s\S]*?4179d9cf3a579f7778ba7a09f693ca35[\s\S]*?<\/div>\s*\n?/g, '\n');
  html = html.replace(/\s*<!-- Adsterra Banner 160x300[\s\S]*?f09dcac8f1df551ed650e4aee0028622[\s\S]*?<\/div>\s*\n?/g, '\n');
  
  // Strip old Bonus Vault smartlink button so we don't duplicate
  html = html.replace(/\s*<a[^>]*revolthem\.com\/a0qetz6sq[^>]*>[\s\S]*?<\/a>\s*/g, '\n                ');

  // Also strip any residual atOptions + script blocks globally
  html = html.replace(/<script[^>]*>\s*atOptions\s*=[\s\S]*?<\/script>\s*\n?\s*<script[^>]*revolthem[^>]*>[^<]*<\/script>\s*\n?/g, '');
  html = html.replace(/<script[^>]*>\s*atOptions\s*=[\s\S]*?<\/script>\s*\n?\s*<script[^>]*highperformanceformat[^>]*>[^<]*<\/script>\s*\n?/g, '');
  
  // Update the 300x250 In-Content ad (if it exists)
  if (html.includes('29314488')) {
    html = html.replace(/\s*<!-- Adsterra 300x250 In-Content[\s\S]*?<\/div>\s*\n?/g, '\n' + IN_CONTENT_300_250 + '\n');
  }

  // ── 2. INJECT NEW BLOCKS ────────────────────────────────────────────────
  
  // Top Banner
  if (!html.includes('40d623b6e8e7efa7651f8c6fbeb29bef')) {
    html = html.replace(/(<body[^>]*>)\s*\n?/, `$1\n\n${TOP_BANNER}\n\n`);
  }

  // Skyscrapers
  if (!html.includes('13ca4044b4b6e65ef15f10d18752754e')) {
    html = html.replace(/\s*<\/body>/, `\n\n${SKYSCRAPERS}\n\n</body>`);
  }

  // Sticky Bottom
  html = html.replace(/\s*<!-- Adsterra Sticky Bottom Banner[\s\S]*?<\/div>\s*\n?/g, '\n');
  html = html.replace(/\s*<div id="sticky-bottom-ad"[\s\S]*?<\/div>\s*\n?/g, '\n');
  html = html.replace(/\s*<\/body>/, `\n${STICKY_BOTTOM}\n</body>`);

  // Social Bar + Popunder
  if (!html.includes('ba6744afc790009f7b04d7509a97ea2f')) {
    html = html.replace(/<\/body>/, `${SOCIAL_BAR}\n</body>`);
  }
  
  // Native Banner (Above footer)
  if (!html.includes('a098db90df9a9b985c317d9ba01e155e')) {
    html = html.replace(/\s*(<footer)/, `\n${NATIVE_BANNER}\n$1`);
  }

  // Banner 468x60 (Below Hero, if Hero exists)
  if (html.includes('class="hero"') && !html.includes('4179d9cf3a579f7778ba7a09f693ca35')) {
    html = html.replace(/\s*(<\/header>)/, `\n$1\n${BANNER_468}\n`);
  }

  // Banner 160x300 (Bottom of Sidebar, if Sidebar exists)
  if (html.includes('class="sidebar"') && !html.includes('f09dcac8f1df551ed650e4aee0028622')) {
    html = html.replace(/\s*(<\/aside>)/, `\n${BANNER_160_300}\n$1`);
  }
  
  // Smartlink Button (In Hero Buttons)
  if (html.includes('id="btnSurpriseMe"') && !html.includes('revolthem.com/a0qetz6sq')) {
    html = html.replace(/(<button id="btnSurpriseMe")/, `${SMARTLINK_BUTTON}\n                $1`);
  }

  // ── 3. WRITE IF CHANGED ─────────────────────────────────────────────────
  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    console.log(`   ✅ Modified: ${rel}`);
    totalModified++;
  } else {
    console.log(`   ⏭️  No change: ${rel}`);
  }
}

console.log(`\n✅ Done. Modified ${totalModified} / ${files.length} files.\n`);
