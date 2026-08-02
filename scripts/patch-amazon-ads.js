/**
 * patch-amazon-ads.js
 * Injects Amazon ad slots and the floating pCloud CTA into all HentaiVault pages.
 * Run from the vault project root: node scripts/patch-amazon-ads.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// ── Snippets ──────────────────────────────────────────────────────────────────

// Inline ad slot — injected before </main> or before <footer
const INLINE_SLOT = `\n    <!-- Amazon Affiliate Inline Ad -->\n    <div class="hv-amazon-inline-slot"></div>\n`;

// Footer grid slot — injected just before <footer
const FOOTER_SLOT = `\n    <!-- Amazon Affiliate Footer Grid -->\n    <div class="hv-amazon-footer-slot"></div>\n`;

// Amazon script tag — injected before </body>
const AMAZON_SCRIPT = `\n    <!-- Amazon Affiliate Ads Engine -->\n    <script defer src="/js/amazon-ads.js"></script>\n`;

// Blog pages use relative path
const AMAZON_SCRIPT_BLOG = `\n    <!-- Amazon Affiliate Ads Engine -->\n    <script defer src="../js/amazon-ads.js"></script>\n`;
const AMAZON_SCRIPT_CATEGORY = `\n    <!-- Amazon Affiliate Ads Engine -->\n    <script defer src="../js/amazon-ads.js"></script>\n`;

// Floating pCloud CTA — injected before </body> if not already present
const PCLOUD_CTA = `\n    <!-- High-Converting Affiliate CTA -->\n    <a href="https://partner.pcloud.com/r/156786" target="_blank" rel="nofollow noopener" style="position:fixed;bottom:80px;right:20px;background:linear-gradient(135deg, #007EE5, #0056b3);color:white;padding:12px 24px;border-radius:50px;text-decoration:none;font-weight:bold;z-index:9998;box-shadow:0 4px 15px rgba(0,126,229,0.5);display:flex;align-items:center;gap:8px;transition:transform 0.2s;animation: pulse 2s infinite;">\n        <span style="font-size:1.2rem;">☁️</span> Get 10TB Cloud Storage\n    </a>\n    <style>\n        @keyframes pulse {\n            0% { transform: scale(1); }\n            50% { transform: scale(1.05); }\n            100% { transform: scale(1); }\n        }\n    </style>\n`;

// ── File targets ──────────────────────────────────────────────────────────────

const ROOT_PAGES = [
  'index.html',
  'site.html',
  'compare.html',
  'alternatives.html',
  'about.html',
  'mylist.html',
  'contact.html',
  'privacy.html',
  'terms.html',
  'disclaimer.html',
];

const CATEGORY_PAGES = [
  'category/hentai-streaming.html',
  'category/manga-doujin.html',
  'category/anime-streaming.html',
  'category/games.html',
  'category/images-boorus.html',
  'category/communities.html',
  'category/downloads.html',
  'category/visual-novels.html',
];

const BLOG_PAGES = [
  'blog/best-doujin-sites-2026.html',
  'blog/best-streaming-2026.html',
  'blog/free-manga-guide.html',
  'blog/hanime-alternatives-2026.html',
  'blog/nhentai-alternatives-2026.html',
  'blog/privacy-safety-guide.html',
  'blog/top-10-sites-may-2026.html',
  'blog/index.html',
];

// ── Patch function ────────────────────────────────────────────────────────────

function patchFile(filePath, scriptSnippet) {
  const absPath = path.join(ROOT, filePath);
  if (!fs.existsSync(absPath)) {
    console.warn(`  SKIP (not found): ${filePath}`);
    return;
  }

  let html = fs.readFileSync(absPath, 'utf8');
  let changed = false;

  // 1. Inject inline slot before </main> if not already present
  if (!html.includes('hv-amazon-inline-slot')) {
    if (html.includes('</main>')) {
      html = html.replace('</main>', INLINE_SLOT + '</main>');
      changed = true;
    } else if (html.includes('<footer')) {
      // Fallback: insert before first <footer
      html = html.replace('<footer', FOOTER_SLOT + '<footer');
      changed = true;
    }
  }

  // 2. Inject footer grid slot before <footer if not already present
  if (!html.includes('hv-amazon-footer-slot')) {
    if (html.includes('<footer')) {
      // Replace first occurrence of <footer to avoid double-injecting
      html = html.replace('<footer', FOOTER_SLOT + '\n    <footer');
      changed = true;
    }
  }

  // 3. Inject Amazon script tag before </body> if not already present
  if (!html.includes('amazon-ads.js')) {
    if (html.includes('</body>')) {
      html = html.replace('</body>', scriptSnippet + '</body>');
      changed = true;
    }
  }

  // 4. Inject floating pCloud CTA before </body> if not already present
  if (!html.includes('High-Converting Affiliate CTA') && !html.includes('partner.pcloud.com/r/156786')) {
    // Only add if no pcloud CTA exists at all
    if (html.includes('</body>')) {
      html = html.replace('</body>', PCLOUD_CTA + '</body>');
      changed = true;
    }
  } else if (!html.includes('High-Converting Affiliate CTA') && html.includes('partner.pcloud.com/r/156786')) {
    // pCloud links exist but no floating CTA — add it
    if (html.includes('</body>')) {
      html = html.replace('</body>', PCLOUD_CTA + '</body>');
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(absPath, html, 'utf8');
    console.log(`  ✓ Patched: ${filePath}`);
  } else {
    console.log(`  ~ No changes: ${filePath}`);
  }
}

// ── Run ───────────────────────────────────────────────────────────────────────

console.log('\n=== HentaiVault — Amazon Affiliate Patch ===\n');

console.log('Root pages:');
ROOT_PAGES.forEach(f => patchFile(f, AMAZON_SCRIPT));

console.log('\nCategory pages:');
CATEGORY_PAGES.forEach(f => patchFile(f, AMAZON_SCRIPT_CATEGORY));

console.log('\nBlog pages:');
BLOG_PAGES.forEach(f => patchFile(f, AMAZON_SCRIPT_BLOG));

console.log('\n=== Done ===\n');
